import React, { useState, useEffect } from "react";
import { Calculator, ShieldCheck, Home, AlignCenter, ArrowUpRight } from "lucide-react";

interface MortgageCalculatorProps {
  onBookConsultation: () => void;
}

export default function MortgageCalculator({ onBookConsultation }: MortgageCalculatorProps) {
  // Calculator inputs state
  const [propertyValue, setPropertyValue] = useState(850000);
  const [deposit, setDeposit] = useState(170000);
  const [interestRate, setInterestRate] = useState(5.79); // default competitive Australian mortgage rate
  const [loanTerm, setLoanTerm] = useState(30);

  // Computed state outputs
  const [loanAmount, setLoanAmount] = useState(680000);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [lvr, setLvr] = useState(80);
  const [needsLmi, setNeedsLmi] = useState(false);

  useEffect(() => {
    // 1. Calculate Loan Amount
    const calculatedLoan = Math.max(0, propertyValue - deposit);
    setLoanAmount(calculatedLoan);

    // 2. Calculate LVR (Loan to Value Ratio)
    const calculatedLvr = propertyValue > 0 ? (calculatedLoan / propertyValue) * 105 : 0;
    // Adjust LVR percentage
    const realLvr = propertyValue > 0 ? (calculatedLoan / propertyValue) * 100 : 0;
    setLvr(Math.round(realLvr));
    setNeedsLmi(realLvr > 80);

    // 3. Monthly principal + interest formula
    // M = P * [r * (1 + r)^n] / [(1 + r)^n - 1]
    const monthlyRate = (interestRate / 100) / 12;
    const totalPayments = loanTerm * 12;

    if (calculatedLoan <= 0) {
      setMonthlyRepayment(0);
      setTotalInterest(0);
      return;
    }

    if (monthlyRate === 0) {
      setMonthlyRepayment(calculatedLoan / totalPayments);
      setTotalInterest(0);
      return;
    }

    const repayment = calculatedLoan * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const calculatedTotalInterest = (repayment * totalPayments) - calculatedLoan;

    setMonthlyRepayment(Math.round(repayment));
    setTotalInterest(Math.round(calculatedTotalInterest));

  }, [propertyValue, deposit, interestRate, loanTerm]);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50/50 border-b border-navy-100" id="mortgage-repay-calculator">
      <div className="max-w-7xl mx-auto">
        
        {/* Title headers */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">Borrowing Capacity Estimator</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy-950 mt-2 mb-4 leading-tight">
            Interactive Mortgage Analyst <br />
            <span className="text-gradient-navy-emerald">Secure Your Dream Australian Home</span>
          </h2>
          <p className="text-navy-600 font-light text-sm max-w-md mx-auto leading-relaxed">
            Adjust the metrics below to model repayments in real time. We match outcomes with over 30 tier-1 banks to bypass general limits.
          </p>
        </div>

        {/* Workspace panel */}
        <div className="glass-card max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12 border border-navy-100">
          
          {/* Left inputs column (7 details) */}
          <div className="p-8 md:col-span-7 bg-white space-y-6">
            <h3 className="font-display font-bold text-lg text-navy-950 flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-gold-600" />
              Scenario Core Metrics
            </h3>

            {/* Metric 1: Property Value */}
            <div>
              <div className="flex justify-between text-xs text-navy-800 font-medium mb-1.5 uppercase tracking-wide">
                <span>Property Purchase Price</span>
                <span className="font-bold font-mono text-navy-900">${propertyValue.toLocaleString("en-AU")}</span>
              </div>
              <input 
                type="range" 
                min="200000" 
                max="3000000" 
                step="25000"
                value={propertyValue} 
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full accent-navy-900 h-1.5 rounded-full cursor-pointer bg-navy-100 mb-2"
              />
              <div className="flex justify-between text-[10px] text-navy-400 font-mono">
                <span>$200k (Starter)</span>
                <span>$1.5m (Median)</span>
                <span>$3.0m (Premium)</span>
              </div>
            </div>

            {/* Metric 2: Deposit */}
            <div>
              <div className="flex justify-between text-xs text-navy-800 font-medium mb-1.5 uppercase tracking-wide">
                <span>Cash Deposit Balance</span>
                <span className="font-bold font-mono text-navy-905">${deposit.toLocaleString("en-AU")}</span>
              </div>
              <input 
                type="range" 
                min="20000" 
                max={propertyValue < 1000000 ? propertyValue * 0.9 : 500000} 
                step="5000"
                value={deposit} 
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="w-full accent-emerald-800 h-1.5 rounded-full cursor-pointer bg-navy-100 mb-2"
              />
              <div className="flex justify-between text-[10px] text-navy-400 font-mono">
                <span>$20k min</span>
                <span>20% Level: ${(propertyValue * 0.20).toLocaleString("en-AU")}</span>
              </div>
            </div>

            {/* Grid for parameters: Rate and Term */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Interest Rate */}
              <div>
                <label className="block text-xs font-semibold text-navy-850 uppercase tracking-wide mb-2">
                  Interest Rate (Fixed/Var p.a.)
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    step="0.01"
                    min="1"
                    max="15"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-navy-50 text-navy-950 px-4 py-3 rounded-xl border border-navy-150 focus:border-gold-400 focus:outline-none font-semibold text-sm"
                  />
                  <span className="absolute top-1/2 right-4 -translate-y-1/2 text-navy-500 font-bold">%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-xs font-semibold text-navy-850 uppercase tracking-wide mb-2">
                  Loan Duration (Years)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[25, 30].map(term => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setTermLevel(term)}
                      className={`py-3 px-3.5 rounded-xl text-center text-xs font-semibold border cursor-pointer transition-all ${
                        loanTerm === term 
                          ? "bg-navy-900 border-navy-900 text-white shadow" 
                          : "bg-white border-navy-150 text-navy-800 hover:bg-navy-50"
                      }`}
                      id={`term-btn-${term}`}
                    >
                      {term} Years
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Outputs showcase column (5 Details) */}
          <div className="p-8 md:col-span-5 bg-navy-900 text-white flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded">Estimated Repayments Output</span>
              
              {/* Output Display 1: Repayment Value */}
              <div>
                <p className="text-xs text-navy-300">Monthly Repayment (Principal & Interest)</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl sm:text-5xl font-bold text-gradient-gold font-display">${monthlyRepayment.toLocaleString("en-AU")}</span>
                  <span className="text-xs text-navy-300">/ mo</span>
                </div>
                <p className="text-[10px] text-navy-400 mt-1 italic">
                  Equivalent to approx. ${Math.round((monthlyRepayment * 12) / 52)} / week
                </p>
              </div>

              {/* Secondary Outputs list */}
              <div className="border-t border-navy-800 pt-5 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs text-navy-400">Total Loan Amount:</span>
                  <span className="font-semibold font-mono text-navy-200">${loanAmount.toLocaleString("en-AU")}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs text-navy-400">Loan To Value (LVR):</span>
                  <span className={`font-semibold font-mono px-2 py-0.5 rounded ${lvr > 80 ? "text-yellow-405 bg-yellow-400/10" : "text-emerald-400 bg-emerald-500/10"}`}>
                    {lvr}%
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs text-navy-400">Total Interest Payable:</span>
                  <span className="font-semibold font-mono text-navy-200">${totalInterest.toLocaleString("en-AU")}</span>
                </div>
              </div>

              {/* Aussie-Specific LMI Alert Flag */}
              {needsLmi ? (
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-3 flex gap-2 items-start mt-4">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping shrink-0 mt-1.5"></span>
                  <p className="text-[10px] text-yellow-300 leading-normal font-sans">
                    <strong>Lenders Mortgage Insurance (LMI) applies:</strong> Your LVR exceeds 80%. Consider increasing deposit to 20% to save approx. $12k in lender insurance fees.
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-3 flex gap-2 items-start mt-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-emerald-300 leading-normal font-sans">
                    <strong>Excellent Equity LVR ({lvr}%):</strong> You bypass costly Lenders Mortgage Insurance and qualify for premium discount variable interest rates.
                  </p>
                </div>
              )}
            </div>

            {/* Direct consultation call to action */}
            <div className="pt-6 border-t border-navy-800 mt-6">
              <button
                onClick={onBookConsultation}
                className="w-full text-center flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 font-bold text-xs py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer uppercase tracking-wider"
                id="calc-action-book"
              >
                <span>Book Home Loan Strategy Session</span>
                <ArrowUpRight className="w-4 h-4 text-navy-950 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  function setTermLevel(term: number) {
    setLoanTerm(term);
  }
}
