/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow local images and any external sources for photos
    remotePatterns: [],
  },
  // Ensure GSAP works properly with Next.js
  transpilePackages: [],
};

module.exports = nextConfig;
