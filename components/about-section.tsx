"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Layers, Cpu, Target } from "lucide-react"

const features = [
  {
    icon: Target,
    value: "3000m",
    label: "Target Altitude",
    description: "Hedef irtifa",
  },
  {
    icon: Layers,
    value: "COMPOSITE",
    label: "Materials",
    description: "Kompozit malzemeler",
  },
  {
    icon: Cpu,
    value: "CUSTOM",
    label: "Avionics",
    description: "Aviyonik sistemler",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative bg-[#0B1120] px-6 py-32" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-[#fdfbf7]/10" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: Large typography stating the mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block font-mono text-xs tracking-widest text-[#f97316] uppercase">
              [ Who We Are ]
            </span>
            <h2 className="mb-8 font-heading text-4xl font-bold leading-tight text-[#fdfbf7] sm:text-5xl lg:text-6xl">
              Engineering the Future of Aerospace
            </h2>
            <p className="text-lg leading-relaxed text-[#fdfbf7]/60">
              Kutay Roket Takımı olarak, Türkiye&apos;nin havacılık ve uzay sektöründe öncü bir rol üstlenmeyi
              hedefliyoruz. Genç mühendislerden oluşan ekibimiz, tutkuyla çalışarak sınırları zorluyor.
            </p>
            <div className="mt-8 h-px w-24 bg-gradient-to-r from-[#f97316] to-transparent" />
          </motion.div>

          {/* Right: Grid of 3 Bento/Glassmorphism cards */}
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group flex items-center gap-6 rounded-lg border border-[#fdfbf7]/10 bg-[#0f172a]/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#fdfbf7]/20 hover:bg-[#0f172a]/70">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-[#fdfbf7]/10 bg-[#fdfbf7]/5">
                    <feature.icon className="h-6 w-6 text-[#f97316]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-2xl font-bold text-[#fdfbf7]">{feature.value}</p>
                    <p className="text-sm text-[#fdfbf7]/50">{feature.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
