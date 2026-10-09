import React from 'react';
import { FileText, Download, ShieldCheck } from 'lucide-react';

interface SpecSheetDownloadProps {
  specSheetPdf: string;
  productName: string;
}

export function SpecSheetDownload({ specSheetPdf, productName }: SpecSheetDownloadProps) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-red-50 text-red-600 rounded-lg flex-shrink-0 border border-red-100">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-heading font-bold text-sm text-[#002B5B]">
            Official Technical Data Sheet (TDS)
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Microbial strain certificate, CFU assay &amp; safety specifications (PDF)
          </p>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3 h-3" />
              <span>Lab Verified</span>
            </span>
            <span>&bull;</span>
            <span>Next Farm Bio Sciences R&amp;D</span>
          </div>
        </div>
      </div>

      <a
        href={specSheetPdf}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto px-4 py-2.5 bg-[#004B50] hover:bg-[#002B5B] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        <Download className="w-4 h-4" />
        <span>Download Spec Sheet</span>
      </a>
    </div>
  );
}
