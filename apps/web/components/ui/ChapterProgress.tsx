"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CHAPTERS = ["✦", "①", "②", "③", "④", "⑤"];

export default function ChapterProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-chapter]");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActive(Number(section.getAttribute("data-chapter"))),
        onEnterBack: () => setActive(Number(section.getAttribute("data-chapter"))),
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const scrollTo = (idx: number) => {
    const el = document.getElementById(`chapter-${idx}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="progress-dots" aria-label="Chapter navigation">
      {CHAPTERS.map((label, i) => (
        <button
          key={i}
          id={`progress-dot-${i}`}
          className={`progress-dot${active === i ? " active" : ""}`}
          onClick={() => scrollTo(i)}
          title={`Go to chapter ${i}`}
          aria-label={`Chapter ${i}`}
        />
      ))}
    </nav>
  );
}
