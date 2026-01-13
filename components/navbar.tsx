"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Rocket, Menu, X } from "lucide-react"

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#rocket", label: "Rocket" },
  { href: "#team", label: "Team" },
  { href: "#gallery", label: "Gallery" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "border-b border-[#fdfbf7]/10 bg-[#0B1120]/90 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded border border-[#fdfbf7]/20">
            <Rocket className="h-5 w-5 text-[#fdfbf7]" />
          </div>
          <span className="font-heading text-lg font-semibold tracking-tight text-[#fdfbf7]">KUTAY</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-wider text-[#fdfbf7]/60 uppercase transition-colors hover:text-[#fdfbf7]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded border border-[#f97316] px-4 py-2 font-mono text-xs tracking-wider text-[#f97316] uppercase transition-all hover:bg-[#f97316] hover:text-[#0B1120]"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="text-[#fdfbf7] md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="border-t border-[#fdfbf7]/10 bg-[#0B1120]/95 backdrop-blur-lg md:hidden"
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-sm tracking-wider text-[#fdfbf7]/70 uppercase transition-colors hover:text-[#fdfbf7]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 rounded border border-[#f97316] px-4 py-2 text-center font-mono text-sm tracking-wider text-[#f97316] uppercase transition-all hover:bg-[#f97316] hover:text-[#0B1120]"
            >
              Contact
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
