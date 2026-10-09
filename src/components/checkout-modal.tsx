'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { CustomerProfile } from '@/types/cart';
import { formatInr } from '@/lib/catalog';
import { generateRazorpaySignatureEdge } from '@/lib/crypto-edge';
import {
  X,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  QrCode,
  Smartphone,
  Truck
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CUSTOMER_STORAGE_KEY = 'next_farm_customer_profile';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const { items, totalAmount, totalItems, clearCart } = useCart();

  const [fullName, setFullName] = useState('');
  const [whatsappMobile, setWhatsappMobile] = useState('');
  const [villageMandal, setVillageMandal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load returning farmer profile from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CustomerProfile;
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.whatsappMobile) setWhatsappMobile(parsed.whatsappMobile);
        if (parsed.villageMandal) setVillageMandal(parsed.villageMandal);
      }
    } catch (e) {
      console.warn('Failed to load profile from localStorage', e);
    }
  }, []);

  // Save profile to localStorage on changes
  const saveProfile = (name: string, phone: string, address: string) => {
    try {
      localStorage.setItem(
        CUSTOMER_STORAGE_KEY,
        JSON.stringify({
          fullName: name,
          whatsappMobile: phone,
          villageMandal: address
        })
      );
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = whatsappMobile.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit Indian WhatsApp mobile number.');
      return;
    }

    if (!villageMandal.trim()) {
      setErrorMessage('Please enter your village, mandal, or farm location.');
      return;
    }

    if (items.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    saveProfile(fullName.trim(), cleanPhone, villageMandal.trim());
    setIsSubmitting(true);

    try {
      // 1. Create Pre-Paid Order on Edge Server
      const orderRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: fullName.trim(),
            phone: cleanPhone,
            village: villageMandal.trim()
          },
          items: items.map((i) => ({
            productId: i.slug || i.productId,
            productName: i.title,
            packSize: i.packSize,
            unitPrice: i.unitPrice,
            quantity: i.quantity
          })),
          paymentMethod: 'prepaid' // strictly pre-paid
        })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.message || 'Failed to initialize pre-paid order.');
      }

      const { razorpayOrderId, displayOrderId, keyId, amount } = orderData;

      // 2. Client Payment Flow
      // Check if Razorpay SDK loaded
      if (typeof window !== 'undefined' && window.Razorpay) {
        const options = {
          key: keyId,
          amount,
          currency: 'INR',
          name: 'Next Farm Bio Sciences',
          description: `Aqua Formulations Pre-Paid Order ${displayOrderId}`,
          order_id: razorpayOrderId,
          prefill: {
            name: fullName.trim(),
            contact: cleanPhone
          },
          theme: {
            color: '#004B50'
          },
          handler: async function (response: any) {
            // 3. Verify Payment
            await completePaymentVerification({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              displayOrderId
            });
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Non-production fallback simulation: Generate authentic HMAC SHA-256 signature
        if (process.env.NODE_ENV === 'production') {
          throw new Error('Razorpay payment gateway failed to load. Please check your connection or disable ad-blockers.');
        }

        const simPaymentId = `pay_sim_${Date.now()}`;
        const devKeySecret = process.env.NEXT_PUBLIC_RAZORPAY_TEST_SECRET || 'super_secret_test_key_123';

        // Compute valid Web Crypto HMAC matching server expectation
        const validHmacSignature = await generateRazorpaySignatureEdge(
          razorpayOrderId,
          simPaymentId,
          devKeySecret
        );

        await completePaymentVerification({
          razorpay_order_id: razorpayOrderId,
          razorpay_payment_id: simPaymentId,
          razorpay_signature: validHmacSignature,
          displayOrderId
        });
      }
    } catch (err: any) {
      console.error('[Checkout Error]', err);
      setErrorMessage(err.message || 'Payment initiation failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const completePaymentVerification = async (verifyPayload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    displayOrderId: string;
  }) => {
    try {
      const verifyRes = await fetch('/api/checkout/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verifyPayload)
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.message || 'Payment verification failed.');
      }

      // Store verified order in session/localStorage for success screen
      try {
        localStorage.setItem(
          'next_farm_last_order',
          JSON.stringify({
            displayOrderId: verifyData.displayOrderId,
            amount: verifyData.amount,
            customerName: fullName.trim(),
            customerPhone: whatsappMobile.replace(/\D/g, '').slice(-10),
            villageMandal: villageMandal.trim(),
            items: items,
            paymentId: verifyData.paymentId,
            whatsappLink: verifyData.whatsappLink,
            paidAt: new Date().toISOString()
          })
        );
      } catch (e) {
        console.warn('Failed to save order to localStorage', e);
      }

      // Clear cart and route to order success screen
      clearCart();
      onClose();
      router.push(`/order-success?orderId=${encodeURIComponent(verifyData.displayOrderId)}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment verification failed.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#002B5B] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FFD200]" />
            <h3 className="font-heading font-bold text-lg text-white">
              Pre-Paid Express Checkout
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery & Policy Callout */}
        <div className="bg-[#FFD200]/15 px-6 py-2.5 border-b border-[#FFD200]/30 flex items-center gap-2 text-xs font-semibold text-[#002B5B]">
          <Truck className="w-4 h-4 text-[#004B50] flex-shrink-0" />
          <span>Zero OTP Barrier • Free Direct Farm Delivery • Pre-Paid Only</span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 3-Field Farmer Identity */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Naidu"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-medium text-sm text-[#002B5B] focus:outline-none focus:ring-2 focus:ring-[#004B50]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                WhatsApp Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-xs font-bold text-slate-600">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit number (e.g. 9848012345)"
                  value={whatsappMobile}
                  onChange={(e) => setWhatsappMobile(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3.5 py-2.5 rounded-r-lg border border-slate-300 font-medium text-sm text-[#002B5B] focus:outline-none focus:ring-2 focus:ring-[#004B50]"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Instant order dispatch updates sent to this WhatsApp number.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Village / Mandal / District <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g. Kankipadu Village, Krishna District (Near Auto Stand)"
                value={villageMandal}
                onChange={(e) => setVillageMandal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-medium text-sm text-[#002B5B] focus:outline-none focus:ring-2 focus:ring-[#004B50]"
              />
            </div>
          </div>

          {/* Payment Methods Info - Pre-paid only */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Accepted Pre-Paid Channels:</span>
              <span className="font-bold text-[#004B50] flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> 256-Bit SSL
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-600">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded">
                <QrCode className="w-3.5 h-3.5 text-[#004B50]" /> UPI / QR
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded">
                <Smartphone className="w-3.5 h-3.5 text-[#004B50]" /> GPay / PhonePe
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded">
                <CreditCard className="w-3.5 h-3.5 text-[#004B50]" /> Cards / NetBanking
              </span>
            </div>

            {/* Strict Exclusion Notice */}
            <div className="pt-2 border-t border-slate-200 text-[11px] text-amber-900 bg-amber-50/70 p-2 rounded flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
              <span>
                <strong>COD is strictly unavailable</strong> to safeguard live biological bacteria.
              </span>
            </div>
          </div>

          {/* Order Summary & Submit Button */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-slate-600">
                Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}:
              </span>
              <span className="font-heading font-black text-2xl text-[#004B50]">
                {formatInr(totalAmount)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#FFD200] hover:bg-[#e6bd00] disabled:opacity-50 text-[#002B5B] font-heading font-black text-sm uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Connecting to Secure Gateway...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#004B50]" />
                  <span>Pay {formatInr(totalAmount)} & Confirm Order</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
