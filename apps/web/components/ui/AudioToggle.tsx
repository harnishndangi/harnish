"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/our-song.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => {
        setPlaying(true);
        setHasInteracted(true);
      }).catch(() => {
        // Autoplay blocked — still update state
        setPlaying(false);
      });
    }
  };

  return (
    <button
      id="audio-toggle"
      className="audio-toggle"
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play our song"}
      title={playing ? "Pause music" : "Play our song"}
    >
      <span style={{ fontSize: "1rem" }}>{playing ? "🔊" : "🔇"}</span>
      <span>{!hasInteracted ? "tap to hear our song" : playing ? "pause" : "play"}</span>
    </button>
  );
}
