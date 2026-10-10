import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Clock, Mail, Shield, CheckCircle, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#002B5B] text-white border-t-4 border-[#FFD200]" id="contact">
      {/* Trust Badges Banner */}
      <div className="bg-[#001D3D] py-8 border-b border-white/10" id="certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="relative w-14 h-14 flex-shrink-0 bg-white/10 rounded-xl p-2 border border-[#FFD200]/30">
                <Image
                  src="/images/badges/caa_approved.svg"
                  alt="CAA Approved Badge"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#FFD200] uppercase tracking-wider">
                  CAA Approved
                </h4>
                <p className="text-xs text-slate-300">
                  Coastal Aquaculture Authority (Govt. of India) biosecurity registered
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="relative w-14 h-14 flex-shrink-0 bg-white/10 rounded-xl p-2 border border-[#FFD200]/30">
                <Image
                  src="/images/badges/iso_9001.svg"
                  alt="ISO 9001:2015 Certified Badge"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#FFD200] uppercase tracking-wider">
                  ISO 9001:2015 Certified
                </h4>
                <p className="text-xs text-slate-300">
                  Pharmaceutical-grade microbial fermentation &amp; quality control
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="relative w-14 h-14 flex-shrink-0 bg-white/10 rounded-xl p-2 border border-emerald-400/30">
                <Image
                  src="/images/badges/antibiotic_free.svg"
                  alt="100% Antibiotic-Free Badge"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-emerald-400 uppercase tracking-wider">
                  100% Antibiotic-Free
                </h4>
                <p className="text-xs text-slate-300">
                  Zero chloramphenicol or nitrofurans; compliant with EU &amp; US FDA exports
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 bg-white rounded-xl p-1.5 shadow-md flex-shrink-0">
                <Image
                  src="/images/branding/logo_primary.png"
                  alt="Next Farm Logo"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl text-white">NEXT FARM</h3>
                <span className="text-xs font-bold text-[#FFD200] tracking-widest uppercase">
                  Bio Sciences
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Science-driven aquaculture biotechnology enterprise formulating high-potency
              microbial consortia, benthic soil digestors, and ionic mineral chelates for intensive shrimp farming.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-[#004B50] text-[#FFD200] text-xs font-bold rounded-md">
                100% Pre-Paid Commercial Supply
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links & Formulations */}
          <div>
            <h4 className="font-heading font-bold text-sm text-[#FFD200] uppercase tracking-wider mb-4">
              Core Formulations
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/products/next-viro-nill" className="hover:text-[#FFD200] transition-colors">
                  Next Viro Nill (WSSV Defense)
                </Link>
              </li>
              <li>
                <Link href="/products/next-gut" className="hover:text-[#FFD200] transition-colors">
                  Next Gut (White Gut &amp; FCR)
                </Link>
              </li>
              <li>
                <Link href="/products/next-converter" className="hover:text-[#FFD200] transition-colors">
                  Next Converter (Ammonia / Nitrite)
                </Link>
              </li>
              <li>
                <Link href="/products/next-sludge" className="hover:text-[#FFD200] transition-colors">
                  Next Sludge (Benthic Digestion)
                </Link>
              </li>
              <li>
                <Link href="/products/next-vibriosis" className="hover:text-[#FFD200] transition-colors">
                  Next Vibriosis (EMS / AHPND)
                </Link>
              </li>
              <li>
                <Link href="/products/next-min" className="hover:text-[#FFD200] transition-colors">
                  Next-Min (Molting &amp; Cramps)
                </Link>
              </li>
              <li>
                <Link href="/#formulations" className="text-[#FFD200] font-semibold hover:underline inline-flex items-center gap-1 mt-1">
                  <span>View All 11 Formulations</span> &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Diagnostic Tools & Spec Sheets */}
          <div>
            <h4 className="font-heading font-bold text-sm text-[#FFD200] uppercase tracking-wider mb-4">
              Farmer Resources
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/aquaculture" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 font-bold text-[#FFD200]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200]"></span>
                  <span>Aquaculture Solutions Hub</span>
                </Link>
              </li>
              <li>
                <Link href="/shrimp-medicine" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Shrimp Medicine Master Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Disease Treatment Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/solutions/white-gut-treatment-shrimp" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200]"></span>
                  <span>White Gut Medicine for Shrimp</span>
                </Link>
              </li>
              <li>
                <Link href="/solutions/ammonia-control-shrimp-pond" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200]"></span>
                  <span>Ammonia Reducer for Ponds</span>
                </Link>
              </li>
              <li>
                <Link href="/diseases" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 font-bold text-[#FFD200]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200]"></span>
                  <span>Shrimp Pathology Compendium (10 Diseases)</span>
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 font-bold text-[#FFD200]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200]"></span>
                  <span>Aquaculture Calculators Suite</span>
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Commercial Harvest Trials &amp; Research</span>
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 font-semibold text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>CAA &amp; ISO 9001 Regulatory Certifications</span>
                </Link>
              </li>
              <li>
                <Link href="/districts" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 font-bold text-[#FFD200]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200]"></span>
                  <span>District Field Network (8 Coastal Hubs)</span>
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 font-bold text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>Aquaculture Glossary (40+ Terms)</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 font-semibold text-teal-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  <span>Clinical Field Guides (16 Monographs)</span>
                </Link>
              </li>
              <li>
                <Link href="/pond-doctor" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200]"></span>
                  <span>Pond Doctor Diagnostic Engine</span>
                </Link>
              </li>
              <li>
                <a href="/feed.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5 text-xs text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Clinical RSS 2.0 Newsfeed (XML)</span>
                </a>
              </li>
              <li>
                <a
                  href="/docs/NEXT_FARM_BIOSCIENCES_Brand_Book.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200]"></span>
                  <span>Corporate Scientific Profile (PDF)</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </a>
              </li>
              <li>
                <Link href="/#certifications" className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200]"></span>
                  <span>Quality Assurance &amp; Lab Assays</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/918977656444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFD200] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Aquaculture Specialist Consultation</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Corporate Address */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FFD200] uppercase tracking-wider mb-4">
              Manufacturing &amp; Plant HQ
            </h4>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin className="w-5 h-5 text-[#FFD200] flex-shrink-0 mt-0.5" />
              <span>
                New Autonagar, Vijayawada,<br />
                Andhra Pradesh — 520010, India
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Clock className="w-5 h-5 text-[#FFD200] flex-shrink-0" />
              <span>Mon – Sat: 9:00 AM – 5:00 PM IST</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Phone className="w-5 h-5 text-[#FFD200] flex-shrink-0" />
              <a href="tel:+918977656444" className="hover:text-[#FFD200]">
                +91 8977656444
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Mail className="w-5 h-5 text-[#FFD200] flex-shrink-0" />
              <span>support@nextfarmbiosciences.app</span>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-xs text-slate-400 space-y-3">
          <p className="leading-relaxed">
            <strong>Regulatory Disclaimer:</strong> Next Farm Bio Sciences biological inputs are formulated exclusively
            for aquaculture pond soil, water, and animal feed conditioning. Certified by the Coastal Aquaculture Authority (CAA),
            Government of India. All products are 100% antibiotic-free and contain zero chloramphenicol, nitrofurans, or synthetic hormones.
            Commercial supply operates under a strict pre-paid policy via Razorpay gateway. Cash on Delivery (COD) is strictly unavailable.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2">
            <p>&copy; {new Date().getFullYear()} Next Farm Bio Sciences. All rights reserved.</p>
            <p className="text-slate-400">
              Made with scientific rigor for Indian Shrimp &amp; Prawn Farmers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
