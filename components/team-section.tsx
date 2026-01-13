"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Linkedin } from "lucide-react"

const teamMembers = [
  {
    name: "Ahmet Yılmaz",
    role: "Team Captain",
    image: "/professional-male-engineer-portrait-grayscale.jpg",
    linkedin: "#",
  },
  {
    name: "Elif Demir",
    role: "Avionics Lead",
    image: "/professional-female-engineer-portrait-grayscale.jpg",
    linkedin: "#",
  },
  {
    name: "Mehmet Kaya",
    role: "Structural Engineer",
    image: "/professional-male-aerospace-engineer-portrait-gray.jpg",
    linkedin: "#",
  },
  {
    name: "Zeynep Arslan",
    role: "Propulsion Specialist",
    image: "/professional-female-scientist-portrait-grayscale.jpg",
    linkedin: "#",
  },
  {
    name: "Can Özdemir",
    role: "Software Developer",
    image: "/professional-male-developer-portrait-grayscale.jpg",
    linkedin: "#",
  },
  {
    name: "Selin Yıldız",
    role: "Simulation Engineer",
    image: "/professional-female-engineer-portrait-grayscale.jpg",
    linkedin: "#",
  },
]

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="team" className="relative bg-[#0B1120] px-6 py-32" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-[#fdfbf7]/10" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-xs tracking-widest text-[#f97316] uppercase">
            [ The Team ]
          </span>
          <h2 className="mb-6 font-heading text-4xl font-bold text-[#fdfbf7] sm:text-5xl">Meet Our Engineers</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="group relative overflow-hidden rounded-lg border border-[#fdfbf7]/10 bg-[#0f172a] transition-all duration-300 hover:border-[#fdfbf7]/20">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-[#0f172a]/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <a
                      href={member.linkedin}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#fdfbf7]/30 bg-[#fdfbf7]/10 text-[#fdfbf7] backdrop-blur-sm transition-all hover:bg-[#fdfbf7]/20"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-[#fdfbf7]">{member.name}</h3>
                  <p className="font-mono text-xs tracking-wider text-[#fdfbf7]/50">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
