'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Truck,
  ShieldCheck,
  Package,
  ArrowRight,
  ExternalLink,
  MapPin,
  Phone,
  User
} from 'lucide-react';
import { formatInr } from '@/lib/catalog';
import { generateMerchantWhatsAppLink } from '@/lib/whatsapp';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams.get('orderId');

  const [order, setOrder] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('next_farm_last_order');
      if (stored) {
        const parsed = JSON.parse(stored);
        setOrder(parsed);
      }
    } catch (e) {
      console.warn('Failed to load last order from localStorage', e);
    }
  }, []);

  const displayId = queryOrderId || order?.displayOrderId || '#NF-1001';
  const totalAmount = order?.amount || 11199;
  const customerName = order?.customerName || 'Aqua Farmer';
  const customerPhone = order?.customerPhone || '9876543210';
  const villageMandal = order?.villageMandal || 'Andhra Pradesh';
  const items = order?.items || [];

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText(displayId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappLink = generateMerchantWhatsAppLink(displayId, totalAmount);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      {/* Success Hero Card */}
      <div className="bg-white rounded-3xl border-2 border-emerald-500/30 p-8 sm:p-10 text-center shadow-xl relative overflow-hidden">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 font-heading font-extrabold text-xs uppercase tracking-wider rounded-full mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Pre-Paid Payment Verified</span>
        </div>

        <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#002B5B] tracking-tight">
          Order Confirmed & Pre-Paid!
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-lg mx-auto">
          Thank you for choosing Next Farm Bio Sciences. Our technical dispatch team at Autonagar, Vijayawada is preparing your biological shipment.
        </p>

        {/* Order ID Pill with Copy */}
        <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Order Reference:
          </span>
          <span className="font-heading font-black text-xl text-[#004B50] tracking-wider">
            {displayId}
          </span>
          <button
            onClick={handleCopyOrderId}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
            title="Copy Order ID"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Customer & Delivery Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="font-heading font-bold text-lg text-[#002B5B] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#004B50]" />
          <span>Delivery & Dispatch Information</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 font-bold block uppercase tracking-wider flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> Farmer Name
            </span>
            <strong className="text-slate-900 text-sm block">{customerName}</strong>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 font-bold block uppercase tracking-wider flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> WhatsApp Phone
            </span>
            <strong className="text-slate-900 text-sm block">+91 {customerPhone}</strong>
          </div>

          <div className="space-y-1">
            <span className="text-slate-500 font-bold block uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Destination Farm / Village
            </span>
            <strong className="text-slate-900 text-sm block">{villageMandal}</strong>
          </div>
        </div>

        {/* Cold-Chain / Fresh Dispatch Commitment */}
        <div className="bg-[#004B50]/5 border border-[#004B50]/15 rounded-xl p-4 flex items-start gap-3 text-xs text-[#002B5B]">
          <Truck className="w-5 h-5 text-[#004B50] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block text-sm">Dispatched within 24 Hours from Vijayawada HQ</strong>
            <p className="text-slate-600 leading-relaxed">
              Your bio-active formulations are packed in temperature-stabilized industrial containers with sealed tamper-evident caps. Delivered direct to your farm gate via dedicated aquaculture express freight.
            </p>
          </div>
        </div>
      </div>

      {/* Ordered Formulations Breakdown */}
      {items.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="font-heading font-bold text-lg text-[#002B5B] flex items-center gap-2">
            <Package className="w-5 h-5 text-[#004B50]" />
            <span>Ordered Biotechnology Formulations</span>
          </h2>

          <div className="divide-y divide-slate-100">
            {items.map((item: any, idx: number) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-slate-50 rounded-lg p-1 border border-slate-200 flex-shrink-0">
                    <Image
                      src={item.image || '/images/products/product_next_viro_nill.png'}
                      alt={item.title || 'Product'}
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <strong className="text-slate-900 text-sm block">{item.title}</strong>
                    <span className="text-slate-500">
                      {item.packSize === '5L' ? '5-Liter Industrial Can' : '1-Liter Precision Bottle'} × {item.quantity}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <strong className="text-slate-900 text-sm block">
                    {formatInr(item.unitPrice * item.quantity)}
                  </strong>
                  <span className="text-emerald-700 font-bold text-[10px]">Pre-Paid</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-sm">
            <span className="font-bold text-slate-700">Total Pre-Paid:</span>
            <span className="font-heading font-black text-xl text-[#004B50]">
              {formatInr(totalAmount)}
            </span>
          </div>
        </div>
      )}

      {/* WhatsApp Merchant Technical Support Action */}
      <div className="bg-[#FFD200]/20 border-2 border-[#FFD200] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="font-heading font-black text-lg text-[#002B5B] flex items-center justify-center sm:justify-start gap-2">
            <MessageCircle className="w-5 h-5 text-[#004B50]" />
            <span>Need Application Dosage Guidance?</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700">
            Connect directly with Next Farm Bio Sciences aquaculture biotechnologists via WhatsApp for application schedules and water quality monitoring.
          </p>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3.5 bg-[#004B50] hover:bg-[#002B5B] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 flex-shrink-0"
        >
          <span>Chat on WhatsApp (+91 8977656444)</span>
          <ExternalLink className="w-4 h-4 text-[#FFD200]" />
        </a>
      </div>

      {/* Return to Store Navigation */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        <Link
          href="/"
          className="px-6 py-3 bg-white border border-slate-300 hover:border-[#004B50] text-[#002B5B] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
        >
          Return to Storefront
        </Link>
        <Link
          href="/pond-doctor"
          className="px-6 py-3 bg-[#004B50] text-[#FFD200] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm hover:bg-[#002B5B]"
        >
          Open Pond Doctor Diagnostic Engine
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-4 border-[#004B50] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-slate-600">Loading Order Receipt...</p>
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
