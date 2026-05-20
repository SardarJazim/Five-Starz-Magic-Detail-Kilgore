import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquare, Quote, Star } from "lucide-react";
import { Testimonial } from "../types";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: Testimonial[] = [
    {
      id: "t_1",
      name: "Marcus Thompson",
      rating: 5,
      text: "The most premium hand polish I've ever had done in Kilgore. Dirt was cleared with absolute precision, and the wet glossy neon metallic shine on my Dodge Challenger is incredible! Five Starz definitely has magic in their hands.",
      vehicle: "Dodge Challenger SRT",
      date: "May 2026"
    },
    {
      id: "t_2",
      name: "Ryan Beck",
      rating: 5,
      text: "Oil field dust and red Texas clay had completely ruined my F-150 Raptor's interior. Five Starz interior detail team spent hours steam extracting every inch, restoring public leather and conditioning the dash. It feels brand new!",
      vehicle: "Ford F-150 Raptor",
      date: "April 2026"
    },
    {
      id: "t_3",
      name: "Amanda Stevenson",
      rating: 5,
      text: "Their Ceramic Coating is absolutely outstanding! Rain and Texas road dust slide off effortlessly. The water-beading is incredible to watch. If you're near Kilgore or Longview, don't go anywhere else. This is the spot.",
      vehicle: "Tesla Model Y Performance",
      date: "March 2026"
    },
    {
      id: "t_4",
      name: "Dustin Henderson",
      rating: 5,
      text: "Had my headlight oxidation sanded and reclassified. The yellow haze is completely gone and nighttime visibility on highway 259 is crystal clear. Exceptional customer care, extremely professional work, fast service.",
      vehicle: "Chevrolet Silverado",
      date: "May 2026"
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-[#070913]/30 border-y border-white/5 relative z-10" id="testimonials-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header panel */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#7ED957]/10 border border-[#7ED957]/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-[#7ED957] leading-none mb-4 tracking-wider uppercase">
            <MessageSquare className="h-3 w-3 animate-pulse text-[#7ED957]" />
            Client Testimonials
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 uppercase">
            What Kilgore & Longview <span className="text-[#7ED957] text-glow-green">Say</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Five-Star detailing speaks for itself. Read actual feedback from premium car, luxury SUV, and oilfield truck owners who love our detailing wizardry.
          </p>
        </div>

        {/* Testimonial Core Card Carousel */}
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="glass-border-blue p-8 md:p-12 rounded-2xl relative overflow-hidden flex flex-col items-center text-center">
            
            {/* Quote watermark background */}
            <Quote className="absolute -top-6 -left-6 h-32 w-32 text-white/5 select-none pointer-events-none transform -rotate-12" />
            <Quote className="absolute -bottom-8 -right-8 h-32 w-32 text-white/5 select-none pointer-events-none transform rotate-12" />

            {/* Stars rendering */}
            <div className="flex items-center gap-1 mb-6 text-[#7ED957] text-glow-green">
              {Array.from({ length: reviews[currentIndex].rating }).map((_, i) => (
                <Star key={i} className="h-5.5 w-5.5 fill-current" />
              ))}
            </div>

            {/* Testimonial text */}
            <blockquote className="text-base md:text-xl font-medium font-sans text-slate-200 leading-relaxed max-w-2xl mb-6 relative">
              "{reviews[currentIndex].text}"
            </blockquote>

            {/* Reviewer Details */}
            <div className="mt-4">
              <cite className="not-italic font-display font-black text-white text-md block tracking-wide uppercase">
                {reviews[currentIndex].name}
              </cite>
              <span className="font-mono text-xs text-[#18A8FF] text-glow-blue font-semibold uppercase tracking-wider mt-1 block">
                {reviews[currentIndex].vehicle}
              </span>
              <span className="text-[11px] text-slate-500 font-sans block mt-1">
                Verified Client • {reviews[currentIndex].date}
              </span>
            </div>

            {/* Center Carousel Navigation Control Buttons */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/5 hover:bg-[#18A8FF]/20 text-slate-300 hover:text-white border border-white/5 hover:border-[#18A8FF]/30 transition-all cursor-pointer"
                aria-label="Previous testimonial"
                id="testimonial-prev-btn"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              {/* Progress Slider Dots Indicator */}
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === i ? "w-6 bg-[#18A8FF]" : "w-2 bg-white/15"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/5 hover:bg-[#18A8FF]/20 text-slate-300 hover:text-white border border-white/5 hover:border-[#18A8FF]/30 transition-all cursor-pointer"
                aria-label="Next testimonial"
                id="testimonial-next-btn"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
