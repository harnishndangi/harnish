import type { Metadata } from "next";
import "./globals.css";
// Register GSAP plugins once at the module level (runs server-side safely — registration is guarded with typeof window check inside the file)
import "@/lib/gsap";
import LenisProvider from "@/components/ui/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import ChapterProgress from "@/components/ui/ChapterProgress";
import AudioToggle from "@/components/ui/AudioToggle";

export const metadata: Metadata = {
  title: "Madhu 💕 — A Story Written Just For You",
  description: "A love letter, a promise, and an invitation to forever together.",
  openGraph: {
    title: "Madhu 💕 — A Story Written Just For You",
    description: "A love letter, a promise, and an invitation to forever together.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a0510" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Film grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Lenis smooth scroll wrapper */}
        <LenisProvider>
          {/* Fixed UI layer */}
          <CustomCursor />
          <ChapterProgress />
          <AudioToggle />

          {/* Main content */}
          <main id="smooth-content">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
