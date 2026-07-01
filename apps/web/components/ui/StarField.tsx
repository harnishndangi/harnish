"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Generate stars
    const COUNT = Math.min(220, Math.floor((width * height) / 5000));
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      radius: Math.random() * 1.4 + 0.3,
      alpha: Math.random(),
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // A few "firefly" particles — warm golden, larger
    const fireflies: Particle[] = Array.from({ length: 12 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // Draw stars
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.twinklePhase += p.twinkleSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const twinkle = 0.5 + 0.5 * Math.sin(p.twinklePhase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 246, 236, ${twinkle * 0.8})`;
        ctx.fill();
      });

      // Draw fireflies (golden glow)
      fireflies.forEach((f) => {
        f.x += f.vx;
        f.y += f.vy;
        f.twinklePhase += f.twinkleSpeed;

        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;

        const twinkle = 0.4 + 0.6 * Math.sin(f.twinklePhase);
        // Soft glow ring
        const grd = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 4);
        grd.addColorStop(0, `rgba(201, 168, 76, ${twinkle * 0.9})`);
        grd.addColorStop(0.4, `rgba(201, 168, 76, ${twinkle * 0.3})`);
        grd.addColorStop(1, "rgba(201, 168, 76, 0)");
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="star-canvas"
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
