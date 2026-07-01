/**
 * lib/gsap.ts
 * Centralized GSAP plugin registration.
 * Import this file ONCE in layout.tsx — never call registerPlugin inside render bodies.
 * This avoids duplicate plugin registration and SSR errors.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once, globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
