"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import dynamic from "next/dynamic"

const RocketCanvas = dynamic(() => import("@/components/rocket-canvas").then((mod) => mod.RocketCanvas), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="font-mono text-sm text-[#fdfbf7]/30">Loading 3D Model...</div>
    </div>
  ),
})

const specs = [
  { label: "THRUST", value: "[ Solid Fuel ]" },
  { label: "PAYLOAD", value: "[ 4.0 KG ]" },
  { label: "LENGTH", value: "[ 2.4 M ]" },
  { label: "STATUS", value: "[ FLIGHT READY ]", highlight: true },
]

export function RocketShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="rocket" className="relative bg-[#0B1120] px-6 py-32" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-[#fdfbf7]/10" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Technical Specs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block font-mono text-xs tracking-widest text-[#f97316] uppercase">
              [ Technical Specifications ]
            </span>
            <h2 className="mb-2 font-heading text-4xl font-bold text-[#fdfbf7] sm:text-5xl">X-1 Model Rocket</h2>
            <p className="mb-10 font-mono text-sm text-[#fdfbf7]/40">Analysis & Specifications</p>

            <div className="space-y-4">
              {specs.map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-between border-b border-[#fdfbf7]/10 pb-4"
                >
                  <span className="font-mono text-sm tracking-wider text-[#fdfbf7]/50">{spec.label}</span>
                  <span className={`font-mono text-sm ${spec.highlight ? "text-[#22c55e]" : "text-[#fdfbf7]"}`}>
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#f97316]" />
              <div className="h-px flex-1 bg-gradient-to-r from-[#f97316]/50 to-transparent" />
              <span className="font-mono text-xs text-[#fdfbf7]/30">CONNECTED</span>
            </div>
          </motion.div>

          {/* Right Column - 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] lg:h-[500px]"
          >
            <div className="absolute inset-0 hidden rounded-xl border border-[#fdfbf7]/10 bg-[#0f172a]/30 backdrop-blur-sm md:block">
              <RocketCanvas />
            </div>

            <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#fdfbf7]/10 bg-[#0f172a]/30 md:hidden">
              <img src="/white-sleek-rocket-3d-render-dark-background.jpg" alt="X-1 Rocket" className="h-full w-full object-contain p-8" />
            </div>

            {/* HUD overlay elements */}
            <div className="pointer-events-none absolute top-4 left-4 font-mono text-xs text-[#fdfbf7]/30">
              <div>X: 0.00</div>
              <div>Y: 0.00</div>
              <div>Z: 0.00</div>
            </div>
            <div className="pointer-events-none absolute top-4 right-4 font-mono text-xs text-[#f97316]/50">● LIVE</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
