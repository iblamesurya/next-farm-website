'use client';

import React, { useState, useMemo } from 'react';
import {
  ClinicalSymptomKey,
  SeverityLevel,
  calculatePrescription
} from '@/lib/diagnostic-engine';
import { SymptomSelector } from './symptom-selector';
import { DosageCalculator } from './dosage-calculator';
import { PrescriptionCard } from './prescription-card';
import { CuratedBundlesSection } from './curated-bundles';
import { Stethoscope, AlertCircle } from 'lucide-react';

export function PondDoctorApp() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<ClinicalSymptomKey[]>([
    'white-gut'
  ]);
  const [acreage, setAcreage] = useState<number>(2.0);
  const [waterDepthMeters, setWaterDepthMeters] = useState<number>(1.0);
  const [depthUnit, setDepthUnit] = useState<'meters' | 'feet'>('meters');
  const [severity, setSeverity] = useState<SeverityLevel>('moderate');

  const handleToggleSymptom = (key: ClinicalSymptomKey) => {
    setSelectedSymptoms((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleClearAll = () => {
    setSelectedSymptoms([]);
  };

  const prescription = useMemo(() => {
    if (selectedSymptoms.length === 0 || acreage <= 0 || waterDepthMeters <= 0) {
      return null;
    }
    try {
      return calculatePrescription(selectedSymptoms, acreage, waterDepthMeters, severity);
    } catch (err) {
      console.warn('Calculation error:', err);
      return null;
    }
  }, [selectedSymptoms, acreage, waterDepthMeters, severity]);

  return (
    <div className="space-y-12">
      {/* Step 1: Symptom Selection */}
      <SymptomSelector
        selectedSymptoms={selectedSymptoms}
        onToggleSymptom={handleToggleSymptom}
        onClearAll={handleClearAll}
      />

      {/* Step 2: Acreage & Depth Calculator */}
      <DosageCalculator
        acreage={acreage}
        onAcreageChange={setAcreage}
        waterDepthMeters={waterDepthMeters}
        onWaterDepthChange={setWaterDepthMeters}
        depthUnit={depthUnit}
        onDepthUnitChange={setDepthUnit}
        severity={severity}
        onSeverityChange={setSeverity}
      />

      {/* Step 3: Prescription Output or Prompt */}
      {prescription ? (
        <div id="prescription-results">
          <PrescriptionCard prescription={prescription} />
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
          <h3 className="font-heading font-bold text-lg text-amber-900">
            No Symptoms Selected
          </h3>
          <p className="text-sm text-amber-800 max-w-md mx-auto">
            Please select at least one clinical symptom above to calculate exact volumetric dosages and generate your targeted prescription.
          </p>
        </div>
      )}

      {/* Curated Pre-Set Bundles Section */}
      <div className="pt-8 border-t border-slate-200">
        <CuratedBundlesSection />
      </div>
    </div>
  );
}
