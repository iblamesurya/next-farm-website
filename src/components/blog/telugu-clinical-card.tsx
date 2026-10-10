'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Phone,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Props {
  conditionNameTe?: string;
  conditionNameEn?: string;
  symptomsTe?: string[];
  treatmentProtocolTe?: string[];
  recommendedProductTe?: string;
  productSlug?: string;
}

export function TeluguClinicalCard({
  conditionNameTe = 'రొయ్యల వ్యాధి నివారణ మార్గదర్శిని',
  conditionNameEn = 'Aqua Pathology Guidance',
  symptomsTe = [
    'మేత తీసుకోకపోవడం మరియు ఫీడింగ్ ట్రేలలో తెల్లటి విసర్జన దారాలు తేలడం',
    'హెపటోపాంక్రియాస్ పాలిపోవడం లేదా ఎరుపు రంగులోకి మారడం',
    'రొయ్యల తోక భాగంలో కండరాల రంగు మారడం మరియు నీరసించడం'
  ],
  treatmentProtocolTe = [
    'నెక్స్ట్ గట్ (Next Gut) ప్రోబయోటిక్ ప్రతి కిలో ఫీడ్‌కు 15–20 మి.లీ చొప్పున బైండర్ కలిపి 5 రోజుల పాటు ఇవ్వండి.',
    'చెరువు నీటిలో విబ్రియో లేదా ఇతర బ్యాక్టీరియా అణచివేతకు నెక్స్ట్ విరో నిల్ (Next Viro Nill) ఎకరానికి 1.5 లీటర్లు వేయండి.',
    'అన్ని ఏరియేటర్లను ఉదయం మరియు సాయంత్రం వేళల్లో నిరంతరం నడపండి.'
  ],
  recommendedProductTe = 'నెక్స్ట్ గట్ & నెక్స్ట్ విరో నిల్ (Next Gut & Next Viro Nill)',
  productSlug = 'next-gut'
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const whatsappMessage = encodeURIComponent(
    `నమస్కారం! నేను నెక్స్ట్ ఫార్మ్ బయో సైన్సెస్ బ్లాగ్‌లో ${conditionNameTe} (${conditionNameEn}) గురించి చదివాను. నా చెరువులో ఈ సమస్యకు తక్షణ చికిత్సా సలహా కావాలి.`
  );

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-[#003847] to-[#002D3A] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 my-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-sm">
            తె
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
              తెలుగు రైతుల క్లినికల్ గైడ్ (Telugu Farmer Advisory)
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-display text-white">
              {conditionNameTe}
            </h3>
            <span className="text-xs text-slate-300 font-medium">({conditionNameEn})</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs bg-white/10 hover:bg-white/20 text-emerald-300 px-3 py-1.5 rounded-xl border border-white/10 font-bold flex items-center gap-1.5 transition-colors"
        >
          <span>{isOpen ? 'వివరాలు దాచు' : 'వివరాలు చూడు'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-6 pt-5">
          {/* Symptoms */}
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>చెరువులో గమనించాల్సిన ప్రధాన లక్షణాలు (Gross Symptoms):</span>
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {symptomsTe.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-black/25 p-3 rounded-xl border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatment Protocol */}
          <div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>సిఫార్సు చేసిన 100% యాంటీబయాటిక్ రహిత బయో-ఇన్‌పుట్ చికిత్స (Protocol):</span>
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {treatmentProtocolTe.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-emerald-500/10 p-3 rounded-xl border border-emerald-400/20">
                  <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended formulation highlight */}
          <div className="bg-black/35 rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-slate-400 block">సిఫార్సు చేసిన ఉత్పత్తి (Recommended):</span>
              <strong className="text-base text-white">{recommendedProductTe}</strong>
              <span className="text-xs text-emerald-400 block font-medium">CAA ఆమోదం పొందిన శాస్త్రీయ బయో-ఇన్‌పుట్</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://wa.me/918977656444?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow transition-transform hover:scale-105"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>వాట్సాప్ ద్వారా నిపుణులతో మాట్లాడండి</span>
              </a>
              <a
                href="tel:+918977656444"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-300" />
                <span>8977656444</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
