'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Scale,
  Droplets,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';

interface Props {
  defaultProductSlug?: string;
  defaultProductName?: string;
  targetCondition?: string;
}

export function InteractiveInPostCalculator({
  defaultProductSlug = 'next-gut',
  defaultProductName = 'Next Gut Multi-Strain Probiotic',
  targetCondition = 'White Gut & Digestive Health'
}: Props) {
  // Inputs
  const [pondAcres, setPondAcres] = useState<number>(1.0);
  const [waterDepthFeet, setWaterDepthFeet] = useState<number>(4.0);
  const [abwGrams, setAbwGrams] = useState<number>(14.0); // Average Body Weight in grams
  const [stockingDensityPL, setStockingDensityPL] = useState<number>(50); // PL / m²
  const [survivalRatePercent, setSurvivalRatePercent] = useState<number>(75); // %

  // Calculations
  const metrics = useMemo(() => {
    // 1 Acre = 4046.86 m²
    const pondAreaM2 = pondAcres * 4046.86;
    // Water depth in meters (1 ft = 0.3048 m)
    const waterDepthM = waterDepthFeet * 0.3048;
    // Volume in m³ (1 m³ = 1000 Litres)
    const waterVolumeM3 = pondAreaM2 * waterDepthM;
    const waterVolumeLitres = waterVolumeM3 * 1000;

    // Total Stocked Shrimp
    const totalStocked = pondAreaM2 * stockingDensityPL;
    const survivingShrimp = totalStocked * (survivalRatePercent / 100);

    // Biomass in Kilograms = (Surviving * ABW in grams) / 1000
    const biomassKg = Math.round((survivingShrimp * abwGrams) / 1000);

    // Feeding Rate % based on ABW curve (standard vannamei table)
    let feedingRatePct = 3.2;
    if (abwGrams < 5) feedingRatePct = 6.0;
    else if (abwGrams < 10) feedingRatePct = 4.5;
    else if (abwGrams < 15) feedingRatePct = 3.6;
    else if (abwGrams < 20) feedingRatePct = 3.0;
    else if (abwGrams < 25) feedingRatePct = 2.6;
    else feedingRatePct = 2.2;

    const dailyFeedKg = Math.round((biomassKg * (feedingRatePct / 100)));

    // Specific product dosing rules
    let productDosageText = '';
    let applicationMethod = '';
    let schedule = '';

    if (defaultProductSlug === 'next-gut') {
      const mlPerDay = Math.round(dailyFeedKg * 15); // 15ml per kg feed
      const total5DaysL = ((mlPerDay * 5) / 1000).toFixed(1);
      productDosageText = `${mlPerDay} mL / Day (${total5DaysL} Litres for 5-Day Protocol)`;
      applicationMethod = 'Top-dress on feed with binder, shade dry 20 mins before feeding.';
      schedule = 'Morning (6:00 AM) and Afternoon (2:00 PM) feed trays.';
    } else if (defaultProductSlug === 'next-converter') {
      const litresNeeded = (pondAcres * 2.0).toFixed(1);
      productDosageText = `${litresNeeded} Litres / Acre broadcast`;
      applicationMethod = 'Dilute 1:20 in pond water and broadcast across aeration zones.';
      schedule = 'Morning hours (8:00 AM - 10:00 AM) with all paddlewheel aerators active.';
    } else if (defaultProductSlug === 'next-vibriosis') {
      const litresNeeded = (pondAcres * 1.5).toFixed(1);
      productDosageText = `${litresNeeded} Litres / Acre broadcast`;
      applicationMethod = 'Broadcast along pond dikes and leeward corners where Vibrio congregates.';
      schedule = 'Early morning (7:00 AM) or sunset (5:30 PM).';
    } else if (defaultProductSlug === 'next-sludge') {
      const litresNeeded = (pondAcres * 3.0).toFixed(1);
      productDosageText = `${litresNeeded} Litres / Acre (Mix with dry sand)`;
      applicationMethod = 'Mix with 25 kg dry river sand or zeolite and broadcast over black mud zones.';
      schedule = 'Broadcast 10:00 AM when benthic water temperature exceeds 28°C.';
    } else if (defaultProductSlug === 'next-min') {
      const litresNeeded = (pondAcres * 3.0).toFixed(1);
      productDosageText = `${litresNeeded} Litres / Acre water + 10 mL/kg feed`;
      applicationMethod = 'Broadcast into water column during molting tides; top-dress in feed daily.';
      schedule = 'Evening broadcast (7:00 PM - 9:00 PM) preceding new moon or full moon molts.';
    } else {
      const standardL = (pondAcres * 2.0).toFixed(1);
      productDosageText = `${standardL} Litres / Acre`;
      applicationMethod = 'Dilute with pond water and broadcast evenly across aerator plumes.';
      schedule = 'Morning application under bright sunlight with full aeration.';
    }

    return {
      pondAreaM2: Math.round(pondAreaM2),
      waterVolumeLitres: Math.round(waterVolumeLitres),
      biomassKg,
      dailyFeedKg,
      feedingRatePct,
      productDosageText,
      applicationMethod,
      schedule
    };
  }, [pondAcres, waterDepthFeet, abwGrams, stockingDensityPL, survivalRatePercent, defaultProductSlug]);

  return (
    <div className="bg-gradient-to-br from-[#002D3A] via-[#003847] to-[#014154] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 my-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
              Interactive In-Article Clinical Tool
            </span>
            <h3 className="text-lg sm:text-xl font-black font-display text-white">
              Pond Dosage &amp; Biomass Calculator
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-white/10 text-slate-200 px-3 py-1 rounded-full border border-white/10 font-semibold">
            Calibrated for: {targetCondition}
          </span>
        </div>
      </div>

      {/* Preset Quick Selectors */}
      <div className="pt-5 pb-3">
        <span className="text-xs text-slate-300 block mb-2 font-medium">Quick Acreage Presets:</span>
        <div className="flex flex-wrap gap-2">
          {[0.5, 1.0, 2.0, 2.5, 5.0].map((acres) => (
            <button
              key={acres}
              type="button"
              onClick={() => setPondAcres(acres)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                pondAcres === acres
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            >
              {acres} {acres === 1 ? 'Acre' : 'Acres'}
            </button>
          ))}
        </div>
      </div>

      {/* Input Sliders & Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
        {/* Pond Area */}
        <div className="bg-black/20 rounded-2xl p-4 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs text-slate-300">
            <span className="font-medium">Pond Surface Area</span>
            <span className="font-bold text-emerald-300">{pondAcres} Acres</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={10.0}
            step={0.5}
            value={pondAcres}
            onChange={(e) => setPondAcres(parseFloat(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
          <span className="text-[11px] text-slate-400 block">≈ {metrics.pondAreaM2.toLocaleString()} m²</span>
        </div>

        {/* Water Depth */}
        <div className="bg-black/20 rounded-2xl p-4 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs text-slate-300">
            <span className="font-medium">Average Water Depth</span>
            <span className="font-bold text-cyan-300">{waterDepthFeet} Feet</span>
          </div>
          <input
            type="range"
            min={2.5}
            max={6.0}
            step={0.5}
            value={waterDepthFeet}
            onChange={(e) => setWaterDepthFeet(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <span className="text-[11px] text-slate-400 block">≈ {(waterDepthFeet * 0.3048).toFixed(1)} Meters</span>
        </div>

        {/* Average Body Weight */}
        <div className="bg-black/20 rounded-2xl p-4 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs text-slate-300">
            <span className="font-medium">Shrimp Size (ABW)</span>
            <span className="font-bold text-[#FFD200]">{abwGrams} g</span>
          </div>
          <input
            type="range"
            min={2}
            max={35}
            step={1}
            value={abwGrams}
            onChange={(e) => setAbwGrams(parseFloat(e.target.value))}
            className="w-full accent-[#FFD200] cursor-pointer"
          />
          <span className="text-[11px] text-slate-400 block">Count: ≈ {Math.round(1000 / abwGrams)} pcs/kg</span>
        </div>

        {/* Stocking Density */}
        <div className="bg-black/20 rounded-2xl p-4 border border-white/5 space-y-2">
          <div className="flex justify-between text-xs text-slate-300">
            <span className="font-medium">Stocking Density</span>
            <span className="font-bold text-purple-300">{stockingDensityPL} PL/m²</span>
          </div>
          <input
            type="range"
            min={20}
            max={80}
            step={5}
            value={stockingDensityPL}
            onChange={(e) => setStockingDensityPL(parseInt(e.target.value))}
            className="w-full accent-purple-400 cursor-pointer"
          />
          <span className="text-[11px] text-slate-400 block">Survival: {survivalRatePercent}% assumed</span>
        </div>
      </div>

      {/* Dynamic Results Box */}
      <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mt-2 space-y-4">
        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-black/30 rounded-xl p-3 border border-white/5">
            <span className="text-[11px] text-slate-400 block">Standing Biomass</span>
            <span className="text-base sm:text-lg font-black text-white">
              {metrics.biomassKg.toLocaleString()} kg
            </span>
            <span className="text-[10px] text-slate-400 block">({(metrics.biomassKg / 100).toFixed(1)} Quintals)</span>
          </div>

          <div className="bg-black/30 rounded-xl p-3 border border-white/5">
            <span className="text-[11px] text-slate-400 block">Daily Feed Consumption</span>
            <span className="text-base sm:text-lg font-black text-cyan-300">
              {metrics.dailyFeedKg.toLocaleString()} kg/day
            </span>
            <span className="text-[10px] text-slate-400 block">({metrics.feedingRatePct}% of body wt)</span>
          </div>

          <div className="bg-black/30 rounded-xl p-3 border border-white/5">
            <span className="text-[11px] text-slate-400 block">Pond Water Volume</span>
            <span className="text-base sm:text-lg font-black text-emerald-300">
              {(metrics.waterVolumeLitres / 100000).toFixed(1)} Lakh L
            </span>
            <span className="text-[10px] text-slate-400 block">({(metrics.waterVolumeLitres / 1000).toLocaleString()} m³)</span>
          </div>

          <div className="bg-emerald-500/20 rounded-xl p-3 border border-emerald-400/30">
            <span className="text-[11px] text-emerald-300 font-bold block">Recommended Dosage</span>
            <span className="text-base sm:text-lg font-black text-white">
              {metrics.productDosageText}
            </span>
            <span className="text-[10px] text-emerald-300 block">{defaultProductName}</span>
          </div>
        </div>

        {/* Application Instructions */}
        <div className="bg-black/40 rounded-xl p-4 border border-white/10 text-xs space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Application Method: </strong>
              <span className="text-slate-300">{metrics.applicationMethod}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Optimal Timing: </strong>
              <span className="text-slate-300">{metrics.schedule}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-5 mt-4 border-t border-white/10">
        <div className="text-xs text-slate-300">
          <span>Need custom advice for your pond? </span>
          <span className="text-emerald-400 font-bold">Call Helpline: +91 8977656444</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href={`/products/${defaultProductSlug}`}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition text-xs flex items-center gap-1.5 shadow"
          >
            <span>Order {defaultProductName}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/pond-doctor"
            className="border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded-xl transition text-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pond Doctor Diagnostic Tool</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
