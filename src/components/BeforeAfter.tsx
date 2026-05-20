import React, { useState } from "react";
import { Sparkles, ArrowLeftRight } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeItem, setActiveItem] = useState(0);

  const gallery = [
    {
      title: "Stage 2 Paint Correction",
      desc: "Removal of extreme swirl marks, spiderweb scratches, and faded oxidation on a midnight blue sports sedan.",
      beforeImg: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800", // Swirl look (using premium automotive detail representations)
      afterImg: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800", // Deep absolute shine
      beforeLabel: "Swirled Paint",
      afterLabel: "5-Star Liquid Gloss"
    },
    {
      title: "Oilfield Cabin Recovery",
      desc: "Steam extracting deep mud stains and re-conditioning premium leather seats on a Texas Ford F-150.",
      beforeImg: "https://images.unsplash.com/photo-1517524008248-c990b767296a?auto=format&fit=crop&q=80&w=800", // Worn dirty
      afterImg: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800", // Fresh interior
      beforeLabel: "Mud & Clay",
      afterLabel: "PRISTINE LEATHER"
    },
    {
      title: "Crystal Clear Restoration",
      desc: "Wet sanding heavy yellow oxidation build-up on headlights and sealing with high-gloss UV protection.",
      beforeImg: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800", // Dull weathered
      afterImg: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800", // Bright crystal white beams
      beforeLabel: "UV oxidized fogginess",
      afterLabel: "Clear Crystal beam"
    }
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section className="py-20 relative z-10" id="before-after-gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#18A8FF]/10 border border-[#18A8FF]/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-[#18A8FF] leading-none mb-4 tracking-wider uppercase">
            <Sparkles className="h-3 w-3 animate-star-blink text-[#18A8FF]" />
            Five Starz Magic Proof
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 uppercase">
            Witness the <span className="text-[#18A8FF] text-glow-blue">Magic</span> Shine
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Drag the neon bar left or right to compare our detailing outcomes. We restore dull, neglected vehicles to absolute high gloss mirror finishes.
          </p>
        </div>

        {/* Gallery Type Selector Buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {gallery.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveItem(index);
                setSliderPos(50); // Reset slider position
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all duration-300 ${
                activeItem === index
                  ? "bg-[#18A8FF] text-black shadow-[0_0_15px_rgba(24,168,255,0.3)] border border-[#18A8FF]"
                  : "bg-[#0F132A] text-slate-400 hover:text-white border border-white/5"
              }`}
              id={`gallery-nav-${index}`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Interactive Image Comparisons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Detailed explanations */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-1">
              <span className="font-display text-[#7ED957] font-bold text-lg select-none">
                ★ ★ ★ ★ ★
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black text-white leading-tight uppercase">
              {gallery[activeItem].title}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              {gallery[activeItem].desc}
            </p>
            <div className="pt-4 border-t border-white/5 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-[#E63946] font-bold">● BEFORE TREATMENT:</span>
                <span className="text-slate-400">{gallery[activeItem].beforeLabel}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-[#7ED957] font-bold">● FIVE STARZ FINISH:</span>
                <span className="text-[#18A8FF] font-medium text-glow-blue">{gallery[activeItem].afterLabel}</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#0F132A] p-2.5 rounded-lg border border-white/5 mt-4">
              <ArrowLeftRight className="h-4 w-4 text-[#18A8FF] animate-pulse" />
              <span>Use the slide handles to view reflections</span>
            </div>
          </div>

          {/* Slider Layout View */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[580px] aspect-[4/3] rounded-2xl overflow-hidden border border-[#18A8FF]/20 shadow-[0_0_30px_rgba(7,9,19,0.8)] select-none">
              
              {/* After Product image (Base) */}
              <img
                src={gallery[activeItem].afterImg}
                alt="Detail completed"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-[#7ED957] text-black font-mono font-black text-[10px] tracking-wide px-2.5 py-1 rounded-md shadow-md select-none">
                ★ AFTER MAGIC
              </div>

              {/* Before image (Covered slider width) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={gallery[activeItem].beforeImg}
                  alt="Damaged state beforehand"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: "100%", height: "100%" }}
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-4 left-4 bg-[#E63946] text-white font-mono font-bold text-[10px] tracking-wide px-2.5 py-1 rounded-md shadow-md select-none">
                  BEFORE treatment
                </div>
              </div>

              {/* Central Neon vertical slider bar divider */}
              <div
                className="absolute inset-y-0 w-0.5 bg-[#18A8FF] z-10 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Central handle knob dial */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-900 border-2 border-[#18A8FF] flex items-center justify-center shadow-[0_0_15px_rgba(24,168,255,0.7)] text-[#18A8FF]">
                  <ArrowLeftRight className="h-4 w-4" />
                </div>
              </div>

              {/* Standard HTML Range bar overlays (Handles input across the whole container box) */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                aria-label="Before after image comparison slider control"
                id="gallery-slider-bar"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
