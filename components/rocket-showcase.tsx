"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { AlertCircle, CheckCircle2, Ruler, Weight, Flame, Crosshair } from "lucide-react"

// 3D Canvas'ı dinamik olarak yükle (SSR kapalı)
const RocketCanvas = dynamic(() => import("@/components/rocket-canvas").then((mod) => mod.RocketCanvas), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#0f172a]/20">
      <div className="flex flex-col items-center gap-2">
         <div className="w-8 h-8 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin" />
         <div className="font-mono text-xs text-[#fdfbf7]/50 tracking-widest">LOADING MODEL...</div>
      </div>
    </div>
  ),
})

const specs = [
  { 
    id: "thrust",
    icon: Flame,
    label: "MOTOR İTKİSİ", 
    value: "N3300R", 
    detail: "Solid Fuel Composite",
    progress: 85 // % doluluk
  },
  { 
    id: "payload",
    icon: Weight,
    label: "FAYDALI YÜK", 
    value: "4.0 KG", 
    detail: "Scientific Instruments",
    progress: 60 
  },
  { 
    id: "length",
    icon: Ruler,
    label: "TOPLAM BOY", 
    value: "2.8 M", 
    detail: "Fiber Glass Body",
    progress: 75 
  },
]

export function RocketShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeSpec, setActiveSpec] = useState<string | null>(null)

  return (
    <section id="rocket" className="relative bg-[#0B1120] px-6 py-32 overflow-hidden" ref={ref}>
      
      {/* Arka Plan Izgarası */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ backgroundImage: 'radial-gradient(#fdfbf7 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* --- SOL KOLON (Teknik Veriler) - 5 Birim Genişlik --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-center h-full"
          >
            {/* Başlık Grubu */}
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-[#f97316] rounded-full animate-pulse" />
                    <span className="font-mono text-xs tracking-[0.2em] text-[#f97316] uppercase">
                        Technical Analysis
                    </span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#fdfbf7] mb-2">
                    Alp Roketi
                </h2>
                <div className="flex items-center gap-4 text-[#fdfbf7]/40 font-mono text-xs">
                    <span>REV: 2.4.0</span>
                    <span>//</span>
                    <span>SYS: ONLINE</span>
                </div>
            </div>

            {/* Veri Kartları */}
            <div className="space-y-6">
              {specs.map((spec, index) => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  onMouseEnter={() => setActiveSpec(spec.id)}
                  onMouseLeave={() => setActiveSpec(null)}
                  className={`
                    group relative p-4 rounded-xl border transition-all duration-300 cursor-default
                    ${activeSpec === spec.id 
                        ? 'bg-[#fdfbf7]/5 border-[#f97316]/50 translate-x-2' 
                        : 'bg-transparent border-[#fdfbf7]/10 hover:border-[#fdfbf7]/30'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activeSpec === spec.id ? 'bg-[#f97316] text-white' : 'bg-[#fdfbf7]/10 text-[#fdfbf7]/50'}`}>
                            <spec.icon className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="font-mono text-xs text-[#fdfbf7]/50 tracking-wider uppercase">{spec.label}</div>
                            <div className="font-bold text-lg text-[#fdfbf7]">{spec.value}</div>
                        </div>
                    </div>
                    {/* Detay Bilgisi (Hoverda Gözükür) */}
                    <div className={`text-xs text-[#f97316] font-mono transition-opacity duration-300 ${activeSpec === spec.id ? 'opacity-100' : 'opacity-0'}`}>
                        {spec.detail}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1 w-full bg-[#fdfbf7]/10 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${spec.progress}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
                        className={`h-full ${activeSpec === spec.id ? 'bg-[#f97316]' : 'bg-[#fdfbf7]/30'}`}
                    />
                  </div>

                  {/* Bağlantı Noktası (Sağ Kenar) */}
                  <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full border border-[#0B1120] transition-colors ${activeSpec === spec.id ? 'bg-[#f97316]' : 'bg-[#fdfbf7]/20'}`} />
                </motion.div>
              ))}

              {/* Status Kartı */}
              <div className="mt-6 p-4 rounded-xl border border-green-500/20 bg-green-500/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <div>
                        <div className="font-mono text-xs text-green-500/70 tracking-wider">SYSTEM STATUS</div>
                        <div className="font-bold text-green-500">FLIGHT READY</div>
                    </div>
                </div>
                <div className="font-mono text-xs text-green-500 animate-pulse">● STABLE</div>
              </div>
            </div>
          </motion.div>

          {/* --- SAĞ KOLON (3D Model & HUD) - 7 Birim Genişlik --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 relative h-[500px] lg:h-[600px]"
          >
            {/* 3D Kapsayıcı */}
            <div className="absolute inset-0 rounded-2xl border border-[#fdfbf7]/10 bg-[#0f172a]/40 backdrop-blur-sm overflow-hidden group">
              
              {/* Scanline Efekti */}
              <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] opacity-20 pointer-events-none" />
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#f97316]/5 to-transparent h-[20%] w-full animate-scan pointer-events-none" />

              {/* 3D Canvas */}
              <div className="h-full w-full relative z-10">
                 <RocketCanvas />
              </div>

              {/* --- HUD ARAYÜZÜ (Overlays) --- */}
              
              {/* Sol Üst Koordinat */}
              <div className="absolute top-6 left-6 font-mono text-xs text-[#fdfbf7]/30 flex flex-col gap-1">
                 <div className="flex gap-4 border-b border-[#fdfbf7]/10 pb-1 mb-1">
                    <span>X: 12.404</span>
                    <span>Y: 00.120</span>
                 </div>
              </div>

              
              {/* Alt Cetvel (Ruler) */}
              <div className="absolute bottom-0 left-0 right-0 h-8 border-t border-[#fdfbf7]/10 flex justify-between px-4 items-center font-mono text-[10px] text-[#fdfbf7]/30">
                 <span>0</span>
                 <span className="h-2 w-px bg-[#fdfbf7]/20" />
                 <span className="h-2 w-px bg-[#fdfbf7]/20" />
                 <span>50</span>
                 <span className="h-2 w-px bg-[#fdfbf7]/20" />
                 <span className="h-2 w-px bg-[#fdfbf7]/20" />
                 <span>100</span>
              </div>

            </div>
            
            {/* Dekoratif Arka Işık (Glow) */}
            <div className="absolute -inset-4 bg-[#f97316]/10 blur-[100px] -z-10 rounded-full opacity-50" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}