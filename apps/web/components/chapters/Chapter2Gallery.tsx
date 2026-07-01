"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/**
 * IMAGE SLOTS for Chapter 2 — Little Moments Gallery
 *
 * Save your images to: apps/web/public/photos/
 * Image mapping:
 *   photo-1.jpg  → The "My mother in law when she was pregnant" moon ultrasound meme
 *   photo-2.jpg  → The "Can I get a kiss?" skull sticker
 *   photo-3.jpg  → The X-ray butterflies "Look what you did.." (also used in Ch1)
 *   photo-4.jpg  → The crying overwhelmed emoji sticker
 *   photo-5.jpg  → The ghost/blob holding the big pink heart
 *
 * Add more photos (photo-6.jpg, etc.) and entries below as needed.
 */
const GALLERY_ITEMS = [
  {
    src: "/photos/photo-1.jpg",
    caption: "My mother in law, when she was pregnant 🎀",
    bg: "linear-gradient(135deg, #0a0a0a, #1a1a1a)",
    alt: "A funny moment that makes us laugh",
  },
  {
    src: "/photos/photo-2.jpg",
    caption: "Can I get a kiss? 💀",
    bg: "linear-gradient(135deg, #e8e8e8, #f5f5f5)",
    alt: "Can I get a kiss — a silly favourite",
  },
  {
    src: "/photos/photo-3.jpg",
    caption: "Look what you did to me, Madhu.. 🦋",
    bg: "linear-gradient(135deg, #0d2137, #1a3a5c)",
    alt: "Look what you did to me",
  },
  {
    src: "/photos/photo-4.jpg",
    caption: "This is literally me when I think about you 😵",
    bg: "linear-gradient(135deg, #f5c060, #e8a020)",
    alt: "The overwhelmed emoji — exactly how you make me feel",
  },
  {
    src: "/photos/photo-5.jpg",
    caption: "Here. My whole heart. It's yours. 🤍",
    bg: "linear-gradient(135deg, #fde8ed, #f2a7b7)",
    alt: "Ghost holding a big pink heart",
  },
  {
    src: "/photos/photo-6.jpg",
    caption: "Will you be mine? ✓ Yes  or  Nah 🥹",
    bg: "linear-gradient(135deg, #f0f0f0, #ffffff)",
    alt: "Will you be my girlfriend sticker",
  },
  {
    src: "/photos/i.jpg",
    caption: "Every picture with you is my favourite 📸",
    bg: "linear-gradient(135deg, #1a0510, #4a1528)",
    alt: "A beautiful memory together",
  },
  {
    src: "/photos/e.jpg",
    caption: "This is what happiness looks like 🌸",
    bg: "linear-gradient(135deg, #fde8ed, #f2a7b7)",
    alt: "Pure happiness",
  },
];

export default function Chapter2Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      // Horizontal scroll gallery — only on desktop (768px+)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const totalWidth = trackRef.current!.scrollWidth - window.innerWidth;

        const horizontalScroll = gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1.2,
            start: "top top",
            end: () => `+=${totalWidth + 200}`,
            invalidateOnRefresh: true,
          },
        });

        // Individual card tilt on scroll
        const cards = trackRef.current!.querySelectorAll(".gallery-card");
        cards.forEach((card, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          gsap.to(card, {
            rotation: direction * 2.5,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              scrub: 2,
              start: "top top",
              end: "bottom bottom",
            },
          });
        });

        return () => {
          horizontalScroll.scrollTrigger?.kill();
        };
      });

      // Mobile: vertical stacked reveal
      mm.add("(max-width: 767px)", () => {
        const cards = trackRef.current!.querySelectorAll(".gallery-card");
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.1,
              ease: "back.out(1.3)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="chapter"
      style={{ background: "var(--maroon-deep)", overflow: "hidden" }}
    >
      {/* Header — visible before horizontal scroll starts */}
      <div
        style={{
          position: "absolute",
          top: "3rem",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 5,
          padding: "0 2rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            letterSpacing: "0.3em",
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
          }}
        >
          Chapter Two
        </p>
        <h2
          ref={headingRef}
          className="font-script"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "var(--cream)",
            opacity: 0,
          }}
        >
          Little Moments
        </h2>
        <div className="gold-line" style={{ marginTop: "0.6rem" }} />

        {/* Desktop scroll hint */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            color: "var(--gold-light)",
            opacity: 0.6,
            marginTop: "0.5rem",
            display: "none", // shown via CSS on desktop
          }}
          className="desktop-only-hint"
        >
          scroll to browse →
        </p>
      </div>

      {/* Gallery Track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          padding: "9rem 3rem 3rem",
          alignItems: "center",
          width: "max-content",
          minHeight: "100svh",
        }}
        className="gallery-track"
      >
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={i}
            className="gallery-card card"
            style={{
              width: "clamp(260px, 28vw, 340px)",
              height: "clamp(300px, 38vw, 440px)",
              flex: "0 0 auto",
              background: item.bg,
              position: "relative",
              border: "1px solid rgba(201,168,76,0.2)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              transformOrigin: "center center",
            }}
          >
            {/* Photo */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 90vw, 340px"
                onError={(e) => {
                  // Graceful fallback: hide broken image, show bg gradient
                  (e.target as HTMLImageElement).style.opacity = "0";
                }}
              />
            </div>

            {/* Caption bar */}
            <div
              style={{
                padding: "1rem 1.25rem",
                background: "rgba(26, 5, 16, 0.88)",
                backdropFilter: "blur(8px)",
                borderTop: "1px solid rgba(201,168,76,0.2)",
              }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: "1.1rem",
                  color: "var(--cream)",
                  fontStyle: "italic",
                  lineHeight: 1.55,
                  fontWeight: 500,
                }}
              >
                {item.caption}
              </p>
            </div>

            {/* Card number badge */}
            <div
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(201,168,76,0.25)",
                border: "1px solid rgba(201,168,76,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold-light)",
                fontSize: "0.7rem",
                fontFamily: "var(--font-body)",
              }}
            >
              {i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Floating doodle hearts */}
      {["♥", "✦", "♡", "✿", "♥"].map((sym, i) => (
        <div
          key={i}
          className={`float float-delay-${i % 3}`}
          style={{
            position: "absolute",
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
            color: i % 2 === 0 ? "var(--blush)" : "var(--gold-light)",
            fontSize: `${1 + (i % 3) * 0.4}rem`,
            opacity: 0.25,
            pointerEvents: "none",
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          {sym}
        </div>
      ))}

      <style>{`
        @media (min-width: 768px) {
          .desktop-only-hint { display: block !important; }
          .gallery-track { flex-direction: row !important; }
        }
        @media (max-width: 767px) {
          .gallery-track {
            flex-direction: column !important;
            width: 100% !important;
            padding: 8rem 1.5rem 3rem !important;
            align-items: center;
          }
          .gallery-card {
            width: min(90vw, 340px) !important;
            height: auto !important;
            min-height: 300px;
          }
        }
      `}</style>
    </div>
  );
}
