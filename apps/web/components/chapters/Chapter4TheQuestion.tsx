"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Typewriter helper
function useTypewriter(text: string, speed = 60, active = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) return;
    let i = 0;
    setDisplayed("");
    const iv = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(iv);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed, active]);
  return displayed;
}

interface Chapter4Props {
  onYes?: () => void;
}

export default function Chapter4TheQuestion({ onYes }: Chapter4Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const infinityRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);
  const thinkBtnRef = useRef<HTMLButtonElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  const [typewriterActive, setTypewriterActive] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const typewriterText = useTypewriter("Madhu, will you be my forever?", 65, typewriterActive);
  const thinkDodgeCount = useRef(0);

  useGSAP(
    () => {
      if (!containerRef.current || !infinityRef.current) return;

      // Infinity SVG stroke draw animation
      const pathLen = infinityRef.current.getTotalLength?.() ?? 300;
      gsap.set(infinityRef.current, {
        strokeDasharray: pathLen,
        strokeDashoffset: pathLen,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          once: true,
        },
      });

      // 1. Fade in container
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );

      // 2. Infinity draws itself
      tl.to(
        infinityRef.current,
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power1.inOut",
        },
        "-=0.4"
      );

      // 3. Ghost image floats in
      if (ghostRef.current) {
        tl.fromTo(
          ghostRef.current,
          { opacity: 0, y: 40, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.5)" },
          "-=1.5"
        );
      }

      // 4. Start typewriter
      tl.call(() => setTypewriterActive(true), [], "-=0.3");

      // 5. Buttons appear after typewriter finishes (approx)
      tl.call(
        () => setButtonsVisible(true),
        [],
        `+=${("Madhu, will you be my forever?".length * 65) / 1000 + 0.3}`
      );
    },
    { scope: containerRef }
  );

  // Magnetic Yes button effect — desktop only
  useEffect(() => {
    if (!yesBtnRef.current || !buttonsVisible) return;
    const btn = yesBtnRef.current;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power2.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const PULL_RADIUS = 150;
      if (dist < PULL_RADIUS) {
        const strength = 1 - dist / PULL_RADIUS;
        xTo(dx * strength * 0.35);
        yTo(dy * strength * 0.35);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const onLeave = () => { xTo(0); yTo(0); };

    window.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, [buttonsVisible]);

  // "Let me think" runaway button — always dodges, never stops
  const dodge = useCallback(() => {
    const btn = thinkBtnRef.current;
    if (!btn) return;

    thinkDodgeCount.current += 1;

    // Always jump to a random position within the viewport
    const btnW = btn.offsetWidth || 160;
    const btnH = btn.offsetHeight || 48;
    const maxX = Math.max(window.innerWidth - btnW - 20, 20);
    const maxY = Math.max(window.innerHeight - btnH - 20, 20);
    const newX = 20 + Math.random() * maxX;
    const newY = 20 + Math.random() * maxY;

    gsap.to(btn, {
      position: "fixed",
      left: newX,
      top: newY,
      x: 0,
      y: 0,
      duration: 0.35,
      ease: "back.out(2.5)",
    });
  }, []);

  const handleYes = () => {
    if (onYes) {
      onYes();
    }
    // Scroll to chapter 5
    const ch5 = document.getElementById("chapter-5");
    if (ch5) ch5.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="chapter"
      style={{
        background: `radial-gradient(ellipse at 50% 50%, #2a0d1a 0%, #1a0510 60%, #0e0008 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        opacity: 0,
        position: "relative",
      }}
    >
      {/* Ghost with hearts image */}
      <div
        ref={ghostRef}
        style={{
          width: "clamp(120px, 18vw, 180px)",
          marginBottom: "1.5rem",
          opacity: 0,
          filter: "drop-shadow(0 0 30px rgba(242,167,183,0.4))",
        }}
        aria-hidden="true"
      >
        {/*
          IMAGE: apps/web/public/photos/ghost-heart.png
          (the white blob/ghost holding a big pink heart, surrounded by hearts)
        */}
        <Image
          src="/photos/ghost-heart.png"
          alt="A heart held out for you"
          width={180}
          height={180}
          style={{ width: "100%", height: "auto" }}
          onError={(e) => {
            // Fallback emoji if image not placed yet
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              (e.target as HTMLImageElement).style.display = "none";
              parent.innerHTML = '<span style="font-size:6rem">🤍</span>';
            }
          }}
        />
      </div>

      {/* Infinity symbol SVG — draws itself */}
      <svg
        viewBox="0 0 240 100"
        width="clamp(180px, 40vw, 280px)"
        style={{ marginBottom: "2.5rem", overflow: "visible" }}
        aria-hidden="true"
      >
        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Infinity path — two loops meeting at center */}
        <path
          ref={infinityRef}
          d="M120,50 C120,20 80,5 60,5 C30,5 10,22 10,50 C10,78 30,95 60,95 C80,95 120,80 120,50 C120,20 160,5 180,5 C210,5 230,22 230,50 C230,78 210,95 180,95 C160,95 120,80 120,50 Z"
          fill="none"
          stroke="url(#infinityGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <defs>
          <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f2a7b7" />
            <stop offset="50%" stopColor="#c9a84c" />
            <stop offset="100%" stopColor="#f2a7b7" />
          </linearGradient>
        </defs>
      </svg>

      {/* Chapter tag */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          letterSpacing: "0.3em",
          color: "var(--gold)",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        Chapter Four
      </p>

      {/* Typewriter text */}
      <p
        ref={textRef}
        className="font-script"
        style={{
          fontSize: "clamp(2.4rem, 7vw, 4.2rem)",
          color: "var(--cream)",
          lineHeight: 1.35,
          marginBottom: "3rem",
          minHeight: "5rem",
          textShadow: "0 0 40px rgba(242,167,183,0.3)",
        }}
      >
        {typewriterText}
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "1em",
            background: "var(--blush)",
            marginLeft: "4px",
            verticalAlign: "text-bottom",
            animation: "blink 1s step-end infinite",
          }}
        />
      </p>

      {/* Buttons */}
      {buttonsVisible && (
        <div
          ref={buttonsRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <button
            ref={yesBtnRef}
            id="yes-btn"
            className="btn btn-primary glow-pulse"
            onClick={handleYes}
            style={{
              fontSize: "1.35rem",
              padding: "1.2rem 4rem",
              willChange: "transform",
            }}
          >
            Yes, always 💕
          </button>

          <button
            ref={thinkBtnRef}
            id="think-btn"
            className="btn btn-ghost"
            onMouseEnter={dodge}
            onTouchStart={dodge}
            onClick={dodge}
            style={{
              fontSize: "1rem",
              opacity: 0.7,
              zIndex: 1,
            }}
          >
            Let me think...
          </button>
        </div>
      )}

      {/* Cursor blink keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
