import React from 'react';
import { Stethoscope } from 'lucide-react';
import { PondDoctorApp } from '@/components/pond-doctor/pond-doctor-app';

export const metadata = {
  title: 'Pond Doctor Diagnostic Engine | Next Farm Bio Sciences',
  description:
    'Interactive clinical diagnostic engine for shrimp and prawn aquaculture. Identify symptoms, calculate required formulation volumes by pond acreage, and receive targeted biosecurity prescriptions.'
};

export default function PondDoctorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#004B50]/10 text-[#004B50] font-heading font-extrabold text-xs uppercase tracking-wider rounded-full">
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Clinical Diagnostic Assistant</span>
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#002B5B] tracking-tight">
          Pond Doctor Diagnostic Engine
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Select observed pond symptoms to identify the underlying biological pathology, compute depth-adjusted
          volumetric dosage schedules, and receive targeted biotechnology prescriptions.
        </p>
      </div>

      {/* Interactive Application */}
      <PondDoctorApp />
    </div>
  );
}
