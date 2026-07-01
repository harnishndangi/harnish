"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on pointer devices
    if (!window.matchMedia("(hover: hover)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.style.opacity = "1";

    // Use gsap.quickTo for butter-smooth cursor following
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onEnter = () => gsap.to(cursor, { scale: 1.6, duration: 0.2 });
    const onLeave = () => gsap.to(cursor, { scale: 1, duration: 0.2 });

    // Scale up on interactive elements
    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 24s-9-6.5-9-13a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 13-9 13z"
          fill="rgba(242,167,183,0.9)"
          stroke="rgba(201,168,76,0.6)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
