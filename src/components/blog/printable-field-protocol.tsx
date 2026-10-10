'use client';

import React from 'react';
import { Printer, Download, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  articleTitle: string;
  recommendedProductName: string;
  dosageSummary: string;
}

export function PrintableFieldProtocol({
  articleTitle,
  recommendedProductName,
  dosageSummary
}: Props) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm my-6 print:hidden">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
          <FileText className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <span className="text-xs font-bold text-[#002D3A] block">
            Farm Technician Print-Ready Protocol Sheet
          </span>
          <span className="text-[11px] text-slate-500 block">
            Print 1-page clinical protocol for pond supervisors &amp; check tray stations.
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePrint}
        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition shadow-sm"
      >
        <Printer className="w-3.5 h-3.5 text-emerald-400" />
        <span>Print Field Sheet</span>
      </button>
    </div>
  );
}
