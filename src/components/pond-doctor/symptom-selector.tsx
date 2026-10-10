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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-black text-xl sm:text-2xl text-[#002B5B]">
            Step 1: Select Observed Pond Symptoms
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tap one or more symptoms to identify the root biological pathology.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {symptomKeys.map((key) => {
          const sym = CLINICAL_SYMPTOMS[key];
          const isSelected = selectedSymptoms.includes(key);

          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggleSymptom(key)}
              className={`text-left p-4 rounded-xl border-2 transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#004B50] bg-emerald-50/50 shadow-md ring-2 ring-[#004B50]/20'
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
