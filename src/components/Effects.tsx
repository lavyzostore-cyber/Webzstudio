import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

/**
 * Magnetic component that exerts a subtle, professional gravity pull towards the user's cursor.
 * Respects users who prefer reduced motion.
 */
export function Magnetic({ children, strength = 0.12, className = "" }: { children: React.ReactNode; strength?: number; className?: string; key?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { damping: 20, stiffness: 180 });
  const y = useSpring(0, { damping: 20, stiffness: 180 });
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldAnimate(!mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setShouldAnimate(!e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!shouldAnimate || !ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Premium Card with rotating conic gradient borders, elevation lifts, soft ambient shadows,
 * and high-fidelity glows. Perfect for Pricing Cards and Project Cycle steps.
 */
export function PremiumCard({
  children,
  className = "",
  glowColor = "from-[#00E5FF] to-[#7C3AED]",
  liftAmount = "-translate-y-2",
  id = "",
  shouldScale = false
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  liftAmount?: string;
  id?: string;
  shouldScale?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldAnimate(!mediaQuery.matches);
  }, []);

  const hoverClass = shouldAnimate
    ? `hover:${liftAmount} hover:shadow-[0_0_40px_rgba(0,229,255,0.18)] ${shouldScale ? "hover:scale-[1.03]" : ""}`
    : "";

  return (
    <div
      id={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-[1px] rounded-[24px] bg-white/5 overflow-hidden transition-all duration-500 ease-out ${hoverClass} ${className}`}
    >
      {/* 60fps GPU Accelerated Rotating Border (only active when hovered & allowed) */}
      {shouldAnimate && (
        <div
          className={`absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 -ml-[150%] -mt-[150%] w-[300%] h-[300%] bg-[conic-gradient(from_0deg,transparent_20%,#00E5FF_40%,#7C3AED_60%,transparent_80%)] animate-[spin_5s_linear_infinite]" />
        </div>
      )}

      {/* Outer base container border background mask to simulate premium thin frame */}
      <div className="relative h-full w-full rounded-[23px] bg-[#111827] group-hover:bg-[#131d2e] transition-colors duration-500 overflow-hidden flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

/**
 * Premium Shine Sweep overlay on hover for buttons.
 * Adds moving diagonal shine reflections, slight hover scales, active feedback, and glowing shadows.
 */
export function PremiumButtonWrapper({
  children,
  className = "",
  disabled = false
}: {
  children: React.ReactElement;
  className?: string;
  disabled?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldAnimate(!mediaQuery.matches);
  }, []);

  if (disabled) {
    return React.cloneElement(children, { className: `${children.props.className || ""} ${className}` });
  }

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Combine parent's props with premium hover styling states
  return (
    <div className={`relative group inline-block rounded-xl ${className}`}>
      {/* Animated Glow Backing for buttons */}
      {shouldAnimate && (
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] rounded-xl blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none`}
        />
      )}

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-xl transition-transform duration-200 active:scale-95"
      >
        {children}

        {/* Diagonal shine sweep reflection (only on hover & dynamic animation permitted) */}
        {shouldAnimate && isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
            <div className="absolute top-0 -left-[100%] h-full w-[40%] bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[25deg] animate-shine-sweep" />
          </div>
        )}
      </div>
    </div>
  );
}
