"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Dynamic import of canvas-confetti to avoid SSR issues
let confettiLib: ((opts: object) => void) | null = null;
if (typeof window !== "undefined") {
  import("canvas-confetti").then((mod) => {
    confettiLib = mod.default;
  });
}

/**
 * Replace the [[ ... ]] below with your heartfelt closing message.
 */
const CLOSING_MESSAGE = `[[ Madhu, from this moment forward, I promise you —
every ordinary day made extraordinary, every storm faced side by side,
every adventure we haven't dreamed of yet.
Not a proposal. Not a promise on paper.
Just me, choosing you. Every single day. Forever.
You are my person. And that will never change. ]]`;

export default function Chapter5Celebration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const heartsRef = useRef<HTMLDivElement>(null);
  const confettiFired = useRef(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          once: true,
          onEnter: () => {
            if (!confettiFired.current) {
              confettiFired.current = true;
              fireConfetti();
              animateHearts();
            }
          },
        },
      });

      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(2)" },
          "-=0.2"
        )
        .fromTo(
          messageRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          btnRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.5)" },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  function fireConfetti() {
    if (!confettiLib) return;

    const colors = ["#f2a7b7", "#c9a84c", "#fde8ed", "#e07a90", "#fff9f2"];

    // Burst from left
    confettiLib({
      particleCount: 80,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.6 },
      colors,
      scalar: 1.1,
    });

    // Burst from right
    setTimeout(() => {
      confettiLib!({
        particleCount: 80,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.6 },
        colors,
        scalar: 1.1,
      });
    }, 200);

    // Center burst
    setTimeout(() => {
      confettiLib!({
        particleCount: 120,
        spread: 90,
        origin: { x: 0.5, y: 0.5 },
        colors,
        gravity: 0.7,
        scalar: 1.3,
      });
    }, 450);

    // Star burst
    setTimeout(() => {
      confettiLib!({
        particleCount: 60,
        spread: 360,
        startVelocity: 25,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes: ["star"],
        gravity: 0.5,
      });
    }, 700);
  }

  function animateHearts() {
    const container = heartsRef.current;
    if (!container) return;

    const heartChars = ["♥", "💕", "♡", "🌸", "✦"];

    for (let i = 0; i < 18; i++) {
      const span = document.createElement("span");
      span.textContent = heartChars[i % heartChars.length];
      span.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 16}px;
        left: ${Math.random() * 100}%;
        bottom: -2rem;
        opacity: 0;
        pointer-events: none;
        user-select: none;
      `;
      container.appendChild(span);

      const duration = 2.5 + Math.random() * 2;
      const delay = Math.random() * 1.5;

      gsap.to(span, {
        y: -(window.innerHeight * (0.7 + Math.random() * 0.4)),
        duration,
        delay,
        ease: "power1.out",
        onComplete: () => span.remove(),
      });

      gsap.to(span, {
        opacity: 0.9,
        duration: duration / 2,
        delay,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });
    }
  }

  const handleReplay = () => {
    // Smooth scroll back to chapter 0 with an iris-wipe
    const ch0 = document.getElementById("chapter-0");
    if (!ch0) return;

    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9998; pointer-events: none;
      background: #1a0510;
      clip-path: circle(0% at 50% 50%);
    `;
    document.body.appendChild(overlay);

    gsap.timeline({
      onComplete: () => {
        ch0.scrollIntoView({ behavior: "instant" });
        // Reset confetti flag so it fires again if she scrolls back
        confettiFired.current = false;
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.8,
          onComplete: () => overlay.remove(),
        });
      },
    }).to(overlay, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 0.9,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={containerRef}
      className="chapter"
      style={{
        background: `radial-gradient(ellipse at 50% 30%, #7a2840 0%, #4a1528 40%, #1a0510 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--section-pad) clamp(1.5rem, 6vw, 5rem)",
        opacity: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating hearts container */}
      <div
        ref={heartsRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
        aria-hidden="true"
      />

      {/* Stars background decoration */}
      {["✦", "✧", "★", "✦", "✧"].map((s, i) => (
        <span
          key={i}
          className={`float float-delay-${i % 3}`}
          style={{
            position: "absolute",
            fontSize: `${0.8 + (i % 3) * 0.4}rem`,
            color: "var(--gold-light)",
            opacity: 0.3,
            top: `${10 + i * 18}%`,
            left: `${5 + i * 19}%`,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          {s}
        </span>
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "680px" }}>
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
          Chapter Five
        </p>

        {/* Big celebration heading */}
        <h2
          ref={headingRef}
          className="font-script"
          style={{
            fontSize: "clamp(3rem, 9vw, 5.5rem)",
            color: "var(--blush-light)",
            marginBottom: "0.5rem",
            lineHeight: 1.1,
            opacity: 0,
            textShadow: "0 0 60px rgba(242,167,183,0.4)",
          }}
        >
          Forever it is. 💕
        </h2>

        <div className="gold-line" style={{ maxWidth: "200px" }} />

        {/* Closing heartfelt message */}
        <p
          ref={messageRef}
          className="font-serif"
          style={{
            fontSize: "clamp(1.1rem, 2.8vw, 1.35rem)",
            color: "var(--cream)",
            lineHeight: 1.9,
            fontStyle: "italic",
            marginTop: "2rem",
            marginBottom: "3rem",
            opacity: 0,
            whiteSpace: "pre-line",
          }}
        >
          {CLOSING_MESSAGE}
        </p>

        {/* Photo collage strip */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
            margin: "0 auto 3rem",
            maxWidth: 520,
          }}
        >
          {[
            { src: "/photos/q.jpg", rot: -4 },
            { src: "/photos/i.jpg", rot: 2 },
            { src: "/photos/e.jpg", rot: -2 },
            { src: "/photos/w.jpg", rot: 3 },
            { src: "/photos/y.jpg", rot: -3 },
          ].map(({ src, rot }, i) => (
            <div
              key={i}
              style={{
                width: "clamp(72px, 14vw, 95px)",
                aspectRatio: "3/4",
                borderRadius: 8,
                overflow: "hidden",
                border: "3px solid rgba(255,255,255,0.2)",
                transform: `rotate(${rot}deg)`,
                boxShadow: "0 8px 28px rgba(0,0,0,0.4)",
                transition: "transform 0.3s var(--ease-spring)",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) scale(1.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = `rotate(${rot}deg)`; }}
            >
              <Image src={src} alt="A memory" fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>

        {/* Replay button */}
        <button
          ref={btnRef}
          id="replay-btn"
          className="btn btn-ghost"
          onClick={handleReplay}
          style={{ opacity: 0 }}
        >
          Replay our story &nbsp; 🔁
        </button>
      </div>
    </div>
  );
}
