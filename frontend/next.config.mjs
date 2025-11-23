/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 🚀 Prevent ESLint from breaking your Render build
    ignoreDuringBuilds: true,
  },
  // Required for deploying Next.js on Render
  output: 'standalone',
};

export default nextConfig;
