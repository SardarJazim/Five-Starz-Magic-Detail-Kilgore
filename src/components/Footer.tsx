import React from "react";
import { Phone, MapPin, Mail, Award, Facebook, Flame, Sparkles, Clock, Printer } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#04060d] border-t border-[#18A8FF]/10 pt-16 pb-8 relative z-10 font-sans text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core footer grids grid-cols-1 md:grid-cols-4 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Box 1: Brand & Promo statement */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex flex-col">
              <span className="font-display text-2xl font-black text-white tracking-tight">
                FIVE <span className="text-[#18A8FF] text-glow-blue">STARZ</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7ED957] text-glow-green leading-none">
                Magic Detail
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
              Premium automotive detailing inside Kilgore & Longview, Texas. Restoring luster and providing long-term ceramic surface protection with high-gloss brilliance.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#C0C0C0]">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#18A8FF] transition-all bg-white/5 p-2 rounded-md hover:scale-115"
                aria-label="Visit Facebook"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <div 
                className="hover:text-[#7ED957] transition-all bg-white/5 p-2 rounded-md hover:scale-115 cursor-pointer"
                title="Specializing in Gloss & Wax Sealant"
              >
                <Flame className="h-4.5 w-4.5" />
              </div>
              <div 
                className="hover:text-[#7ED957] transition-all bg-white/5 p-2 rounded-md hover:scale-115 cursor-pointer"
                title="5-Star Verified local business"
              >
                <Sparkles className="h-4.5 w-4.5 text-[#7ED957] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Box 2: Interactive Links */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-white text-sm uppercase tracking-wider border-b border-white/5 pb-2">
              Detailing Hub
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button onClick={() => setCurrentPage("home")} className="hover:text-[#18A8FF] hover:translate-x-1.5 transition-all outline-none">
                  ★ Home Station
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("about")} className="hover:text-[#18A8FF] hover:translate-x-1.5 transition-all outline-none">
                  ★ Premium Story
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("services")} className="hover:text-[#18A8FF] hover:translate-x-1.5 transition-all outline-none">
                  ★ Professional Services
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("booking")} className="hover:text-[#7ED957] hover:translate-x-1.5 transition-all text-[#7ED957]/80 outline-none flex items-center gap-1">
                  <span>★ Book Polish Appointment</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage("contact")} className="hover:text-[#18A8FF] hover:translate-x-1.5 transition-all outline-none">
                  ★ Get in Touch
                </button>
              </li>
            </ul>
          </div>

          {/* Box 3: Contact coordinates */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-white text-sm uppercase tracking-wider border-b border-white/5 pb-2">
              Kilgore Shop
            </h4>
            <div className="space-y-3.5 text-xs font-sans text-slate-300">
              <a 
                href="https://maps.google.com/?q=1510+US+259+N,+Kilgore,+TX+75662"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-[#18A8FF] transition-all"
              >
                <MapPin className="h-4.5 w-4.5 text-[#E63946] shrink-0 mt-0.5" />
                <span>
                  1510 US 259 N,<br />
                  Kilgore, TX 75662<br />
                  <span className="text-[10px] text-slate-500 font-mono font-medium">(Near Kilgore / Longview boundary)</span>
                </span>
              </a>
              <a 
                href="tel:9039858818" 
                className="flex items-center gap-2 hover:text-[#7ED957] transition-all font-mono text-xs"
              >
                <Phone className="h-4 w-4 text-[#18A8FF]" />
                <span>Call: 903-985-8818</span>
              </a>
              <div className="flex items-center gap-2 font-mono text-xs">
                <Printer className="h-4 w-4 text-slate-500" />
                <span>Fax: 903-985-8819</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#18A8FF]" />
                <span>fivestarzmagicdetail@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Box 4: Hours of Operation */}
          <div className="space-y-4">
            <h4 className="font-display font-black text-white text-sm uppercase tracking-wider border-b border-white/5 pb-2">
              Detailing Hours
            </h4>
            <div className="space-y-3.5 text-xs font-sans text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#7ED957]" />
                <span className="font-semibold uppercase text-[11px] text-[#7ED957]">Texas Business Hours:</span>
              </div>
              <ul className="space-y-1.5 font-mono text-slate-400">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span>Monday - Friday</span>
                  <span className="text-white">8:30 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span>Saturday</span>
                  <span className="text-white">9:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between text-slate-500">
                  <span>Sunday</span>
                  <span className="uppercase font-bold tracking-wider text-[#E63946]/80 text-[10px]">Closed for Family</span>
                </li>
              </ul>
              <div className="p-2 bg-[#0d122b] rounded-lg border border-[#18A8FF]/10 text-[10px] leading-relaxed select-none">
                💡 <span className="text-[#18A8FF] font-semibold">Tips:</span> Appointments are recommended, but drive-ins are accepted depending on bays status.
              </div>
            </div>
          </div>

        </div>

        {/* Copy / credit line */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <div className="text-xs text-slate-500">
            © {currentYear} Five Starz Magic Detail. All rights reserved. Kilgore / Longview, Texas.
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-600 select-none">
            <Award className="h-3.5 w-3.5 text-[#18A8FF]" />
            <span>Modern Precision Detailing • 2000s Chrome Vibe</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
