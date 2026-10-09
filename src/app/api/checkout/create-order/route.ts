import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, generateDisplayOrderId, createPendingOrder, CustomerPayload, CartItemPayload } from '@/lib/db';

export const runtime = 'edge';

export interface CreateOrderRequestBody {
  customer: CustomerPayload;
  items: CartItemPayload[];
  paymentMethod?: string;
  notes?: Record<string, string>;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateOrderRequestBody;

    // 1. Strict COD Guardrail (Reject all Cash on Delivery variations)
    const pm = String(body.paymentMethod || '').toLowerCase().trim();
    const isCodVariant =
      pm === 'cod' ||
      pm.includes('cash') ||
      pm.includes('delivery') ||
      /\b(cod|pod)\b/i.test(pm) ||
      /c[._\-\s]*o[._\-\s]*d/i.test(pm);

    if (isCodVariant) {
      return NextResponse.json(
        {
          success: false,
          error: 'COD_NOT_PERMITTED',
          message:
            'Cash on Delivery is strictly unavailable for Next Farm biological formulations. All orders must be pre-paid via Razorpay.'
        },
        { status: 400 }
      );
    }

    // 2. Validate Customer
    const { customer, items } = body;
    if (!customer?.name || !customer?.phone || !customer?.village) {
      return NextResponse.json(
        {
          success: false,
          error: 'INVALID_CUSTOMER',
          message: 'Full name, WhatsApp mobile number, and village address are required.'
        },
        { status: 400 }
      );
    }

    const cleanedPhone = customer.phone.replace(/\D/g, '').slice(-10);
    if (cleanedPhone.length !== 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'INVALID_PHONE',
          message: 'Please enter a valid 10-digit mobile number.'
        },
        { status: 400 }
      );
    }
    customer.phone = cleanedPhone;

    // 3. Validate Cart Items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'EMPTY_CART', message: 'Cart cannot be empty.' },
        { status: 400 }
      );
    }

    // 4. Compute Total Amount
    const totalAmountInr = items.reduce(
      (sum, item) => sum + (item.unitPrice || 0) * (item.quantity || 1),
      0
    );

    if (totalAmountInr <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'INVALID_TOTAL',
          message: 'Order total must be greater than zero.'
        },
        { status: 400 }
      );
    }

    const amountInPaise = Math.round(totalAmountInr * 100);

    // 5. Generate Atomic #NF-XXXX Order ID
    const db = getDatabase();
    const displayOrderId = await generateDisplayOrderId(db);

    // 6. Razorpay Order Creation
    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder';
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    let razorpayOrderId = `order_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;

    // If actual Razorpay credentials provided, invoke Razorpay REST API
    if (keySecret && process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.includes('placeholder')) {
      try {
        const basicAuth = btoa(`${keyId}:${keySecret}`);
        const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${basicAuth}`
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `rcpt_${displayOrderId.replace('#', '')}`,
            notes: {
              display_order_id: displayOrderId,
              customer_name: customer.name,
              customer_phone: customer.phone,
              customer_village: customer.village
            }
          })
        });

        if (rzpRes.ok) {
          const rzpData = await rzpRes.json();
          razorpayOrderId = rzpData.id;
        } else {
          const errText = await rzpRes.text();
          console.warn('[Razorpay API Warning, fallback to generated ID]', errText);
        }
      } catch (err) {
        console.warn('[Razorpay API Fetch Error, fallback to generated ID]', err);
      }
    }

    // 7. Persist Pending Order to D1
    await createPendingOrder(db, {
      displayOrderId,
      razorpayOrderId,
      customer,
      items,
      totalAmountInr
    });

    return NextResponse.json({
      success: true,
      razorpayOrderId,
      displayOrderId,
      amount: amountInPaise,
      currency: 'INR',
      keyId,
      customer,
      items
    });
  } catch (error: any) {
    console.error('[create-order Error]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'SERVER_ERROR',
        message: error.message || 'Internal server error.'
      },
      { status: 500 }
    );
  }
}
