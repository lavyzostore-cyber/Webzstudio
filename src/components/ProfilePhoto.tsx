import React from "react";
import { motion } from "motion/react";

export function ProfilePhoto() {
  return (
    <div className="relative group p-5 bg-[#111827]/60 backdrop-blur-xl rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 ease-out flex items-center justify-center max-w-[220px] mx-auto">
      {/* Dynamic ambient backdrop glowing background */}
      <div 
        className="absolute -inset-10 bg-gradient-to-tr from-[#00E5FF] to-[#7C3AED] opacity-[0.08] group-hover:opacity-[0.18] blur-2xl transition-all duration-700 pointer-events-none"
      />

      <div className="relative">
        {/* Outer glowing border ring */}
        <div 
          className="rounded-full bg-gradient-to-tr from-[#00E5FF] via-[#7C3AED] to-cyan-400 p-[3px] transition-all duration-500 ease-out shadow-[0_0_25px_rgba(0,229,255,0.25)] group-hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] group-hover:scale-[1.04]"
        >
          {/* Inner clip circular container */}
          <div className="rounded-full overflow-hidden bg-[#050816] w-28 h-28 sm:w-32 sm:h-32 relative">
            <img 
              src="/Webz_Studio_1774377743040.png" 
              alt="Lakshay Verma Profile Logo" 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>

        {/* Lead Architect badge styled as premium overlay */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] text-black text-[9px] font-mono font-black tracking-widest px-3.5 py-1 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.6)] border border-white/10 uppercase whitespace-nowrap select-none">
          Lead Architect
        </div>
      </div>
    </div>
  );
}
