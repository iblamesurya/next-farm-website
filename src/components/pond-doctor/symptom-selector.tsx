'use client';

import React, { useState } from 'react';
import {
  CLINICAL_SYMPTOMS,
  ClinicalSymptomKey
} from '@/lib/diagnostic-engine';
import { ShieldAlert, CheckCircle2, Circle, Search, Sparkles, X } from 'lucide-react';

interface SymptomSelectorProps {
  selectedSymptoms: ClinicalSymptomKey[];
  onToggleSymptom: (key: ClinicalSymptomKey) => void;
  onClearAll: () => void;
}

export function SymptomSelector({
  selectedSymptoms,
  onToggleSymptom,
  onClearAll
}: SymptomSelectorProps) {
  const symptomKeys = Object.keys(CLINICAL_SYMPTOMS) as ClinicalSymptomKey[];
  const [searchQuery, setSearchQuery] = useState('');

  const SYMPTOM_KEYWORDS: Record<ClinicalSymptomKey, string[]> = {
    'white-gut': ['white gut', 'white feces', 'feces', 'gut', 'ehp', 'తెల్ల విసర్జన', 'తెల్ల గట్', 'poop', 'trailing strand', 'feed drop'],
    'toxic-ammonia': ['ammonia', 'nh3', 'tan', 'gas', 'rotten egg', 'h2s', 'nitrite', 'no2', 'అమ్మోనియా', 'గ్యాస్', 'వాసన'],
    'benthic-sludge': ['sludge', 'black mud', 'bottom', 'drain', 'sediment', 'నల్ల మట్టి', 'మట్టి', 'చెరువు అడుగు'],
    'vibrio-red': ['vibrio', 'red disease', 'luminescent', 'gills', 'hepatopancreas', 'విబ్రియో', 'ఎరుపు', 'మెరుపు'],
    'molting-cramps': ['molting', 'cramp', 'soft shell', 'muscle', 'mineral', 'మొలటింగ్', 'మెలికలు', 'మెత్తటి పెంకు']
  };

  const matchedKeys = searchQuery.trim()
    ? (symptomKeys.filter((key) => {
        const query = searchQuery.toLowerCase().trim();
        const sym = CLINICAL_SYMPTOMS[key];
        const keywords = SYMPTOM_KEYWORDS[key] || [];
        return (
          sym.label.toLowerCase().includes(query) ||
          sym.clinicalDescription.toLowerCase().includes(query) ||
          keywords.some((k) => query.includes(k) || k.includes(query))
        );
      }) as ClinicalSymptomKey[])
    : [];

  const handleQuickChipClick = (key: ClinicalSymptomKey) => {
    if (!selectedSymptoms.includes(key)) {
      onToggleSymptom(key);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-black text-xl sm:text-2xl text-[#002B5B]">
            Step 1: Select Observed Pond Symptoms
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Search or tap one or more symptoms to identify root biological pathology and calculate dosages.
          </p>
        </div>
        {selectedSymptoms.length > 0 && (
          <button
            onClick={onClearAll}
            type="button"
            className="text-xs font-bold text-red-600 hover:text-red-700 underline"
          >
            Clear Selection ({selectedSymptoms.length})
          </button>
        )}
      </div>

      {/* Natural Language & Vernacular Triage Input */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type observed symptoms in English / Telugu (e.g. white feces in vannamei, rotten egg ammonia, నల్ల మట్టి)..."
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#004B50] focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Triage Chips */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Quick Triage:</span>
          </span>
          {[
            { label: 'White Feces / Gut', key: 'white-gut' as ClinicalSymptomKey },
            { label: 'Toxic Ammonia NH3', key: 'toxic-ammonia' as ClinicalSymptomKey },
            { label: 'Benthic Black Mud', key: 'benthic-sludge' as ClinicalSymptomKey },
            { label: 'Vibrio / Red Disease', key: 'vibrio-red' as ClinicalSymptomKey },
            { label: 'Molting Cramps', key: 'molting-cramps' as ClinicalSymptomKey },
            { label: 'రొయ్యల తెల్ల విసర్జన (Telugu)', key: 'white-gut' as ClinicalSymptomKey }
          ].map((chip, idx) => {
            const isChipSelected = selectedSymptoms.includes(chip.key);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickChipClick(chip.key)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all ${
                  isChipSelected
                    ? 'bg-[#004B50] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                {chip.label} {isChipSelected && '✓'}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {symptomKeys.map((key) => {
          const sym = CLINICAL_SYMPTOMS[key];
          const isSelected = selectedSymptoms.includes(key);
          const isMatched = matchedKeys.includes(key);

          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggleSymptom(key)}
              className={`text-left p-4 rounded-xl border-2 transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#004B50] bg-emerald-50/50 shadow-md ring-2 ring-[#004B50]/20'
                  : isMatched
                  ? 'border-amber-400 bg-amber-50/40 shadow-sm ring-2 ring-amber-300'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[#004B50] text-[#FFD200]'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <ShieldAlert className="w-3 h-3" />
                    <span>{sym.indication}</span>
                  </span>

                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-[#004B50] flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
                  )}
                </div>

                <h3 className="font-heading font-bold text-base text-[#002B5B] mb-1.5">
                  {sym.label}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sym.clinicalDescription}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Primary Rx: <strong>{sym.primaryProductSlug.replace(/-/g, ' ')}</strong></span>
                <span className="font-bold text-[#004B50]">{isSelected ? 'Selected' : 'Tap to Select'}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
