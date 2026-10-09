'use client';

import React, { useState } from 'react';
import { ChevronDown, Dna, Activity, Calendar, Droplets, ShieldCheck } from 'lucide-react';
import { Product } from '@/types/catalog';

interface BiologicalAccordionProps {
  product: Product;
}

export function BiologicalAccordion({ product }: BiologicalAccordionProps) {
  // Default first two accordions open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    mechanism: true,
    strains: true,
    dosage: false,
    application: false,
    certifications: false
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-3">
      {/* 1. Biological Mechanism Accordion */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection('mechanism')}
          className="w-full px-5 py-4 text-left flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#004B50]/10 rounded-lg text-[#004B50]">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#002B5B]">
                Biological Mechanism of Action
              </h3>
              <p className="text-xs text-slate-500">
                Mode of action in aquaculture pond sediment &amp; water column
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
              openSections.mechanism ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.mechanism && (
          <div className="px-5 py-4 border-t border-slate-100 text-sm text-slate-700 leading-relaxed space-y-3">
            <p>{product.biologicalMechanism}</p>
            {product.benefits && product.benefits.length > 0 && (
              <div className="pt-2">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#004B50] mb-2">
                  Key Biological Benefits
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Active Strains & CFU Count Accordion */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection('strains')}
          className="w-full px-5 py-4 text-left flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#002B5B]">
                Active Microbial Strains &amp; Guaranteed Potency
              </h3>
              <p className="text-xs text-slate-500">
                Verified viable colony counts (CFU) per batch
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
              openSections.strains ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.strains && (
          <div className="px-5 py-4 border-t border-slate-100 text-sm text-slate-700 space-y-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <span className="text-xs font-bold text-emerald-900 block mb-0.5">
                Guaranteed Potency:
              </span>
              <span className="font-heading font-extrabold text-sm text-emerald-800">
                {product.cfuCount}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Active Bacterial Strains &amp; Co-Factors:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.strains.map((strain, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-100 rounded-md text-xs font-medium text-slate-800"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#004B50]" />
                    <span className="italic">{strain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Stage-Wise Dosage Protocol Accordion */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection('dosage')}
          className="w-full px-5 py-4 text-left flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFD200]/20 rounded-lg text-[#002B5B]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#002B5B]">
                Stage-Wise Dosage Schedule &amp; Protocol
              </h3>
              <p className="text-xs text-slate-500">
                Preventive and curative aquaculture pond dosing rates
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
              openSections.dosage ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.dosage && (
          <div className="px-5 py-4 border-t border-slate-100 text-sm text-slate-700 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-xs font-bold text-[#004B50] block uppercase tracking-wider">
                  Preventive Maintenance:
                </span>
                <p className="text-xs text-slate-700 mt-1">
                  {product.dosageProtocol.preventive}
                </p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <span className="text-xs font-bold text-amber-800 block uppercase tracking-wider">
                  Curative / Stress Alert:
                </span>
                <p className="text-xs text-amber-900 mt-1">
                  {product.dosageProtocol.curative}
                </p>
              </div>
            </div>

            {/* Schedule Table */}
            {product.dosageProtocol.schedule.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-[#002B5B] text-white">
                    <tr>
                      <th className="py-2.5 px-3 font-heading font-bold">Crop Stage / Condition</th>
                      <th className="py-2.5 px-3 font-heading font-bold">Dosage</th>
                      <th className="py-2.5 px-3 font-heading font-bold">Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {product.dosageProtocol.schedule.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{item.stage}</td>
                        <td className="py-2.5 px-3 text-[#004B50] font-bold">{item.dosage}</td>
                        <td className="py-2.5 px-3 text-slate-600">{item.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Application Guidelines Accordion */}
      {product.applicationMethod && (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('application')}
            className="w-full px-5 py-4 text-left flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-700">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#002B5B]">
                  Application Method &amp; Aeration Guidelines
                </h3>
                <p className="text-xs text-slate-500">
                  Step-by-step broadcasting instructions for maximum efficacy
                </p>
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                openSections.application ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.application && (
            <div className="px-5 py-4 border-t border-slate-100 text-sm text-slate-700 leading-relaxed">
              <p>{product.applicationMethod}</p>
            </div>
          )}
        </div>
      )}

      {/* 5. Regulatory Certifications Accordion */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <button
          type="button"
          onClick={() => toggleSection('certifications')}
          className="w-full px-5 py-4 text-left flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#002B5B]">
                Official Regulatory Certifications &amp; Quality
              </h3>
              <p className="text-xs text-slate-500">
                Coastal Aquaculture Authority, ISO 9001:2015, Antibiotic-Free
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
              openSections.certifications ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.certifications && (
          <div className="px-5 py-4 border-t border-slate-100 text-sm text-slate-700 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-heading font-bold text-xs text-[#004B50] block">
                  CAA Approved
                </span>
                <span className="text-[11px] text-slate-600 block mt-0.5">
                  Coastal Aquaculture Authority, Ministry of Fisheries, Govt. of India.
                </span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="font-heading font-bold text-xs text-[#002B5B] block">
                  ISO 9001:2015
                </span>
                <span className="text-[11px] text-slate-600 block mt-0.5">
                  Batch consistency &amp; pharmaceutical fermentation quality standard.
                </span>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="font-heading font-bold text-xs text-emerald-800 block">
                  100% Antibiotic-Free
                </span>
                <span className="text-[11px] text-emerald-900 block mt-0.5">
                  Zero chloramphenicol or nitrofurans. Fully export test compliant.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
