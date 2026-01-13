import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { RocketShowcase } from "@/components/rocket-showcase"
import { TeamSection } from "@/components/team-section"
import { GallerySection } from "@/components/gallery-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B1120]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <RocketShowcase />
      <TeamSection />
      <GallerySection />
      <Footer />
    </main>
  )
}
