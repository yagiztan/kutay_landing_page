"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Linkedin, QrCode, Globe } from "lucide-react"

// --- VERİ YAPISI ---
const teamsData = {
  kutay: {
    title: "Kutay Roket Takımı",
    description: "Yüksek irtifa ve ileri itki sistemleri üzerine çalışan ana roket takımımız.",
    members: [
      {
        id: "CMD-01",
        name: "Mehmet Alper Demiray",
        role: "Takım Danışmanı",
        department: "Danışman",
        image: "/Mehmet Alper Demiray - Akdemik Danışman.jpeg",
        linkedin: "",
        website: "",
        nsosyal: "",
      },
      {
        id: "AVN-01",
        name: "Bora Cüneyt Akçalın",
        role: "Takım Kaptanı",
        department: "Yönetim",
        image: "/Bora Cüneyit akçakın.jpeg",
        linkedin: "https://www.linkedin.com/in/borac%C3%BCneytak%C3%A7ak%C4%B1n/",
        website: "",
        nsosyal: "",
      },
      {
        id: "STR-01",
        name: "Muzaffer Şen",
        role: "Yapısal Lider",
        department: "Mekanik",
        image: "/Muzaffer şen.jpeg",
        linkedin: "https://www.linkedin.com/in/muzaffer-%C5%9Fen-7b4910250/",
        website: "",
        nsosyal: "",
      },
      {
        id: "SW-01",
        name: "Yağız Muhammed Tan",
        role: "Mekanik Tasarım",
        department: "Mekanik",
        image: "/Yagiz_m_Tan.jpg",
        linkedin: "https://www.linkedin.com/in/ya%C4%9F%C4%B1z-muhammed-tan-1b0154322",
        website: "https://www.yagizmtan.com/",
        nsosyal: "https://nsosyal.com/yagiztan",
      },
      {
        id: "PRP-01",
        name: "Hüdaverdi Furkan Demirci",
        role: "Aviyonik Lider",
        department: "Aviyonik",
        image: "/Hüdaverdi Furkan Demirci.jpeg",
        linkedin: "https://www.linkedin.com/in/h%C3%BCdaverdi-furkan-demirci-447364335/",
        website: "",
        nsosyal: "",
      },
      {
        id: "SIM-01",
        name: "Arzu Sümeyye Çiftçi",
        role: "Yazılım Geliştirici",
        department: "Aviyonik",
        image: "/Arzu Sümeyye çiftçi.jpeg",
        linkedin: "https://www.linkedin.com/in/arzu-s%C3%BCmeyye-%C3%A7ift%C3%A7i-2867b3265/",
        website: "",
        nsosyal: "",
      },
      {
        id: "SIM-02",
        name: "Kaan GÜL",
        role: "Yazılım Geliştirici",
        department: "Aviyonik",
        image: "/Kaan_gul.jpg",
        linkedin: "https://www.linkedin.com/in/arzu-s%C3%BCmeyye-%C3%A7ift%C3%A7i-2867b3265/",
        website: "https://kgstech.net/vCards/kaan_gul_vcard.html",
        nsosyal: "https://nsosyal.com/kaan_gul",
      },
    ]
  },
  gokay: {
    title: "Gökay Roket Takımı",
    description: "Orta irtifa görevleri ve otonom sistemler geliştiren alt ekibimiz.",
    members: [
      {
        id: "STR-01",
        name: "Muzaffer Şen",
        role: "Yapısal Lider",
        department: "Mekanik",
        image: "/Muzaffer şen.jpeg",
        linkedin: "",
        website: "",
        nsosyal: "",
      },
      {
        id: "SW-01",
        name: "Yağız Muhammed Tan",
        role: "Mekanik Tasarım",
        department: "Mekanik",
        image: "/Yagiz_m_Tan.jpg",
        linkedin: "https://www.linkedin.com/in/ya%C4%9F%C4%B1z-muhammed-tan-1b0154322",
        website: "https://www.yagizmtan.com/",
        nsosyal: "",
      },
    ]
  },
  doruk: {
    title: "Doruk Roket Takımı",
    description: "Alçak irtifa testleri ve eğitim simülasyonlarından sorumlu ekibimiz.",
    members: [
      {
        id: "PRP-01",
        name: "Hüdaverdi Furkan Demirci",
        role: "Aviyonik Lider",
        department: "Aviyonik",
        image: "/Hüdaverdi Furkan Demirci.jpeg",
        linkedin: "",
        website: "",
        nsosyal: "",
      },
      {
        id: "SIM-01",
        name: "Arzu Sümeyye Çiftçi",
        role: "Yazılım Geliştirici",
        department: "Yazılım",
        image: "/Arzu Sümeyye çiftçi.jpeg",
        linkedin: "",
        website: "",
        nsosyal: "",
      },
    ]
  }
}

const tabs = [
  { id: "kutay", label: "KUTAY ROKET" },
  { id: "gokay", label: "GÖKAY ROKET" },
  { id: "doruk", label: "DORUK ROKET" },
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState("kutay")

  return (
    <section id="team" className="relative bg-[#0B1120] px-6 py-32 overflow-hidden" ref={ref}>
      
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'radial-gradient(#fdfbf7 1px, transparent 1px)', 
             backgroundSize: '24px 24px' 
           }} 
      />

      <div className="relative mx-auto max-w-7xl">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
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

        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-[#0f172a]/80 backdrop-blur-sm border border-[#fdfbf7]/10 rounded-xl relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-6 py-2 text-sm font-medium transition-colors duration-300 font-mono tracking-wider
                  ${activeTab === tab.id ? "text-black" : "text-[#fdfbf7]/60 hover:text-[#fdfbf7]"}
                `}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-[#f97316] rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                    {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="text-center mb-10 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-[#fdfbf7] mb-2">{teamsData[activeTab as keyof typeof teamsData].title}</h3>
                        <p className="text-[#fdfbf7]/60 font-light">{teamsData[activeTab as keyof typeof teamsData].description}</p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                    {teamsData[activeTab as keyof typeof teamsData].members.map((member) => (
                        <div
                        key={member.id}
                        className="group relative w-full max-w-sm"
                        >
                        <div className="relative overflow-hidden rounded-xl border border-[#fdfbf7]/10 bg-[#0f172a]/60 backdrop-blur-sm transition-all duration-500 hover:border-[#f97316]/50 hover:bg-[#0f172a]/80 group-hover:translate-y-[-5px]">
                            
                            <div className="relative aspect-[4/5] overflow-hidden border-b border-[#fdfbf7]/10">
                            <div className="absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-10 pointer-events-none" />
                            
                            <img
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60" />
                            
                            {/* --- DÜZELTİLEN KISIM --- 
                                1. Varsayılan (Mobil): opacity-100 ve translate-y-0 (Her zaman görünür)
                                2. lg (Masaüstü): opacity-0 ve translate-y-10 (Gizli başlar)
                                3. lg:group-hover (Masaüstü Hover): opacity-100 ve translate-y-0 (Üzerine gelince görünür)
                            */}
                            <div className="absolute bottom-4 right-4 z-20 flex gap-2 transition-all duration-300 
                                            opacity-100 translate-y-0 
                                            lg:opacity-0 lg:translate-y-10 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                                
                                {member.linkedin && (
                                  <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0077b5] text-white shadow-lg hover:bg-[#006396] transition-colors"
                                    title="LinkedIn Profili"
                                  >
                                    <Linkedin className="h-5 w-5" />
                                  </a>
                                )}
                                {member.website && (
                                  <a
                                    href={member.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f97316] text-white shadow-lg hover:bg-[#ea580c] transition-colors"
                                    title="Website"
                                  >
                                    <Globe className="h-5 w-5" />
                                  </a>
                                )}
                                {member.nsosyal && (
                                  <a
                                    href={member.nsosyal}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff] text-white shadow-lg hover:bg-[#ffffff] transition-colors"
                                    title="NSosyal Profili"
                                  >
                                    <img src="/n_sosyal.png" alt="NSosyal" className="h-6 w-6 object-contain" />
                                  </a>
                                )}
                            </div>
                            </div>

                            <div className="p-5 relative">
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
                        </div>
                    ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

      </div>
    </section>
  )
}