import React from "react";
import { motion } from "motion/react";
import { Home, TrendingUp, HeartHandshake, Check, ShieldAlert, Award, FileText, ArrowRight, CornerDownRight } from "lucide-react";
import { SERVICES_DATA } from "../data";
import { ServiceItem } from "../types";

interface ServicesSectionProps {
  onLearnMore: (serviceId: "financial-planning" | "mortgage-broking" | "aged-care") => void;
  isDetailedView?: boolean;
  activeServiceId?: "financial-planning" | "mortgage-broking" | "aged-care";
  onBookConsultation: () => void;
  onOpenAIQuery: (initialPrompt: string) => void;
}

export default function ServicesSection({ 
  onLearnMore, 
  isDetailedView = false, 
  activeServiceId, 
  onBookConsultation,
  onOpenAIQuery
}: ServicesSectionProps) {

  const getIcon = (name: string) => {
    switch (name) {
      case "TrendingUp": return <TrendingUp className="w-6 h-6 text-emerald-800" />;
      case "Home": return <Home className="w-6 h-6 text-emerald-800" />;
      case "HeartHandshake": return <HeartHandshake className="w-6 h-6 text-emerald-800" />;
      default: return <TrendingUp className="w-6 h-6 text-emerald-800" />;
    }
  };

  // 1. Detailed Landing Page View (when clicked and navigating to a specific service tab)
  if (isDetailedView && activeServiceId) {
    const service = SERVICES_DATA.find(s => s.id === activeServiceId);
    if (!service) return null;

    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white" id={`service-detail-${activeServiceId}`}>
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <button 
            onClick={() => onLearnMore(service.id)} // Will toggle back or general routing
            className="group flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors mb-8 cursor-pointer"
            id="service-back-btn"
          >
            ← Back to Home Overview Overviews
          </button>

          {/* Page main title */}
          <div className="border-b border-navy-100 pb-10 mb-12">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">{service.badge}</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy-950 mt-2 mb-4 leading-tight">
              Premium {service.title} Services
            </h1>
            <p className="text-navy-700 text-lg leading-relaxed max-w-3xl font-light">
              {service.longDescription}
            </p>
          </div>

          {/* Grid Layout of Detailed Page */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left core content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-6">
                <h2 className="font-display font-semibold text-xl text-navy-900 border-l-4 border-gold-400 pl-4">
                  Our Structural Methodologies
                </h2>
                {service.fullContent.map((paragraph, index) => (
                  <p key={index} className="text-navy-800 leading-relaxed font-sans font-light">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Dynamic trigger tool to chat with advisor regarding this specific topic */}
              <div className="bg-navy-50/70 border border-navy-100 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <HeartHandshake className="w-16 h-16 text-navy-900" />
                </div>
                <h4 className="text-sm font-bold text-navy-950 font-display flex items-baseline gap-1">
                  <span>Understand {service.title} Options Instantly</span>
                </h4>
                <p className="text-xs text-navy-600 mt-1 max-w-md">
                  Tap below to prompt our AI Assistant regarding specific Australian regulatory guidelines or personal {service.title} equations.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button 
                    onClick={() => onOpenAIQuery(`What are the key tax reduction options for ${service.title} in Melbourne?`)}
                    className="bg-white hover:bg-navy-100 text-navy-800 text-xs px-3.5 py-2 rounded-lg border border-navy-200 transition-colors flex items-center gap-1.5 cursor-pointer text-left font-medium"
                  >
                    <CornerDownRight className="w-3 h-3 text-gold-600" />
                    <span>Melbourne tax reduction tips?</span>
                  </button>
                  <button 
                    onClick={() => onOpenAIQuery(`Help me understand the current ${service.title} fee models.`)}
                    className="bg-white hover:bg-navy-100 text-navy-800 text-xs px-3.5 py-2 rounded-lg border border-navy-200 transition-colors flex items-center gap-1.5 cursor-pointer text-left font-medium"
                  >
                    <CornerDownRight className="w-3 h-3 text-gold-600" />
                    <span>How do fees work?</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Quick Summary Card Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-card border border-navy-100 rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-navy-50">
                  <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center">
                    {getIcon(service.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-navy-500 tracking-wider">Expertise Highlights</span>
                    <h3 className="text-md font-bold text-navy-950 leading-tight">{service.title} Checklist</h3>
                  </div>
                </div>

                <ul className="space-y-3.5 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-800" />
                      </div>
                      <span className="text-xs text-navy-800 font-medium font-sans leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-navy-50 pt-4 mb-6">
                  <p className="text-[10px] uppercase font-bold text-gold-600 tracking-wider">Fee Structure</p>
                  <p className="text-xs text-navy-700 mt-1 italic font-sans leading-relaxed">
                    {service.pricingModel}
                  </p>
                </div>

                <button
                  onClick={onBookConsultation}
                  className="w-full text-center bg-navy-900 text-white hover:bg-navy-950 font-semibold text-xs py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
                  id={`service-book-${service.id}`}
                >
                  Book Secure {service.title} Strategy Consultation
                </button>
              </div>

              {/* Credentials / Advisory trust banner */}
              <div className="border border-gold-200 bg-gold-50/50 rounded-xl p-5 flex gap-3.5 items-start">
                <FileText className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wide">Fiduciary Standards Guaranteed</h4>
                  <p className="text-[11px] text-navy-700 font-sans mt-1 leading-relaxed">
                    All recommendation models are structured of qualified, ASIC-regulated statements of advice (SOA). No hidden alignment with single loan products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Standard Landing/Main Page Service Cards Highlight (placed on front page)
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-navy-100 relative" id="services-highlight-block">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold font-display">Specialist Australian Advice</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy-950 mt-2 mb-4 leading-tight">
            Holistic Financial Guidance <br />
            <span className="text-gradient-navy-emerald">Tailored For Your Family</span>
          </h2>
          <p className="text-navy-600 font-light text-md max-w-xl mx-auto leading-relaxed">
            Securing compound returns, sourcing optimized home loan interest levels, and protecting elder care equity under one single unified strategy.
          </p>
        </div>

        {/* 3 cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl p-6.5 flex flex-col justify-between"
                id={`home-service-card-${service.id}`}
              >
                <div>
                  {/* Icon Block */}
                  <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center mb-6">
                    {getIcon(service.iconName)}
                  </div>

                  <span className="text-[10px] uppercase font-bold text-gold-600 tracking-widest font-display block mb-1">
                    {service.badge}
                  </span>
                  
                  <h3 className="font-display font-bold text-xl text-navy-950 mb-3 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-navy-600 text-xs font-light leading-relaxed mb-6 font-sans">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-[11px] text-navy-700 font-medium font-sans">
                        <Check className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-navy-50 flex items-center justify-between">
                  {/* Detailed Page Route Target */}
                  <button
                    onClick={() => onLearnMore(service.id)}
                    className="text-xs font-bold text-navy-950 hover:text-gold-600 transition-colors flex items-center gap-1 group/btn cursor-pointer"
                    id={`learn-more-btn-${service.id}`}
                  >
                    <span>Learn More Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-600 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                  <span className="text-[10px] text-navy-400 font-mono italic">Licensed Advice</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
