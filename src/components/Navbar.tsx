import React, { useState } from "react";
import { Sparkles, Calendar, Menu, X, ShieldAlert, Award } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
}

export default function Navbar({ currentPage, setCurrentPage, isAdmin, setIsAdmin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "booking", label: "Book Now" },
    { id: "contact", label: "Contact Us" }
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#18A8FF]/20 bg-[#070913]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo Grouping */}
        <button 
          onClick={() => handleNavClick("home")}
          className="group flex flex-col items-start text-left focus:outline-none focus:ring-1 focus:ring-[#18A8FF]/50 rounded-lg p-1"
          id="nav-logo"
        >
          <div className="flex items-center gap-1">
            <span className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              FIVE <span className="text-[#18A8FF] text-glow-blue">STARZ</span>
            </span>
            <div className="flex text-[#7ED957] animate-star-blink">
              <Sparkles className="h-4 w-4 fill-current" />
            </div>
          </div>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-[#7ED957] text-glow-green leading-none">
            Magic Detail
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-md font-sans text-sm font-medium tracking-wide transition-all duration-300 relative ${
                currentPage === item.id
                  ? "text-[#18A8FF] bg-[#18A8FF]/10 text-glow-blue border border-[#18A8FF]/30"
                  : "text-[#C0C0C0] hover:text-white hover:bg-white/5 border border-transparent"
              }`}
              id={`nav-item-${item.id}`}
            >
              {item.label}
              {currentPage === item.id && (
                <span className="absolute bottom-0 left-1/3 right-1/3 h-0.5 bg-[#7ED957]" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Header Panel */}
        <div className="hidden md:flex items-center gap-3">
          {/* Admin Toggle button (Demo helpful access) */}
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono transition-all duration-300 ${
              isAdmin
                ? "bg-[#E63946]/10 border-[#E63946]/40 text-[#E63946] text-glow-red"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-[#18A8FF]/40"
            }`}
            title="Toggle Admin View to see live Bookings and Contacts"
            id="nav-admin-toggle"
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>{isAdmin ? "Admin Active" : "Admin Panel"}</span>
          </button>

          <button
            onClick={() => handleNavClick("booking")}
            className="group relative flex items-center gap-2 overflow-hidden rounded-md bg-linear-to-r from-[#18A8FF] to-[#1288cc] px-4 py-2 text-sm font-bold text-black shadow-[0_0_15px_rgba(24,168,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(24,168,255,0.7)] active:scale-95"
            id="nav-book-cta"
          >
            <Calendar className="h-4 w-4 text-black group-hover:rotate-12 transition-transform duration-300" />
            <span>Book Polish</span>
            {/* Metallic shine animation overlay */}
            <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/30 gold-shine opacity-40 group-hover:animate-shimmer" 
                  style={{ animation: 'shimmer 1.5s infinite linear' }} />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Rapid Mobile Admin Toggle */}
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`p-1.5 rounded-md border ${
              isAdmin
                ? "bg-[#E63946]/10 border-[#E63946]/50 text-[#E63946]"
                : "bg-white/5 border-white/10 text-slate-400"
            }`}
            title="Toggle Admin dashboard demo mode"
            id="nav-mobile-admin-toggle"
          >
            <ShieldAlert className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-white/10 text-[#C0C0C0] hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
            id="nav-mobile-hamburger"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#18A8FF]/10 bg-[#070913]/98 px-4 py-3 pb-5 space-y-3 shadow-2xl transition-all duration-300">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md font-sans font-medium transition-all ${
                  currentPage === item.id
                    ? "text-[#18A8FF] bg-[#18A8FF]/10 text-glow-blue border-l-4 border-l-[#18A8FF]"
                    : "text-[#C0C0C0] hover:text-white"
                }`}
                id={`nav-mobile-item-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-white/10 pt-3 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border text-sm font-mono ${
                isAdmin
                  ? "bg-[#E63946]/10 border-[#E63946]/40 text-[#E63946]"
                  : "bg-white/5 border-white/10 text-slate-400"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              <span>{isAdmin ? "Admin Area Active (Turn Off)" : "Open Admin Control Board"}</span>
            </button>

            <button
              onClick={() => handleNavClick("booking")}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-[#18A8FF] py-3 font-bold text-black shadow-lg"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
