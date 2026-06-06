import React, { useState } from "react";
import { Phone, Calendar, Menu, X, Shield, Globe, Award } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onOpenConsultation: () => void;
}

export default function Navigation({ currentPage, setCurrentPage, onOpenConsultation }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "financial-planning", label: "Financial Planning" },
    { id: "mortgage-broking", label: "Mortgage Broking" },
    { id: "aged-care", label: "Aged Care" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-navy-100">
      {/* Main navigation toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo and Brand */}
        <button 
          onClick={() => handleNavigate("home")} 
          className="flex items-center gap-3 group text-left cursor-pointer"
          id="nav-logo-btn"
        >
          {/* Logo representation - double arc rainbow matching colors */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Double Arc Rainbow Graphic built out of CSS Rings */}
            <div className="absolute w-10 h-10 border-t-3 border-r-3 border-indigo-500 rounded-full rotate-45"></div>
            <div className="absolute w-8 h-8 border-t-3 border-r-3 border-emerald-500 rounded-full rotate-45"></div>
            <div className="absolute w-6 h-6 border-t-3 border-r-3 border-gold-400 rounded-full rotate-45"></div>
          </div>
          <div>
            <div className="flex items-baseline">
              <span className="font-display font-bold text-xl tracking-tight text-navy-900 group-hover:text-navy-700 transition-colors">BrightR</span>
              <span className="font-sans font-light text-xl tracking-wider text-navy-600 ml-1">Financial</span>
            </div>
            <p className="text-[10px] uppercase tracking-wider text-gold-600 font-medium font-display leading-none">Australia</p>
          </div>
        </button>

        {/* Desktop Menu links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`text-sm font-medium tracking-wide transition-colors py-2 relative cursor-pointer ${
                currentPage === item.id 
                  ? "text-navy-900 font-semibold border-b-2 border-gold-400" 
                  : "text-navy-700 hover:text-navy-950 hover:border-b-2 hover:border-navy-200"
              }`}
              id={`nav-item-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action button triggers */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="flex items-center gap-2 bg-navy-900 text-white hover:bg-navy-950 font-medium text-sm px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
            id="nav-action-consultation"
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            Book Free Consultation
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-navy-800 hover:text-navy-950 focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
          id="nav-mobile-hamburger"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Flyout */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-32 bg-white/95 backdrop-blur-lg border-b border-navy-100 shadow-2xl py-6 px-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-300 z-40 transition-all">
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-navy-50">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`text-left p-2.5 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.id 
                    ? "bg-navy-50 text-navy-950 font-bold" 
                    : "text-navy-700 hover:bg-navy-50"
                }`}
                id={`nav-mobile-item-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center flex items-center justify-center gap-2 bg-navy-900 text-white font-semibold py-3 rounded-full shadow-md text-sm cursor-pointer"
              id="nav-mobile-action-consult"
            >
              <Calendar className="w-4 h-4 text-gold-400" />
              Book Consult
            </button>
            <a
              href="tel:0398262633"
              className="w-full text-center flex items-center justify-center gap-2 border border-navy-200 text-navy-900 font-medium py-3 rounded-full text-sm hover:bg-navy-50"
            >
              <Phone className="w-4 h-4 text-emerald-800" />
              Call (03) 9826 2633
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
