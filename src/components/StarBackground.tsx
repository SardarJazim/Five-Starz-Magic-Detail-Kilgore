import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: "blue" | "green" | "red" | "silver";
  delay: string;
  duration: string;
}

export default function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate static/dynamic positions for stars
    const colorOptions: Star["color"][] = ["blue", "green", "silver", "blue", "silver"];
    const loadedStars: Star[] = Array.from({ length: 40 }).map((_, index) => {
      const x = Math.random() * 100; // percent
      const y = Math.random() * 100; // percent
      const size = Math.random() * 4 + 2; // 2px to 6px
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      const delay = `${(Math.random() * 5).toFixed(1)}s`;
      const duration = `${(Math.random() * 4 + 3).toFixed(1)}s`;
      return { id: index, x, y, size, color, delay, duration };
    });
    setStars(loadedStars);
  }, []);

  const getStarColorClass = (color: Star["color"]) => {
    switch (color) {
      case "blue": return "text-[#18A8FF] drop-shadow-[0_0_8px_rgba(24,168,255,0.8)]";
      case "green": return "text-[#7ED957] drop-shadow-[0_0_8px_rgba(126,217,87,0.8)]";
      case "red": return "text-[#E63946] drop-shadow-[0_0_8px_rgba(230,57,70,0.8)]";
      default: return "text-[#C0C0C0] drop-shadow-[0_0_4px_rgba(192,192,192,0.5)]";
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dark Navy Neon Radial Gradients */}
      <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-radial from-[rgba(24,168,255,0.06)] to-transparent blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-radial from-[rgba(126,217,87,0.04)] to-transparent blur-[150px]" />
      <div className="absolute top-[60%] left-[50%] -translate-x-1/2 w-[60vw] h-[30vw] rounded-full bg-radial from-[rgba(24,168,255,0.04)] to-transparent blur-[140px]" />

      {/* Grid Overlay for 2000s tech aesthetics */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(24,168,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(24,168,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"
        style={{ transform: "perspective(1000px) rotateX(40deg) translateY(-20px)", transformOrigin: "top" }}
      />

      {/* Floating Sparkles and Stars */}
      {stars.map((star) => (
        <svg
          key={star.id}
          className={`absolute ${getStarColorClass(star.color)} fill-current`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationName: "starBlink",
            animationDuration: star.duration,
            animationDelay: star.delay,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
          viewBox="0 0 24 24"
        >
          {star.id % 2 === 0 ? (
            /* 4-point star matching brand logo style */
            <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
          ) : (
            /* Simple glowing dot */
            <circle cx="12" cy="12" r="10" />
          )}
        </svg>
      ))}

      {/* Brand signature glowing background elements */}
      <div className="absolute top-20 right-20 text-[#18A8FF]/5 font-mono text-xs select-none tracking-widest leading-none rotate-90 hidden lg:block">
        FIVE STARZ MAGIC DETAIL • TX
      </div>
      <div className="absolute bottom-20 left-10 text-[#7ED957]/5 font-mono text-xs select-none tracking-widest leading-none -rotate-90 hidden lg:block">
        Est. Kilgore / Longview, Texas
      </div>
    </div>
  );
}
