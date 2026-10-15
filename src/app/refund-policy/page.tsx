import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, AlertCircle, Phone, Mail, CheckCircle, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return, Refund & Cancellation Policy | Next Farm Bio Sciences',
  description:
    'Official Return, Refund, and Dispatch Policy for Next Farm Bio Sciences aquaculture formulations, shrimp probiotics, and water conditioners. Transparent terms for commercial prawn farmers.',
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/refund-policy'
  }
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Commercial Transparency
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Return, Refund & Cancellation Policy
          </h1>
          <p className="text-slate-400 text-sm">
            Last Updated: October 2026 | Compliant with Google Merchant Center & Indian E-Commerce Consumer Protection Rules
          </p>
        </div>

        {/* Overview Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" /> Our Commitment to Farmers
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            At Next Farm Bio Sciences, all biological inputs, probiotics, and water conditioners are packaged under strict ISO 9001:2015 sterile protocols in our Vijayawada facility. We ensure every batch is dispatched with tamper-evident seals to safeguard farm biosecurity.
          </p>
        </div>

        {/* 1. Cancellation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-sky-400" /> 1. Order Cancellation Policy
          </h2>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 text-slate-300 space-y-3 text-sm leading-relaxed">
            <p>
              <strong>Before Dispatch:</strong> You may cancel your order free of charge at any time before the consignment is handed over to our transport partner (within 12 to 24 hours of placing the order). A 100% full refund will be processed back to your original payment method (Razorpay / UPI / Bank Transfer) within 3–5 business days.
            </p>
            <p>
              <strong>After Dispatch:</strong> Once the goods are in transit with the logistics carrier, orders cannot be cancelled mid-transit due to specialized temperature-sensitive handling for live bacterial consortia.
            </p>
          </div>
        </section>

        {/* 2. Damaged in Transit */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Truck className="w-6 h-6 text-amber-400" /> 2. Transit Damage & Leakage Guarantee
          </h2>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 text-slate-300 space-y-3 text-sm leading-relaxed">
            <p>
              We take full responsibility for product delivery. If your canisters or bottles arrive damaged, leaked, or with a broken seal:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Take a clear photo or short video of the damaged container at the time of delivery.</li>
              <li>Notify our team within <strong>48 hours</strong> of delivery via WhatsApp (+91 8977656444) or email (<a href="mailto:support@nextfarmbiosciences.app" className="text-sky-400 underline">support@nextfarmbiosciences.app</a>).</li>
              <li>We will immediately dispatch a <strong>free replacement</strong> via express transport at zero extra cost, or issue a <strong>100% refund</strong> at your option.</li>
            </ul>
          </div>
        </section>

        {/* 3. Returns & Biosecurity Seal */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-rose-400" /> 3. Returns & Biosecurity Restrictions
          </h2>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 text-slate-300 space-y-3 text-sm leading-relaxed">
            <p>
              <strong>Eligible Returns:</strong> Unopened, unadulterated canisters with intact factory induction foil seals can be returned within <strong>7 days of delivery</strong> if you ordered an incorrect formulation.
            </p>
            <p>
              <strong>Biosecurity Seal Policy:</strong> Opened containers or bottles with broken induction seals cannot be returned or refunded once exposed to farm environmental conditions. This policy protects all coastal farmers from cross-contamination and ensures the microbial potency of our live probiotic consortia.
            </p>
          </div>
        </section>

        {/* 4. Refund Timeline */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. Refund Processing & Timelines</h2>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 text-slate-300 space-y-2 text-sm leading-relaxed">
            <p>
              Approved refunds are credited directly to your original payment source (Credit/Debit Card, Net Banking, UPI, or Razorpay wallet).
            </p>
            <p>
              <strong>Processing Window:</strong> Refunds are initiated within <strong>24 business hours</strong> of approval and reflect in your account within <strong>3 to 5 banking days</strong>.
            </p>
          </div>
        </section>

        {/* 5. Contact Information */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">Need Assistance with a Return or Order?</h2>
          <p className="text-slate-300 text-sm">
            Contact our dedicated aquaculture support desk in Vijayawada:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 text-slate-200 text-sm">
              <Phone className="w-5 h-5 text-emerald-400" />
              <span><strong>Helpline:</strong> +91 8977656444</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200 text-sm">
              <Mail className="w-5 h-5 text-sky-400" />
              <span><strong>Email:</strong> support@nextfarmbiosciences.app</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 pt-2 border-t border-slate-800">
            Next Farm Bio Sciences, Madhava Plaza, New Autonagar, Vijayawada, Andhra Pradesh, 520007, India.
          </p>
        </section>

        <div className="text-center pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-semibold transition"
          >
            ← Return to Next Farm Bio Sciences Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
