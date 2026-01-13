"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight, Maximize2, Download, Aperture, Calendar } from "lucide-react"

// Daha teknik veri yapısı
const galleryItems = [
  {
    id: "LOG-001",
    image: "/rocket-launch-pad-preparation-dark-moody.jpg",
    title: "Launch Pad Prep",
    category: "OPERATIONS",
    date: "24.04.2024",
    description: "Final system check sequence initiation at Sector 4.",
  },
  {
    id: "LOG-002",
    image: "/rocket-engine-testing-fire-dark.jpg",
    title: "Static Fire Test",
    category: "PROPULSION",
    date: "12.03.2024",
    description: "K-Class solid fuel motor ignition test. Thrust nominal.",
  },
  {
    id: "LOG-003",
    image: "/aerospace-engineering-team-workshop-dark.jpg",
    title: "Assembly Integration",
    category: "WORKSHOP",
    date: "10.02.2024",
    description: "Structural integration of the avionics bay.",
  },
  {
    id: "LOG-004",
    image: "/rocket-avionics-electronics-circuit-board-dark.jpg",
    title: "Avionics Core",
    category: "ELECTRONICS",
    date: "15.01.2024",
    description: "Main flight computer PCB inspection.",
  },
  {
    id: "LOG-005",
    image: "/rocket-flying-in-blue-sky.jpg",
    title: "Liftoff Sequence",
    category: "FLIGHT",
    date: "25.04.2024",
    description: "T+10s trajectory confirmation. Altitude: 1200m.",
  },
  {
    id: "LOG-006",
    image: "/aerospace-team-celebrating-trophy-dark.jpg",
    title: "Mission Success",
    category: "TEAM",
    date: "25.04.2024",
    description: "Post-flight recovery and team debrief.",
  },
]

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Klavye Kontrolü (Sağ/Sol Ok ve ESC)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedIndex === null) return

    if (e.key === "ArrowRight") {
      setSelectedIndex((prev) => (prev! + 1) % galleryItems.length)
    } else if (e.key === "ArrowLeft") {
      setSelectedIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length)
    } else if (e.key === "Escape") {
      setSelectedIndex(null)
    }
  }, [selectedIndex])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const navigate = (direction: "next" | "prev", e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex === null) return
    if (direction === "next") {
      setSelectedIndex((prev) => (prev! + 1) % galleryItems.length)
    } else {
      setSelectedIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length)
    }
  }

  return (
    <section id="gallery" className="relative bg-[#0B1120] px-6 py-32 overflow-hidden">
      
      {/* Arka Plan Deseni */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#fdfbf7 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Başlık */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
             <Aperture className="w-4 h-4 text-[#f97316]" />
             <span className="font-mono text-xs tracking-[0.3em] text-[#f97316] uppercase">
                Mission Archive
             </span>
          </div>
          <h2 className="font-serif text-4xl font-bold text-[#fdfbf7] sm:text-5xl">Görev Kayıtları</h2>
        </div>

        {/* Grid Layout (Masonry yerine Bento Grid hissi veren Responsive Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-[#fdfbf7]/10 bg-[#0f172a]"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Scanline Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f97316]/10 to-transparent translate-y-[-100%] group-hover:animate-scan pointer-events-none" />

              {/* Overlay (Sürekli Görünür ama Hoverda Koyulaşır) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Köşe Süsleri (HUD) */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <Maximize2 className="w-5 h-5 text-[#fdfbf7]/70" />
              </div>

              {/* İçerik */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-[#f97316] uppercase tracking-wider border border-[#f97316]/30 px-1.5 py-0.5 rounded">
                        {item.category}
                    </span>
                    <span className="font-mono text-[10px] text-[#fdfbf7]/50">{item.id}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#fdfbf7] leading-tight">{item.title}</h3>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                    <p className="font-mono text-xs text-[#fdfbf7]/60 mt-2 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- GELİŞMİŞ LIGHTBOX --- */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1120]/95 p-4"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Navigasyon Butonları */}
            <button
              onClick={(e) => navigate("prev", e)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#fdfbf7] transition-all hover:scale-110 z-50 hidden md:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => navigate("next", e)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-[#fdfbf7] transition-all hover:scale-110 z-50 hidden md:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Kapat Butonu */}
            <button
              className="absolute top-6 right-6 p-2 text-[#fdfbf7]/50 hover:text-[#f97316] transition-colors z-50"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="h-8 w-8" />
            </button>

            {/* Lightbox İçerik Kartı */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full bg-[#0f172a] border border-[#fdfbf7]/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Sol Taraf: Görsel */}
              <div className="relative md:w-3/4 bg-black flex items-center justify-center group">
                <img
                  src={galleryItems[selectedIndex].image || "/placeholder.svg"}
                  alt={galleryItems[selectedIndex].title}
                  className="max-h-[80vh] w-full object-contain"
                />
                
                {/* İndirme Butonu (Görsel Üzerinde) */}
                <a 
                    href={galleryItems[selectedIndex].image} 
                    download 
                    className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-[#f97316] text-white rounded opacity-0 group-hover:opacity-100 transition-all duration-300"
                    title="Download Image"
                >
                    <Download className="w-5 h-5" />
                </a>
              </div>

              {/* Sağ Taraf: Detay Paneli (Sidebar) */}
              <div className="md:w-1/4 p-6 flex flex-col justify-between border-l border-[#fdfbf7]/10 bg-[#0B1120]">
                <div>
                    <div className="flex items-center gap-2 mb-6 border-b border-[#fdfbf7]/10 pb-4">
                        <div className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
                        <span className="font-mono text-xs text-[#fdfbf7]/50 uppercase tracking-widest">
                            {galleryItems[selectedIndex].id}
                        </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#fdfbf7] mb-2">
                        {galleryItems[selectedIndex].title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-[#fdfbf7]/60 text-sm mb-6 font-mono">
                        <Calendar className="w-4 h-4" />
                        {galleryItems[selectedIndex].date}
                    </div>

                    <p className="text-[#fdfbf7]/70 text-sm leading-relaxed mb-6">
                        {galleryItems[selectedIndex].description}
                    </p>

                    <div className="space-y-3">
                        <div className="text-xs font-mono text-[#fdfbf7]/30 uppercase tracking-wider">Metadata</div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#fdfbf7]/60">
                            <div className="p-2 bg-[#fdfbf7]/5 rounded">ISO: 400</div>
                            <div className="p-2 bg-[#fdfbf7]/5 rounded">f/2.8</div>
                            <div className="p-2 bg-[#fdfbf7]/5 rounded">1/1000s</div>
                            <div className="p-2 bg-[#fdfbf7]/5 rounded">RAW</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#fdfbf7]/10 text-center">
                    <span className="font-mono text-[10px] text-[#fdfbf7]/30 uppercase">
                        Kutay Rocket Team // Archive
                    </span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}