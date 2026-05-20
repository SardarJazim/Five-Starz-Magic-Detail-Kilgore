import React from "react";
import { Award, ShieldCheck, ThumbsUp, Star } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Star className="h-6 w-6 text-[#18A8FF] fill-[#18A8FF]/30" />,
      value: "5.0",
      label: "Star Google Rating",
      description: "Matchless customer reputation",
      borderGlow: "glass-border-blue"
    },
    {
      icon: <Award className="h-6 w-6 text-[#7ED957]" />,
      value: "1,500+",
      label: "Custom Details Completed",
      description: "Trucks, sports cars, SUVs & classics",
      borderGlow: "glass-border-green"
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#18A8FF]" />,
      value: "100%",
      label: "Satisfaction Guaranteed",
      description: "Kilgore / Longview premium standard",
      borderGlow: "glass-border-blue"
    },
    {
      icon: <ThumbsUp className="h-6 w-6 text-[#7ED957]" />,
      value: "10+ Yrs",
      label: "Automotive Craft Experience",
      description: "Specialized in gloss & coatings",
      borderGlow: "glass-border-green"
    }
  ];

  return (
    <div className="py-12 bg-[#070913]/40 border-y border-white/5 relative z-10" id="stats-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-5 rounded-xl border ${stat.borderGlow} transition-all duration-300 flex flex-col items-center text-center`}
              id={`stat-card-${i}`}
            >
              {/* Icon Container */}
              <div className="mb-3 p-2.5 rounded-lg bg-white/5 flex items-center justify-center">
                {stat.icon}
              </div>
              
              {/* Metric numerical values */}
              <div className="font-display text-2.5xl sm:text-3.5xl font-black text-white tracking-tight leading-none mb-1 select-none font-mono">
                {stat.value}
              </div>
              
              {/* Labels */}
              <div className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide font-sans mb-1">
                {stat.label}
              </div>
              
              {/* Descriptions */}
              <div className="text-[10px] sm:text-xs text-slate-400 font-sans leading-tight">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
