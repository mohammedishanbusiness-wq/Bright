import React, { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, ShieldCheck, Heart, Users, RefreshCw, Smartphone, Percent, Calendar, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onBookConsultation: () => void;
  onOpenAIAdvisor: () => void;
  setCurrentPage: (page: string) => void;
}

export default function HeroSection({ onBookConsultation, onOpenAIAdvisor, setCurrentPage }: HeroSectionProps) {
  const [forecastAge, setForecastAge] = useState(40);
  const [monthlySavings, setMonthlySavings] = useState(1200);
  
  // Calculate potential compound interest for forecast
  // Formula: Future Value of Annuity = P * [((1 + r)^n - 1) / r]
  // Assume basic 7% annual compounding growth
  const years = Math.max(5, 65 - forecastAge);
  const rate = 0.07;
  const monthlyRate = rate / 12;
  const months = years * 12;
  const compoundTotal = monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  
  // Refinance savings estimator
  const [currentMortgage, setCurrentMortgage] = useState(650000);
  const baseRate = 0.0649; // 6.49% current lazy rate
  const refinancingRate = 0.0579; // 5.79% competitive broker rate
  const estimatedAnnualInterestSaving = currentMortgage * (baseRate - refinancingRate);

  const trustBadges = [
    { icon: ShieldCheck, title: "Licensed Financial Advisors", desc: "Strict ASIC Fiduciary compliance" },
    { icon: RefreshCw, title: "15+ Years Registered Experience", desc: "Managing planning since 2008" },
    { icon: Users, title: "Australian Owned", desc: "South Yarra based & family operated" },
    { icon: Heart, title: "Hundreds Of Families Helped", desc: "Long-term legacy protection" }
  ];

  return (
    <section className="relative overflow-hidden mesh-bg py-20 px-4 sm:px-6 lg:px-8 border-b border-navy-100">
      {/* Absolute decorative color highlights to give luxury bloom */}
      <div className="absolute top-24 left-1/4 w-96 h-96 bg-gold-200/25 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Micro-pill highlight */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-emerald-100/60 border border-emerald-500/10 text-emerald-900 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 font-display"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
            Empowering Wealth Clarity Across Generations
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-navy-950 leading-[1.1] mb-6"
            id="hero-main-title"
          >
            Advice Built Around <br />
            <span className="text-gradient-navy-emerald">What Matters Most</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-navy-700 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl font-sans font-light"
            id="hero-subtitle"
          >
            Personalised Financial Planning, Mortgage Broking and Aged Care Advice Designed To Help Australian Families Build A Brighter Future.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
            id="hero-buttons-container"
          >
            <button
              onClick={onBookConsultation}
              className="w-full sm:w-auto text-center flex items-center justify-center gap-2 bg-navy-900 text-white hover:bg-navy-950 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 pointer-events-auto cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-gold-400" />
              Book Free Consultation
            </button>
          </motion.div>
        </div>

        {/* Right Side Wealth Modeling Dashboard Mockup Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 w-full flex justify-center"
          id="hero-dashboard-mockup"
        >
          <div className="w-full max-w-md glass-card rounded-2xl overflow-hidden shadow-2xl border border-navy-100 flex flex-col">
            {/* Mockup Toolbar Header */}
            <div className="bg-navy-900 text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                <span className="text-xs font-mono text-navy-300 ml-2 uppercase tracking-widest">Wealth Engine v3.0</span>
              </div>
              <div className="bg-emerald-900/80 px-2.5 py-0.5 rounded text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
                LIVE PLANNER
              </div>
            </div>

            {/* Mockup content pages */}
            <div className="p-6 flex flex-col gap-6 bg-white/95">
              
              {/* Card 1: Interactive Super Compound Estimator */}
              <div className="border border-navy-50 rounded-xl p-4 bg-navy-50/50 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-800" />
                    <span className="text-xs font-semibold text-navy-900">Compound Super projection</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gold-600 bg-gold-200/50 px-2 py-0.5 rounded">7% CAGR</span>
                </div>

                {/* Estimate amount ticker */}
                <span className="text-2xl font-bold font-display text-navy-950 tracking-tight">
                  ${Math.round(compoundTotal).toLocaleString("en-AU")}
                </span>
                <p className="text-[10px] text-navy-500 mt-1">
                  Estimated wealth accumulated at Australian age 65
                </p>

                {/* Sliders */}
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-navy-700 font-medium mb-1">
                      <span>Current Age: {forecastAge} yrs</span>
                      <span>Target: 65</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="60" 
                      value={forecastAge} 
                      onChange={(e) => setForecastAge(Number(e.target.value))}
                      className="w-full accent-navy-900 h-1 rounded-full cursor-pointer bg-navy-200"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-navy-700 font-medium mb-1">
                      <span>Monthly Contribution:</span>
                      <span>${monthlySavings}/mo</span>
                    </div>
                    <input 
                      type="range" 
                      min="200" 
                      max="5000" 
                      step="100"
                      value={monthlySavings} 
                      onChange={(e) => setMonthlySavings(Number(e.target.value))}
                      className="w-full accent-emerald-800 h-1 rounded-full cursor-pointer bg-navy-200"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Interactive Home Loan Broker Savings */}
              <div className="border border-navy-50 rounded-xl p-4 bg-emerald-50/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-gold-600 animate-pulse" />
                    <span className="text-xs font-semibold text-navy-950">Mortgage Refinance Tracker</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800">Save 0.70% p.a.</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-white p-2.5 rounded-lg border border-navy-100">
                    <p className="text-[9px] text-navy-500 uppercase tracking-wider font-semibold">Max Borrowing Estimate</p>
                    <span className="text-sm font-bold text-navy-900 block mt-1">$1,050,000</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-navy-100">
                    <p className="text-[9px] text-gold-700 uppercase tracking-wider font-semibold">Broker Interest Savings</p>
                    <span className="text-sm font-bold text-emerald-800 block mt-1">
                      ${Math.round(estimatedAnnualInterestSaving).toLocaleString("en-AU")} / yr
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-navy-700 mb-1">
                    <span>Average Loan Volume:</span>
                    <span className="font-semibold">${(currentMortgage / 1000).toFixed(0)}k</span>
                  </div>
                  <input 
                    type="range" 
                    min="300000" 
                    max="2000000" 
                    step="25000"
                    value={currentMortgage} 
                    onChange={(e) => setCurrentMortgage(Number(e.target.value))}
                    className="w-full accent-navy-900 h-1 rounded-full cursor-pointer bg-navy-200"
                  />
                </div>
              </div>

              {/* Direct interactive conversion anchor link */}
              <button 
                onClick={() => setCurrentPage("mortgage-broking")}
                className="w-full bg-navy-50 hover:bg-navy-100/80 text-navy-900 text-xs font-semibold py-3 rounded-xl border border-navy-100 flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Access Interactive Mortgage Calculator</span>
                <span className="text-gold-600 ml-1">→</span>
              </button>
            </div>
            
            <div className="bg-navy-50 px-5 py-3 border-t border-navy-100/50 flex justify-between items-center text-[11px] text-navy-600">
              <span>Licensed AFS Authority No: #351119</span>
              <span className="font-semibold text-emerald-900">BrightR Australia</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust bar row section */}
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-navy-100/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {trustBadges.map((badge, idx) => {
            const IconComp = badge.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center p-3"
              >
                <div className="w-10 h-10 bg-gold-50 border border-gold-200/40 rounded-full flex items-center justify-center mb-3">
                  <IconComp className="w-5 h-5 text-gold-600" />
                </div>
                <h3 className="text-sm font-semibold text-navy-950 font-display">{badge.title}</h3>
                <p className="text-xs text-navy-500 mt-1 font-sans">{badge.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
