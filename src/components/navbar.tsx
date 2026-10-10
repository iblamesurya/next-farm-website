'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, MessageCircle, Menu, X, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '@/context/cart-context';

export function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Biosecurity Announcement Bar */}
      <div className="bg-[#002B5B] text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 text-[#FFD200]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CAA Approved &amp; 100% Antibiotic-Free Bio-Inputs</span>
        </span>
        <span className="hidden sm:inline text-slate-300">|</span>
        <span className="hidden sm:inline text-slate-200">
          Fast Pan-India Dispatch from Vijayawada HQ
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 drop-shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/images/branding/logo_primary.png"
                alt="Next Farm Bio Sciences Logo"
                fill
                sizes="(max-width: 640px) 48px, 56px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-2xl text-[#002B5B] tracking-tight group-hover:text-[#004B50] transition-colors leading-tight">
                NEXT FARM
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#004B50] uppercase">
                Bio Sciences
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#formulations"
              className="text-sm font-semibold text-slate-700 hover:text-[#004B50] transition-colors"
            >
              11 Formulations
            </Link>
            <Link
              href="/aquaculture"
              className="text-sm font-semibold text-slate-700 hover:text-[#004B50] transition-colors"
            >
              Aquaculture Hub
            </Link>
            <Link
              href="/shrimp-medicine"
              className="text-sm font-semibold text-slate-700 hover:text-[#004B50] transition-colors"
            >
              Shrimp Medicine
            </Link>
            <Link
              href="/diseases"
              className="text-sm font-semibold text-slate-700 hover:text-[#004B50] transition-colors"
            >
              Pathology Atlas
            </Link>
            <Link
              href="/calculators"
              className="text-sm font-semibold text-slate-700 hover:text-[#004B50] flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#004B50]" />
              <span>Calculators</span>
            </Link>
            <Link
              href="/blog"
              className="text-sm font-semibold text-slate-700 hover:text-[#004B50] transition-colors"
            >
              Clinical Guides
            </Link>
            <Link
              href="/districts"
              className="text-sm font-semibold text-slate-700 hover:text-[#004B50] transition-colors"
            >
              Districts
            </Link>
            <Link
              href="/glossary"
              className="text-sm font-semibold text-slate-700 hover:text-[#004B50] transition-colors"
            >
              Glossary
            </Link>
            <Link
              href="/pond-doctor"
              className="text-sm font-semibold text-slate-700 hover:text-[#004B50] flex items-center gap-1.5 transition-colors"
            >
              <span>Pond Doctor</span>
            </Link>
          </nav>

          {/* Actions: WhatsApp Helpline + Cart Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* WhatsApp Helpline Button */}
            <a
              href="https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team%2C%20I%20am%20an%20aquaculture%20farmer%20seeking%20technical%20advice"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Helpline"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Helpline: +91 8977656444</span>
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={toggleCart}
              type="button"
              aria-label="Open Shopping Cart"
              className="relative p-2.5 rounded-full text-[#002B5B] bg-slate-100 hover:bg-[#FFD200]/20 hover:text-[#004B50] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD200]"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-extrabold text-[#002B5B] bg-[#FFD200] rounded-full border-2 border-white shadow-sm animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              className="p-2 text-slate-700 hover:text-[#002B5B] md:hidden focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            <Link
              href="/#formulations"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
            >
              11 Core Formulations
            </Link>
            <Link
              href="/aquaculture"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100 text-[#004B50]"
            >
              Aquaculture Medicines &amp; Probiotics
            </Link>
            <Link
              href="/shrimp-medicine"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
            >
              Shrimp Medicine &amp; Treatments
            </Link>
            <Link
              href="/diseases"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100 text-[#004B50]"
            >
              Shrimp Pathology Compendium (10 Monographs)
            </Link>
            <Link
              href="/calculators"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100 flex items-center gap-2 text-[#004B50]"
            >
              <Sparkles className="w-4 h-4 text-[#004B50]" />
              <span>Aquaculture Clinical Calculators</span>
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
            >
              Clinical Technical Guides (10 Protocols)
            </Link>
            <Link
              href="/solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
            >
              Disease Treatments &amp; Solutions
            </Link>
            <Link
              href="/districts"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
            >
              Districts Directory (8 Aquaculture Hubs)
            </Link>
            <Link
              href="/glossary"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
            >
              Aquaculture Clinical Glossary (40+ Terms)
            </Link>
            <Link
              href="/pond-doctor"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#004B50]" />
              <span>Pond Doctor Diagnostic Engine</span>
            </Link>
            <Link
              href="/#certifications"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
            >
              CAA &amp; ISO Certifications
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-800 py-2 border-b border-slate-100"
            >
              Vijayawada Plant &amp; Contact
            </Link>

            <a
              href="https://wa.me/918977656444?text=Hello%20Next%20Farm%20Team%2C%20I%20am%20an%20aquaculture%20farmer%20seeking%20technical%20advice"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full mt-2 py-3 text-sm font-bold text-white bg-emerald-600 rounded-lg shadow-sm"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>WhatsApp: +91 8977656444</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
