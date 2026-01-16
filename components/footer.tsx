"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Rocket, Instagram, Linkedin, Youtube, Target } from "lucide-react"

const quickLinks = [
  { href: "#hero", label: "Home" },
  { href: "#team", label: "Team" },
  { href: "#gallery", label: "Gallery" },
]

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/kutayaerospace/", label: "Instagram", },
  { icon: Linkedin, href: "https://l.instagram.com/?u=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fkutayroket%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGntnMroKC14mlanYq85hxSw3kz-yccd68uQfwVW2lRYwFrWLRehbSZTdbCFNo_aem_qNNbWIvYdIjWy5l_oiCg8g&e=AT3M2bZx3lt5mop3QsA-k7zJO5MG9DbZgfZrMnY4fMfri3RJFm2ujjnCACQjaMZ-3bK9qT71HsHAjW0dAQtEDZ7gdYGXSSeLJrHauk5a0w", label: "LinkedIn"},
  { icon: Youtube, href: "https://l.instagram.com/?u=https%3A%2F%2Fyoutube.com%2F%40kutayroket1%3Fsi%3DiLr9HYQwVa-EtNBz%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnsqkj7_dQfNwxqnzGWQFLQY9C-dBVEhYvHZ0kIERVdO1D3T8Wt0jMmC4to7c_aem_pCqExaOvFUPs5hRWLxd6ww&e=AT1NuP1ln66bLsGK0DajwOTlyv0GSRoZNYdLN3Kz8snYcXyAEaLc5S7WYfNUczmvuwwjQmqWDQpWtPkiUBRQH3zQzZ1pfy_WdpQt98Fs2A", label: "YouTube" },
]

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-[#fdfbf7]/10 bg-[#020617] px-6 py-16">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="grid gap-12 md:grid-cols-3">
            {/* Left: Logo/Text */}
            <div className="flex items-center gap-3 md:justify-start">
              <img src="/kutay_logo.png" alt="Kutay Logo" className="h-10 w-auto" />
            </div>

            {/* Center: Quick Links */}
            <div className="flex items-center justify-center gap-8">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs tracking-wider text-[#fdfbf7]/50 uppercase transition-colors hover:text-[#fdfbf7]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: Social Media Icons with circular borders */}
            <div className="flex items-center justify-center gap-3 md:justify-end">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#fdfbf7]/20 text-[#fdfbf7]/50 transition-all duration-300 hover:border-[#fdfbf7]/40 hover:text-[#fdfbf7]"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#fdfbf7]/10 pt-8 md:flex-row">
            <p className="font-mono text-xs text-[#fdfbf7]/30">
              © {new Date().getFullYear()} Kutay Aerospace. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#22c55e]" />
              <span className="font-mono text-xs text-[#22c55e]/70">System Status: All Systems Go</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
