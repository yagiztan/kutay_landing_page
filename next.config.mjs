/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <--- BU SATIRI EKLE (HTML çıktısı için)
  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
}

export default nextConfig