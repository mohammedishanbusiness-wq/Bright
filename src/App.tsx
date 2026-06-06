import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, Calendar, Mail, MapPin, User, Check, Award, ShieldCheck, 
  TrendingUp, Home, HeartHandshake, ArrowRight, Clock, Star, 
  MessageSquare, Users, CheckCircle, ChevronLeft, ChevronRight,
  ShieldAlert, Landmark, Sparkles, Send, Volume2, HelpCircle
} from "lucide-react";

import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import MortgageCalculator from "./components/MortgageCalculator";
import AIAdvisor from "./components/AIAdvisor";
import FinancialHealthScore from "./components/FinancialHealthScore";
import Footer from "./components/Footer";
import ExitIntentPopup from "./components/ExitIntentPopup";
import VoiceAssistantWidget from "./components/VoiceAssistantWidget";

import { TESTIMONIALS, TIMELINE_ADVISORY, GENERAL_FAQS } from "./data";

export default function App() {
  // Navigation Routing: 'home' | 'financial-planning' | 'mortgage-broking' | 'aged-care' | 'about' | 'contact'
  const [currentPage, setCurrentPage] = useState<string>("home");
  
  // Lead submission statuses for general contact form
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactService, setContactService] = useState("Financial Planning");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Booking states
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Active prompt trigger for transferring messages to AI Advisor
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | null>(null);

  // Testimonials slide state
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  // Triggering smooth scrolling inline commands
  const handleTriggerAIQuery = (prompt: string) => {
    setAiInitialPrompt(prompt);
    // Dispatch a custom event to open and query the floating Voice AI Assistant
    const event = new CustomEvent("brightr-voice-query", { detail: { query: prompt } });
    window.dispatchEvent(event);
  };

  const handleOpenConsultationModal = () => {
    setCurrentPage("book-consultation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit contact form coordinates
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    // Reset parameters
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactMessage("");
    }, 5000);
  };

  // Submit reservation slots
  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen flex flex-col pt-0 bg-white selection:bg-gold-200">
      
      {/* Real-time exit intent leads popup tracking */}
      <ExitIntentPopup />

      {/* Main navigation toolbar */}
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onOpenConsultation={handleOpenConsultationModal}
      />

      {/* Dynamic Pages Routing */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* =======================================================
              1. HOME PAGE VIEW
              ======================================================= */}
          {currentPage === "home" && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Compounding Block */}
              <HeroSection 
                onBookConsultation={handleOpenConsultationModal}
                onOpenAIAdvisor={() => handleTriggerAIQuery("Hello! Explain how custom financial planning is structured.")}
                setCurrentPage={setCurrentPage}
              />

              {/* WHY BRIGHTR FINANCIAL - 4 icon cards */}
              <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50/50 border-b border-navy-100">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center max-w-xl mx-auto mb-16">
                    <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">Our Fiduciary Promise</span>
                    <h2 className="font-display font-bold text-3xl text-navy-950 mt-2 mb-4 leading-tight">
                      Why Sophisticated Families <br />
                      <span className="text-gradient-navy-emerald font-extrabold">Align With BrightR</span>
                    </h2>
                    <p className="text-navy-600 text-sm leading-relaxed font-light">
                      We integrate wealth strategy, direct mortgage matches, and compassionate elderly planning into one streamlined lifetime program.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        title: "Personalised Advice",
                        desc: "No prefabricated templates. Every super, investment, and debt recommendation is engineered precisely to support your family's dynamic benchmarks.",
                        icon: MedalPillIcon
                      },
                      {
                        title: "Transparent Guidance",
                        desc: "Clear upfront project or flat planning fees. Absolute clarity across loan matches, commission thresholds, and fee allocations.",
                        icon: TransparentGuidanceIcon
                      },
                      {
                        title: "Long-Term Partnership",
                        desc: "Your wealth plan evolves. We meet annually to update risk appetites, integrate Australian tax changes, and optimize compounding interest.",
                        icon: LongTermIcon
                      },
                      {
                        title: "Holistic Financial Strategy",
                        desc: "We look at the total ledger. Coordinating super assets, mortgage offsets, and aged care deposit placements simultaneously.",
                        icon: HolisticStrategyIcon
                      }
                    ].map((why, idx) => {
                      const IconComp = why.icon;
                      return (
                        <div key={idx} className="bg-white border border-navy-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-10 h-10 bg-gold-50 border border-gold-200/50 rounded-full flex items-center justify-center mb-5">
                            <IconComp />
                          </div>
                          <h4 className="font-display font-semibold text-base text-navy-950 mb-2">{why.title}</h4>
                          <p className="text-navy-600 text-xs leading-relaxed font-light">{why.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* SERVICES HIGHLIGHT ROW SECTION */}
              <ServicesSection 
                onLearnMore={(serviceId) => {
                  setCurrentPage(serviceId);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onBookConsultation={handleOpenConsultationModal}
                onOpenAIQuery={handleTriggerAIQuery}
              />



              {/* HOW IT WORKS / TIMELINE PLANNING DESIGN */}
              <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 border-b border-navy-100">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center max-w-xl mx-auto mb-20">
                    <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display font-medium">Bespoke Blueprint Onboarding</span>
                    <h2 className="font-display font-bold text-3xl text-navy-950 mt-2 mb-4">
                      How It Works: <br />
                      <span className="text-gradient-navy-emerald font-extrabold">Your Path To Financial Brighter</span>
                    </h2>
                    <p className="text-navy-600 text-xs leading-relaxed font-sans max-w-sm mx-auto font-light">
                      Four structured intervals designed to evaluate cash flows, configure secure super structures, and reduce overall debt variables.
                    </p>
                  </div>

                  {/* Timeline grid row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {TIMELINE_ADVISORY.map((step, idx) => {
                      return (
                        <div key={idx} className="relative z-10 flex flex-col items-center text-center p-6 bg-white border border-navy-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                          {/* Step number badge */}
                          <div className="w-14 h-14 bg-navy-900 border-4 border-gold-400 text-white font-display font-black rounded-full flex items-center justify-center text-lg shadow-md mb-6">
                            {step.step}
                          </div>
                          
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-gold-600">{step.timeframe}</span>
                          <h4 className="font-display font-bold text-md text-navy-950 mt-1.5 mb-2">{step.title}</h4>
                          <p className="text-[10px] uppercase tracking-wide font-semibold text-navy-400 mb-2">{step.subtitle}</p>
                          <p className="text-navy-600 text-xs leading-relaxed font-sans font-light">{step.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* How It Works Section ends here */}

              {/* SUCCESS STORIES CAROUSEL / HIGHLIGHT CLIENT reviews */}
              <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-navy-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
                
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">Client Testimonials Of Trust</span>
                    <h2 className="font-display font-bold text-3xl text-navy-950 mt-2 mb-4 leading-tight">
                      Sovereign Success <br />
                      <span className="text-gradient-navy-emerald font-extrabold">Of Australian Families We Guard</span>
                    </h2>
                  </div>

                  {/* Dynamic Slide Panel */}
                  <div className="glass-card rounded-2xl p-8 relative shadow-lg border border-navy-100 flex flex-col md:flex-row gap-8 items-center">
                    
                    {/* Client Portrait representation */}
                    <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-2xl overflow-hidden shadow-md relative group border border-navy-200">
                      <img 
                        src={TESTIMONIALS[currentTestimonialIndex].avatarUrl} 
                        alt={TESTIMONIALS[currentTestimonialIndex].name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Testimonial Quote */}
                    <div className="flex-1 space-y-4">
                      {/* Rating details */}
                      <div className="flex items-center gap-1 text-gold-400">
                        {[...Array(TESTIMONIALS[currentTestimonialIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold-406 text-gold-500" />
                        ))}
                      </div>

                      <p className="text-navy-800 text-xs sm:text-sm leading-relaxed italic font-sans font-light">
                        "{TESTIMONIALS[currentTestimonialIndex].quote}"
                      </p>

                      <div className="pt-2 border-t border-navy-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div>
                          <h4 className="font-display font-bold text-sm text-navy-950">{TESTIMONIALS[currentTestimonialIndex].name}</h4>
                          <p className="text-[10px] text-navy-500">{TESTIMONIALS[currentTestimonialIndex].location} • {TESTIMONIALS[currentTestimonialIndex].service}</p>
                        </div>
                        <span className="text-[9px] uppercase font-bold text-emerald-800 bg-emerald-50 border border-emerald-250 px-2.5 py-1 rounded">
                          {TESTIMONIALS[currentTestimonialIndex].timelineResult}
                        </span>
                      </div>
                    </div>

                    {/* Left/Right carousel markers */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-12">
                      <button 
                        onClick={prevTestimonial}
                        className="w-9 h-9 md:w-11 md:h-11 bg-white hover:bg-neutral-50 text-navy-950 border border-navy-150 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors"
                        id="prev-testimonial-btn"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-12">
                      <button 
                        onClick={nextTestimonial}
                        className="w-9 h-9 md:w-11 md:h-11 bg-white hover:bg-neutral-50 text-navy-950 border border-navy-150 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors"
                        id="next-testimonial-btn"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* FOUNDER PROFILE HIGHLIGHT HOME SUMMARY CARD */}
              <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50/50 border-b border-navy-100">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                  
                  {/* Portrait of Anita */}
                  <div className="w-64 h-64 shrink-0 rounded-2xl overflow-hidden shadow-xl border-4 border-white relative bg-navy-100">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                      alt="Anita Fasciani - Founder of BrightR Financial"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950/80 to-transparent p-4 text-white text-center">
                      <h4 className="font-display font-bold text-xs">Anita Fasciani</h4>
                      <p className="text-[10px] text-gold-300">Managing Director & Senior Planner</p>
                    </div>
                  </div>

                  {/* Biography text block */}
                  <div className="flex-1 space-y-6 text-left">
                    <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">Elite Australian Credentials</span>
                    <h2 className="font-display font-extrabold text-3xl text-navy-950 leading-tight">
                      Meet Managing Director <br />
                      <span className="text-gradient-navy-emerald font-extrabold">Anita Fasciani</span>
                    </h2>
                    
                    <p className="text-navy-700 text-xs sm:text-sm leading-relaxed font-sans font-light">
                      Growing up in Melbourne, financial planning represented a natural daily dinner table exchange. Anita launched her professional planning focus under standard CBA guidelines in 2008. In 2011, she transitioned to CF Wealth, the private wealth strategic firm co-founded by her mother Josephine Fasciani and veteran financial partner Selwyn Cohen. 
                    </p>
                    <p className="text-navy-700 text-xs sm:text-sm leading-relaxed font-sans font-light">
                      Establishing BrightR Financial represented the next logical phase to incorporate holistic mortgage broker expertise—enabling her clients to secure home equity alongside superannuation optimization.
                    </p>

                    <div className="grid grid-cols-2 gap-4 border-t border-navy-100 pt-6">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gold-600 block">Experience Since</span>
                        <span className="font-display font-bold text-lg text-navy-900">2008 (CBA Legacy)</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gold-600 block">Licensing Credential</span>
                        <span className="font-display font-bold text-lg text-navy-900">ASIC Registered Broker</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setCurrentPage("about");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-1 text-sm text-navy-900 hover:text-gold-600 font-bold transition-all cursor-pointer"
                        id="home-about-link-btn"
                      >
                        <span>Learn Anita's Full Professional Legacy</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* CALENDLY BOOKING CALL TO ACTION SECTION */}
              <section className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-950 text-white relative">
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-emerald-950/40 opacity-90 -z-10 animate-fade-in"></div>
                <div className="max-w-4xl mx-auto text-center space-y-6">
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-bold font-display">Bespoke Australian Capital Advisory</span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gradient-gold leading-tight">
                    Let's Build Your <br />Financial Future Together
                  </h2>
                  <p className="text-navy-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-sans font-light">
                    Claim your complimentary 45-minute discovery consultation in our South Yarra showroom or via secure Zoom. No pressure, zero-obligation roadmap planning.
                  </p>

                  <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={handleOpenConsultationModal}
                      className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 font-bold text-xs py-4 px-8 rounded-full shadow-lg transition-all cursor-pointer uppercase tracking-wider"
                      id="home-banner-action-book"
                    >
                      Book 1-on-1 Consultation Slot
                    </button>
                    <a
                      href="tel:0398262633"
                      className="border border-navy-700 hover:bg-navy-900 text-white font-bold text-xs py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>Call (03) 9826 2633</span>
                    </a>
                  </div>
                </div>
              </section>

              {/* INTERACTIVE FAQ SECTION CONTAINER */}
              <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-navy-100">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16">
                    <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">FAQ Central Desk</span>
                    <h2 className="font-display font-extrabold text-3xl text-navy-950 mt-2 mb-4 leading-tight">
                      Answers Regarding <br />
                      <span className="text-gradient-navy-emerald">Australian Regulatory Structures</span>
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {GENERAL_FAQS.map((faq, idx) => {
                      return (
                        <div key={idx} className="border border-navy-100 rounded-2xl p-5 bg-neutral-50/40 relative">
                          <span className="text-[10px] uppercase font-bold text-gold-650 tracking-wider bg-gold-100/50 px-2.5 py-0.5 rounded absolute top-5 right-5">
                            {faq.category}
                          </span>
                          <h4 className="font-display font-bold text-md text-navy-950 pr-24">{faq.question}</h4>
                          <p className="text-navy-700 text-xs leading-relaxed font-sans mt-3.5 font-light">
                            {faq.answer}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* =======================================================
              2. FINANCIAL PLANNING DETAIL PAGE
              ======================================================= */}
          {currentPage === "financial-planning" && (
            <motion.div
              key="planning-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ServicesSection 
                isDetailedView={true} 
                activeServiceId="financial-planning"
                onLearnMore={() => setCurrentPage("home")}
                onBookConsultation={handleOpenConsultationModal}
                onOpenAIQuery={handleTriggerAIQuery}
              />
            </motion.div>
          )}

          {/* =======================================================
              3. MORTGAGE BROKING DETAIL PAGE
              ======================================================= */}
          {currentPage === "mortgage-broking" && (
            <motion.div
              key="mortgage-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ServicesSection 
                isDetailedView={true} 
                activeServiceId="mortgage-broking"
                onLearnMore={() => setCurrentPage("home")}
                onBookConsultation={handleOpenConsultationModal}
                onOpenAIQuery={handleTriggerAIQuery}
              />
              {/* Embed calculator on landing to guarantee conversion */}
              <div className="bg-neutral-50 py-4 border-t border-navy-100">
                <MortgageCalculator onBookConsultation={handleOpenConsultationModal} />
              </div>
            </motion.div>
          )}

          {/* =======================================================
              4. AGED CARE ADVICE DETAIL PAGE
              ======================================================= */}
          {currentPage === "aged-care" && (
            <motion.div
              key="aged-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ServicesSection 
                isDetailedView={true} 
                activeServiceId="aged-care"
                onLearnMore={() => setCurrentPage("home")}
                onBookConsultation={handleOpenConsultationModal}
                onOpenAIQuery={handleTriggerAIQuery}
              />
            </motion.div>
          )}

          {/* =======================================================
              5. ABOUT PAGE VIEW (Anita's complete history timeline)
              ======================================================= */}
          {currentPage === "about" && (
            <motion.div
              key="about-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
              id="about-full-view"
            >
              <div className="max-w-4xl mx-auto">
                {/* Back home arrow */}
                <button 
                  onClick={() => setCurrentPage("home")}
                  className="text-xs font-semibold text-gold-600 hover:text-gold-700 transition-colors mb-8 cursor-pointer"
                  id="about-back"
                >
                  ← Back to Home
                </button>

                <div className="border-b border-navy-100 pb-10 mb-12">
                  <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">The BrightR Heritage</span>
                  <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy-950 mt-2 mb-4 leading-tight">
                    Our Roots & Legacy
                  </h1>
                  <p className="text-navy-600 text-base leading-relaxed font-sans font-light">
                    How decades of corporate financial planning at CBA and CF Wealth evolved into Melbourne's primary client-centric advisor.
                  </p>
                </div>

                {/* Grid for timeline details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                  
                  {/* Portrait & credentials cards left */}
                  <div className="md:col-span-5 space-y-6">
                    <div className="rounded-2xl overflow-hidden shadow-lg bg-navy-100 border border-navy-200">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                        alt="Anita Fasciani Headshot"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="glass-card rounded-2xl p-6 space-y-4">
                      <span className="text-[10px] uppercase font-bold text-gold-600 tracking-wider">Accreditations & Registry</span>
                      <ul className="space-y-2.5 text-xs text-navy-800 font-sans">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-800" />
                          <span>Senior FASEA Accredited Planner</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-800" />
                          <span>Member of Financial Advice Association (FAAA)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-800" />
                          <span>Licenced Australian Mortgage Broker (FBAA)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-800" />
                          <span>Aged Care Financial Specialist (Accredited)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Complete Narrative Text right */}
                  <div className="md:col-span-7 space-y-8 text-left">
                    <div className="space-y-4">
                      <h3 className="font-display font-medium text-xl text-gradient-navy-emerald">The CBA Birth (2008)</h3>
                      <p className="text-navy-800 text-xs sm:text-sm leading-relaxed font-sans font-light">
                        Anita Fasciani embarked on her financial planning career in 2008 with the Commonwealth Bank of Australia (CBA). Navigating complex portfolios during the Global Financial Crisis instilled an absolute dedication to risk shielding, defensive capital structuring, and robust strategic compounding benchmarks.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-display font-medium text-xl text-gradient-navy-emerald">CF Wealth Co-Foundation Era (2011)</h3>
                      <p className="text-navy-800 text-xs sm:text-sm leading-relaxed font-sans font-light">
                        In 2011, Anita stepped into private wealth by uniting with CF Wealth—the respected bespoke financial planning consultancy co-founded by her mother, Josephine Fasciani, and veteran finance partner Selwyn Cohen. 
                      </p>
                      <p className="text-navy-805 text-xs sm:text-sm leading-relaxed font-sans font-light">
                        This mother-daughter legacy formed the core philosophy of "Families helping families build legacys." Over a decade, Anita optimized super streams, protected retirement accounts, and drafted millions of dollars of successful wealth designs.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-display font-medium text-xl text-gradient-navy-emerald">BrightR Financial Evolution</h3>
                      <p className="text-navy-800 text-xs sm:text-sm leading-relaxed font-sans font-light">
                        Recognizing that traditional planning completely neglected our clients' absolute secondary liability—mortgages—Anita rebranded and established BrightR Financial. By blending senior super advice with accredited mortgage broking, she eliminates major bank friction, sources lower rates manually, and couples debt mitigation immediately with wealth building.
                      </p>
                    </div>

                    {/* Timeline CTA */}
                    <div className="pt-4 border-t border-navy-100">
                      <h4 className="text-sm font-bold text-navy-950 font-display">Schedule a face-to-face mapping session in South Yarra</h4>
                      <p className="text-xs text-navy-500 font-sans mt-0.5 mb-4">Meet Anita Fasciani in person or secure a Zoom window.</p>
                      <button
                        onClick={handleOpenConsultationModal}
                        className="bg-navy-900 text-white hover:bg-navy-950 font-semibold px-6 py-2.5 rounded-full text-xs shadow-md transition-colors cursor-pointer"
                        id="about-action-book"
                      >
                        Book Discovery Consultation with Anita
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* =======================================================
              6. CONTACT PAGE VIEW (Includes Form and Google Maps)
              ======================================================= */}
          {currentPage === "contact" && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
              id="contact-full-view"
            >
              <div className="max-w-5xl mx-auto">
                <button 
                  onClick={() => setCurrentPage("home")}
                  className="text-xs font-semibold text-gold-600 hover:text-gold-700 transition-colors mb-8 cursor-pointer"
                  id="contact-back"
                >
                  ← Back to Home
                </button>

                <div className="border-b border-navy-100 pb-10 mb-12 text-center md:text-left">
                  <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">South Yarra Head Showroom</span>
                  <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy-950 mt-2 mb-4">
                    Contact Our Advisors
                  </h1>
                  <p className="text-navy-600 text-sm leading-relaxed max-w-2xl font-light">
                    Contact Anita and our customer response team directly. We are happy to coordinate phone reviews or coordinate physical office visits.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                  
                  {/* Left Contact Form Panel Column */}
                  <div className="md:col-span-6 bg-neutral-50/50 p-6 sm:p-8 rounded-2xl border border-navy-150 shadow-sm text-left">
                    {!contactSubmitted ? (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <h3 className="font-display font-bold text-lg text-navy-950 mb-4">Transmission coordinates</h3>
                        
                        {/* Name */}
                        <div>
                          <label className="block text-[11px] uppercase font-bold text-navy-700 mb-1.5 font-display">Full Name</label>
                          <input 
                            type="text" 
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="John Citizen"
                            className="w-full bg-white text-navy-950 px-4 py-3 rounded-xl text-xs border border-navy-150 focus:outline-none focus:border-gold-350 font-sans"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-[11px] uppercase font-bold text-navy-700 mb-1.5 font-display">Email Address</label>
                          <input 
                            type="email" 
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="john@example.com.au"
                            className="w-full bg-white text-navy-950 px-4 py-3 rounded-xl text-xs border border-navy-150 focus:outline-none focus:border-gold-350 font-sans"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-[11px] uppercase font-bold text-navy-700 mb-1.5 font-display">Phone Number</label>
                          <input 
                            type="tel" 
                            required
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            placeholder="0400 000 000"
                            className="w-full bg-white text-navy-950 px-4 py-3 rounded-xl text-xs border border-navy-150 focus:outline-none focus:border-gold-350 font-sans"
                          />
                        </div>

                        {/* Service Required dropdown */}
                        <div>
                          <label className="block text-[11px] uppercase font-bold text-navy-700 mb-1.5 font-display">Service Domain Required</label>
                          <select 
                            value={contactService} 
                            onChange={(e) => setContactService(e.target.value)}
                            className="w-full bg-white text-navy-950 px-4 py-3 rounded-xl text-xs border border-navy-150 focus:outline-none focus:border-gold-350 font-sans"
                          >
                            <option value="Financial Planning">Financial Planning & SMSF</option>
                            <option value="Mortgage Broking">Mortgage Broking & Interest Reduction</option>
                            <option value="Aged Care Advice">Aged Care Asset Protection</option>
                            <option value="General Consultation">General Advisory Inquiries</option>
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-[11px] uppercase font-bold text-navy-700 mb-1.5 font-display">Your Message</label>
                          <textarea 
                            rows={4}
                            required
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="Tell us about your Super transition target or mortgage refinancing goals..."
                            className="w-full bg-white text-navy-950 px-4 py-3 rounded-xl text-xs border border-navy-150 focus:outline-none focus:border-gold-350 font-sans"
                          ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full text-center bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider cursor-pointer transition-colors"
                          id="contact-form-submit"
                        >
                          Transmit Advisory Inquiry
                        </button>
                      </form>
                    ) : (
                      // Contact success panels
                      <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                          <Check className="w-6 h-6 text-emerald-800" />
                        </div>
                        <h3 className="font-display font-bold text-lg text-navy-950">Inquiry Received Successfully</h3>
                        <p className="text-xs text-navy-700 max-w-sm mx-auto font-sans font-light leading-relaxed">
                          Thank you <strong>{contactName}</strong>. Your inquiry regarding <strong>{contactService}</strong> has been transmitted to Anita Fasciani's South Yarra scheduling queue. We will check coordinates and follow up via email (<strong>{contactEmail}</strong>) or phone within 4 business hours.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Coordinates map details Column */}
                  <div className="md:col-span-6 space-y-8">
                    
                    {/* Visual coordinates listings */}
                    <div className="glass-card p-6 rounded-2xl border border-navy-150 space-y-4 text-left">
                      <h4 className="font-display font-bold text-md text-navy-950 uppercase tracking-widest text-xs text-gold-600 mb-2">Office Headquarters</h4>
                      
                      <div className="flex gap-3.5 items-start">
                        <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-navy-900">Physical address:</p>
                          <p className="text-xs text-navy-700 font-sans mt-0.5">Suite 29, Level 3, 25 Claremont St, South Yarra VIC 3141</p>
                        </div>
                      </div>

                      <div className="flex gap-3.5 items-start">
                        <Phone className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-navy-900">Reception Line:</p>
                          <p className="text-xs text-navy-700 font-sans mt-0.5">(03) 9826 2633</p>
                        </div>
                      </div>

                      <div className="flex gap-3.5 items-start">
                        <Mail className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-navy-900">Advisory Mail Inbox:</p>
                          <p className="text-xs text-navy-700 font-sans mt-0.5">anita@brightrfinancial.com.au</p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Mock Styled Google Map to prevent iframe breakages */}
                    <div className="rounded-2xl overflow-hidden border border-navy-150 h-64 relative bg-navy-50 flex items-center justify-center">
                      {/* Grid representation */}
                      <div className="absolute inset-0 bg-navy-100 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(#192b4a 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                      
                      {/* Visual Map graphic representations */}
                      <div className="relative text-center p-6 space-y-3 z-10">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto border-2 border-red-500 shadow animate-bounce">
                          <MapPin className="w-5 h-5 text-red-650" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold font-display text-navy-950">25 Claremont St, South Yarra</h4>
                          <p className="text-[10px] text-navy-500 mt-0.5">Level 3, Suite 29 (South Yarra Station Precinct)</p>
                        </div>
                        <a 
                          href="https://maps.google.com/?q=25+Claremont+St,+South+Yarra+VIC+3141" 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 bg-navy-900 text-white text-[10px] uppercase tracking-wider font-extrabold py-2 px-4 rounded-lg shadow hover:bg-navy-950 transition-colors"
                        >
                          <span>Open in native Google Maps</span>
                          <span>↗</span>
                        </a>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* =======================================================
              7. BOOK CONSULTATION INTERACTIVE SCHEDULER
              ======================================================= */}
          {currentPage === "book-consultation" && (
            <motion.div
              key="booking-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50/50"
              id="booking-full-view"
            >
              <div className="max-w-4xl mx-auto">
                <button 
                  onClick={() => setCurrentPage("home")}
                  className="text-xs font-semibold text-gold-600 hover:text-gold-700 transition-colors mb-8 cursor-pointer"
                  id="booking-back"
                >
                  ← Back to Home Overview Dashboard
                </button>

                <div className="text-center max-w-xl mx-auto mb-12">
                  <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">Clarity Calendar Scheduler</span>
                  <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy-950 mt-2 mb-4 leading-tight">
                    Secure Your Direct <br />Advisory Time slot
                  </h1>
                  <p className="text-navy-600 text-sm leading-relaxed font-light">
                    Select a mutually available date and hour below to book your complimentary 45-minute discovery consultation with Anita Fasciani.
                  </p>
                </div>

                {/* Inline Calendly Simulation widget block */}
                <div className="glass-card bg-white rounded-3xl border border-navy-150 overflow-hidden shadow-xl" id="calendar-booking-panel">
                  {!bookingConfirmed ? (
                    <form onSubmit={handleBookingConfirm} className="grid grid-cols-1 md:grid-cols-12">
                      
                      {/* Left booking info inputs */}
                      <div className="p-8 md:col-span-7 space-y-6 text-left border-r border-navy-100">
                        <div className="flex gap-3 items-center pb-4 border-b border-navy-50">
                          <div className="w-10 h-10 bg-gold-50 border border-gold-200 rounded-full flex items-center justify-center">
                            <Clock className="w-5 h-5 text-gold-600" />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest">Discovery Roadmap</h3>
                            <p className="text-[10px] text-navy-500 font-sans mt-0.5">45 Min • South Yarra Showroom or secure Zoom</p>
                          </div>
                        </div>

                        {/* Date selection */}
                        <div>
                          <label className="block text-[11px] uppercase font-bold text-navy-800 mb-2 font-display">1. Choose Consultation Date</label>
                          <input 
                            type="date"
                            required
                            min={new Date().toISOString().split("T")[0]}
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="w-full bg-navy-50 text-navy-950 px-4 py-3 rounded-xl text-xs border border-navy-150 focus:outline-none focus:border-gold-350 font-semibold cursor-pointer"
                          />
                        </div>

                        {/* Hour slot selection options */}
                        <div>
                          <label className="block text-[11px] uppercase font-bold text-navy-800 mb-2 font-display">2. Select Hour Target</label>
                          <div className="grid grid-cols-2 gap-2.5">
                            {["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:30 PM"].map((timeTarget) => (
                              <button
                                key={timeTarget}
                                type="button"
                                onClick={() => setBookingTime(timeTarget)}
                                className={`py-3 rounded-xl text-center text-xs font-semibold border transition-all cursor-pointer ${
                                  bookingTime === timeTarget 
                                    ? "bg-navy-900 text-white border-navy-900 shadow-sm" 
                                    : "bg-white text-navy-800 border-navy-200 hover:bg-navy-50"
                                }`}
                                id={`slot-btn-${timeTarget.replace(/[\s:]/g, '')}`}
                              >
                                {timeTarget}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Confirm details */}
                      <div className="p-8 md:col-span-5 bg-navy-900 text-white flex flex-col justify-between">
                        <div className="space-y-6 text-left">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-gold-400 bg-gold-400/10 px-2 py-0.5 rounded">Schedule Confirmation</span>
                          
                          <div className="space-y-4">
                            <div>
                              <p className="text-[10px] text-navy-450 uppercase tracking-widest font-bold">Selected Slot:</p>
                              <p className="text-md font-bold text-gradient-gold mt-1">
                                {bookingDate ? new Date(bookingDate).toLocaleDateString("en-AU", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Select a date..."}
                              </p>
                              <p className="text-xs text-navy-300 font-semibold">{bookingTime ? `At ${bookingTime} (Melbourne Time)` : "Select a time slot..."}</p>
                            </div>

                            <div className="border-t border-navy-800 pt-4 space-y-1 text-xs text-navy-400 font-sans">
                              <p className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> No alignment obligations</p>
                              <p className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Free Statement of Advice checklist</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-navy-800 mt-6">
                          <button
                            type="submit"
                            disabled={!bookingDate || !bookingTime}
                            className="w-full text-center bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-950 font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            id="confirm-booking-submit"
                          >
                            Lock Advisory Calendar Slot
                          </button>
                        </div>
                      </div>

                    </form>
                  ) : (
                    // Booking Confirmed Panel
                    <div className="p-12 text-center space-y-5 flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse border-4 border-white shadow-md">
                        <Check className="w-8 h-8 text-emerald-800" />
                      </div>
                      
                      <div className="space-y-2">
                        <h2 className="font-display font-bold text-2xl text-navy-950">Discovery Roadmap Secured!</h2>
                        <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-305 px-4 py-1.5 rounded-full uppercase tracking-wider">
                          Reserved Slot: {new Date(bookingDate).toLocaleDateString("en-AU", { month: "short", day: "numeric" })} @ {bookingTime}
                        </span>
                        <p className="text-xs text-navy-600 leading-relaxed font-sans max-w-md mx-auto pt-4 leading-relaxed">
                          A secure calendar invite and complimentary Zoom link have been created. Anita Fasciani's coordinator will email you within 2 business hours to verify any current super balances and debt metrics to prepare before your session.
                        </p>
                      </div>

                      <div className="pt-6">
                        <button
                          onClick={() => {
                            setBookingConfirmed(false);
                            setBookingDate("");
                            setBookingTime("");
                            setCurrentPage("home");
                          }}
                          className="bg-navy-900 hover:bg-navy-950 text-white font-semibold text-xs px-6 py-2.5 rounded-lg shadow pointer-events-auto cursor-pointer"
                          id="booking-confirm-close-btn"
                        >
                          Return to Home Overview
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Dial Assistance */}
                <div className="mt-8 text-center text-xs text-navy-500 font-sans">
                  <span>Require an urgent booking or custom weekend hours? Dial </span>
                  <a href="tel:0398262633" className="font-bold text-navy-900 hover:underline">(03) 9826 2633</a>
                  <span> for priority dispatch.</span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER DESK */}
      <Footer 
        setCurrentPage={setCurrentPage} 
        onOpenConsultation={handleOpenConsultationModal}
      />

      {/* FLOATING VOICE AI ASSISTANT EMBED WIDGET */}
      <VoiceAssistantWidget />

    </div>
  );
}

// Custom Micro icons to render without external stylesheet dependencies
function MedalPillIcon() {
  return <Award className="w-5 h-5 text-gold-600" />;
}
function TransparentGuidanceIcon() {
  return <CheckCircle className="w-5 h-5 text-gold-600" />;
}
function LongTermIcon() {
  return <Clock className="w-5 h-5 text-gold-600" />;
}
function HolisticStrategyIcon() {
  return <TrendingUp className="w-5 h-5 text-gold-600" />;
}
