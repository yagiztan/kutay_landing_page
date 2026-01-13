"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Linkedin, Fingerprint, QrCode, ShieldCheck } from "lucide-react"

const teamMembers = [
  {
    id: "CMD-01",
    name: "Mehmet Alper Demiray",
    role: "Takım Danışmanı",
    image: "/Mehmet Alper Demiray - Akdemik Danışman.jpeg",
  },
  {
    id: "AVN-01",
    name: "Bora Cüneyt Akçalın",
    role: "Takım Kaptanı",
    department: "AVİYONİK & Mekanik",
    image: "/Bora Cüneyit akçakın.jpeg",
  },
  {
    id: "STR-01",
    name: "Muzaffer Şen",
    role: "Yapısal Lider",
    department: "MEKANİK",
    image: "/Muzaffer şen.jpeg",
  },
  {
    id: "PRP-01",
    name: "Hüdaverdi Furkan Demirci",
    role: "Aviyonik Lider",
    department: "Aviyonik",
    image: "/Hüdaverdi Furkan Demirci.jpeg",
  },
  {
    id: "SW-01",
    name: "Yağız Muhammed Tan",
    role: "Mekanik",
    department: "Mekanik",
    image: "/Yagiz_m_Tan.jpg",
  },
  {
    id: "SIM-01",
    name: "Arzu Sümeyye Çiftçi",
    role: "Aviyoinik",
    department: "Aviyonik",
    image: "/Arzu Sümeyye çiftçi.jpeg",
  },
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="team" className="relative bg-[#0B1120] px-6 py-32 overflow-hidden" ref={ref}>
      
      {/* Arka Plan Deseni (Hexagon Grid) */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'radial-gradient(#fdfbf7 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }} 
      />

      <div className="relative mx-auto max-w-7xl">
        
        {/* Başlık Alanı */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
             <div className="h-px w-12 bg-[#f97316]/50" />
             <span className="font-mono text-xs tracking-[0.3em] text-[#f97316] uppercase">
               Mission Crew
             </span>
             <div className="h-px w-12 bg-[#f97316]/50" />
          </div>
          <h2 className="font-heading text-4xl font-bold text-[#fdfbf7] sm:text-5xl lg:text-6xl">
            Mühendislik Kadrosu
          </h2>
        </motion.div>

        {/* Kart Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Kart Çerçevesi (ID Card Style) */}
              <div className="relative overflow-hidden rounded-xl border border-[#fdfbf7]/10 bg-[#0f172a]/60 backdrop-blur-sm transition-all duration-500 hover:border-[#f97316]/50 hover:bg-[#0f172a]/80 group-hover:translate-y-[-5px]">
                
                {/* Fotoğraf Alanı */}
                <div className="relative aspect-[4/5] overflow-hidden border-b border-[#fdfbf7]/10">
                  {/* Tarama Çizgisi Efekti (Scanline) */}
                  <div className="absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none" />
                  
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60" />
                  
                  {/* LinkedIn Butonu (Sağ Alt Köşe) */}
                  <div className="absolute bottom-4 right-4 translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20">
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0077b5] text-white shadow-lg hover:bg-[#006396] transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Bilgi Alanı */}
                <div className="p-5 relative">
                   {/* Arka plan barkodu (Süs) */}
                   <div className="absolute right-4 top-4 opacity-10">
                       <QrCode className="w-12 h-12 text-[#fdfbf7]" />
                   </div>

                  <div className="mb-1 inline-flex rounded bg-[#f97316]/10 px-2 py-1 text-[10px] font-bold tracking-wider text-[#f97316] uppercase">
                    {member.department}
                  </div>
                  
                  <h3 className="mb-1 font-serif text-xl font-bold text-[#fdfbf7] tracking-tight group-hover:text-[#f97316] transition-colors">
                    {member.name}
                  </h3>
                  
                  <p className="font-mono text-xs text-[#fdfbf7]/50 tracking-wide uppercase">
                    // {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}