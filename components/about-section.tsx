"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Layers, Cpu, Target, ArrowUpRight, Crosshair } from "lucide-react"

// --- Yardımcı Bileşen: Sayı Sayacı (Counter) ---
function Counter({ value }: { value: number }) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const features = [
  {
    icon: Target,
    value: 8330, // Sayısal değer (Animasyon için)
    suffix: "m",
    label: "HEDEF İRTİFA",
    description: "Yüksek irtifa kategorisinde sınırları zorluyoruz.",
    colSpan: "col-span-2", // Bu kart geniş olacak
    highlight: true,
  },
  {
    icon: Layers,
    value: "Kompozit",
    isText: true, // Bu sayısal değil, metin
    label: "GÖVDE YAPISI",
    description: "Fiber Glass & Karbon Fiber.",
    colSpan: "col-span-1",
  },
  {
    icon: Cpu,
    value: "Özel",
    isText: true,
    label: "AVİYONİK",
    description: "Yerli uçuş kontrol kartı.",
    colSpan: "col-span-1",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative bg-[#0B1120] px-6 py-32 overflow-hidden" ref={ref}>
      
      {/* Dekoratif Arka Plan Grid */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fdfbf7 1px, transparent 1px), linear-gradient(90deg, #fdfbf7 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      {/* Üst Çizgi Efekti */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fdfbf7]/20 to-transparent" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          
          {/* --- SOL TARAF: İÇERİK --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
               <div className="h-px w-8 bg-[#f97316]" />
               <span className="font-mono text-xs tracking-[0.2em] text-[#f97316] uppercase">
                 Misyonumuz
               </span>
            </div>
            
            <h2 className="mb-6 font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#fdfbf7]">
              Mühendisliğin <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fdfbf7] to-[#fdfbf7]/50">
                Geleceğini İnşa Et
              </span>
            </h2>
            
            <p className="text-lg leading-relaxed text-[#fdfbf7]/70 mb-8 max-w-xl">
              Kutay Roket Takımı olarak, sadece roket tasarlamıyor; disiplinler arası 
              mühendislik pratikleriyle Türkiye'nin havacılık ekosistemine nitelikli 
              AR-GE çözümleri üretiyoruz.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 text-sm font-mono text-[#fdfbf7]/60">
                <div className="flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-[#f97316]" />
                    <span>Hassas İmalat</span>
                </div>
                <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-[#f97316]" />
                    <span>Yüksek Performans</span>
                </div>
            </div>
          </motion.div>

          {/* --- SAĞ TARAF: BENTO GRID --- */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                className={`${feature.colSpan} relative group`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Kart Yapısı */}
                <div className={`
                    h-full relative overflow-hidden rounded-xl border transition-all duration-500
                    ${feature.highlight 
                        ? 'bg-[#f97316]/10 border-[#f97316]/30 hover:bg-[#f97316]/20' 
                        : 'bg-[#0f172a]/60 border-[#fdfbf7]/10 hover:border-[#fdfbf7]/30 hover:bg-[#0f172a]/80'
                    } backdrop-blur-md p-6 flex flex-col justify-between
                `}>
                  
                  {/* Dekoratif Köşeler (HUD Style) */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#fdfbf7]/30" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#fdfbf7]/30" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#fdfbf7]/30" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#fdfbf7]/30" />

                  {/* İkon ve Başlık */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg ${feature.highlight ? 'bg-[#f97316] text-white' : 'bg-[#fdfbf7]/10 text-[#fdfbf7]'}`}>
                        <feature.icon className="h-5 w-5" />
                    </div>
                    {feature.highlight && (
                        <span className="animate-pulse w-2 h-2 rounded-full bg-[#f97316]" />
                    )}
                  </div>

                  {/* Değer */}
                  <div>
                    <div className="font-mono text-3xl md:text-4xl font-bold text-[#fdfbf7] mb-1 tracking-tighter">
                        {feature.isText ? (
                            feature.value
                        ) : (
                            <>
                             <Counter value={feature.value as number} />
                             <span className="text-lg ml-1 text-[#fdfbf7]/50">{feature.suffix}</span>
                            </>
                        )}
                    </div>
                    <div className="text-xs font-bold tracking-widest text-[#fdfbf7]/40 uppercase mb-2">
                        {feature.label}
                    </div>
                    <p className="text-sm text-[#fdfbf7]/60 leading-snug">
                        {feature.description}
                    </p>
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