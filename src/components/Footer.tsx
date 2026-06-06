import React from "react";
import { Mail, Phone, MapPin, Globe, ShieldCheck, Heart, ArrowUp, Award } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
  onOpenConsultation: () => void;
}

export default function Footer({ setCurrentPage, onOpenConsultation }: FooterProps) {
  
  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-950 text-white font-sans" id="app-footer-block">
      {/* Upper micro footer for quick booking prompt */}
      <div className="border-b border-navy-900 bg-navy-950/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-400/10 rounded-full flex items-center justify-center border border-gold-400/20">
              <Award className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gradient-gold font-display">Clarity. Confidence. A BrightR Future.</h4>
              <p className="text-[11px] text-navy-400">South Yarra's multi-generational wealth & borrowing specialists since 2008.</p>
            </div>
          </div>
          <button
            onClick={onOpenConsultation}
            className="bg-white hover:bg-gold-100 text-navy-950 text-xs font-bold px-6 py-2.5 rounded-full transition-all shrink-0 cursor-pointer shadow-lg"
          >
            Schedule Free Advisory Call
          </button>
        </div>
      </div>

      {/* Main Footer lists */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Brand column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative shrink-0">
              <div className="absolute w-8 h-8 border-t-3 border-r-3 border-indigo-400 rounded-full rotate-45"></div>
              <div className="absolute w-6 h-6 border-t-3 border-r-3 border-emerald-400 rounded-full rotate-45"></div>
              <div className="absolute w-4 h-4 border-t-3 border-r-3 border-gold-400 rounded-full rotate-45"></div>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-gradient-gold">BrightR Financial</span>
          </div>

          <p className="text-xs text-navy-400 leading-relaxed font-light max-w-sm">
            Bespoke financial planning modules, mortgage matching mechanisms, and comprehensive aged care security advice designed under one unified family legacy objective.
          </p>

          <div className="pt-2 space-y-2 text-[11px] text-navy-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>Suite 29, Level 3, 25 Claremont St, South Yarra VIC 3141</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <a href="tel:0398262633" className="hover:text-gold-200">(03) 9826 2633</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <a href="mailto:anita@brightrfinancial.com.au" className="hover:text-gold-200">anita@brightrfinancial.com.au</a>
            </div>
          </div>
        </div>

        {/* Quick Route Paths column */}
        <div className="space-y-4 md:pl-12">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Advisory Modules</h4>
          <ul className="space-y-2.5 text-xs text-navy-400">
            <li>
              <button onClick={() => handleNavigate("financial-planning")} className="hover:text-gold-400 cursor-pointer">
                Financial Planning & SMSF
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate("mortgage-broking")} className="hover:text-gold-400 cursor-pointer">
                Home Loans & Direct Broking
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate("aged-care")} className="hover:text-gold-400 cursor-pointer">
                Aged Care RAD/DAP Planning
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate("about")} className="hover:text-gold-400 cursor-pointer">
                About Managing Director Anita Fasciani
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal micro rows */}
      <div className="bg-navy-950/90 border-t border-navy-900 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-navy-500">
          <div>
            <span>© {new Date().getFullYear()} BrightR Financial Australia. All Rights Reserved. South Yarra, Melbourne.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={handleScrollTop} className="hover:text-white flex items-center gap-1 transition-colors text-xs font-semibold cursor-pointer">
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
