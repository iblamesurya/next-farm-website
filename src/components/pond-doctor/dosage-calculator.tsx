'use client';

import React from 'react';
import { SeverityLevel } from '@/lib/diagnostic-engine';
import { Waves, Scale, AlertTriangle } from 'lucide-react';

interface DosageCalculatorProps {
  acreage: number;
  onAcreageChange: (acres: number) => void;
  waterDepthMeters: number;
  onWaterDepthChange: (meters: number) => void;
  depthUnit: 'meters' | 'feet';
  onDepthUnitChange: (unit: 'meters' | 'feet') => void;
  severity: SeverityLevel;
  onSeverityChange: (sev: SeverityLevel) => void;
}

const PRESET_ACRES = [1.0, 2.0, 2.5, 3.0, 4.0, 5.0, 10.0];

export function DosageCalculator({
  acreage,
  onAcreageChange,
  waterDepthMeters,
  onWaterDepthChange,
  depthUnit,
  onDepthUnitChange,
  severity,
  onSeverityChange
}: DosageCalculatorProps) {
  const displayDepth = depthUnit === 'feet' ? Math.round((waterDepthMeters / 0.3048) * 10) / 10 : waterDepthMeters;

  const handleDepthInput = (val: number) => {
    if (isNaN(val) || val <= 0) return;
    if (depthUnit === 'feet') {
      onWaterDepthChange(Math.round(val * 0.3048 * 100) / 100);
    } else {
      onWaterDepthChange(val);
    }
  };

  // Estimated volume in megaliters (1 acre at 1m depth ~ 4.047 ML)
  const estimatedVolumeML = Math.round(acreage * waterDepthMeters * 4.047 * 10) / 10;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="font-heading font-black text-xl sm:text-2xl text-[#002B5B]">
          Step 2: Pond Acreage & Water Depth Parameters
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Aquaculture dosage is strictly calculated based on total volumetric water column.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pond Acreage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#004B50]" />
              <span>Pond Acreage (Acres)</span>
            </label>
            <span className="text-xs font-extrabold text-[#002B5B] px-2 py-0.5 bg-slate-100 rounded">
              {acreage} Ac
            </span>
          </div>

          <input
            type="number"
            min="0.1"
            max="100"
            step="0.1"
            value={acreage}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (!isNaN(val) && val > 0) onAcreageChange(val);
            }}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-heading font-bold text-base text-[#002B5B] focus:outline-none focus:ring-2 focus:ring-[#004B50]"
          />

          <div className="flex flex-wrap gap-1.5 pt-1">
            {PRESET_ACRES.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onAcreageChange(preset)}
                className={`text-[11px] font-bold px-2 py-1 rounded transition-colors ${
                  acreage === preset
                    ? 'bg-[#004B50] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {preset} Ac
              </button>
            ))}
          </div>
        </div>

        {/* Water Depth */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Waves className="w-4 h-4 text-[#004B50]" />
              <span>Average Water Depth</span>
            </label>
            <div className="flex rounded-md border border-slate-200 overflow-hidden text-[10px] font-bold">
              <button
                type="button"
                onClick={() => onDepthUnitChange('meters')}
                className={`px-2 py-0.5 ${
                  depthUnit === 'meters'
                    ? 'bg-[#004B50] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Meters
              </button>
              <button
                type="button"
                onClick={() => onDepthUnitChange('feet')}
                className={`px-2 py-0.5 ${
                  depthUnit === 'feet'
                    ? 'bg-[#004B50] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                Feet
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0.5"
              max={depthUnit === 'feet' ? '20' : '6'}
              step="0.1"
              value={displayDepth}
              onChange={(e) => handleDepthInput(parseFloat(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 font-heading font-bold text-base text-[#002B5B] focus:outline-none focus:ring-2 focus:ring-[#004B50]"
            />
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
              {depthUnit === 'feet' ? 'ft' : 'm'}
            </span>
          </div>

          <input
            type="range"
            min={depthUnit === 'feet' ? '1.5' : '0.5'}
            max={depthUnit === 'feet' ? '10' : '3.0'}
            step="0.1"
            value={displayDepth}
            onChange={(e) => handleDepthInput(parseFloat(e.target.value))}
            className="w-full accent-[#004B50]"
          />

          <div className="text-[11px] text-slate-500">
            Depth Factor: <strong>{(waterDepthMeters / 1.0).toFixed(2)}x</strong> standard 1.0m column
          </div>
        </div>

        {/* Severity Level */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#004B50]" />
            <span>Outbreak Severity Level</span>
          </label>

          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => onSeverityChange('low')}
              className={`text-left p-2.5 rounded-lg border text-xs font-bold transition-all ${
                severity === 'low'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>Preventative / Low Stress</span>
                <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">1.0x Base Rate</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSeverityChange('moderate')}
              className={`text-left p-2.5 rounded-lg border text-xs font-bold transition-all ${
                severity === 'moderate'
                  ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>Active Symptoms / Moderate</span>
                <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">1.5x Base Rate</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onSeverityChange('acute')}
              className={`text-left p-2.5 rounded-lg border text-xs font-bold transition-all ${
                severity === 'acute'
                  ? 'border-red-600 bg-red-50 text-red-950 ring-1 ring-red-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>Acute Emergency / Crisis</span>
                <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">2.0x Shock Dose</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#004B50]/5 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#002B5B]">
        <span>Total Water Body Under Treatment:</span>
        <span className="font-heading font-extrabold text-sm text-[#004B50]">
          {acreage} Acres × {waterDepthMeters.toFixed(2)}m Depth ≈ {estimatedVolumeML} Megaliters (ML)
        </span>
      </div>
    </div>
  );
}
