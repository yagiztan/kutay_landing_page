"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Linkedin, Fingerprint, QrCode, ShieldCheck } from "lucide-react"

const teamMembers = [
  {
    id: "CMD-01",
    name: "Ahmet Yılmaz",
    role: "Takım Kaptanı",
    department: "YÖNETİM",
    image: "/professional-male-engineer-portrait-grayscale.jpg",
    clearance: "Lvl 5",
  },
  {
    id: "AVN-01",
    name: "Elif Demir",
    role: "Aviyonik Lideri",
    department: "AVİYONİK",
    image: "/professional-female-engineer-portrait-grayscale.jpg",
    clearance: "Lvl 4",
  },
  {
    id: "STR-01",
    name: "Mehmet Kaya",
    role: "Yapısal Lider",
    department: "MEKANİK",
    image: "/professional-male-aerospace-engineer-portrait-gray.jpg",
    clearance: "Lvl 4",
  },
  {
    id: "PRP-01",
    name: "Zeynep Arslan",
    role: "İtki Uzmanı",
    department: "AR-GE",
    image: "/professional-female-scientist-portrait-grayscale.jpg",
    clearance: "Lvl 3",
  },
  {
    id: "SW-01",
    name: "Can Özdemir",
    role: "Yazılım Geliştirici",
    department: "YAZILIM",
    image: "/professional-male-developer-portrait-grayscale.jpg",
    clearance: "Lvl 3",
  },
  {
    id: "SIM-01",
    name: "Selin Yıldız",
    role: "Simülasyon Müh.",
    department: "ANALİZ",
    image: "/professional-female-engineer-portrait-grayscale.jpg",
    clearance: "Lvl 3",
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
                
                {/* Üst Bar (Dekoratif) */}
                <div className="flex items-center justify-between border-b border-[#fdfbf7]/10 bg-[#0B1120]/50 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <Fingerprint className="h-4 w-4 text-[#fdfbf7]/30" />
                        <span className="font-mono text-[10px] tracking-widest text-[#fdfbf7]/50">{member.id}</span>
                    </div>
                    <div className="flex items-center gap-1 rounded bg-[#fdfbf7]/5 px-2 py-0.5">
                        <ShieldCheck className="h-3 w-3 text-[#f97316]" />
                        <span className="font-mono text-[10px] text-[#f97316]">{member.clearance}</span>
                    </div>
                </div>

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