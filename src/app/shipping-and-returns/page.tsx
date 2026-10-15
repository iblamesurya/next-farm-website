import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, AlertCircle, Phone, Mail, CheckCircle, Truck, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping, Return & Refund Policy | Next Farm Bio Sciences',
  description:
    'Official Shipping, Delivery, Return, and Refund Policy for Next Farm Bio Sciences aquaculture probiotics, water conditioners, and shrimp healthcare inputs. Transparent terms for commercial shrimp & prawn farmers across India.',
  alternates: {
    canonical: 'https://nextfarmbiosciences.app/shipping-and-returns'
  }
};

export default function ShippingAndReturnsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Commercial Transparency & Biosecurity
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Shipping, Delivery, Return &amp; Refund Policy
          </h1>
          <p className="text-slate-400 text-sm">
            Last Updated: October 2026 | Compliant with Google Merchant Center, Indian E-Commerce Consumer Protection Rules &amp; Coastal Aquaculture Authority (CAA) Biosecurity Standards
          </p>
        </div>

        {/* Overview Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" /> Our Direct-to-Farmer Guarantee
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            At Next Farm Bio Sciences, all biological inputs, probiotics, and aquaculture water conditioners are formulated and packaged under strict ISO 9001:2015 sterile protocols in our Vijayawada facility. Every batch leaves our facility sealed with induction foil tamper-evident caps to safeguard farm biosecurity and ensure maximum viable CFU potency upon pond application.
          </p>
        </div>

        {/* 1. Shipping & Delivery */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Truck className="w-6 h-6 text-sky-400" /> 1. Shipping &amp; Delivery Matrix
          </h2>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 text-slate-300 space-y-4 text-sm leading-relaxed">
            <p>
              We partner with trusted express aquaculture transport carriers (Navata Road Transport, BMPS, DTDC, and direct logistics networks) to ensure rapid dispatch directly to your farm gate or local delivery hub.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                <h3 className="font-semibold text-white flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-emerald-400" /> Andhra Pradesh &amp; Telangana
                </h3>
                <ul className="space-y-1 text-slate-300 text-xs sm:text-sm">
                  <li><strong>Dispatch Window:</strong> Within 12–24 business hours.</li>
                  <li><strong>Transit Time:</strong> 1–2 business days to major aquaculture belts (Kaikaluru, Bhimavaram, Eluru, Bapatla, Ongole, Nellore, Vizag).</li>
                  <li><strong>Freight Charges:</strong> Free shipping on qualifying orders or standard flat rate calculated at checkout.</li>
                </ul>
              </div>
              <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                <h3 className="font-semibold text-white flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-sky-400" /> Rest of India (National Delivery)
                </h3>
                <ul className="space-y-1 text-slate-300 text-xs sm:text-sm">
                  <li><strong>Dispatch Window:</strong> Within 24 business hours.</li>
                  <li><strong>Transit Time:</strong> 3–5 business days (Tamil Nadu, Odisha, Gujarat, West Bengal, Maharashtra, Karnataka).</li>
                  <li><strong>Tracking:</strong> Live consignment tracking number provided via SMS and WhatsApp.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Order Cancellation Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-emerald-400" /> 2. Order Cancellation Policy
          </h2>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 text-slate-300 space-y-3 text-sm leading-relaxed">
            <p>
              <strong>Before Dispatch:</strong> You may cancel your order free of charge at any time before the consignment is handed over to our transport partner (typically within 12 to 24 hours of placing the order). A 100% full refund will be processed back to your original payment method (Razorpay / UPI / Bank Transfer) within 3–5 business days.
            </p>
            <p>
              <strong>After Dispatch:</strong> Once goods have been handed over to the logistics carrier, orders cannot be cancelled mid-transit due to strict temperature-controlled biological inventory protocols.
            </p>
          </div>
        </section>

        {/* 3. Transit Damage Guarantee */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" /> 3. Transit Damage &amp; Leakage Guarantee
          </h2>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 text-slate-300 space-y-3 text-sm leading-relaxed">
            <p>
              We take full responsibility for product integrity during transit. If your canisters, pouches, or bags arrive damaged, punctured, leaking, or with a breached seal:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Take a clear photograph or short video showing the damaged container, label, and batch number upon delivery.</li>
              <li>Notify our team within <strong>48 hours</strong> of delivery via WhatsApp (+91 8977656444) or email (<a href="mailto:support@nextfarmbiosciences.app" className="text-sky-400 underline">support@nextfarmbiosciences.app</a>).</li>
              <li>We will immediately dispatch a <strong>free replacement</strong> via express transport at zero extra cost, or issue a <strong>100% immediate refund</strong> to your original payment method.</li>
            </ul>
          </div>
        </section>

        {/* 4. Returns & Biosecurity Restrictions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-rose-400" /> 4. Return Window &amp; Biosecurity Conditions
          </h2>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 text-slate-300 space-y-4 text-sm leading-relaxed">
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-emerald-400 mb-1">Eligible Returns (7-Day Return Window)</h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                Customers may return products within <strong>7 days after delivery</strong> provided the product is in its <strong>original, unopened condition</strong> with the factory induction foil seal, tamper-evident neck band, and outer packaging intact and unaltered.
              </p>
            </div>

            <div className="bg-rose-950/30 border border-rose-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-rose-400 mb-1">Biological Ineligibility Clause</h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                Opened canisters, powders with unsealed liners, or bottles with broken induction seals <strong>cannot be returned</strong> once exposed to farm environmental conditions. This policy protects commercial shrimp farms from horizontal cross-contamination and ensures the microbial potency of all live probiotic consortia.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">How to Return Products:</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs sm:text-sm">
                <li><strong>By Mail / Carrier:</strong> Pack unopened products in their original protective carton and ship to our Vijayawada facility. Contact us for a return authorization number (RMA).</li>
                <li><strong>In-Person Drop-Off:</strong> You may drop off eligible returns directly at our Vijayawada central logistics depot during standard business hours (Mon–Sat, 9:00 AM – 6:30 PM).</li>
                <li><strong>Return Shipping Costs:</strong> Free return shipping if the return is due to our error or transit damage. For farmer remorse or wrong formulation selection, the customer covers the return freight.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Refund Method & Timelines */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Refund Processing &amp; Timelines</h2>
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 text-slate-300 space-y-3 text-sm leading-relaxed">
            <p>
              Once your returned package is received and inspected at our Vijayawada facility:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong>Inspection Approval:</strong> Completed within 24 business hours of physical receipt.</li>
              <li><strong>Refund Method:</strong> 100% refund is initiated back to your original source of payment (Razorpay, UPI ID, Net Banking account, or Debit/Credit card).</li>
              <li><strong>Settlement Window:</strong> Refund reflects in your bank statement within <strong>3 to 5 banking days</strong> depending on your issuing bank.</li>
            </ul>
          </div>
        </section>

        {/* 6. Physical Return Address & Support */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" /> Physical Facility &amp; Return Address
          </h2>
          <p className="text-slate-300 text-sm">
            For returns, consignments, or technical support, contact or dispatch to our central logistics facility:
          </p>
          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 text-slate-200 text-sm">
            <p className="font-semibold text-white">Next Farm Bio Sciences Pvt. Ltd.</p>
            <p>D.No. 40-1-62, Madhava Plaza, New Autonagar</p>
            <p>Vijayawada, Krishna District, Andhra Pradesh – 520007, India</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 text-slate-200 text-sm">
              <Phone className="w-5 h-5 text-emerald-400" />
              <span><strong>Aquaculture Desk:</strong> +91 8977656444</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200 text-sm">
              <Mail className="w-5 h-5 text-sky-400" />
              <span><strong>Support Email:</strong> support@nextfarmbiosciences.app</span>
            </div>
          </div>
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
