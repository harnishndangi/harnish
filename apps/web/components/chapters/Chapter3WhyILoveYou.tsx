"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/**
 * Replace [[ ... ]] with your real reasons — as many as you like.
 * The skull image and crying emoji image appear as decorative accent stickers.
 */
const REASONS = [
  "[[ The way you laugh at my terrible jokes even when they're not funny ]]",
  "[[ How you make even ordinary days feel like something worth remembering ]]",
  "[[ Your voice. I could listen to it forever and not get tired. ]]",
  "[[ The way you care — not just for me, but for everyone around you ]]",
  "[[ How you look when you're focused on something you love ]]",
  "[[ The fact that being with you feels like home ]]",
  "[[ You're the first person I want to tell good news to ]]",
  "[[ The way you understand me without me having to say everything ]]",
  "Because you make me want to be better every single day 🌙",
  "And honestly? Just because it's you. It's always been you. 💕",
];

// Color progression: blush → warm mid → gold
const BG_COLORS = [
  "#fde8ed", "#fde2e8", "#fcd9e2", "#f9c8d4", "#f5b8c8",
  "#f0a8bc", "#ebb0a0", "#e8c080", "#e4c860", "#ddb840",
];

function playChime() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.7);
  } catch (_) {
    // AudioContext not available — fail silently
  }
}

export default function Chapter3WhyILoveYou() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [revealed, setRevealed] = useState(0);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const revealNext = useCallback(() => {
    if (revealed >= REASONS.length) return;
    const nextIdx = revealed;

    playChime();

    const card = cardRefs.current[nextIdx];
    if (card) {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.4)",
          onComplete: () => {
            // Scroll the newly revealed card into view
            card.scrollIntoView({ behavior: "smooth", block: "nearest" });
          },
        }
      );
    }

    // Background color shift
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundColor: BG_COLORS[Math.min(nextIdx, BG_COLORS.length - 1)],
        duration: 0.9,
        ease: "power1.inOut",
      });
    }

    setRevealed((r) => r + 1);
  }, [revealed]);

  return (
    <div
      ref={containerRef}
      className="chapter"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "var(--section-pad) clamp(1.5rem, 5vw, 4rem)",
        paddingBottom: "5rem",
        minHeight: "100svh",
        height: "auto",
        position: "relative",
      }}
    >
      {/* Animated background layer */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: BG_COLORS[0],
          transition: "background-color 0.9s ease",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Floating photo strip — decorative background photos */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Top-left accent photo */}
        <div style={{ position: "absolute", top: "3%", left: "-2%", width: "clamp(100px,16vw,180px)", aspectRatio: "3/4", borderRadius: 16, overflow: "hidden", opacity: 0.18, transform: "rotate(-6deg)", boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          <Image src="/photos/r.jpg" alt="" fill style={{ objectFit: "cover" }} />
        </div>
        {/* Top-right accent photo */}
        <div style={{ position: "absolute", top: "5%", right: "-2%", width: "clamp(90px,14vw,160px)", aspectRatio: "3/4", borderRadius: 16, overflow: "hidden", opacity: 0.16, transform: "rotate(7deg)", boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          <Image src="/photos/t.jpg" alt="" fill style={{ objectFit: "cover" }} />
        </div>
        {/* Bottom-left accent photo */}
        <div style={{ position: "absolute", bottom: "4%", left: "-1%", width: "clamp(90px,14vw,155px)", aspectRatio: "3/4", borderRadius: 16, overflow: "hidden", opacity: 0.16, transform: "rotate(5deg)", boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          <Image src="/photos/u.jpg" alt="" fill style={{ objectFit: "cover" }} />
        </div>
        {/* Bottom-right accent photo */}
        <div style={{ position: "absolute", bottom: "6%", right: "-1%", width: "clamp(100px,16vw,175px)", aspectRatio: "3/4", borderRadius: 16, overflow: "hidden", opacity: 0.18, transform: "rotate(-5deg)", boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          <Image src="/photos/y.jpg" alt="" fill style={{ objectFit: "cover" }} />
        </div>
      </div>

      {/* Skull sticker — decorative top-right accent */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "2rem",
          width: "clamp(70px, 12vw, 110px)",
          opacity: 0.85,
          zIndex: 2,
          transform: "rotate(8deg)",
          pointerEvents: "none",
          filter: "drop-shadow(0 4px 12px rgba(74,21,40,0.2))",
        }}
        aria-hidden="true"
      >
        {/*
          IMAGE: apps/web/public/photos/skull-kiss.png
          (the "Can I get a kiss?" skull sticker image)
        */}
        <Image
          src="/photos/skull-kiss.png"
          alt=""
          width={110}
          height={110}
          style={{ width: "100%", height: "auto" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* Crying emoji sticker — bottom-left accent */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "2rem",
          width: "clamp(60px, 10vw, 90px)",
          opacity: 0.9,
          zIndex: 2,
          transform: "rotate(-10deg)",
          pointerEvents: "none",
          filter: "drop-shadow(0 4px 12px rgba(74,21,40,0.2))",
        }}
        aria-hidden="true"
      >
        {/*
          IMAGE: apps/web/public/photos/crying-emoji.png
          (the yellow emoji covering face with heart eyes, overwhelmed)
        */}
        <Image
          src="/photos/crying-emoji.png"
          alt=""
          width={90}
          height={90}
          style={{ width: "100%", height: "auto" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: "680px", width: "100%", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            letterSpacing: "0.3em",
            color: "var(--maroon)",
            textTransform: "uppercase",
            marginBottom: "0.8rem",
            opacity: 0.8,
          }}
        >
          Chapter Three
        </p>
        <h2
          ref={headingRef}
          className="font-script"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
            color: "var(--maroon)",
            marginBottom: "0.5rem",
            opacity: 0,
          }}
        >
          Why I Love You
        </h2>
        <div className="gold-line" />

        {/* Instruction */}
        <p
          className="font-serif"
          style={{
            fontSize: "1.15rem",
            color: "var(--ink-light)",
            fontStyle: "italic",
            margin: "1.5rem 0",
            opacity: 1,
            fontWeight: 500,
          }}
        >
          {revealed < REASONS.length
            ? `Tap the button to reveal a reason... (${revealed}/${REASONS.length})`
            : "All reasons revealed 💕"}
        </p>

        {/* Revealed reason cards */}
        <div
          ref={cardsWrapRef}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "2rem",
            width: "100%",
            padding: "0.25rem 0",
          }}
        >
          {REASONS.slice(0, revealed).map((reason, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardRefs.current[i] = el; }}
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(10px)",
                borderRadius: "14px",
                padding: "1.25rem 1.75rem",
                border: "1px solid rgba(201,168,76,0.35)",
                boxShadow: "0 4px 20px rgba(74,21,40,0.1)",
                textAlign: "left",
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
                opacity: 1,
              }}
            >
              <span style={{ color: "var(--blush-dark)", fontSize: "1.2rem", marginTop: "0.1rem", flexShrink: 0 }}>♥</span>
              <p
                className="font-serif"
                style={{
                  fontSize: "1.15rem",
                  color: "var(--ink)",
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                {reason}
              </p>
            </div>
          ))}
        </div>

        {/* Reveal button */}
        {revealed < REASONS.length ? (
          <button
            id="reveal-reason-btn"
            className="btn btn-primary"
            onClick={revealNext}
            style={{ fontSize: "1.05rem" }}
          >
            Reveal a reason ✦
          </button>
        ) : (
          <p
            className="font-script"
            style={{
              fontSize: "1.8rem",
              color: "var(--maroon)",
              marginTop: "0.5rem",
            }}
          >
            And so many more... 💕
          </p>
        )}
      </div>
    </div>
  );
}
