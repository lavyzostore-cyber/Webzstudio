import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  type: "sparkle" | "spark" | "glitter";
  maxLife: number;
  life: number;
  rotation?: number;
  rotSpeed?: number;
}

interface Ripple {
  cx: number;
  cy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function InteractiveName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Sound generator (Web Audio API)
  const playPremiumClickSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // Clear, high-end metallic chime click
      osc.type = "sine";
      const startTime = ctx.currentTime;
      
      osc.frequency.setValueAtTime(1400, startTime);
      osc.frequency.exponentialRampToValueAtTime(700, startTime + 0.08);
      
      gain.gain.setValueAtTime(0.015, startTime); // Failsafe extremely low volume
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.08);
      
      osc.start(startTime);
      osc.stop(startTime + 0.08);
    } catch (err) {
      // Graceful fail on browser blocking policies
      console.warn("Haptic UI feedback chime prevented or blocked by browser policies.");
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldAnimate(!mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let particleIdCounter = 0;
    let animationFrameId: number;

    const resizeCanvas = () => {
      const parent = containerRef.current;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const padding = 80; // Extra room for flying particles
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = (rect.width + padding * 2) * dpr;
      canvas.height = (rect.height + padding * 2) * dpr;
      
      canvas.style.width = `${rect.width + padding * 2}px`;
      canvas.style.height = `${rect.height + padding * 2}px`;
      canvas.style.transform = `translate(${-padding}px, ${-padding}px)`;
      
      ctx.scale(dpr, dpr);
    };

    // Initial resize inside requestAnimationFrame to guarantee layout settles
    requestAnimationFrame(resizeCanvas);
    window.addEventListener("resize", resizeCanvas);

    // Color palette matching WEBZSTUDIO premium theme
    const COLORS = [
      "#00E5FF", // Cyan glow
      "#7C3AED", // Vivid purple
      "#FFFFFF", // Pure white luster
      "#5B21B6", // Dark deep indigo
      "#38BDF8", // Sky blue
    ];

    const spawnParticle = (x: number, y: number, forceExplosion = false) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = forceExplosion 
        ? Math.random() * 3 + 1.5 
        : Math.random() * 0.8 + 0.2;
      const sizeList = forceExplosion ? [3, 4, 5, 6] : [2, 3, 4];
      const size = sizeList[Math.floor(Math.random() * sizeList.length)];
      
      const typeRand = Math.random();
      let type: "sparkle" | "spark" | "glitter" = "glitter";
      if (forceExplosion) {
        type = typeRand > 0.4 ? "spark" : typeRand > 0.15 ? "sparkle" : "glitter";
      } else {
        type = typeRand > 0.6 ? "sparkle" : "glitter";
      }

      particles.push({
        id: particleIdCounter++,
        x,
        y,
        vx: Math.cos(angle) * speed + (forceExplosion ? 0 : (Math.random() - 0.5) * 0.2),
        vy: Math.sin(angle) * speed - (forceExplosion ? 0.8 : Math.random() * 0.3), // Float upwards gently
        size,
        alpha: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type,
        maxLife: forceExplosion ? Math.random() * 40 + 20 : Math.random() * 50 + 30,
        life: 0,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1,
      });

      // Maintain reasonable limits for performance
      if (particles.length > 80) {
        particles.shift();
      }
    };

    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, s: number, rotation: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.beginPath();
      // Precise mathematical 4-Point organic bezier sparkle
      c.moveTo(0, -s);
      c.quadraticCurveTo(0, 0, s, 0);
      c.quadraticCurveTo(0, 0, 0, s);
      c.quadraticCurveTo(0, 0, -s, 0);
      c.quadraticCurveTo(0, 0, 0, -s);
      c.closePath();
      c.fill();
      c.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update and draw ripples (click shockwave)
      ripples.forEach((item, index) => {
        item.radius += (item.maxRadius - item.radius) * 0.12;
        item.alpha *= 0.92;

        if (item.alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(item.cx, item.cy, item.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 229, 255, ${item.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Double outer concentric faint ring
          ctx.beginPath();
          ctx.arc(item.cx, item.cy, item.radius * 0.72, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(124, 58, 237, ${item.alpha * 0.45})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          ripples.splice(index, 1);
        }
      });

      // 2. Update and draw particles
      particles.forEach((p, index) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        
        // Dynamic fade out based on life progression
        p.alpha = 1 - p.life / p.maxLife;

        if (p.rotation !== undefined && p.rotSpeed !== undefined) {
          p.rotation += p.rotSpeed;
        }

        if (p.alpha > 0) {
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.type === "sparkle" ? 8 : 4;

          ctx.globalAlpha = p.alpha;

          if (p.type === "sparkle") {
            drawSparkle(ctx, p.x, p.y, p.size, p.rotation || 0);
          } else if (p.type === "spark") {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            // Draw speed-streaking sparks (pointing opposing velocity direction)
            ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = p.size * 0.6;
            ctx.stroke();
          } else {
            // standard circular shiny glitter
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
          }
        } else {
          particles.splice(index, 1);
        }
      });

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0; // reset shadow defaults

      // 3. Spontaneous ambient sparkle generation if user is hovering
      if (isHovered && textRef.current && Math.random() < 0.45) {
        const textRect = textRef.current.getBoundingClientRect();
        const parentRect = containerRef.current.getBoundingClientRect();
        const padding = 80;

        // Position coordinates relative to canvas center mapping
        const localX = (textRect.left - parentRect.left) + Math.random() * textRect.width + padding;
        const localY = (textRect.top - parentRect.top) + Math.random() * textRect.height + padding;
        spawnParticle(localX, localY);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Store listener handles so handlers or events can dispatch triggers
    const parentEl = containerRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const parentRect = parentEl.getBoundingClientRect();
      const padding = 80;
      const x = e.clientX - parentRect.left + padding;
      const y = e.clientY - parentRect.top + padding;
      
      // Emit sparkles exactly tracking cursor vector path
      if (Math.random() < 0.7) {
        spawnParticle(x, y);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const parentRect = parentEl.getBoundingClientRect();
      const padding = 80;
      const clickX = e.clientX - parentRect.left + padding;
      const clickY = e.clientY - parentRect.top + padding;

      // Register clean dynamic sound chime
      playPremiumClickSound();

      // Initiate radial expanding ripple shockwave
      ripples.push({
        cx: clickX,
        cy: clickY,
        radius: 2,
        maxRadius: 110,
        alpha: 0.9,
      });

      // Pre-spawn circular firework explosive sparks burst (18 particles)
      for (let i = 0; i < 18; i++) {
        spawnParticle(clickX, clickY, true);
      }
    };

    parentEl.addEventListener("mousemove", handleMouseMove);
    parentEl.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      if (parentEl) {
        parentEl.removeEventListener("mousemove", handleMouseMove);
        parentEl.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, [shouldAnimate, isHovered]);

  return (
    <div ref={containerRef} className="relative inline-block select-none cursor-pointer">
      {/* 60fps GPU Accelerated Particle Overlay Canvas */}
      {shouldAnimate && (
        <canvas
          ref={canvasRef}
          className="absolute pointer-events-none z-30"
          style={{ mixBlendMode: "screen" }}
        />
      )}

      {/* Decorative text wrapping name featuring hover gradient glows and taps scale */}
      <motion.span
        ref={textRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={shouldAnimate ? { scale: 1.04 } : {}}
        whileTap={shouldAnimate ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 450, damping: 20 }}
        className="relative z-20 text-lg font-extrabold tracking-wide inline-block"
      >
        <span 
          className="bg-gradient-to-r from-white via-cyan-300 to-white hover:from-[#00E5FF] hover:via-white hover:to-[#7C3AED] bg-clip-text text-transparent transition-all duration-700 ease-out font-display cursor-pointer"
          style={{
            textShadow: isHovered 
              ? "0 0 15px rgba(0, 229, 255, 0.45), 0 0 30px rgba(124, 58, 237, 0.2)" 
              : "0 0 0px rgba(0,0,0,0)",
          }}
        >
          Lakshay Verma
        </span>
      </motion.span>
    </div>
  );
}
