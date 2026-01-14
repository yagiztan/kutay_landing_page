/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Statik çıktı almaya devam et, bu Vercel için de iyi.

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig