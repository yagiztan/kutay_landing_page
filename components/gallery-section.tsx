"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { X } from "lucide-react"

const galleryItems = [
  {
    id: 1,
    image: "/rocket-launch-pad-preparation-dark-moody.jpg",
    title: "Launch Prep",
    description: "Final checks before launch",
  },
  {
    id: 2,
    image: "/rocket-engine-testing-fire-dark.jpg",
    title: "Engine Test",
    description: "Propulsion system testing",
  },
  {
    id: 3,
    image: "/aerospace-engineering-team-workshop-dark.jpg",
    title: "Workshop",
    description: "Team collaboration",
  },
  {
    id: 4,
    image: "/rocket-avionics-electronics-circuit-board-dark.jpg",
    title: "Avionics",
    description: "Flight control systems",
  },
  {
    id: 5,
    image: "/rocket-flying-in-blue-sky.jpg",
    title: "Flight",
    description: "Successful launch moment",
  },
  {
    id: 6,
    image: "/aerospace-team-celebrating-trophy-dark.jpg",
    title: "Victory",
    description: "Competition success",
  },
]

export function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)

  return (
    <section id="gallery" className="relative bg-[#0B1120] px-6 py-32" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-[#fdfbf7]/10" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-mono text-xs tracking-widest text-[#f97316] uppercase">
            [ Gallery ]
          </span>
          <h2 className="mb-6 font-heading text-4xl font-bold text-[#fdfbf7] sm:text-5xl">Project Highlights</h2>
        </motion.div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="mb-4 break-inside-avoid"
            >
              <div
                className="group cursor-pointer overflow-hidden rounded-lg border border-[#fdfbf7]/10"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="font-heading text-lg font-semibold text-[#fdfbf7]">{item.title}</h3>
                    <p className="font-mono text-xs text-[#fdfbf7]/60">{item.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1120]/95 p-6 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-[#fdfbf7]/70 transition-colors hover:text-[#fdfbf7]"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-h-[80vh] max-w-4xl overflow-hidden rounded-lg">
            <img
              src={selectedImage.image || "/placeholder.svg"}
              alt={selectedImage.title}
              className="h-full w-full object-contain"
            />
            <div className="bg-[#0f172a] p-6">
              <h3 className="font-heading text-xl font-semibold text-[#fdfbf7]">{selectedImage.title}</h3>
              <p className="font-mono text-sm text-[#fdfbf7]/60">{selectedImage.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
