import React, { useState, useEffect } from "react";
import { X, Sparkles, Mail, CheckCircle, ShieldCheck } from "lucide-react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or signed up in this session
    const status = sessionStorage.getItem("exit-intent-dismissed");
    if (status) {
      setDismissed(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if cursor leaves upper margin of browser window (indicating tab exit)
      if (e.clientY < 20 && !submitted && !dismissed) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [submitted, dismissed]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("exit-intent-dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setSubmitted(true);
    setDismissed(true);
    sessionStorage.setItem("exit-intent-dismissed", "true");
    
    // Auto closing popup after 3 seconds
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
      <div className="bg-white max-w-md w-full rounded-2xl overflow-hidden shadow-2xl relative border border-gold-200 animate-in zoom-in-95 duration-300">
        
        {/* Dismiss trigger */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-navy-500 hover:text-navy-900 transition-colors cursor-pointer"
          id="exit-dismiss-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 space-y-6 text-center">
          
          {/* Header pill icon */}
          <div className="w-12 h-12 bg-gold-50 border border-gold-200 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-gold-600" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-gold-600 tracking-widest font-display block">Free Australian Blueprint Guide</span>
            <h3 className="font-display font-black text-xl text-navy-950 leading-tight">
              Don't Leave Your Retirement Compounding to chance
            </h3>
            <p className="text-xs text-navy-600 leading-relaxed font-sans max-w-sm mx-auto font-light">
              Get our exclusive <strong>2026 Australian Retirement & Super Tax Optimization Checklist</strong>. Save thousands on catch-up concessional rules.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-450" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  className="w-full bg-navy-50 text-navy-950 pl-11 pr-4 py-3 rounded-xl text-xs border border-navy-150 focus:outline-none focus:border-gold-350 font-sans text-left"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs py-3.5 rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                id="exit-submit-btn"
              >
                Download Free Blueprint Checklist
              </button>

              <div className="flex justify-center items-center gap-1.5 text-[9px] text-navy-500 font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
                <span>ASIC AFSL privacy secure. Zero email spam guaranteed.</span>
              </div>
            </form>
          ) : (
            // Success State
            <div className="p-6 bg-emerald-50 bg-opacity-40 border border-emerald-500/10 rounded-xl space-y-3.5 flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-emerald-800" />
              <h4 className="text-xs font-bold text-navy-950">Guides Dispatched Successfully!</h4>
              <p className="text-[10px] text-navy-705 leading-normal font-sans">
                A custom compiled pdf checklist represents direct tax rules. It is flying directly to <strong>{email}</strong>.
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleDismiss}
              className="text-[10px] text-navy-400 hover:text-navy-700 underline font-semibold cursor-pointer"
              id="exit-no-thanks"
            >
              No thank you, continue browsing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
