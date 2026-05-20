import React from "react";
import { Clock, DollarSign, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";
import { Service } from "../types";

// Map static image IDs to actual custom assets or high-end Unsplash CDN car polish representations
const IMAGE_RESOURCES: Record<string, string> = {
  basic_wash: "https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=600",
  interior_cleaning: "/src/assets/images/interior_cleaning_1779300110005.png",
  paint_correction: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=600",
  complete_detail: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600",
  ceramic_coating: "/src/assets/images/ceramic_coating_1779300085566.png",
  wax_polish: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600",
  headlight: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600",
  engine_bay: "https://images.unsplash.com/photo-1562426509-5044a121aa49?auto=format&fit=crop&q=80&w=600"
};

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
}

export default function ServiceCard({ service, onBook }: ServiceCardProps) {
  // Select corresponding image asset
  const imgSrc = IMAGE_RESOURCES[service.image] || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600";
  const borderGlow = service.popular ? "border-[#7ED957]/50 shadow-[0_0_15px_rgba(126,217,87,0.15)] bg-[#0F132A]/90" : "border-[#18A8FF]/20 bg-[#0F132A]/70";

  return (
    <div
      className={`rounded-2xl border ${borderGlow} relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-[#18A8FF]/60 hover:shadow-[0_0_20px_rgba(24,168,255,0.2)] flex flex-col h-full metallic-shine`}
      id={`service-card-${service.id}`}
    >
      {/* Popular indicator badge ribbon */}
      {service.popular && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-[#7ED957] to-[#5ec734] px-3 py-1 rounded-full text-[10px] uppercase font-mono font-black text-black tracking-wider flex items-center gap-1 shadow-md">
          <Sparkles className="h-3 w-3 animate-pulse text-black" />
          <span>HURRY BOOKING</span>
        </div>
      )}

      {/* Service Cover Header Image */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden border-b border-white/5">
        <img
          src={imgSrc}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e122b] to-transparent opacity-80" />
        
        {/* Absolute indicators float on top of bottom overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center z-10">
          <span className="font-display font-black text-xl text-white text-glow-blue tracking-tight">
            {service.name}
          </span>
          <span className="bg-[#18A8FF]/15 border border-[#18A8FF]/30 text-[#18A8FF] font-mono text-[10px] xl:text-[11px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm select-none uppercase">
            {service.category}
          </span>
        </div>
      </div>

      {/* Card Detail Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Core Pricing Metadata and Duration */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/5">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4.5 w-4.5 text-[#7ED957]" />
            <span className="font-display text-lg font-black text-white text-glow-green">
              {service.price}
            </span>
            <span className="text-[10px] text-slate-400 font-mono italic">(Estimate)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 font-mono text-xs">
            <Clock className="h-3.5 w-3.5 text-[#18A8FF]" />
            <span>{service.duration}</span>
          </div>
        </div>

        {/* Short Text Description */}
        <p className="text-xs sm:text-sm text-slate-300 font-sans mb-4 flex-1 line-clamp-3">
          {service.description}
        </p>

        {/* Detailed Bullet point features checklist */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-glow-none text-xs text-slate-400 font-sans">
              <ShieldCheck className="h-4 w-4 text-[#7ED957] shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Direct Booking Page Transition Buttons */}
        <button
          onClick={() => onBook(service.id)}
          className={`w-full py-3 px-4 rounded-xl font-bold font-sans text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
            service.popular
              ? "bg-[#7ED957] hover:bg-[#6ec248] text-black shadow-[0_0_15px_rgba(126,217,87,0.3)] hover:shadow-[0_0_22px_rgba(126,217,87,0.5)] active:scale-98"
              : "bg-[#070913] hover:bg-[#18A8FF] text-[#18A8FF] hover:text-black border border-[#18A8FF]/30 hover:border-[#18A8FF] active:scale-98"
          }`}
          id={`book-btn-${service.id}`}
        >
          <span>Reserve Detailing slot</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
