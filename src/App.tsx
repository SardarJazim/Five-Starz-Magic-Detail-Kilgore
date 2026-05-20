import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StatsSection from "./components/StatsSection";
import BeforeAfter from "./components/BeforeAfter";
import Testimonials from "./components/Testimonials";
import StarBackground from "./components/StarBackground";
import ServiceCard from "./components/ServiceCard";
import AdminPanel from "./components/AdminPanel";
import { Service } from "./types";
import { 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Fuel, 
  Layers, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  CalendarDays,
  Menu,
  Facebook,
  Mail,
  Award,
  ChevronRight
} from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleMakeModel: "",
    vehicleType: "sedan",
    serviceId: "",
    preferredDate: "",
    preferredTime: "09:00 AM",
    additionalNotes: ""
  });
  const [bookingSubmitSuccess, setBookingSubmitSuccess] = useState(false);
  const [bookingSubmitError, setBookingSubmitError] = useState("");
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [contactSubmitSuccess, setContactSubmitSuccess] = useState(false);
  const [contactSubmitError, setContactSubmitError] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Fetch Services from custom API on load
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Set booking service from external card action clicks
  const handleBookServiceAction = (serviceId: string) => {
    setBookingForm((prev) => ({ ...prev, serviceId }));
    setSelectedServiceId(serviceId);
    setCurrentPage("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Booking Formulation Submitter
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitting(true);
    setBookingSubmitError("");
    setBookingSubmitSuccess(false);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...bookingForm,
          // Support standard fallback just in case
          serviceId: bookingForm.serviceId || selectedServiceId
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to finalize online booking. Please check logs.");
      }

      setBookingSubmitSuccess(true);
      // Reset Form fields
      setBookingForm({
        name: "",
        phone: "",
        email: "",
        vehicleMakeModel: "",
        vehicleType: "sedan",
        serviceId: "",
        preferredDate: "",
        preferredTime: "09:00 AM",
        additionalNotes: ""
      });
      setSelectedServiceId("");
    } catch (err: any) {
      setBookingSubmitError(err.message || "Something went wrong.");
    } finally {
      setBookingSubmitting(false);
    }
  };

  // Contact Formulation Submitter
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactSubmitError("");
    setContactSubmitSuccess(false);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactForm)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to post message. Try again later.");
      }

      setContactSubmitSuccess(true);
      // Reset fields
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (err: any) {
      setContactSubmitError(err.message || "An issue occurred.");
    } finally {
      setContactSubmitting(false);
    }
  };

  // Reset booking form page flow context is helpful
  const handleBookNowGeneral = () => {
    setBookingForm((prev) => ({ ...prev, serviceId: services[0]?.id || "srv_complete" }));
    setCurrentPage("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white flex flex-col relative overflow-x-hidden font-sans selection:bg-[#18A8FF] selection:text-black">
      {/* Animated Floating Star Visual Layer */}
      <StarBackground />

      {/* Navigation Layer */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
      />

      <main className="flex-grow">
        
        {/* IF IS ADMIN VIEW SELECTED, OVERLAY WORKSPACE CONTROL PANEL */}
        {isAdmin ? (
          <div className="animate-fade-in">
            <AdminPanel />
          </div>
        ) : (
          <>
            {/* 1. HOME VIEW */}
            {currentPage === "home" && (
              <div id="home-view-group">
                
                {/* HERO SECTION */}
                <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden z-10" id="hero-banner">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left text column */}
                    <div className="lg:col-span-7 space-y-6 text-left">
                      <div className="inline-flex items-center gap-2 bg-[#18A8FF]/10 border border-[#18A8FF]/20 px-3 py-1 rounded-full text-xs font-mono font-semibold text-[#18A8FF] tracking-wider uppercase">
                        <Sparkles className="h-3.5 w-3.5 animate-star-blink text-[#18A8FF]" />
                        Professional Auto Detailing • Kilgore & Longview
                      </div>
                      
                      <h1 className="font-display text-4.5xl sm:text-6xl font-black tracking-tight text-white leading-[1.05] uppercase">
                        Five Starz <br className="hidden sm:inline" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#18A8FF] via-[#7ED957] to-[#18A8FF] text-glow-blue">Magic Detail</span>
                      </h1>
                      
                      <p className="max-w-xl text-slate-300 font-sans text-sm sm:text-lg leading-relaxed font-light">
                        Automotive paint protection and interior steam purification wizards. We bring premium high-gloss shines, water-beading hydrophobic armor, and pristine cabins back into Kilgore and Longview, Texas.
                      </p>

                      {/* CTA Panel */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <button
                          onClick={handleBookNowGeneral}
                          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#18A8FF] to-[#0477bf] px-6 py-4 text-sm font-black text-black shadow-[0_0_20px_rgba(24,168,255,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer uppercase"
                          id="hero-book-cta"
                        >
                          <span>Reserve Slot</span>
                          <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                          <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/35 gold-shine opacity-40 group-hover:animate-shimmer" style={{ animation: 'shimmer 1.5s infinite linear' }} />
                        </button>

                        <button
                          onClick={() => {
                            setCurrentPage("services");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="flex items-center justify-center gap-2 rounded-xl bg-[#0F132A]/80 border border-white/10 px-6 py-4 text-xs font-black uppercase text-white hover:bg-[#18A8FF]/10 hover:border-[#18A8FF]/40 hover:text-[#18A8FF] transition-all cursor-pointer"
                          id="hero-services-cta"
                        >
                          <span>View Detail Menus</span>
                        </button>
                      </div>

                      {/* Trusted badges */}
                      <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/5 max-w-lg">
                        <div className="text-left font-sans">
                          <span className="block text-xl font-bold font-mono text-glow-blue text-[#18A8FF]">5.0 ★</span>
                          <span className="text-[10px] sm:text-xs text-slate-400">Google Customer Reviews</span>
                        </div>
                        <div className="text-left font-sans">
                          <span className="block text-xl font-bold font-mono text-glow-green text-[#7ED957]">100%</span>
                          <span className="text-[10px] sm:text-xs text-slate-400">Shine Guarantee</span>
                        </div>
                        <div className="text-left font-sans">
                          <span className="block text-xl font-bold font-mono text-white">903 Area</span>
                          <span className="text-[10px] sm:text-xs text-slate-400">Local East Texas Care</span>
                        </div>
                      </div>

                    </div>

                    {/* Right hero image card with neon shining stars design */}
                    <div className="lg:col-span-5 relative flex justify-center">
                      <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-[#18A8FF]/25 shadow-[0_0_40px_rgba(24,168,255,0.15)] bg-[#0F132A] group uppercase">
                        {/* Dynamic Neon glows hover highlights */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e122b] via-transparent to-[#18A8FF]/5" />
                        
                        <img
                          src="/src/assets/images/detailing_hero_1779300059392.png"
                          alt="Five Starz Magic Detail Show Car"
                          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />

                        {/* Text and logo mockup */}
                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-white/10 bg-black/70 backdrop-blur-sm space-y-2">
                          <div className="flex items-center gap-1">
                            <span className="font-display font-black text-white text-md tracking-tight">
                              KILGORE'S SHINE SPOT
                            </span>
                            <Sparkles className="h-4 w-4 text-[#7ED957] animate-pulse" />
                          </div>
                          <p className="text-[10px] text-slate-400 normal-case">
                            Precision hand polishing, heavy decontamination, and premium coatings that shield cars from sun, grit, and weathering.
                          </p>
                          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#18A8FF] text-glow-blue">
                            <span>★ 1510 US 259 N</span>
                            <span>903-985-8818</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* STATISTICS TICKER */}
                <StatsSection />

                {/* COGNITIVE REASONS: WHY FIVE STARZ MAGIC DETAIL */}
                <section className="py-20 relative z-10" id="why-choose-us">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header */}
                    <div className="text-center mb-16">
                      <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                        The Five Starz <span className="text-[#18A8FF] text-glow-blue">Magic</span> Treatment
                      </h2>
                      <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 mt-3">
                        Why car and truck enthusiasts across Kilgore and Longview choose us for high-end paint restoration and deep therapeutic interior cleaning.
                      </p>
                    </div>

                    {/* Highlights Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      
                      {/* Highlight 1 */}
                      <div className="p-6 rounded-2xl bg-[#0F132A]/50 border border-[#18A8FF]/10 hover:border-[#18A8FF]/40 transition-all duration-300 space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-[#18A8FF]/10 flex items-center justify-center border border-[#18A8FF]/20">
                          <Fuel className="h-6 w-6 text-[#18A8FF]" />
                        </div>
                        <h3 className="font-display font-black text-white text-lg uppercase tracking-wide">
                          Oilfield Decontamination
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                          Texas trucks deal with tough oils, field grease, mud, and hard clay. Our specialty chemical wash breakdown dissolves grit without scarring your underlying clear coats.
                        </p>
                      </div>

                      {/* Highlight 2 */}
                      <div className="p-6 rounded-2xl bg-[#0F132A]/50 border border-[#7ED957]/10 hover:border-[#7ED957]/40 transition-all duration-300 space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-[#7ED957]/10 flex items-center justify-center border border-[#7ED957]/20">
                          <Layers className="h-6 w-6 text-[#7ED957]" />
                        </div>
                        <h3 className="font-display font-black text-white text-lg uppercase tracking-wide">
                          9H Nano Ceramic Coating
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                          We molecularly seal paint under liquid-crystal ceramic boundaries, providing maximum UV resistance, hydrophobic self-wash behaviors, and paint reflection.
                        </p>
                      </div>

                      {/* Highlight 3 */}
                      <div className="p-6 rounded-2xl bg-[#0F132A]/50 border border-[#18A8FF]/10 hover:border-[#18A8FF]/40 transition-all duration-300 space-y-4">
                        <div className="h-12 w-12 rounded-xl bg-[#18A8FF]/10 flex items-center justify-center border border-[#18A8FF]/20">
                          <Settings className="h-6 w-6 text-[#18A8FF]" />
                        </div>
                        <h3 className="font-display font-black text-white text-lg uppercase tracking-wide">
                          Surgical Paint Correction
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                          Say goodbye to unsightly buffer halos and scratches. Our multi-stage machine compounding corrects defects and creates flat mirror-image properties.
                        </p>
                      </div>

                    </div>

                  </div>
                </section>

                {/* SLIDING BEFORE AND AFTER GALLERY */}
                <BeforeAfter />

                {/* CHERISHED SERVICES SUMMARIES */}
                <section className="py-20 bg-[#070913]/20 relative z-10" id="services-preview">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
                      <div className="text-center sm:text-left">
                        <h2 className="font-display text-2.5xl sm:text-4.5xl font-black text-white tracking-tight uppercase leading-none">
                          Signature <span className="text-[#7ED957] text-glow-green">Detailing</span> Services
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-2">
                          Explore our popular car care solutions. Fully customizable packages available.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentPage("services");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="flex items-center gap-1.5 text-xs font-mono text-[#18A8FF] text-glow-blue font-bold px-4 py-2 border border-[#18A8FF]/25 rounded-lg bg-slate-950 hover:bg-[#18A8FF] hover:text-black transition-all cursor-pointer"
                        id="btn-goto-services"
                      >
                        <span>View Full Catalog</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Services Loop (Show popular highlight service cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {services.filter(s => s.popular).map((service) => (
                        <div key={service.id} className="h-full">
                          <ServiceCard service={service} onBook={handleBookServiceAction} />
                        </div>
                      ))}
                    </div>

                  </div>
                </section>

                {/* TESTIMONIALS */}
                <Testimonials />

                {/* LOCAL EMBED MAP & QUICK ADDRESS */}
                <section className="py-20 bg-slate-950/40 relative z-10 border-t border-white/5" id="maps-highlights">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      
                      {/* Left: Info card with physical branding */}
                      <div className="space-y-6">
                        <h2 className="font-display text-2.5xl sm:text-4xl font-black text-white uppercase">
                          Visit Kilgore <span className="text-[#18A8FF] text-glow-blue">Methanol</span> Alley
                        </h2>
                        
                        <p className="text-sm text-slate-300 leading-relaxed font-sans">
                          We are located on **US Highway 259 N** in Kilgore, Texas, making it extremely convenient for customers from both Longview and Kilgore. Drive in or call to arrange drop-off slot scheduling easily.
                        </p>

                        <div className="space-y-4 pt-3 text-xs sm:text-sm">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-[#18A8FF]/10 flex items-center justify-center shrink-0">
                              <MapPin className="h-5 w-5 text-[#E63946]" />
                            </div>
                            <div>
                              <span className="block font-bold text-white uppercase">Physical Workshop Address</span>
                              <span className="text-slate-400">1510 US 259 N, Kilgore, TX 75662</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-[#7ED957]/10 flex items-center justify-center shrink-0">
                              <Phone className="h-5 w-5 text-[#7ED957]" />
                            </div>
                            <div>
                              <span className="block font-bold text-white uppercase">Telephone Hotline</span>
                              <span className="text-slate-400 font-mono">903-985-8818</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-[#18A8FF]/10 flex items-center justify-center shrink-0">
                              <Clock className="h-5 w-5 text-[#18A8FF]" />
                            </div>
                            <div>
                              <span className="block font-bold text-white uppercase">Weekly Detail Schedule</span>
                              <span className="text-slate-400">Mon - Fri: 8:30 AM - 6:00 PM | Sat: 9:00 AM - 4:00 PM</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={() => setCurrentPage("contact")}
                            className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-white hover:border-[#18A8FF] transition-all cursor-pointer"
                            id="map-contact-btn"
                          >
                            <span>Need Directions? Message Us</span>
                          </button>
                        </div>
                      </div>

                      {/* Right: Embedded Google Maps Iframe */}
                      <div className="rounded-2xl border border-white/10 overflow-hidden shadow-xl aspect-16/9 md:aspect-video h-[350px]">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.61864197943!2d-94.86909068482705!3d32.40243468108625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86363a0670868f07%3A0xe54dbe41a6b09337!2s1510%20US%20259%20N%20Kilgore%20TX%2075662!5e0!3m2!1sen!2sus!4v1653139049182!5m2!1sen!2sus"
                          width="100%"
                          height="100%"
                          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) opacity(0.85)" }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Five Starz Magic Detail Kilgore Texas Google Local Map"
                        />
                      </div>

                    </div>
                  </div>
                </section>

              </div>
            )}

            {/* 2. ABOUT VIEW */}
            {currentPage === "about" && (
              <section className="py-20 relative z-10" id="about-view-layer">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  {/* Top Header */}
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-1.5 bg-[#18A8FF]/10 border border-[#18A8FF]/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-[#18A8FF] mb-3 select-none uppercase">
                      <Award className="h-4 w-4" />
                      Our Detailing Legacy
                    </div>
                    <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
                      The Five Starz <span className="text-[#18A8FF] text-glow-blue">Magic</span> Story
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 mt-3">
                      Kilgore & Longview's premier authority for deep surface polishing, extreme cabin purification, and long-term diagnostic ceramic coatings.
                    </p>
                  </div>

                  {/* Split body grids */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    
                    {/* Column 1 info text */}
                    <div className="space-y-6">
                      <h3 className="font-display text-2xl font-black text-white uppercase tracking-wide">
                        Precision Detailing Done local right
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed font-sans">
                        Five Starz Magic Detail was established with a singular focus: to elevate standard automotive car washing to an artistic, technical craft. Based along the Highway 259 N corridor connecting Kilgore and Longview, we specialize in high-concept paint rectification, deep soil steam extraction, and multi-year ceramic clear boundaries.
                      </p>
                      
                      <blockquote className="border-l-4 border-l-[#7ED957] pl-4 italic text-slate-400 font-sans text-xs sm:text-sm">
                        "Your vehicle is more than steel and rubber—it is a statement of pride. We design defensive seals and glossy finishes that withstand heat, oil field grime, and brutal Texas UV rays."
                      </blockquote>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        Whether you drive a custom Corvette coupe, a lifted oilfield crew truck, a luxury family SUV, or a cherished classic, our team executes multi-stage treatments with micro-fiber care. We never compromise on surface safety, and we treat every client vehicle with five-star respect.
                      </p>
                    </div>

                    {/* Column 2 visual elements */}
                    <div className="glass-border-blue p-8 rounded-2xl relative space-y-6 flex flex-col justify-center">
                      <h4 className="font-display font-black text-white text-md tracking-wider uppercase">
                        ★ Our Detailing Creed
                      </h4>
                      <ul className="space-y-3.5 text-xs text-slate-300 font-sans">
                        <li className="flex gap-2.5">
                          <CheckCircle2 className="h-5 w-5 text-[#7ED957] shrink-0" />
                          <span><strong>100% Micro-Fiber Safe:</strong> No abrasive stiff-bristle machine automated rollers here. 100% customized premium hand bathing.</span>
                        </li>
                        <li className="flex gap-2.5">
                          <CheckCircle2 className="h-5 w-5 text-[#18A8FF] shrink-0" />
                          <span><strong>Advanced Chemical Cleansers:</strong> Deep clay and iron fall-out chemical formulas designed to strip road grimes without eroding premium clear coats.</span>
                        </li>
                        <li className="flex gap-2.5">
                          <CheckCircle2 className="h-5 w-5 text-[#7ED957] shrink-0" />
                          <span><strong>Texas Heat defense:</strong> Premium SiO2 base sealants that lock out UV fading and slow the degradation of vinyl and trim accents.</span>
                        </li>
                        <li className="flex gap-2.5">
                          <CheckCircle2 className="h-5 w-5 text-[#18A8FF] shrink-0" />
                          <span><strong>Ultimate Professionalism:</strong> Full business liability checks, vetted service schedules, and exact pricing estimations with zero hidden surcharges.</span>
                        </li>
                      </ul>
                    </div>

                  </div>

                </div>
              </section>
            )}

            {/* 3. SERVICES VIEW */}
            {currentPage === "services" && (
              <section className="py-20 relative z-10" id="services-view-layer">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  {/* Header page block */}
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-1 bg-[#7ED957]/10 border border-[#7ED957]/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-[#7ED957] mb-3 select-none uppercase">
                      <Sparkles className="h-4 w-4 text-[#7ED957] animate-star-blink" />
                      Detailing Menus Catalog
                    </div>
                    <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
                      Professional <span className="text-[#18A8FF] text-glow-blue">Pricing</span> & Services
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 mt-3">
                      Select your preferred service from our custom categories. All packages include pre-wash diagnostic analysis and micro-fiber drying.
                    </p>
                  </div>

                  {/* Core structural services cards layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                      <div key={service.id} className="h-full">
                        <ServiceCard
                          service={service}
                          onBook={handleBookServiceAction}
                        />
                      </div>
                    ))}
                  </div>

                </div>
              </section>
            )}

            {/* 4. BOOKING VIEW */}
            {currentPage === "booking" && (
              <section className="py-20 relative z-10" id="booking-view-layer">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                  
                  {/* Header text */}
                  <div className="text-center mb-12">
                    <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase leading-none">
                      Schedule <span className="text-[#18A8FF] text-glow-blue">Online</span> Booking
                    </h2>
                    <p className="text-sm text-slate-400 mt-2">
                      Secure your premium wash or coating slot. Our team will contact you to confirm the exact vehicle check-in schedule.
                    </p>
                  </div>

                  {/* Form container card panels */}
                  <div className="glass-border-blue p-6 sm:p-10 rounded-2xl shadow-xl">
                    
                    {/* Show Success Notification */}
                    {bookingSubmitSuccess ? (
                      <div className="text-center py-12 space-y-6">
                        <div className="h-16 w-16 bg-[#7ED957]/15 text-[#7ED957] rounded-full flex items-center justify-center mx-auto border border-[#7ED957]/30 shadow-[0_0_15px_rgba(126,217,87,0.3)]">
                          <CheckCircle2 className="h-10 w-10 text-glow-green" />
                        </div>
                        <h3 className="font-display text-2xl font-black uppercase text-white tracking-wide">
                          Booking Request Logged!
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                          Thank you! Your detailing schedule slot has been submitted successfully. We will call you back at your phone number to authorize vehicle check-in and coordinate bays space.
                        </p>
                        <div className="pt-4 flex justify-center gap-4">
                          <button
                            onClick={() => {
                              setBookingSubmitSuccess(false);
                              setCurrentPage("home");
                            }}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#18A8FF] to-[#0477bf] font-bold text-black border-none text-xs uppercase"
                          >
                            Return home
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ACTIVE REGISTRATION FORM */
                      <form onSubmit={handleBookingSubmit} className="space-y-6" id="booking-appointment-form">
                        
                        {/* Error logging notice */}
                        {bookingSubmitError && (
                          <div className="p-4 rounded-xl bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-xs sm:text-sm flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <span>{bookingSubmitError}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Name Input */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="book-name-input">
                              Your Customer Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Marcus Thompson"
                              value={bookingForm.name}
                              onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                              className="w-full bg-[#070913]/90 border border-white/10 rounded-xl p-3 text-xs w-full text-white focus:outline-none focus:border-[#18A8FF] transition-all font-sans"
                              id="book-name-input"
                            />
                          </div>

                          {/* Phone Input */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="book-phone-input">
                              Your Phone Number *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="903-555-0199"
                              value={bookingForm.phone}
                              onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                              className="w-full bg-[#070913]/90 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF] transition-all font-mono"
                              id="book-phone-input"
                            />
                          </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Email Input */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="book-email-input">
                              Your Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="marcus@example.com"
                              value={bookingForm.email}
                              onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                              className="w-full bg-[#070913]/90 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF] transition-all font-sans"
                              id="book-email-input"
                            />
                          </div>

                          {/* Vehicle make / model */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="book-vehicle-model">
                              Vehicle Make & Model *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Chevrolet Corvette C5"
                              value={bookingForm.vehicleMakeModel}
                              onChange={(e) => setBookingForm({ ...bookingForm, vehicleMakeModel: e.target.value })}
                              className="w-full bg-[#070913]/90 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF] transition-all font-sans"
                              id="book-vehicle-model"
                            />
                          </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Vehicle Type selection */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="book-vehicle-type">
                              Vehicle Body Type *
                            </label>
                            <select
                              value={bookingForm.vehicleType}
                              onChange={(e) => setBookingForm({ ...bookingForm, vehicleType: e.target.value })}
                              className="w-full bg-[#070913]/90 border border-[#18A8FF]/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF] transition-all font-sans"
                              id="book-vehicle-type"
                            >
                              <option value="sedan">🚗 Sedan / Compact</option>
                              <option value="coupe">🏎 Sports Coupe</option>
                              <option value="suv">🚙 SUV / Crossover</option>
                              <option value="truck">🚛 Lifted Truck / Van</option>
                              <option value="classic">★ Classic / Muscle car</option>
                            </select>
                          </div>

                          {/* Service Selection dropdown */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="book-service-id">
                              Select Detailing Care *
                            </label>
                            <select
                              value={bookingForm.serviceId || selectedServiceId}
                              onChange={(e) => {
                                setBookingForm({ ...bookingForm, serviceId: e.target.value });
                                setSelectedServiceId(e.target.value);
                              }}
                              className="w-full bg-[#070913]/90 border border-[#18A8FF]/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF] transition-all font-sans"
                              id="book-service-id"
                            >
                              <option value="">-- Choose Detailing category --</option>
                              {services.map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.name} ({s.price})
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Preferred Time block choice */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="book-preferred-time">
                              Preferred Time Block *
                            </label>
                            <select
                              value={bookingForm.preferredTime}
                              onChange={(e) => setBookingForm({ ...bookingForm, preferredTime: e.target.value })}
                              className="w-full bg-[#070913]/90 border border-[#18A8FF]/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF] transition-all font-sans"
                              id="book-preferred-time"
                            >
                              <option value="08:30 AM">🌅 Morning: 8:30 AM</option>
                              <option value="10:00 AM">🌅 Morning: 10:00 AM</option>
                              <option value="11:30 AM">🌅 Morning: 11:30 AM</option>
                              <option value="01:00 PM">☀️ Afternoon: 01:00 PM</option>
                              <option value="03:00 PM">☀️ Afternoon: 03:00 PM</option>
                              <option value="04:30 PM">☀️ Late Afternoon: 04:30 PM</option>
                            </select>
                          </div>

                        </div>

                        {/* Preferred Booking calendar date */}
                        <div className="space-y-1">
                          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="book-date">
                            Select Preferred Check-in Date *
                          </label>
                          <input
                            type="date"
                            required
                            value={bookingForm.preferredDate}
                            onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                            className="w-full bg-[#070913]/90 border border-[#18A8FF]/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF] transition-all font-mono"
                            id="book-date"
                          />
                        </div>

                        {/* Additional Notes text */}
                        <div className="space-y-1">
                          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="book-notes">
                            Additional Vehicle Notes / Special Requests
                          </label>
                          <textarea
                            rows={3}
                            placeholder="e.g. Heavy mud, leather stains inside trunk, specific buffer halo concerns, paint overspray issues etc..."
                            value={bookingForm.additionalNotes}
                            onChange={(e) => setBookingForm({ ...bookingForm, additionalNotes: e.target.value })}
                            className="w-full bg-[#070913]/90 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF] transition-all font-sans"
                            id="book-notes"
                          />
                        </div>

                        {/* Submit button wrapper */}
                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={bookingSubmitting}
                            className="group relative w-full py-4 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#18A8FF] to-[#0477bf] hover:to-[#18A8FF] text-black shadow-md rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                            id="book-submit-btn"
                          >
                            <span>{bookingSubmitting ? "Logging booking slot..." : "★ Request Detail Scheduling Slot ★"}</span>
                            <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/35 gold-shine opacity-40 group-hover:animate-shimmer" style={{ animation: 'shimmer 1.5s infinite linear' }} />
                          </button>
                        </div>

                        <p className="text-[10px] text-center text-slate-500 normal-case leading-tight">
                          * By submitting this form, you authorize Five Starz Detail operators to contact you via telephone or email to finalize details. Drive-ins are subject to bays availability.
                        </p>

                      </form>
                    )}

                  </div>

                </div>
              </section>
            )}

            {/* 5. CONTACT VIEW */}
            {currentPage === "contact" && (
              <section className="py-20 relative z-10" id="contact-view-layer">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  {/* Top header headers */}
                  <div className="text-center mb-16">
                    <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase leading-none">
                      Connect <span className="text-[#18A8FF] text-glow-blue">Direct</span> With Us
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 mt-2">
                      Get custom glass polishing estimates or report general questions about our processes.
                    </p>
                  </div>

                  {/* Core two column grid page links */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left side info block (5 Cols) */}
                    <div className="lg:col-span-5 space-y-6">
                      
                      <div className="glass-border-blue p-6 rounded-2xl space-y-4">
                        <h3 className="font-display font-black text-white text-base uppercase">
                          Five Starz Magic Detail HQ
                        </h3>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed">
                          Visit or contact our local East Texas detailing division on US-259 corridor between Kilgore and Longview.
                        </p>

                        <div className="pt-2 space-y-4 text-xs">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-4.5 w-4.5 text-[#E63946]" />
                            <div>
                              <span className="block font-bold text-white uppercase">Location</span>
                              <span className="text-slate-400">1510 US 259 N, Kilgore, TX 75662</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Phone className="h-4.5 w-4.5 text-[#18A8FF]" />
                            <div>
                              <span className="block font-bold text-white uppercase">Primary Phone Contact</span>
                              <span className="text-slate-400 font-mono">903-985-8818</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Mail className="h-4.5 w-4.5 text-[#7ED957]" />
                            <div>
                              <span className="block font-bold text-white uppercase">Customer Email</span>
                              <span className="text-slate-400">fivestarzmagicdetail@gmail.com</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Business operating schedule */}
                      <div className="glass-border-green p-6 rounded-2xl space-y-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-[#7ED957]" />
                          <h3 className="font-display font-black text-white text-base uppercase">
                            Operational Hours
                          </h3>
                        </div>
                        <ul className="space-y-2 text-xs font-mono text-slate-300">
                          <li className="flex justify-between border-b border-white/5 pb-1">
                            <span>Monday - Friday</span>
                            <span className="text-[#7ED957]">8:30 AM - 6:00 PM</span>
                          </li>
                          <li className="flex justify-between border-b border-white/5 pb-1">
                            <span>Saturday</span>
                            <span className="text-white">9:00 AM - 4:00 PM</span>
                          </li>
                          <li className="flex justify-between text-slate-500">
                            <span>Sunday</span>
                            <span className="text-red-500 font-bold uppercase text-[10px]">Closed for Family</span>
                          </li>
                        </ul>
                      </div>

                    </div>

                    {/* Right side form block & maps (7 Cols) */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Active Contact Form widget */}
                      <div className="glass-border-blue p-6 sm:p-8 rounded-2xl relative">
                        
                        {contactSubmitSuccess ? (
                          <div className="text-center py-8 space-y-4">
                            <CheckCircle2 className="h-12 w-12 text-[#7ED957] mx-auto text-glow-green animate-pulse" />
                            <h3 className="font-display text-xl font-black uppercase text-white tracking-wide">
                              Message Dispatched!
                            </h3>
                            <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto">
                              Thank you! We received your contact query. Our operators will review and reply within 24 operational business hours.
                            </p>
                            <button
                              onClick={() => setContactSubmitSuccess(false)}
                              className="px-4 py-2 mt-2 rounded bg-white/5 text-slate-300 border border-white/10 hover:border-[#18A8FF] text-xs font-bold"
                            >
                              Write another inquiry
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleContactSubmit} className="space-y-4" id="contact-business-form">
                            
                            {contactSubmitError && (
                              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg flex items-center gap-2">
                                <AlertCircle className="h-4.5 w-4.5" />
                                <span>{contactSubmitError}</span>
                              </div>
                            )}

                            {/* Name and email inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="contact-name">
                                  Your Name *
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={contactForm.name}
                                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                  className="w-full bg-[#070913] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF]"
                                  id="contact-name"
                                  placeholder="e.g. Marcus Thompson"
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="contact-email">
                                  Your Email Address *
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={contactForm.email}
                                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                  className="w-full bg-[#070913] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF]"
                                  id="contact-email"
                                  placeholder="marcus@example.com"
                                />
                              </div>
                            </div>

                            {/* Phone and subject inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="block text-xs font-mono font-black uppercase tracking-wider text-[#18A8FF]" htmlFor="contact-phone">
                                  Phone Number (Optional)
                                </label>
                                <input
                                  type="tel"
                                  value={contactForm.phone}
                                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                  className="w-full bg-[#070913] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF] font-mono"
                                  id="contact-phone"
                                  placeholder="903-555-0199"
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="contact-subject">
                                  Message Subject Line
                                </label>
                                <input
                                  type="text"
                                  value={contactForm.subject}
                                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                  className="w-full bg-[#070913] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF]"
                                  id="contact-subject"
                                  placeholder="e.g. Paint scratch advice"
                                />
                              </div>
                            </div>

                            {/* Message script area */}
                            <div className="space-y-1">
                              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#18A8FF]" htmlFor="contact-message">
                                Your Brief Message *
                              </label>
                              <textarea
                                required
                                rows={4}
                                value={contactForm.message}
                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                className="w-full bg-[#070913] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#18A8FF]"
                                id="contact-message"
                                placeholder="Describe your detailing questions, buffer swirl concerns, composite coatings or schedule requests..."
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={contactSubmitting}
                              className="group relative w-full py-3.5 bg-gradient-to-r from-[#7ED957] to-[#5ec734] hover:to-[#7ED957] text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(126,217,87,0.30)] cursor-pointer text-center"
                              id="contact-submit-btn"
                            >
                              <span>{contactSubmitting ? "Sending..." : "Dispatch Message to Five Starz"}</span>
                            </button>

                          </form>
                        )}

                      </div>

                      {/* Embedded Google map location */}
                      <div className="rounded-xl border border-white/10 overflow-hidden h-[220px]">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.61864197943!2d-94.86909068482705!3d32.40243468108625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86363a0670868f07%3A0xe54dbe41a6b09337!2s1510%20US%20259%20N%20Kilgore%20TX%2075662!5e0!3m2!1sen!2sus!4v1653139049182!5m2!1sen!2sus"
                          width="100%"
                          height="100%"
                          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) opacity(0.85)" }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Contact Map Location"
                        />
                      </div>

                    </div>

                  </div>

                </div>
              </section>
            )}

          </>
        )}

      </main>

      {/* FOOTER ANCHORS */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
