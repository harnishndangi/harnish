"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ── Story moments for the timeline ──────────────────────────────────────────
const MOMENTS = [
  {
    id: 1,
    icon: "☕",
    tag: "Where it all started",
    date: "[[ Date & Place of First Meeting ]]",
    title: "The First Glance",
    text: "It started with something small — a moment you probably didn't even notice. But I noticed everything about you. The way you laughed. The way your eyes lit up.",
    photo: "/photos/r.jpg",
    side: "left" as const,
    color: "var(--blush)",
  },
  {
    id: 2,
    icon: "🍀",
    tag: "The luckiest decision of my life",
    date: "Every single day",
    title: "I Was Lucky I Chose You",
    text: "Of all the paths I could have taken, of all the moments I could have walked away — I chose you. And every morning I wake up knowing that was the best decision I will ever make in my entire life.",
    photo: "/photos/w.jpg",
    side: "right" as const,
    color: "var(--gold)",
  },
  {
    id: 3,
    icon: "💓",
    tag: "A feeling I can't describe",
    date: "Every time our eyes meet",
    title: "When I See You...",
    text: "When I see you, something in my chest just fills up. Like every good thing in the world decided to exist at once. I don't know how to explain it — I just know that no one else has ever made me feel this full.",
    photo: "/photos/t.jpg",
    side: "left" as const,
    color: "var(--blush-dark)",
  },
  {
    id: 4,
    icon: "🏆",
    tag: "Simply the best",
    date: "Always & forever",
    title: "You Are The Best",
    text: "I have met many people. But you? You are in a completely different league. The way you carry yourself, the way you treat others, the warmth you give so effortlessly — Madhu, you are genuinely the best person I know.",
    photo: "/photos/u.jpg",
    side: "right" as const,
    color: "var(--gold-dark)",
  },
  {
    id: 5,
    icon: "🌙",
    tag: "Butterflies & more",
    date: "[[ A Late Night / Special Occasion ]]",
    title: "Butterflies",
    text: "You gave me butterflies I didn't know were possible. Look what you did to me, Madhu. I didn't even know my heart could feel this loud until you walked into my world.",
    photo: "/photos/y.jpg",
    side: "left" as const,
    color: "var(--maroon-light)",
  },
  {
    id: 6,
    icon: "🏡",
    tag: "Where I belong",
    date: "Wherever you are",
    title: "You Feel Like Home",
    text: "I never understood what people meant when they said someone \"feels like home\" — until you. With you, there is no nervousness, no performance. Just peace. Just belonging. Just us.",
    photo: "/photos/i.jpg",
    side: "right" as const,
    color: "var(--gold)",
  },
  {
    id: 7,
    icon: "✨",
    tag: "A thousand times over",
    date: "In every lifetime",
    title: "I'd Choose You Again",
    text: "If I were given a thousand lifetimes and a thousand choices — I would choose you in every single one. Not because I have to. Because there is simply nobody else in this world who is you, Madhu. And that is everything.",
    photo: "/photos/e.jpg",
    side: "left" as const,
    color: "var(--blush)",
  },
];

// ── Floating petal positions ─────────────────────────────────────────────────
const PETALS = [
  { top: "8%", left: "5%", size: 22, delay: 0 },
  { top: "15%", left: "92%", size: 16, delay: 0.6 },
  { top: "35%", left: "3%", size: 18, delay: 1.2 },
  { top: "55%", left: "95%", size: 14, delay: 0.3 },
  { top: "72%", left: "8%", size: 20, delay: 0.9 },
  { top: "85%", left: "88%", size: 17, delay: 1.5 },
];

export default function Chapter1HowItBegan() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const momentRefs = useRef<HTMLDivElement[]>([]);
  const closingRef = useRef<HTMLDivElement>(null);

  const [activeCard, setActiveCard] = useState<number | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Hero section reveal
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 85%" },
        }
      );

      // Heading letter cascade
      const chars = headingRef.current?.querySelectorAll(".ch1-char");
      if (chars) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 30, rotateX: -40 },
          {
            opacity: 1, y: 0, rotateX: 0,
            stagger: 0.05, duration: 0.7, ease: "back.out(1.7)",
            scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
          }
        );
      }

      // Timeline spine draw
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1, duration: 2, ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      // Each moment card slides in
      momentRefs.current.forEach((card, i) => {
        const isLeft = MOMENTS[i]?.side === "left";
        gsap.fromTo(
          card,
          { opacity: 0, x: isLeft ? -50 : 50, y: 20 },
          {
            opacity: 1, x: 0, y: 0,
            duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
            delay: 0.05 * i,
          }
        );
      });

      // Closing quote
      gsap.fromTo(
        closingRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: closingRef.current, start: "top 82%" },
        }
      );
    },
    { scope: containerRef }
  );

  const splitHeading = (text: string) =>
    text.split("").map((ch, i) => (
      <span
        key={i}
        className="ch1-char"
        style={{ display: "inline-block", opacity: 0, whiteSpace: ch === " " ? "pre" : "normal" }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className="chapter paper-bg"
      style={{ padding: 0, display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* ── Responsive styles ── */}
      <style>{`
        /* ── Timeline row: desktop = 3-column alternating, mobile = single column ── */
        .ch1-timeline-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: start;
          margin-bottom: 4rem;
          position: relative;
        }
        .ch1-card-spacer { display: block; }
        .ch1-spine {
          position: absolute;
          left: 50%;
          top: 0; bottom: 0;
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(to bottom, var(--gold-light), var(--blush), var(--gold));
          transform-origin: top center;
          z-index: 0;
        }
        /* MomentCard margins on desktop */
        .ch1-card-left  { margin: 0 1.5rem 0 0; }
        .ch1-card-right { margin: 0 0 0 1.5rem; }
        /* Photo strip sizes */
        .ch1-strip-photo {
          width: clamp(100px, 18vw, 160px);
          aspect-ratio: 3/4;
          border-radius: 12px;
          overflow: hidden;
          border: 4px solid white;
          box-shadow: 0 8px 32px rgba(74,21,40,0.18);
          transition: transform 0.35s var(--ease-spring), box-shadow 0.35s ease;
          cursor: pointer;
          position: relative;
        }
        /* Expandable text — enough room for long messages */
        .ch1-expand-text {
          overflow: hidden;
          transition: max-height 0.5s var(--ease-soft);
        }
        /* Node size */
        .ch1-node {
          width: 52px; height: 52px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          z-index: 2;
          margin: 0 auto;
          flex-shrink: 0;
          transition: transform 0.3s var(--ease-bounce);
          cursor: default;
        }

        /* ── MOBILE overrides (≤ 640px) ── */
        @media (max-width: 640px) {
          /* Switch timeline to single column, card full-width */
          .ch1-timeline-row {
            grid-template-columns: auto 1fr;
            margin-bottom: 2.5rem;
          }
          /* Hide the spacer div on mobile */
          .ch1-card-spacer { display: none; }
          /* Node sits on the left edge */
          .ch1-node {
            width: 40px; height: 40px;
            font-size: 1.1rem;
            margin: 0;
            flex-shrink: 0;
          }
          /* Spine runs along left side */
          .ch1-spine {
            left: 19px;
            transform: none;
          }
          /* Card always fills the right column, no side margins */
          .ch1-card-left, .ch1-card-right {
            margin: 0 0 0 1rem;
            grid-column: 2;
            grid-row: 1;
          }
          /* Photo strip: smaller on mobile */
          .ch1-strip-photo {
            width: clamp(80px, 26vw, 120px);
          }
          /* Petals hidden on mobile to reduce clutter */
          .ch1-petal { display: none; }
          /* Closing card padding */
          .ch1-closing {
            margin: 0 1rem 4rem !important;
            padding: 2rem 1.5rem !important;
          }
          /* Hero padding */
          .ch1-hero {
            padding: 4rem 1.25rem 2rem !important;
          }
          /* Expandable text big enough */
          .ch1-expand-text.open { max-height: 500px !important; }
        }

        /* ── Tablet (641–900px) ── */
        @media (min-width: 641px) and (max-width: 900px) {
          .ch1-node { width: 44px; height: 44px; font-size: 1.2rem; }
          .ch1-card-left  { margin: 0 1rem 0 0; }
          .ch1-card-right { margin: 0 0 0 1rem; }
          .ch1-closing { margin: 0 1.5rem 4rem !important; }
          .ch1-expand-text.open { max-height: 400px !important; }
        }

        /* Desktop expand height */
        @media (min-width: 641px) {
          .ch1-expand-text.open { max-height: 300px; }
          .ch1-expand-text.closed { max-height: 0; }
        }

        /* Strip photo hover — desktop only */
        @media (hover: hover) {
          .ch1-strip-photo:hover { box-shadow: 0 20px 50px rgba(74,21,40,0.3); }
        }
      `}</style>

      {/* ── Floating petals (hidden on mobile via CSS) ── */}
      {PETALS.map((p, i) => (
        <div
          key={i}
          className={`float float-delay-${(i % 4) + 1} ch1-petal`}
          aria-hidden="true"
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.45,
          }}
        >
          <svg viewBox="0 0 40 40" fill="none">
            <ellipse cx="20" cy="20" rx="10" ry="18" fill="var(--blush)" transform={`rotate(${i * 37} 20 20)`} />
            <ellipse cx="20" cy="20" rx="10" ry="18" fill="var(--gold-light)" opacity="0.5" transform={`rotate(${i * 37 + 60} 20 20)`} />
          </svg>
        </div>
      ))}

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        className="ch1-hero"
        style={{
          width: "100%",
          padding: "var(--section-pad) clamp(1.5rem, 6vw, 6rem) 3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          opacity: 0,
        }}
      >
        {/* Chapter label */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            letterSpacing: "0.3em",
            color: "var(--gold-dark)",
            textTransform: "uppercase",
            marginBottom: "1.2rem",
          }}
        >
          ❖ &nbsp; Chapter One &nbsp; ❖
        </p>

        {/* Animated heading */}
        <h2
          ref={headingRef}
          className="font-script"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            color: "var(--maroon)",
            lineHeight: 1.15,
            marginBottom: "1rem",
            perspective: "600px",
          }}
        >
          {splitHeading("How It Began")}
        </h2>

        {/* Gold ornament line */}
        <div className="gold-line" style={{ maxWidth: 220, margin: "0 auto 1.8rem" }} />

        {/* Hero sub-quote */}
        <p
          className="font-serif"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "var(--ink-light)",
            fontStyle: "italic",
            maxWidth: 560,
            lineHeight: 1.9,
            padding: "0 0.5rem",
          }}
        >
          &quot;Every great love story has a beginning — a heartbeat that changed everything.
          Ours started the moment I getting to understand you.&quot;
        </p>

        {/* Polaroid photo strip */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["/photos/q.jpg", "/photos/w.jpg", "/photos/y.jpg"].map((src, i) => (
            <div
              key={i}
              className="ch1-strip-photo"
              style={{ transform: `rotate(${[-3, 1.5, -2][i]}deg)` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) scale(1.08)";
                (e.currentTarget as HTMLDivElement).style.zIndex = "10";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = `rotate(${[-3, 1.5, -2][i]}deg)`;
                (e.currentTarget as HTMLDivElement).style.zIndex = "1";
              }}
            >
              <Image
                src={src}
                alt={`Memory ${i + 1}`}
                fill
                sizes="(max-width: 640px) 26vw, 18vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── VERTICAL TIMELINE ── */}
      <div
        ref={timelineRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 950,
          padding: "2rem clamp(1rem, 4vw, 3rem) 4rem",
          zIndex: 1,
        }}
      >
        {/* Animated spine */}
        <div ref={lineRef} className="ch1-spine" aria-hidden="true" />

        {MOMENTS.map((moment, i) => (
          <div
            key={moment.id}
            ref={(el) => { if (el) momentRefs.current[i] = el; }}
            className="ch1-timeline-row"
            style={{ opacity: 0 }}
          >
            {/* LEFT card or spacer */}
            {moment.side === "left" ? (
              <MomentCard
                moment={moment}
                isActive={activeCard === i}
                onToggle={() => setActiveCard(activeCard === i ? null : i)}
                side="left"
              />
            ) : (
              <div className="ch1-card-spacer" />
            )}

            {/* Centre node */}
            <div
              className="ch1-node"
              style={{
                background: `radial-gradient(circle at 35% 35%, white 10%, ${moment.color} 100%)`,
                boxShadow: `0 0 0 5px white, 0 0 0 7px ${moment.color}55, 0 6px 20px rgba(74,21,40,0.25)`,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.25) rotate(15deg)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1) rotate(0deg)"; }}
            >
              {moment.icon}
            </div>

            {/* RIGHT card or spacer */}
            {moment.side === "right" ? (
              <MomentCard
                moment={moment}
                isActive={activeCard === i}
                onToggle={() => setActiveCard(activeCard === i ? null : i)}
                side="right"
              />
            ) : (
              <div className="ch1-card-spacer" />
            )}
          </div>
        ))}
      </div>

      {/* ── CLOSING QUOTE CARD ── */}
      <div
        ref={closingRef}
        className="ch1-closing"
        style={{
          width: "100%",
          maxWidth: 720,
          margin: "0 auto 6rem",
          padding: "3rem 2.5rem",
          background: "linear-gradient(135deg, var(--maroon) 0%, var(--maroon-light) 100%)",
          borderRadius: 24,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(74,21,40,0.35)",
          opacity: 0,
          zIndex: 1,
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", top: -20, right: -20, opacity: 0.12, fontSize: 100 }}>🌸</div>
        <div aria-hidden="true" style={{ position: "absolute", bottom: -30, left: -20, opacity: 0.10, fontSize: 90 }}>🌸</div>

        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", letterSpacing: "0.3em", color: "var(--gold-light)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          A note from my heart
        </p>
        <p
          className="font-script"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)", color: "var(--cream)", lineHeight: 1.6, marginBottom: "1.5rem" }}
        >
          &quot;You walked into my life<br />and rearranged everything.&quot;
        </p>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--gold-light), transparent)", margin: "0 auto 1.5rem", maxWidth: 200 }} />
        <p className="font-serif" style={{ fontSize: "clamp(1rem, 2.5vw, 1.1rem)", color: "var(--blush-light)", fontStyle: "italic", lineHeight: 1.8 }}>
          And I would let you do it a thousand times over.
        </p>

        <div
          style={{
            width: 90, height: 90,
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid var(--gold)",
            margin: "2rem auto 0",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            position: "relative",
          }}
        >
          <Image src="/photos/q.jpg" alt="Us" fill style={{ objectFit: "cover" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Moment Card Sub-component ──────────────────────────────────────────────── */
type MomentType = (typeof MOMENTS)[number];

function MomentCard({
  moment,
  isActive,
  onToggle,
  side,
}: {
  moment: MomentType;
  isActive: boolean;
  onToggle: () => void;
  side: "left" | "right";
}) {
  return (
    <div
      onClick={onToggle}
      className={side === "left" ? "ch1-card-left" : "ch1-card-right"}
      style={{
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(14px)",
        borderRadius: 18,
        overflow: "hidden",
        border: `1.5px solid ${isActive ? moment.color : "rgba(201,168,76,0.2)"}`,
        boxShadow: isActive
          ? `0 20px 60px rgba(74,21,40,0.18), 0 0 0 3px ${moment.color}44`
          : "0 6px 30px rgba(74,21,40,0.08)",
        cursor: "pointer",
        transition: "transform 0.35s var(--ease-spring), box-shadow 0.35s ease, border-color 0.3s ease",
        transform: isActive ? "translateY(-4px)" : "translateY(0)",
        // Ensure it always fills available space
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        if (!isActive) (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = isActive ? "translateY(-4px)" : "translateY(0)";
      }}
    >
      {/* Photo */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
        <Image
          src={moment.photo}
          alt={moment.title}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 900px) 44vw, 420px"
          style={{
            objectFit: "cover",
            transition: "transform 0.6s var(--ease-soft)",
            transform: isActive ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(74,21,40,0.5) 100%)",
          }}
        />
        {/* Tag badge */}
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "rgba(255,255,255,0.92)",
            borderRadius: 100,
            padding: "3px 10px",
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--gold-dark)",
            fontWeight: 600,
            maxWidth: "calc(100% - 80px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {moment.tag}
        </span>
        {/* Read/close hint */}
        <span
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 100,
            padding: "3px 10px",
            color: "white",
            fontSize: "0.6rem",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.1em",
          }}
        >
          {isActive ? "▲ close" : "▼ read"}
        </span>
      </div>

      {/* Text body */}
      <div style={{ padding: "1.25rem 1.4rem 1.4rem" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            color: "var(--gold-dark)",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}
        >
          {moment.date}
        </p>

        {/* SVG doodle underline */}
        <svg width="60" height="7" viewBox="0 0 60 7" style={{ display: "block", marginBottom: "0.5rem" }}>
          <path
            d="M1 5 Q15 1 30 4 Q45 7 59 2"
            stroke={moment.color}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <h3
          className="font-script"
          style={{
            fontSize: "clamp(1.25rem, 3.5vw, 1.8rem)",
            color: "var(--maroon)",
            marginBottom: "0.6rem",
            lineHeight: 1.2,
          }}
        >
          {moment.title}
        </h3>

        {/* Expandable message text — always readable, enough height */}
        <div
          className={`ch1-expand-text ${isActive ? "open" : "closed"}`}
          style={{ maxHeight: isActive ? 500 : 0 }}
        >
          <p
            className="font-serif"
            style={{
              fontSize: "clamp(0.95rem, 2.2vw, 1.05rem)",
              color: "var(--ink)",
              lineHeight: 1.85,
              fontStyle: "italic",
              paddingTop: "0.2rem",
              paddingBottom: "0.25rem",
            }}
          >
            {moment.text}
          </p>
        </div>

        {!isActive && (
          <p
            className="font-serif"
            style={{
              fontSize: "0.85rem",
              color: "var(--ink-light)",
              fontStyle: "italic",
              opacity: 0.55,
              marginTop: "0.1rem",
            }}
          >
            Tap to read this memory…
          </p>
        )}
      </div>
    </div>
  );
}
