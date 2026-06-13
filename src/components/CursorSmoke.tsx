import React, { useEffect, useRef } from "react";

export default function CursorSmoke() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if the device has hover capabilities (disable on simple touch screens)
    const isHoverable = window.matchMedia("(any-hover: hover)").matches;
    if (!isHoverable) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      maxLife: number;
      life: number;
      color: string;
    }

    const particles: Particle[] = [];
    const mouse = { x: 0, y: 0 };
    const lastMouse = { x: 0, y: 0 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const dx = mouse.x - lastMouse.x;
      const dy = mouse.y - lastMouse.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 2) {
        // Spawn particles along the mouse movement path for continuous trails
        const count = Math.min(Math.floor(dist / 3) + 1, 6);
        for (let i = 0; i < count; i++) {
          const ratio = i / count;
          const px = lastMouse.x + dx * ratio;
          const py = lastMouse.y + dy * ratio;

          particles.push({
            x: px,
            y: py,
            vx: (Math.random() - 0.5) * 1.0,
            vy: (Math.random() - 0.5) * 1.0 - 0.5, // gentle rising drift
            size: Math.random() * 18 + 12,
            maxLife: Math.random() * 30 + 25,
            life: 0,
            // Splendid cosmic colors (soft cyan vs warm indigo) matching WEBZSTUDIO styling
            color: Math.random() > 0.45 ? "rgba(0, 229, 255, " : "rgba(108, 99, 255, "
          });
        }
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const updateLoop = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.35; // puff outwards lightly as smoke drifts

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const opacity = 1 - p.life / p.maxLife;
        
        // Draw smooth fuzzy circular smoke glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, p.color + opacity * 0.16 + ")");
        grad.addColorStop(0.4, p.color + opacity * 0.07 + ")");
        grad.addColorStop(1, p.color + "0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
      style={{ pointerEvents: "none" }}
    />
  );
}
