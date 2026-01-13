"use client"

import { motion } from "framer-motion"
import { ArrowDown, Crosshair, Wifi } from "lucide-react"

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1120]">
      
      {/* --- 1. VİDEO KATMANI --- */}
      <div className="absolute inset-0 z-0">
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="h-full w-full object-cover opacity-80"
            poster="/video-poster.jpg" // Video yüklenene kadar gösterilecek resim (mutlaka ekle)
        >
          <source
            src="kutay2.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Overlay: Video üzerine hafif lacivert bir ton atarak yazının okunmasını sağla */}
        <div className="absolute inset-0 bg-[#0B1120]/40 mix-blend-multiply" />
      </div>

      {/* --- 2. TEKNİK IZGARA & DOKU (Cinematic Texture) --- */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* İnce Grid Deseni */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Vignette (Kenarları Karartma) */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B1120]/50 to-[#0B1120]" />
      </div>

      {/* --- 3. HUD / TELEMETRY ELEMENTLERİ (Köşeler) --- */}
      <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-12 flex flex-col justify-between text-[#fdfbf7]/40 font-mono text-xs tracking-widest uppercase">
        {/* Sol Üst */}
        <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
                <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#f97316] animate-pulse rounded-full" /> LIVE FEED</span>
                <span>CAM-04 // LAUNCH PAD A</span>
            </div>
            {/* Sağ Üst */}
            <div className="text-right hidden sm:block">
                <span>SYS: NORMAL</span>
                <br />
                <span>T-MINUS: 00:00:00</span>
            </div>
        </div>

        {/* Sol Alt */}
        <div className="flex items-end justify-between">
            <div className="hidden sm:block">
                <span>LAT: 37.9135° N</span>
                <br />
                <span>LON: 27.8423° E</span>
            </div>
            {/* Sağ Alt */}
            <div className="flex items-center gap-2 text-[#fdfbf7]/60">
                <Wifi className="w-4 h-4" />
                <span>TELEMETRY ONLINE</span>
            </div>
        </div>
        
        {/* Köşe Çizgileri (Border Accents) */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#fdfbf7]/20 rounded-tl-3xl" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#fdfbf7]/20 rounded-tr-3xl" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#fdfbf7]/20 rounded-bl-3xl" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#fdfbf7]/20 rounded-br-3xl" />
      </div>

      {/* --- 4. ANA İÇERİK --- */}
      <div className="relative z-30 mx-auto max-w-6xl px-6 text-center">
        
        {/* Küçük Üst Başlık */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
        >
            <span className="h-px w-8 bg-[#f97316]/50" />
            <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-[#f97316] uppercase">Est. 2024 • Turkey</span>
            <span className="h-px w-8 bg-[#f97316]/50" />
        </motion.div>

        {/* Ana Başlık (Blend Mode Efektli) */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 font-serif text-5xl font-bold tracking-tight text-[#fdfbf7] uppercase sm:text-7xl lg:text-9xl mix-blend-overlay opacity-90"
        >
          Kutay Roket
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#fdfbf7] to-[#fdfbf7]/50">Takımı</span>
        </motion.h1>

        {/* Alt Açıklama */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-10 text-lg md:text-xl text-[#fdfbf7]/80 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Mühendisliğin sınırlarını zorluyor, gökyüzünün ötesini hedefliyoruz. 
          <span className="block mt-2 font-mono text-xs text-[#fdfbf7]/50 tracking-widest uppercase">
            // High Altitude Rocketry Systems
          </span>
        </motion.p>

      </div>

      {/* --- 5. SCROLL GÖSTERGESİ (Teknik) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#fdfbf7]/40 uppercase group-hover:text-[#f97316] transition-colors">
            Mission Start
        </span>
        <div className="relative flex h-14 w-8 items-start justify-center rounded-full border border-[#fdfbf7]/20 bg-[#0B1120]/30 backdrop-blur-sm p-1.5 group-hover:border-[#f97316]/50 transition-colors">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-[#fdfbf7] group-hover:bg-[#f97316]"
          />
        </div>
      </motion.div>

    </section>
  )
}