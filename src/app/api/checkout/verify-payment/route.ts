import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignatureEdge } from '@/lib/crypto-edge';
import { getDatabase, markOrderAsPaid, getOrderWithDetails } from '@/lib/db';
import { sendTelegramOrderNotification } from '@/lib/telegram';
import { generateMerchantWhatsAppLink } from '@/lib/whatsapp';

export const runtime = 'edge';

export interface VerifyPaymentRequestBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  displayOrderId: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as VerifyPaymentRequestBody;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      displayOrderId
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !displayOrderId
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'MISSING_PARAMS',
          message: 'Incomplete payment proof submitted.'
        },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'super_secret_test_key_123';

    // 1. Verify HMAC SHA-256 Signature via Web Crypto API (Constant-time Edge check)
    const isValid = await verifyRazorpaySignatureEdge(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      keySecret
    );

    // Strict Web Crypto HMAC-SHA256 Verification: ZERO BYPASS TOKENS
    if (!isValid) {
      console.warn(`[Tampering Alert] Invalid HMAC signature for Order ${displayOrderId}`);
      return NextResponse.json(
        {
          success: false,
          error: 'SIGNATURE_VERIFICATION_FAILED',
          message: 'Payment signature is invalid or tampered with.'
        },
        { status: 403 }
      );
    }

    // 2. Update D1 order status to PAID
    const db = getDatabase();
    await markOrderAsPaid(db, {
      displayOrderId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature
    });

    // 3. Fetch Full Order Details for Notifications
    const fullOrder = await getOrderWithDetails(db, displayOrderId);

    // 4. Dispatch Telegram Audible Notification
    if (fullOrder) {
      sendTelegramOrderNotification({
        displayOrderId,
        customerName: fullOrder.customer_name || 'Aqua Farmer',
        customerPhone: fullOrder.customer_phone || '9876543210',
        villageMandal: fullOrder.customer_village || 'Andhra Pradesh',
        items: (fullOrder.items || []).map((i: any) => ({
          productName: i.product_name,
          packSize: i.pack_size,
          quantity: i.quantity,
          unitPriceInr: i.unit_price_inr
        })),
        totalAmountInr: fullOrder.total_amount_inr || 0,
        razorpayPaymentId: razorpay_payment_id
      }).catch((err) => {
        console.warn('[Telegram Dispatch Non-blocking Error]', err);
      });
    }

    // 5. Generate Pre-filled WhatsApp link for customer
    const whatsappLink = generateMerchantWhatsAppLink(
      displayOrderId,
      fullOrder?.total_amount_inr || 0
    );

    return NextResponse.json({
      success: true,
      displayOrderId,
      paymentId: razorpay_payment_id,
      amount: fullOrder?.total_amount_inr || 0,
      status: 'PAID',
      whatsappLink,
      message: 'Payment verified successfully. Order confirmed.'
    });
  } catch (error: any) {
    console.error('[verify-payment Error]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'SERVER_ERROR',
        message: error.message || 'Payment verification encountered an internal error.'
      },
      { status: 500 }
    );
  }
}
