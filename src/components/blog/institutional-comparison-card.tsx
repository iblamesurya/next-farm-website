'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  BookOpen,
  Building2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Props {
  conditionName?: string;
}

export function InstitutionalComparisonCard({
  conditionName = 'Shrimp Pathology Management'
}: Props) {
  const [showDetailedMatrix, setShowDetailedMatrix] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm my-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
            Institutional Benchmark &amp; E-E-A-T Comparative Analysis
          </span>
          <h3 className="text-xl sm:text-2xl font-black font-display text-[#002D3A]">
            Next Farm Bio Sciences vs Institutional Standards
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparative analysis against NFDB, ICAR-CIBA, and Chemical Practices for {conditionName}.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CAA 2024 Gazette Compliant</span>
        </span>
      </div>

      {/* 4-Pillar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Pillar 1: Next Farm Bio Sciences */}
        <div className="bg-emerald-50/50 rounded-2xl p-4 sm:p-5 border-2 border-emerald-500 relative flex flex-col justify-between shadow-sm">
          <div className="absolute -top-3 left-4 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            Recommended Solution
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 pt-1">
              <Award className="w-4 h-4 text-emerald-600" />
              <h4 className="font-black text-sm text-[#002D3A]">Next Farm Bio Sciences</h4>
            </div>
            <p className="text-[11px] text-slate-600 mb-3">
              Targeted biological bio-inputs &amp; competitive exclusion probiotics.
            </p>
            <ul className="text-xs space-y-2 text-slate-700">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Potency:</strong> 10–50 Billion CFU/g multi-strain consortium</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Antibiotics:</strong> 100% Zero. Pure biological enzymes</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Clinical Window:</strong> 3–5 Day biological re-epithelialization</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Export Compliance:</strong> 100% Pass (0.00 ppb residue guarantee)</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-200/60 text-[11px] font-bold text-emerald-800">
            Field-Proven in 4,200+ AP Ponds
          </div>
        </div>

        {/* Pillar 2: NFDB Guidelines */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <h4 className="font-bold text-sm text-slate-800">NFDB Guidelines</h4>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              National Fisheries Development Board standard Best Management Practices.
            </p>
            <ul className="text-xs space-y-2 text-slate-600">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span><strong>Focus:</strong> Biosecurity, SPF seed sourcing &amp; liming</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span><strong>Therapeutics:</strong> Promotes natural disease avoidance</span>
              </li>
              <li className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span><strong>Limitation:</strong> General guidance without specific bio-inputs</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span><strong>Export Compliance:</strong> Fully compliant with national goals</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-medium text-slate-500">
            Institutional Policy Framework
          </div>
        </div>

        {/* Pillar 3: ICAR-CIBA Protocol */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-cyan-600" />
              <h4 className="font-bold text-sm text-slate-800">ICAR-CIBA Protocols</h4>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Central Institute of Brackishwater Aquaculture research advisories.
            </p>
            <ul className="text-xs space-y-2 text-slate-600">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span><strong>Research:</strong> Phytobiotics (EHP-Cura) &amp; PCR diagnostics</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span><strong>Antibiotics:</strong> Strictly advises against chemical drugs</span>
              </li>
              <li className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span><strong>Limitation:</strong> Heavy reliance on centralized laboratory testing</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span><strong>Export Compliance:</strong> Scientific research aligned</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-medium text-slate-500">
            Premier Research Institution
          </div>
        </div>

        {/* Pillar 4: Unregulated Chemical Practice */}
        <div className="bg-rose-50/40 rounded-2xl p-4 sm:p-5 border border-rose-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-rose-600" />
              <h4 className="font-bold text-sm text-rose-950">Chemical &amp; Antibiotics</h4>
            </div>
            <p className="text-[11px] text-rose-600 mb-3">
              Banned chemical dips, OTC, Enrofloxacin, formalin.
            </p>
            <ul className="text-xs space-y-2 text-rose-900">
              <li className="flex items-start gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                <span><strong>Efficacy:</strong> Fails against intracellular spores (EHP)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                <span><strong>Gut Impact:</strong> Destroys microvilli; triggers hepatopancreas necrosis</span>
              </li>
              <li className="flex items-start gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                <span><strong>Legality:</strong> Banned under CAA Gazette; penal actions</span>
              </li>
              <li className="flex items-start gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                <span><strong>Export Risk:</strong> 100% Export Rejection at EU/USFDA ports</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-rose-200 text-[11px] font-bold text-rose-700">
            High Economic Catastrophe Risk
          </div>
        </div>
      </div>

      {/* Toggle Detailed Matrix */}
      <div>
        <button
          type="button"
          onClick={() => setShowDetailedMatrix(!showDetailedMatrix)}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors"
        >
          <span>{showDetailedMatrix ? 'Hide Deep Scientific Comparison Matrix' : 'View Deep Scientific Comparison Matrix'}</span>
          {showDetailedMatrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDetailedMatrix && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm mt-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#002D3A] text-white">
                  <th className="p-3 font-bold">Parameter / Metric</th>
                  <th className="p-3 font-bold bg-emerald-800">Next Farm Bio Sciences</th>
                  <th className="p-3 font-bold">NFDB Standard BMP</th>
                  <th className="p-3 font-bold">ICAR-CIBA Protocol</th>
                  <th className="p-3 font-bold bg-rose-900">Unapproved Chemicals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">Active Mode of Action</td>
                  <td className="p-3 bg-emerald-50/50 font-bold text-emerald-900">Competitive niche exclusion + live extracellular bacteriocins</td>
                  <td className="p-3">Biosecurity avoidance &amp; water exchange</td>
                  <td className="p-3">Phytobiotics &amp; targeted water management</td>
                  <td className="p-3 bg-rose-50/50 text-rose-800">Broad microbial toxicity (kills all good bacteria)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">Microbial Colony Counts</td>
                  <td className="p-3 bg-emerald-50/50 font-bold text-emerald-900">10–50 Billion CFU/g certified</td>
                  <td className="p-3">Unspecified</td>
                  <td className="p-3">Lab-certified experimental strains</td>
                  <td className="p-3 bg-rose-50/50 text-rose-800">0 CFU (chemical compounds)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">CAA Gazette Notification Status</td>
                  <td className="p-3 bg-emerald-50/50 font-bold text-emerald-900">100% Certified Antibiotic-Free Bio-Input</td>
                  <td className="p-3">Government Promoted</td>
                  <td className="p-3">Government Research Entity</td>
                  <td className="p-3 bg-rose-50/50 text-rose-800 font-bold">Strictly Banned under Section 14</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">MPEDA LC-MS/MS Export Testing</td>
                  <td className="p-3 bg-emerald-50/50 font-bold text-emerald-900">Zero residue detected (Passes US/EU/Japan standards)</td>
                  <td className="p-3">Pass (promotes clean culture)</td>
                  <td className="p-3">Pass</td>
                  <td className="p-3 bg-rose-50/50 text-rose-800 font-bold">Total Rejection &amp; Consignment Destruction</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold">Pond Turnaround Speed</td>
                  <td className="p-3 bg-emerald-50/50 font-bold text-emerald-900">Normal feeding resumes in 72–120 Hours</td>
                  <td className="p-3">Long-term cultural prevention</td>
                  <td className="p-3">5–10 Days</td>
                  <td className="p-3 bg-rose-50/50 text-rose-800">Feed drop worsens; high mortality</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
