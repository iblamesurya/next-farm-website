'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Activity,
  Droplets,
  Scale,
  Wind,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

type TabType = 'ammonia' | 'biomass' | 'minerals' | 'aeration';

export function CalculatorsSuite() {
  const [activeTab, setActiveTab] = useState<TabType>('ammonia');

  // --- TAB 1: AMMONIA CALCULATOR STATE ---
  const [tan, setTan] = useState<number>(2.0); // mg/L
  const [ph, setPh] = useState<number>(8.3);
  const [temp, setTemp] = useState<number>(30.0); // Celsius
  const [salinity, setSalinity] = useState<number>(15.0); // ppt

  // Calculations for Ammonia
  const ammoniaResults = useMemo(() => {
    // Bower & Bidwell / Emerson pKa formula
    const pKaFresh = 0.09018 + 2729.92 / (273.15 + temp);
    // Salinity ionic strength adjustment
    const pKa = pKaFresh + 0.0015 * salinity;
    // Fraction of un-ionized NH3
    const fraction = 1 / (Math.pow(10, pKa - ph) + 1);
    const nh3 = tan * fraction;

    let riskLevel: 'safe' | 'caution' | 'warning' | 'danger' = 'safe';
    let riskColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    let riskTitle = 'Optimal / Safe Range';
    let feedingAction = 'Normal Feeding Schedule (100%)';
    let clinicalProtocol =
      'Gill lamellae healthy and clean. Maintain routine biological maintenance with Next Pro Plus @ 1 Kg/Acre every 7 days.';

    if (nh3 >= 0.10) {
      riskLevel = 'danger';
      riskColor = 'text-rose-700 bg-rose-50 border-rose-400';
      riskTitle = 'Critical Lethal Hazard (Severe Asphyxia Risk)';
      feedingAction = 'STOP FEEDING 100% IMMEDIATELY for 24-36 Hours';
      clinicalProtocol =
        'Mass mortality danger. Run all aerators 24/7. Broadcast Next Converter @ 5 Litres/Acre immediately along with Next Pro Plus @ 1 Kg/Acre to accelerate Nitrosomonas nitrification.';
    } else if (nh3 >= 0.05) {
      riskLevel = 'warning';
      riskColor = 'text-amber-700 bg-amber-50 border-amber-400';
      riskTitle = 'Severe Toxicity (Gill Tissue Necrosis / Hypoxia)';
      feedingAction = 'Cut Feed by 50% for next 3 meals';
      clinicalProtocol =
        'Gill lamellar hyperplasia and impaired oxygen uptake. Turn on paddlewheels. Dose Next Converter @ 5 Litres/Acre across feeding zones.';
    } else if (nh3 >= 0.02) {
      riskLevel = 'caution';
      riskColor = 'text-yellow-800 bg-yellow-50 border-yellow-300';
      riskTitle = 'Sub-lethal Stress (Cellular Irritation & Slow Growth)';
      feedingAction = 'Reduce Feed by 20% to prevent waste nitrogen overload';
      clinicalProtocol =
        'Sub-lethal chronic stress suppressing immune defense. Increase water circulation. Apply Next Converter @ 3-5 Litres/Acre in morning.';
    }

    return {
      pKa: pKa.toFixed(3),
      fraction: (fraction * 100).toFixed(2),
      nh3: nh3.toFixed(4),
      riskLevel,
      riskColor,
      riskTitle,
      feedingAction,
      clinicalProtocol
    };
  }, [tan, ph, temp, salinity]);

  // --- TAB 2: BIOMASS & FEED STATE ---
  const [pondArea, setPondArea] = useState<number>(1.0); // Acres
  const [stockingDensity, setStockingDensity] = useState<number>(60); // PL per m2
  const [doc, setDoc] = useState<number>(65); // Day of culture
  const [abw, setAbw] = useState<number>(16.5); // grams
  const [survivalRate, setSurvivalRate] = useState<number>(80); // %

  const biomassResults = useMemo(() => {
    // 1 Acre = 4046.86 m2
    const totalAreaM2 = pondArea * 4046.86;
    const initialPopulation = totalAreaM2 * stockingDensity;
    const currentPopulation = initialPopulation * (survivalRate / 100);
    const standingBiomassKg = (currentPopulation * abw) / 1000;
    const standingBiomassTonnes = standingBiomassKg / 1000;

    // Daily feed rate % of biomass based on standard ICAR-CIBA vannamei feed curve
    let feedPercentage = 2.6;
    if (abw < 3) feedPercentage = 7.0;
    else if (abw < 5) feedPercentage = 5.2;
    else if (abw < 8) feedPercentage = 4.2;
    else if (abw < 12) feedPercentage = 3.4;
    else if (abw < 16) feedPercentage = 2.9;
    else if (abw < 20) feedPercentage = 2.5;
    else if (abw < 25) feedPercentage = 2.2;
    else feedPercentage = 1.9;

    const dailyFeedKg = standingBiomassKg * (feedPercentage / 100);
    const checkTrayGrams = ((dailyFeedKg / 4) * 0.008 * 1000).toFixed(0); // 0.8% of meal per tray

    // Next Gut requirement: 15-20 ml per kg feed
    const nextGutDailyMl = dailyFeedKg * 18;
    const nextGutWeeklyLitres = (nextGutDailyMl * 7) / 1000;

    return {
      initialPopulation: Math.round(initialPopulation).toLocaleString(),
      currentPopulation: Math.round(currentPopulation).toLocaleString(),
      standingBiomassKg: Math.round(standingBiomassKg).toLocaleString(),
      standingBiomassTonnes: standingBiomassTonnes.toFixed(2),
      feedPercentage: feedPercentage.toFixed(1),
      dailyFeedKg: dailyFeedKg.toFixed(1),
      mealMorning: (dailyFeedKg * 0.22).toFixed(1),
      mealNoon: (dailyFeedKg * 0.28).toFixed(1),
      mealEvening: (dailyFeedKg * 0.32).toFixed(1),
      mealNight: (dailyFeedKg * 0.18).toFixed(1),
      checkTrayGrams,
      nextGutDailyMl: Math.round(nextGutDailyMl),
      nextGutWeeklyLitres: nextGutWeeklyLitres.toFixed(1)
    };
  }, [pondArea, stockingDensity, abw, survivalRate]);

  // --- TAB 3: MINERAL RATIO STATE ---
  const [mineralSalinity, setMineralSalinity] = useState<number>(10.0); // ppt
  const [measCa, setMeasCa] = useState<number>(85); // ppm
  const [measMg, setMeasMg] = useState<number>(240); // ppm
  const [measK, setMeasK] = useState<number>(75); // ppm
  const [mineralArea, setMineralArea] = useState<number>(1.0); // Acres

  const mineralResults = useMemo(() => {
    // Ideal seawater proportional ratios
    // Ca = 11.6 * Salinity
    // Mg = 39.1 * Salinity
    // K = 10.7 * Salinity
    const targetCa = Math.round(mineralSalinity * 11.6);
    const targetMg = Math.round(mineralSalinity * 39.1);
    const targetK = Math.round(mineralSalinity * 10.7);

    const caDiff = measCa - targetCa;
    const mgDiff = measMg - targetMg;
    const kDiff = measK - targetK;

    const mgCaRatio = measCa > 0 ? (measMg / measCa).toFixed(2) : '0';
    const idealMgCaRatio = '3.1 : 1';

    // 1 Acre-foot water = ~1,233,480 Litres. 1 ppm deficit = ~1.23 kg of pure ion deficit per acre-foot.
    const caDeficitKg = caDiff < 0 ? Math.abs(caDiff) * 1.23 * mineralArea : 0;
    const mgDeficitKg = mgDiff < 0 ? Math.abs(mgDiff) * 1.23 * mineralArea : 0;
    const kDeficitKg = kDiff < 0 ? Math.abs(kDiff) * 1.23 * mineralArea : 0;

    const warnings: string[] = [];
    if (parseFloat(mgCaRatio) < 2.5) {
      warnings.push(
        'Critical Mg:Ca Ratio Depletion (< 2.5:1). Severe risk of incomplete molting, soft shell syndrome, and cannibalism.'
      );
    }
    if (measK < targetK * 0.7) {
      warnings.push(
        'Severe Potassium (K+) Deficit (>30% below target). High probability of muscle cramping, white muscle necrosis, and osmotic failure.'
      );
    }
    if (mineralSalinity < 5) {
      warnings.push(
        'Low Salinity Freshwater Farming (< 5 ppt). Osmoregulatory energy expenditure is doubled. Daily ionic supplementation is mandatory.'
      );
    }

    return {
      targetCa,
      targetMg,
      targetK,
      caDiff,
      mgDiff,
      kDiff,
      mgCaRatio,
      idealMgCaRatio,
      caDeficitKg: Math.round(caDeficitKg),
      mgDeficitKg: Math.round(mgDeficitKg),
      kDeficitKg: Math.round(kDeficitKg),
      warnings
    };
  }, [mineralSalinity, measCa, measMg, measK, mineralArea]);

  // --- TAB 4: AERATION & DO STATE ---
  const [biomassKg, setBiomassKg] = useState<number>(3500); // kg
  const [waterTemp, setWaterTemp] = useState<number>(30); // C
  const [targetDo, setTargetDo] = useState<number>(4.5); // ppm

  const aerationResults = useMemo(() => {
    // Routine vannamei respiration: ~300 - 450 mg O2 / kg shrimp / hour, adjusted for temperature & target DO
    const tempFactor = 1 + (waterTemp - 28) * 0.03;
    const doFactor = targetDo >= 5.0 ? 1.15 : 1.0;
    const shrimpO2PerHour = biomassKg * 0.38 * Math.max(0.8, tempFactor); // grams O2/hr
    // Sediment microbial benthic demand: adds ~40% to shrimp respiration
    const totalO2DemandKgPerHour = (shrimpO2PerHour * 1.4 * doFactor) / 1000;

    // Rule of thumb in intensive aquaculture: 1 HP paddlewheel aerator sustains 350 - 400 kg standing biomass
    const requiredHp = Math.max(2, Math.ceil((biomassKg * doFactor) / 380));
    const twoHpAerators = Math.ceil(requiredHp / 2);

    const nightHp = requiredHp;
    const dayHp = Math.ceil(requiredHp * 0.5);

    return {
      totalO2DemandKgPerHour: totalO2DemandKgPerHour.toFixed(2),
      requiredHp,
      twoHpAerators,
      dayHp,
      nightHp
    };
  }, [biomassKg, waterTemp, targetDo]);

  // Accordion open/close state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const FAQS = [
    {
      q: 'How does water pH and temperature impact toxic ammonia (NH3) in shrimp ponds?',
      a: 'Total Ammonia Nitrogen (TAN) exists in equilibrium between harmless ionized ammonium (NH4+) and highly toxic un-ionized free ammonia (NH3). The Bower-Bidwell dissociation equation demonstrates that as pH and temperature rise, the equilibrium shifts drastically toward toxic NH3. At pH 8.5 and 30°C, more than 15% of TAN is lethal NH3, whereas at pH 7.5 only 1.8% is toxic. This is why afternoon pH spikes from algae blooms trigger sudden mortality even when total TAN appears moderate.'
    },
    {
      q: 'What is the ideal Calcium to Magnesium ratio for Litopenaeus vannamei?',
      a: 'In natural oceanic seawater, the Magnesium to Calcium ratio (Mg:Ca) is approximately 3.1:1. For healthy vannamei shrimp molting, the ratio must never drop below 2.8:1. When Magnesium is deficient relative to Calcium, shrimp cannot properly calcify new cuticles, resulting in soft-shell syndrome, molt cramps (arched body paralysis), and high cannibalism mortality.'
    },
    {
      q: 'How much probiotic (Next Gut) should be coated on feed per day?',
      a: 'For commercial prevention and growth optimization, mix 15 to 20 ml of Next Gut per kilogram of commercial feed twice daily using a non-toxic feed binder. During active White Gut or White Feces outbreaks, increase dosage to 20-25 ml/kg for 5 consecutive days and broadcast Next Viro Nill @ 1.5 Litres/acre to suppress free-swimming Vibrio in the water column.'
    },
    {
      q: 'How many paddlewheel aerators are required per acre of shrimp pond?',
      a: 'The gold standard rule of thumb is 1 Horsepower (HP) of aeration for every 350 to 400 kg of standing shrimp biomass. For an intensive pond with 4,000 kg biomass (approx. 4 tonnes), a minimum of 10-12 HP of aeration (5 to 6 two-HP paddlewheel aerators) is required during nocturnal hours (10 PM to 6 AM) when algae consume dissolved oxygen.'
    },
    {
      q: 'Are Next Farm Bio Sciences formulations approved by the Coastal Aquaculture Authority (CAA)?',
      a: 'Yes. All 11 formulations from Next Farm Bio Sciences are certified CAA-approved bio-inputs and undergo strict antibiotic-residue screening. They contain zero chloramphenicol, nitrofurans, or banned fluoroquinolones, ensuring 100% compliance for export harvest clearances by MPEDA and EU/US-FDA testing.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#002B5B] via-[#004B50] to-[#001D3D] text-white py-14 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-xl mb-10 border border-teal-500/20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD200] text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-4 h-4" />
            <span>Interactive Aquaculture Engineering Suite</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight mb-4">
            Clinical Aquaculture Calculators &amp; Bio-Metrics
          </h1>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal max-w-3xl mx-auto">
            Scientific, formula-driven diagnostic calculators calibrated to ICAR-CIBA, MPEDA, and
            commercial Andhra Pradesh Vannamei shrimp farming standards.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-white/15 text-left">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-xs text-slate-300 block font-medium">Ammonia Equation</span>
              <span className="text-sm font-bold text-[#FFD200]">Bower-Bidwell Model</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-xs text-slate-300 block font-medium">Ionic Ratio Standard</span>
              <span className="text-sm font-bold text-teal-300">Mg:Ca 3.1:1 Seawater</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-xs text-slate-300 block font-medium">Aeration Standard</span>
              <span className="text-sm font-bold text-[#FFD200]">1 HP / 380 kg Biomass</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-xs text-slate-300 block font-medium">Regulatory Grade</span>
              <span className="text-sm font-bold text-emerald-400">CAA Approved SOP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Navigation Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8">
        <button
          onClick={() => setActiveTab('ammonia')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-sm ${
            activeTab === 'ammonia'
              ? 'bg-[#002B5B] text-white shadow-md ring-2 ring-[#002B5B] ring-offset-2'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Droplets className="w-5 h-5 text-amber-500" />
          <span>Toxic Ammonia (NH₃) Analyzer</span>
        </button>

        <button
          onClick={() => setActiveTab('biomass')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-sm ${
            activeTab === 'biomass'
              ? 'bg-[#002B5B] text-white shadow-md ring-2 ring-[#002B5B] ring-offset-2'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Scale className="w-5 h-5 text-teal-500" />
          <span>Biomass &amp; Feed Planner</span>
        </button>

        <button
          onClick={() => setActiveTab('minerals')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-sm ${
            activeTab === 'minerals'
              ? 'bg-[#002B5B] text-white shadow-md ring-2 ring-[#002B5B] ring-offset-2'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Activity className="w-5 h-5 text-indigo-500" />
          <span>Mineral Balance (Ca:Mg:K)</span>
        </button>

        <button
          onClick={() => setActiveTab('aeration')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-sm ${
            activeTab === 'aeration'
              ? 'bg-[#002B5B] text-white shadow-md ring-2 ring-[#002B5B] ring-offset-2'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Wind className="w-5 h-5 text-cyan-500" />
          <span>Aeration &amp; DO Requirement</span>
        </button>
      </div>

      {/* CALCULATOR PANELS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 mb-12">
        {/* TAB 1: AMMONIA CALCULATOR */}
        {activeTab === 'ammonia' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
                  <Droplets className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                    Un-Ionized Toxic Ammonia (NH₃) Dissociation Calculator
                  </h2>
                  <p className="text-sm text-slate-500">
                    Scientific determination of lethal free ammonia vs non-toxic ammonium based on
                    Bower-Bidwell dissociation dynamics.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Inputs Column */}
              <div className="lg:col-span-6 space-y-6 bg-slate-50/80 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500" />
                  <span>Pond Water Quality Parameters</span>
                </h3>

                {/* TAN Input */}
                <div>
                  <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1.5">
                    <label htmlFor="tan-input">Total Ammonia Nitrogen (TAN)</label>
                    <span className="text-[#004B50] font-bold">{tan.toFixed(2)} ppm (mg/L)</span>
                  </div>
                  <input
                    id="tan-input"
                    type="range"
                    min="0.1"
                    max="10.0"
                    step="0.1"
                    value={tan}
                    onChange={(e) => setTan(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004B50]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>0.1 ppm</span>
                    <span>5.0 ppm</span>
                    <span>10.0 ppm</span>
                  </div>
                </div>

                {/* pH Input */}
                <div>
                  <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1.5">
                    <label htmlFor="ph-input">Pond Water pH</label>
                    <span className="text-[#004B50] font-bold">{ph.toFixed(2)}</span>
                  </div>
                  <input
                    id="ph-input"
                    type="range"
                    min="6.8"
                    max="9.5"
                    step="0.05"
                    value={ph}
                    onChange={(e) => setPh(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004B50]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>6.8 (Acidic)</span>
                    <span>8.2 (Ideal)</span>
                    <span>9.5 (Lethal Alkaline)</span>
                  </div>
                </div>

                {/* Temperature Input */}
                <div>
                  <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1.5">
                    <label htmlFor="temp-input">Water Temperature</label>
                    <span className="text-[#004B50] font-bold">{temp.toFixed(1)} °C</span>
                  </div>
                  <input
                    id="temp-input"
                    type="range"
                    min="20"
                    max="36"
                    step="0.5"
                    value={temp}
                    onChange={(e) => setTemp(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004B50]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>20 °C</span>
                    <span>28-30 °C (Tropical)</span>
                    <span>36 °C (Peak Heat)</span>
                  </div>
                </div>

                {/* Salinity Input */}
                <div>
                  <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1.5">
                    <label htmlFor="salinity-input">Water Salinity</label>
                    <span className="text-[#004B50] font-bold">{salinity.toFixed(1)} ppt</span>
                  </div>
                  <input
                    id="salinity-input"
                    type="range"
                    min="0"
                    max="45"
                    step="1"
                    value={salinity}
                    onChange={(e) => setSalinity(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004B50]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>0 ppt (Freshwater)</span>
                    <span>15 ppt (Brackish)</span>
                    <span>45 ppt (Hyper-saline)</span>
                  </div>
                </div>
              </div>

              {/* Output Diagnostic Card */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-800 space-y-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">
                        Computed Free Ammonia (NH₃)
                      </span>
                      <div className="text-4xl sm:text-5xl font-black text-[#FFD200] font-mono">
                        {ammoniaResults.nh3}{' '}
                        <span className="text-lg font-normal text-slate-300">ppm</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block font-mono">
                        pKa: {ammoniaResults.pKa}
                      </span>
                      <span className="text-xs text-teal-400 font-mono">
                        {ammoniaResults.fraction}% of TAN
                      </span>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div className={`p-4 rounded-xl border font-bold text-sm ${ammoniaResults.riskColor}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {ammoniaResults.riskLevel === 'danger' || ammoniaResults.riskLevel === 'warning' ? (
                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      )}
                      <span>{ammoniaResults.riskTitle}</span>
                    </div>
                    <div className="text-xs font-medium mt-1">
                      Action Required: {ammoniaResults.feedingAction}
                    </div>
                  </div>

                  {/* Clinical Protocol */}
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                      Targeted Biological Protocol
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {ammoniaResults.clinicalProtocol}
                    </p>
                  </div>
                </div>

                {/* Direct Prescription CTA Card */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Recommended Bio-Formulation
                    </div>
                    <div className="text-base font-extrabold text-slate-900">
                      Next Converter (Bio-Nitrifier &amp; TAN Eliminator)
                    </div>
                    <div className="text-xs text-slate-600">
                      Autotrophic Nitrosomonas &amp; Nitrobacter consortium. 5 Litres per Acre.
                    </div>
                  </div>
                  <Link
                    href="/products/next-converter"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition-all whitespace-nowrap"
                  >
                    <span>View Next Converter</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BIOMASS & FEED CALCULATOR */}
        {activeTab === 'biomass' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2.5 rounded-xl bg-teal-100 text-teal-700">
                  <Scale className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                    Pond Biomass, Daily Feed Rate &amp; Check Tray Calculator
                  </h2>
                  <p className="text-sm text-slate-500">
                    Accurate standing biomass estimation, ICAR-CIBA feed percentage curve, and probiotic
                    coating calculation.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Inputs Column */}
              <div className="lg:col-span-6 space-y-5 bg-slate-50/80 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500" />
                  <span>Stocking &amp; Culture Dimensions</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pond Area */}
                  <div>
                    <label htmlFor="pond-area-input" className="block text-xs font-bold text-slate-700 mb-1">
                      Pond Water Area (Acres)
                    </label>
                    <input
                      id="pond-area-input"
                      type="number"
                      min="0.25"
                      max="20"
                      step="0.25"
                      value={pondArea}
                      onChange={(e) => setPondArea(Math.max(0.1, parseFloat(e.target.value) || 1))}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#004B50]"
                    />
                  </div>

                  {/* Stocking Density */}
                  <div>
                    <label htmlFor="stocking-density-input" className="block text-xs font-bold text-slate-700 mb-1">
                      Stocking Density (PL / m²)
                    </label>
                    <input
                      id="stocking-density-input"
                      type="number"
                      min="10"
                      max="150"
                      step="5"
                      value={stockingDensity}
                      onChange={(e) => setStockingDensity(Math.max(1, parseInt(e.target.value) || 60))}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#004B50]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* ABW */}
                  <div>
                    <label htmlFor="abw-input" className="block text-xs font-bold text-slate-700 mb-1">
                      Average Body Weight (ABW in grams)
                    </label>
                    <input
                      id="abw-input"
                      type="number"
                      min="0.5"
                      max="45"
                      step="0.5"
                      value={abw}
                      onChange={(e) => setAbw(Math.max(0.1, parseFloat(e.target.value) || 1))}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#004B50]"
                    />
                  </div>

                  {/* Estimated Survival */}
                  <div>
                    <label htmlFor="survival-rate-input" className="block text-xs font-bold text-slate-700 mb-1">
                      Estimated Survival Rate (%)
                    </label>
                    <input
                      id="survival-rate-input"
                      type="number"
                      min="30"
                      max="100"
                      step="5"
                      value={survivalRate}
                      onChange={(e) => setSurvivalRate(Math.min(100, Math.max(10, parseInt(e.target.value) || 80)))}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#004B50]"
                    />
                  </div>
                </div>

                {/* Day of Culture (DOC) */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <label htmlFor="doc-input">Day of Culture (DOC)</label>
                    <span className="text-[#004B50]">DOC {doc}</span>
                  </div>
                  <input
                    id="doc-input"
                    type="range"
                    min="1"
                    max="140"
                    step="1"
                    value={doc}
                    onChange={(e) => setDoc(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004B50]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Nursery (DOC 1-30)</span>
                    <span>Growth (DOC 31-75)</span>
                    <span>Harvest (DOC 76-140)</span>
                  </div>
                </div>
              </div>

              {/* Output Grid */}
              <div className="lg:col-span-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs uppercase font-bold text-slate-400 block mb-1">
                      Standing Biomass
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-[#FFD200] font-mono">
                      {biomassResults.standingBiomassKg}{' '}
                      <span className="text-xs font-normal text-slate-300">kg</span>
                    </div>
                    <span className="text-[11px] text-teal-400 block mt-1">
                      {biomassResults.standingBiomassTonnes} Tonnes
                    </span>
                  </div>

                  <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs uppercase font-bold text-slate-400 block mb-1">
                      Daily Feed Allowance
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                      {biomassResults.dailyFeedKg}{' '}
                      <span className="text-xs font-normal text-slate-300">kg/day</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      {biomassResults.feedPercentage}% of standing biomass
                    </span>
                  </div>
                </div>

                {/* Meal Schedule Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex justify-between">
                    <span>Recommended 4-Meal Feed Allocation</span>
                    <span className="text-[#004B50] font-mono">Check Tray: {biomassResults.checkTrayGrams}g</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px]">6:30 AM</span>
                      <span className="font-bold text-slate-800">{biomassResults.mealMorning} kg</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px]">11:00 AM</span>
                      <span className="font-bold text-slate-800">{biomassResults.mealNoon} kg</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px]">3:30 PM</span>
                      <span className="font-bold text-slate-800">{biomassResults.mealEvening} kg</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block text-[10px]">8:00 PM</span>
                      <span className="font-bold text-slate-800">{biomassResults.mealNight} kg</span>
                    </div>
                  </div>
                </div>

                {/* Probiotic Coating Prescription */}
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-xs font-bold uppercase tracking-wider text-teal-800">
                      Next Gut Probiotic Coating
                    </div>
                    <div className="text-sm font-extrabold text-slate-900">
                      {biomassResults.nextGutDailyMl} ml/day ({biomassResults.nextGutWeeklyLitres} Litres/week)
                    </div>
                    <div className="text-xs text-slate-600">
                      Mix 18 ml per kg feed with binder to ensure gut flora colonization &amp; WFS prevention.
                    </div>
                  </div>
                  <Link
                    href="/products/next-gut"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004B50] hover:bg-[#002B5B] text-white text-xs font-extrabold shadow-sm transition-all whitespace-nowrap"
                  >
                    <span>View Next Gut</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MINERAL RATIO CALCULATOR */}
        {activeTab === 'minerals' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                  <Activity className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                    Vannamei Ionic Mineral Ratio (Ca : Mg : K) &amp; Molting Analyzer
                  </h2>
                  <p className="text-sm text-slate-500">
                    Seawater proportional ionic baseline benchmark, Mg:Ca ratio verification, and mineral
                    replenishment calculations.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Inputs Column */}
              <div className="lg:col-span-6 space-y-5 bg-slate-50/80 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500" />
                  <span>Water Salinity &amp; Measured Ions</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mineral-salinity-input" className="block text-xs font-bold text-slate-700 mb-1">
                      Pond Salinity (ppt)
                    </label>
                    <input
                      id="mineral-salinity-input"
                      type="number"
                      min="1"
                      max="45"
                      step="0.5"
                      value={mineralSalinity}
                      onChange={(e) => setMineralSalinity(Math.max(0.5, parseFloat(e.target.value) || 10))}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#004B50]"
                    />
                  </div>
                  <div>
                    <label htmlFor="mineral-area-input" className="block text-xs font-bold text-slate-700 mb-1">
                      Pond Water Area (Acres)
                    </label>
                    <input
                      id="mineral-area-input"
                      type="number"
                      min="0.25"
                      max="20"
                      step="0.25"
                      value={mineralArea}
                      onChange={(e) => setMineralArea(Math.max(0.1, parseFloat(e.target.value) || 1))}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#004B50]"
                    />
                  </div>
                </div>

                {/* Measured Ions */}
                <div className="space-y-3 pt-2 border-t border-slate-200">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <label htmlFor="meas-ca-input">Measured Calcium (Ca²⁺)</label>
                      <span className="text-[#004B50] font-mono">{measCa} ppm</span>
                    </div>
                    <input
                      id="meas-ca-input"
                      type="range"
                      min="10"
                      max="600"
                      step="5"
                      value={measCa}
                      onChange={(e) => setMeasCa(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004B50]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <label htmlFor="meas-mg-input">Measured Magnesium (Mg²⁺)</label>
                      <span className="text-[#004B50] font-mono">{measMg} ppm</span>
                    </div>
                    <input
                      id="meas-mg-input"
                      type="range"
                      min="20"
                      max="1800"
                      step="10"
                      value={measMg}
                      onChange={(e) => setMeasMg(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004B50]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <label htmlFor="meas-k-input">Measured Potassium (K⁺)</label>
                      <span className="text-[#004B50] font-mono">{measK} ppm</span>
                    </div>
                    <input
                      id="meas-k-input"
                      type="range"
                      min="5"
                      max="500"
                      step="5"
                      value={measK}
                      onChange={(e) => setMeasK(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004B50]"
                    />
                  </div>
                </div>
              </div>

              {/* Output Card */}
              <div className="lg:col-span-6 space-y-5">
                <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Mg : Ca Ratio
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#FFD200] font-mono">
                        {mineralResults.mgCaRatio} : 1
                      </span>
                      <span className="text-xs text-slate-400 block font-mono">
                        Ideal: {mineralResults.idealMgCaRatio}
                      </span>
                    </div>
                  </div>

                  {/* Ion Comparisons */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Calcium (Ca)</span>
                      <span className="font-bold text-white block text-sm">{measCa} ppm</span>
                      <span className="text-[10px] text-slate-400">Target: {mineralResults.targetCa}</span>
                    </div>

                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Magnesium (Mg)</span>
                      <span className="font-bold text-white block text-sm">{measMg} ppm</span>
                      <span className="text-[10px] text-slate-400">Target: {mineralResults.targetMg}</span>
                    </div>

                    <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                      <span className="text-slate-400 block text-[10px]">Potassium (K)</span>
                      <span className="font-bold text-white block text-sm">{measK} ppm</span>
                      <span className="text-[10px] text-slate-400">Target: {mineralResults.targetK}</span>
                    </div>
                  </div>

                  {/* Warnings or Success */}
                  {mineralResults.warnings.length > 0 ? (
                    <div className="space-y-2 pt-2">
                      {mineralResults.warnings.map((warn, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-start gap-2"
                        >
                          <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                          <span>{warn}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Ionic balance is within standard physiological tolerance for healthy molting.</span>
                    </div>
                  )}
                </div>

                {/* Mineral Supplementation CTA */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                      Bio-Available Mineral Chelates
                    </div>
                    <div className="text-base font-extrabold text-slate-900">
                      Next Min (Ionic Marine Mineral Chelates)
                    </div>
                    <div className="text-xs text-slate-600">
                      Chelated Ca, Mg, K, Zn &amp; Se. Dose 5 Litres/Acre at night during lunar molting cycles.
                    </div>
                  </div>
                  <Link
                    href="/products/next-min"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-sm transition-all whitespace-nowrap"
                  >
                    <span>View Next Min</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AERATION & DO CALCULATOR */}
        {activeTab === 'aeration' && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2.5 rounded-xl bg-cyan-100 text-cyan-700">
                  <Wind className="w-6 h-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
                    Dissolved Oxygen (DO) &amp; Paddlewheel Aeration Sizing Calculator
                  </h2>
                  <p className="text-sm text-slate-500">
                    Calculates nocturnal biological oxygen demand (shrimp + benthic sludge) and recommended
                    aerator horsepower.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Inputs Column */}
              <div className="lg:col-span-6 space-y-6 bg-slate-50/80 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500" />
                  <span>Biomass &amp; Oxygen Parameters</span>
                </h3>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <label htmlFor="aeration-biomass-input">Standing Shrimp Biomass (kg)</label>
                    <span className="text-[#004B50] font-mono">{biomassKg.toLocaleString()} kg</span>
                  </div>
                  <input
                    id="aeration-biomass-input"
                    type="range"
                    min="500"
                    max="10000"
                    step="250"
                    value={biomassKg}
                    onChange={(e) => setBiomassKg(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004B50]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>500 kg (Early)</span>
                    <span>5,000 kg (Mid)</span>
                    <span>10,000 kg (Intensive Peak)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <label htmlFor="aeration-temp-input">Water Temperature</label>
                    <span className="text-[#004B50] font-mono">{waterTemp} °C</span>
                  </div>
                  <input
                    id="aeration-temp-input"
                    type="range"
                    min="24"
                    max="34"
                    step="1"
                    value={waterTemp}
                    onChange={(e) => setWaterTemp(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004B50]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>24 °C (Cool)</span>
                    <span>30 °C (Standard)</span>
                    <span>34 °C (Low O₂ Solubility)</span>
                  </div>
                </div>
              </div>

              {/* Output Grid */}
              <div className="lg:col-span-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs uppercase font-bold text-slate-400 block mb-1">
                      Night Peak Aeration
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                      {aerationResults.nightHp}{' '}
                      <span className="text-xs font-normal text-slate-300">HP</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      {aerationResults.twoHpAerators} × 2-HP Aerators
                    </span>
                  </div>

                  <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs uppercase font-bold text-slate-400 block mb-1">
                      Daytime Circulation
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-[#FFD200] font-mono">
                      {aerationResults.dayHp}{' '}
                      <span className="text-xs font-normal text-slate-300">HP</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Maintains central current
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Pond Bottom Sludge &amp; Oxygen Conservation Tip
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Over 35-40% of nighttime dissolved oxygen is consumed by anaerobic bacteria fermenting
                    benthic black sludge. Applying{' '}
                    <strong className="text-slate-900">Next Sludge (Benthic Digestor)</strong> reduces
                    sediment biological oxygen demand (BOD) by up to 60%, drastically reducing electricity costs
                    and mortalities.
                  </p>
                </div>

                <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-xs font-bold uppercase tracking-wider text-cyan-800">
                      Benthic Soil Oxygen Savior
                    </div>
                    <div className="text-base font-extrabold text-slate-900">
                      Next Sludge (Black Soil &amp; Sludge Digestor)
                    </div>
                    <div className="text-xs text-slate-600">
                      Bacillus megaterium &amp; Thiobacillus consortium. Eliminates H₂S &amp; black mud.
                    </div>
                  </div>
                  <Link
                    href="/products/next-sludge"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-extrabold shadow-sm transition-all whitespace-nowrap"
                  >
                    <span>View Next Sludge</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TELUGU REGIONAL ADVISORY SECTION */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-12 border border-emerald-500/30">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <span>ఆంధ్రప్రదేశ్ రొయ్యల రైతుల సాంకేతిక మార్గదర్శిని (Telugu Aquaculture Guide)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white leading-snug">
            ఆంధ్రప్రదేశ్ ఆక్వా సాగులో క్లినికల్ కాలిక్యులేటర్ల ప్రాముఖ్యత
          </h2>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            భీమవరం, నెల్లూరు, అమలాపురం, కాకినాడ మరియు బాపట్ల ప్రాంతాల్లోని వనామి రొయ్యల చెరువులలో సరైన సమయంలో
            అమ్మోనియా నియంత్రణ మరియు ఖనిజ లవణాల నిర్వహణ ఎంతో ముఖ్యం:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
              <h3 className="font-bold text-base text-[#FFD200]">
                1. విషపూరిత అమ్మోనియా (NH₃) నివారణ
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                మధ్యాహ్న సమయాలలో pH 8.4 దాటినప్పుడు అమ్మోనియా ప్రమాదకరంగా మారుతుంది. దీని నివారణకు{' '}
                <strong>Next Converter</strong> ను ఎకరాకు 5 లీటర్లు వేసి, ఏరియేషన్ పెంచాలి.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
              <h3 className="font-bold text-base text-teal-300">
                2. తాటిగుల్ల మరియు లూజ్ షెల్ సమస్యలు
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                మెగ్నీషియం, కాల్షియం నిష్పత్తి 3:1 కన్నా తగ్గినప్పుడు రొయ్యల్లో షెల్ గట్టిపడదు. దీని కొరకు{' '}
                <strong>Next Min</strong> మినరల్ కాంప్లెక్స్ ను రాత్రిపూట అందించాలి.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
              <h3 className="font-bold text-base text-amber-300">
                3. తెల్లపేగు (White Gut) మరియు EHP రక్షణ
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                యాంటీబయాటిక్స్ నిషేధించబడినందున, గట్ బ్యాక్టీరియాను పునరుద్ధరించడానికి{' '}
                <strong>Next Gut</strong> ప్రోబయోటిక్‌ను మేతలో కలిపి అందించాలి.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
              <h3 className="font-bold text-base text-emerald-300">
                4. నల్ల మట్టి (Black Soil) మరియు వ్యర్థాల తొలగింపు
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                చెరువు అడుగున హైడ్రోజన్ సల్ఫైడ్ విషాన్ని హరించడానికి <strong>Next Sludge</strong> బ్యాక్టీరియాను
                ట్రెంచ్లలో వాడాలి.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQS ACCORDION SECTION */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 mb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Frequently Asked Technical Questions
            </h2>
            <p className="text-sm text-slate-500">
              Rigorous scientific explanations behind water parameter chemistry and pond microbiology.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-bold text-slate-800 text-sm sm:text-base">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
