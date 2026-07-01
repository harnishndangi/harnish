"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarField from "@/components/ui/StarField";

// Register useGSAP hook
gsap.registerPlugin(ScrollTrigger);

// Helper: split text into animated spans
function splitToSpans(text: string): React.ReactNode[] {
  return text.split("").map((char, i) => (
    <span key={i} className="char" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default function Chapter0Invitation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Master timeline for the invitation reveal
      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Fade in the whole container (from pitch black)
      tl.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      // 2. Letter-by-letter reveal for Hindi headline
      const titleChars = titleRef.current?.querySelectorAll(".char");
      if (titleChars) {
        tl.to(
          titleChars,
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.5,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        );
      }

      // 3. Subtitle fades up
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        "-=0.1"
      );

      // 4. Button scales in with bounce
      tl.fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(2)" },
        "-=0.3"
      );

      // 5. Scroll hint appears
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 0.7, duration: 0.8, ease: "power1.out" },
        "+=0.5"
      );
    },
    { scope: containerRef }
  );

  const handleOpen = () => {
    const chapter1 = document.getElementById("chapter-1");
    if (!chapter1) return;

    // Iris-wipe transition: radial clip-path expands from center
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9998; pointer-events: none;
      background: #fdf6ec;
      clip-path: circle(0% at 50% 50%);
    `;
    document.body.appendChild(overlay);

    gsap
      .timeline({
        onComplete: () => {
          chapter1.scrollIntoView({ behavior: "instant" });
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.6,
            onComplete: () => overlay.remove(),
          });
        },
      })
      .to(overlay, {
        clipPath: "circle(150% at 50% 50%)",
        duration: 0.8,
        ease: "power2.inOut",
      });
  };

  return (
    <div
      ref={containerRef}
      className="chapter"
      style={{
        background: `radial-gradient(ellipse at 50% 40%, #2a0d1a 0%, #0e0508 60%, #000 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        opacity: 0,
      }}
    >
      {/* Animated star background */}
      <StarField />

      {/* Content above canvas */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "680px" }}>
        {/* Chapter tag */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            letterSpacing: "0.3em",
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: "2rem",
            opacity: 0.9,
          }}
        >
          ❖ &nbsp; a letter for you &nbsp; ❖
        </p>

        {/* Hindi headline */}
        <h1
          ref={titleRef}
          className="font-script"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.8rem)",
            color: "var(--cream)",
            lineHeight: 1.35,
            marginBottom: "1.5rem",
            textShadow: "0 0 40px rgba(242,167,183,0.3)",
          }}
        >
          {splitToSpans("Madhu, main tumhare liye")}
          <br />
          {splitToSpans("kuch likha hai...")}
        </h1>

        {/* English subtext */}
        <p
          ref={subtitleRef}
          className="font-serif"
          style={{
            fontSize: "clamp(1.1rem, 2.8vw, 1.4rem)",
            color: "var(--blush-light)",
            fontStyle: "italic",
            lineHeight: 1.8,
            marginBottom: "3rem",
            opacity: 0,
          }}
        >
          Scroll through our story... every word is meant for you.
        </p>

        {/* CTA Button */}
        <button
          ref={btnRef}
          id="open-story-btn"
          className="btn btn-primary glow-pulse"
          onClick={handleOpen}
          style={{
            fontSize: "1.15rem",
            padding: "1rem 2.8rem",
            opacity: 0,
          }}
        >
          Open our story &nbsp; ✦
        </button>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="bounce-arrow"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0,
          color: "var(--gold-light)",
          fontSize: "1.3rem",
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        ↓
      </div>
    </div>
  );
}
