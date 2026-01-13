"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center">
      <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-rocket-launching-into-space-4310-large.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 font-heading text-6xl font-bold tracking-tight text-[#fdfbf7] uppercase sm:text-7xl lg:text-8xl"
        >
          Kutay Roket Takımı
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-xl text-[#fdfbf7]/80 sm:text-2xl"
        >
          Pushing the Boundaries of High Altitude
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-[#f97316]" />
          <span className="font-mono text-sm tracking-widest text-[#f97316]">EST. 2024</span>
          <span className="h-px w-12 bg-[#f97316]" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          {/* HUD-style indicator */}
          <div className="flex h-12 w-6 items-start justify-center rounded-full border border-[#fdfbf7]/30 p-1.5">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="h-2 w-2 rounded-full bg-[#f97316]"
            />
          </div>
          <span className="font-mono text-xs tracking-widest text-[#fdfbf7]/50 uppercase">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
