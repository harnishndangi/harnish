# 💕 Madhu Proposal Site

A cinematic, scroll-driven love story — built with Next.js 14 + GSAP + Turborepo.

---

## 🖼️ Adding Your Images

Save your images into `apps/web/public/photos/` with these exact filenames:

| Filename | Image |
|----------|-------|
| `photo-1.jpg` | "My mother in law when she was pregnant" moon ultrasound meme |
| `photo-2.jpg` | The horizontal scroll gallery card 2 (real photo of you two) |
| `photo-3.jpg` | Gallery card 3 |
| `photo-4.jpg` | Gallery card 4 |
| `photo-5.jpg` | Gallery card 5 |
| `photo-6.jpg` | Gallery card 6 (add more as you like) |
| `butterflies.jpg` | X-ray with butterflies — "Look what you did.." (Chapter 1) |
| `skull-kiss.png` | "Can I get a kiss?" skull sticker (Chapter 3 accent) |
| `crying-emoji.png` | Overwhelmed crying emoji sticker (Chapter 3 accent) |
| `ghost-heart.png` | Ghost/blob holding pink heart (Chapter 4) |

> If an image is missing, the site gracefully hides the broken slot — nothing will crash.

---

## 🎵 Adding Your Song

Drop your MP3 into:

```
apps/web/public/audio/our-song.mp3
```

The audio toggle button at the bottom-left will play it (muted by default).

---

## ✏️ Personalizing the Text

Search for `[[` in the codebase — every placeholder is marked like `[[ your text here ]]`.

| File | What to change |
|------|---------------|
| `Chapter1HowItBegan.tsx` | Story of how you met — 3 panels |
| `Chapter2Gallery.tsx` | Photo captions |
| `Chapter3WhyILoveYou.tsx` | 10 reasons you love her |
| `Chapter5Celebration.tsx` | `CLOSING_MESSAGE` — your heartfelt forever promise |

---

## 🚀 Running Locally

```bash
# From the root madhu-proposal/ folder:
npm install
npm run dev
```

Then open `http://localhost:3000`.

---

## ☁️ Deploying to Vercel (Free)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Vercel auto-detects the config — just click Deploy
4. Share the URL with Madhu 💕

---

## 📐 Tech Stack

- **Next.js 14** (App Router)
- **GSAP 3 + ScrollTrigger** — all animations
- **@gsap/react `useGSAP()`** — safe React/HMR integration
- **Lenis** — buttery smooth scrolling
- **canvas-confetti** — celebration burst
- **Turborepo** — monorepo build caching
- **npm workspaces** — dependency management

---

## 🎨 Chapters

| # | Chapter | Key Effect |
|---|---------|-----------|
| 0 | The Invitation | Stars + Hindi text letter-by-letter + iris-wipe |
| 1 | How It Began | Paper texture storybook + SVG draws + butterfly image |
| 2 | Little Moments | Horizontal scroll gallery with your images |
| 3 | Why I Love You | Reveal reasons one by one + blush→gold shift |
| 4 | The Question | Infinity SVG draws + typewriter + magnetic Yes button |
| 5 | The Celebration | Confetti + floating hearts + replay loop |
