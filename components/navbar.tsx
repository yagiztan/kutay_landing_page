"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, Menu, X, Terminal, Clock } from "lucide-react"

const navLinks = [
  { href: "#hero", label: "GÖREV KONTROL" },
  { href: "#about", label: "MİSYON" },
  { href: "#rocket", label: "SİSTEMLER" },
  { href: "#team", label: "MÜRETTEBAT" },
  { href: "#gallery", label: "ARŞİV" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [time, setTime] = useState("")

  // Scroll takibi ve Active Section belirleme
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Hangi bölümde olduğumuzu bul
      const sections = navLinks.map(link => link.href.substring(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top >= -100 && rect.top < window.innerHeight / 2
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    // UTC Saat Güncelleme
    const timer = setInterval(() => {
        const date = new Date()
        setTime(date.toLocaleTimeString('tr-TR', { hour12: false }) + " UTC")
    }, 1000)

    window.addEventListener("scroll", handleScroll)
    return () => {
        window.removeEventListener("scroll", handleScroll)
        clearInterval(timer)
    }
  }, [])

  return (
    <>
      {/* Üst Dekoratif Çizgi (HUD Top Bar) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f97316]/50 to-transparent z-[60]" />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 pt-4 pb-2`}
      >
        <div 
            className={`
                mx-auto max-w-7xl flex items-center justify-between px-6 py-3 rounded-2xl border transition-all duration-500
                ${isScrolled 
                    ? "bg-[#0B1120]/80 backdrop-blur-md border-[#fdfbf7]/10 shadow-lg shadow-black/20" 
                    : "bg-transparent border-transparent"
                }
            `}
        >
          {/* --- LOGO ALANI --- */}
          <a href="#hero" className="flex items-center gap-3 group">
            
            <div className="flex flex-col">
                <span className="font-heading text-lg font-bold tracking-tight text-[#fdfbf7] leading-none">KUTAY</span>
                <span className="font-mono text-[10px] tracking-widest text-[#fdfbf7]/50">AEROSPACE</span>
            </div>
          </a>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center gap-1 rounded-full bg-[#fdfbf7]/5 p-1 border border-[#fdfbf7]/5 backdrop-blur-sm">
            {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1)
                return (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setActiveSection(link.href.substring(1))}
                        className={`relative px-4 py-1.5 font-mono text-xs font-medium tracking-wide transition-colors duration-300 ${isActive ? "text-[#0B1120]" : "text-[#fdfbf7]/70 hover:text-[#fdfbf7]"}`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 bg-[#fdfbf7] rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{link.label}</span>
                    </a>
                )
            })}
          </div>

          {/* --- SAĞ TARAF (Saat & Contact) --- */}
          <div className="hidden md:flex items-center gap-6">
            {/* Saat Göstergesi */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#fdfbf7]/40">
                <Clock className="w-3 h-3" />
                <span>{time}</span>
            </div>

            <a
              href="#contact"
              className="relative group overflow-hidden rounded px-5 py-2 font-mono text-xs font-bold tracking-wider text-[#0B1120] uppercase bg-[#f97316] hover:bg-white transition-colors"
            >
              <span className="relative z-10 flex items-center gap-2">
                 <Terminal className="w-3 h-3" /> Connect
              </span>
            </a>
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <button 
            className="md:hidden p-2 text-[#fdfbf7] hover:text-[#f97316] transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed inset-0 top-[70px] z-40 bg-[#0B1120]/95 backdrop-blur-xl md:hidden overflow-hidden"
            >
              <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="font-heading text-3xl font-bold text-[#fdfbf7] hover:text-[#f97316] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                
                <div className="w-16 h-px bg-[#fdfbf7]/10 my-4" />
                
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 font-mono text-sm text-[#f97316]"
                >
                    <Terminal className="w-4 h-4" /> İLETİŞİME GEÇ
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}