import React, { useState } from "react";
import { Award, Check, Sparkles, AlertCircle, TrendingUp, RefreshCw, Smartphone, Phone, Mail, User } from "lucide-react";
import { HEALTH_QUIZ_DATA } from "../data";

interface FinancialHealthScoreProps {
  onBookConsultation: () => void;
}

export default function FinancialHealthScore({ onBookConsultation }: FinancialHealthScoreProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Lead forms coordinates
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleSelectOption = (score: number) => {
    setSelectedAnswers([...selectedAnswers, score]);
    
    if (currentStep < HEALTH_QUIZ_DATA.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setLeadSubmitted(false);
    setLeadName("");
    setLeadEmail("");
    setLeadPhone("");
  };

  const totalScore = selectedAnswers.reduce((acc, curr) => acc + curr, 0);

  const getScoreClassification = (score: number) => {
    if (score >= 80) return { title: "Optimal Sovereign Status", color: "text-emerald-800 bg-emerald-100/50 border-emerald-300", desc: "You are in the top 15% of Australian family wealth brackets. Your assets are compounding securely, and you maintain exceptional debt offsets. Anita Fasciani's focus for your profile is sophisticated asset shielding and family legacy transitioning." };
    if (score >= 50) return { title: "Average Performing Status", color: "text-yellow-805 bg-yellow-50/50 border-yellow-300", desc: "Your wealth compounds at standard levels, but you may suffer from 'lazy variables' on your home interest loans or default super structures. Substantial savings can be secured with strategic restructuring." };
    return { title: "Critical Calibration Required", color: "text-red-800 bg-red-50/50 border-red-300", desc: "Your super compounding matches baseline inflation levels, and lack of offsets exposes you to high lender interest variables. Creating a tailored planning blueprint within 45 days can save thousands." };
  };

  const currentQuestion = HEALTH_QUIZ_DATA[currentStep];
  const progressRatio = ((currentStep + 1) / HEALTH_QUIZ_DATA.length) * 100;

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 border-b border-navy-100" id="financial-health-quiz">
      <div className="max-w-4xl mx-auto">
        
        {/* Main section titles */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">Australian Standard Diagnostic</span>
          <h2 className="font-display font-bold text-3xl text-navy-950 mt-2 mb-4 leading-tight">
            Calculate Your <br />
            <span className="text-gradient-navy-emerald font-extrabold">Financial Health Score</span>
          </h2>
          <p className="text-navy-600 font-light text-xs font-sans leading-relaxed">
            Gain complete visibility over Super transition, mortgage rates, and legacy protection metrics. Takes less than two minutes.
          </p>
        </div>

        {/* Diagnostic container */}
        <div className="glass-card bg-white rounded-3xl border border-navy-150 p-8 shadow-xl relative overflow-hidden" id="quiz-workspace-inner">
          
          {/* Active quiz progress indicators */}
          {!quizCompleted && (
            <div className="mb-8">
              <div className="flex justify-between text-[10px] text-navy-500 uppercase tracking-widest font-bold mb-2">
                <span>Quiz Progress: Step {currentStep + 1} of {HEALTH_QUIZ_DATA.length}</span>
                <span>Category: {currentQuestion.category}</span>
              </div>
              <div className="w-full bg-navy-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-navy-900 h-full transition-all duration-300 ease-out" 
                  style={{ width: `${progressRatio}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Quiz Active states */}
          {!quizCompleted ? (
            <div>
              {/* Question header */}
              <h3 className="font-display font-bold text-xl text-navy-950 leading-snug mb-6" id={`quiz-question-${currentStep}`}>
                {currentQuestion.question}
              </h3>

              {/* Answers selectable choices */}
              <div className="space-y-4">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(option.score)}
                    className="w-full text-left p-5 rounded-xl border border-navy-150 hover:border-gold-300 hover:bg-gold-50/20 transition-all font-sans cursor-pointer group flex gap-3.5 items-start"
                    id={`quiz-${currentStep}-option-${idx}`}
                  >
                    <div className="w-5 h-5 bg-navy-50 rounded-full flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold-100">
                      <span className="text-[10px] text-navy-600 font-bold font-mono uppercase">{String.fromCharCode(65 + idx)}</span>
                    </div>
                    <div>
                      <span className="text-xs text-navy-900 font-semibold block leading-tight">{option.text}</span>
                      <span className="text-[10px] text-navy-500 mt-1 block leading-normal font-light italic opacity-0 group-hover:opacity-100 transition-opacity">
                        Insight: {option.tip}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Quiz completed metrics screen
            <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Score Showcase Circular Layout */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 flex items-center justify-center bg-navy-900 text-white rounded-full border-4 border-gold-400 shadow-xl">
                  <div className="text-center">
                    <span className="text-4xl font-black font-display text-gradient-gold">{totalScore}</span>
                    <span className="text-[10px] text-navy-300 uppercase tracking-widest block font-bold leading-none mt-1">out of 100</span>
                  </div>
                  <div className="absolute -top-1 -right-1 p-2 bg-emerald-800 rounded-full">
                    <Award className="w-4 h-4 text-gold-400" />
                  </div>
                </div>

                <div className="mt-6 max-w-xl mx-auto space-y-2">
                  <span className={`inline-block text-xs font-bold px-4 py-1.5 rounded-full border uppercase tracking-wider font-display ${getScoreClassification(totalScore).color}`}>
                    {getScoreClassification(totalScore).title}
                  </span>
                  <p className="text-xs text-navy-600 italic font-mono mt-2">National Median Standard: 58/100</p>
                  <p className="text-xs text-navy-700 leading-relaxed font-sans max-w-lg mx-auto font-light pt-3">
                    {getScoreClassification(totalScore).desc}
                  </p>
                </div>
              </div>

              {/* Lead Request and Diagnostic Submission form */}
              <div className="border-t border-navy-150 pt-8 max-w-md mx-auto">
                {!leadSubmitted ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                    <div className="text-center pb-2">
                      <h4 className="text-sm font-bold text-navy-950 font-display">Receive Your Free Premium Strategic SOA Audit</h4>
                      <p className="text-[11px] text-navy-500 mt-0.5 leading-normal font-light">
                        We will compile a bespoke wealth pathway report with specific offset recommendations mapping your {totalScore}/100 score. Delivered securely via email.
                      </p>
                    </div>

                    {/* Name */}
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                      <input 
                        type="text" 
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="Your Full Name"
                        className="w-full bg-navy-50 text-navy-950 pl-11 pr-4 py-3 rounded-xl text-xs border border-navy-150 focus:outline-none focus:border-gold-350 font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                      <input 
                        type="email" 
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="Your Email Address"
                        className="w-full bg-navy-50 text-navy-950 pl-11 pr-4 py-3 rounded-xl text-xs border border-navy-150 focus:outline-none focus:border-gold-350 font-sans"
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                      <input 
                        type="tel" 
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="Australian Mobile Number"
                        className="w-full bg-navy-50 text-navy-950 pl-11 pr-4 py-3 rounded-xl text-xs border border-navy-150 focus:outline-none focus:border-gold-350 font-sans"
                      />
                    </div>

                    {/* CTAs */}
                    <button
                      type="submit"
                      className="w-full text-center bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider cursor-pointer"
                      id="quiz-lead-submit-btn"
                    >
                      Request Detailed Audit Report
                    </button>
                  </form>
                ) : (
                  // Success Message and Calendly bridge
                  <div className="text-center space-y-4 p-5 bg-emerald-50 bg-opacity-40 border border-emerald-500/20 rounded-2xl">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-5 h-5 text-emerald-800" />
                    </div>
                    <h4 className="text-xs font-bold text-navy-950">Audit Scheduled Successfully!</h4>
                    <p className="text-[11px] text-navy-700 leading-relaxed font-sans max-w-sm mx-auto">
                      Thank you {leadName}. Our South Yarra planning coordinator will construct your custom-matched index report and transmit it directly to <strong>{leadEmail}</strong>. 
                    </p>
                    <button
                      onClick={onBookConsultation}
                      className="inline-flex items-center gap-1.5 text-xs text-gold-650 font-bold hover:text-gold-700 underline mt-2"
                    >
                      <span>Skip waiting — Book instant calendar slot with Anita</span>
                      <span>→</span>
                    </button>
                  </div>
                )}

                <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-navy-100">
                  <button 
                    onClick={handleResetQuiz}
                    className="text-xs text-navy-500 hover:text-navy-805 flex items-center gap-1.5 cursor-pointer"
                    id="quiz-reset"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Re-Take Diagnostic Review</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
