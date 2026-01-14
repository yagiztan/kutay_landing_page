"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, ContactShadows, useGLTF } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { useRef, Suspense, useState, useEffect } from "react"
import type { Group } from "three"

// --- MOBİL KONTROL HOOK'U ---
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

function Rocket() {
  const rocketRef = useRef<Group>(null)

  // MODEL YÜKLEME
  // Not: Eğer mobilde model çok kasarsa, Blender'da polygon sayısını düşürmen gerekebilir.
  const { scene } = useGLTF('/roket.glb')

  useFrame((state) => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={rocketRef}>
      <primitive 
        object={scene} 
        scale={1.3} 
        position={[1, 0, 0]} 
        rotation={[-Math.PI / -2, 0, 0]} 
      />
    </group>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 2, 0.5]} />
      <meshStandardMaterial color="#333" wireframe />
    </mesh>
  )
}

export function RocketCanvas() {
  const isMobile = useIsMobile() // Mobil kontrolünü aktif ettik

  return (
    <div className="h-full w-full min-h-125">
      <Canvas 
        shadows={!isMobile} // Mobilde gölgeleri kapat (Performans + Siyah leke çözümü)
        dpr={isMobile ? [1, 1.5] : [1, 2]} // Mobilde çözünürlüğü sınırla
        camera={{ position: [4, 1, 5], fov: 35 }}
        gl={{ 
          antialias: true, // Bloom kapalıyken true olması daha iyi kenar sağlar
          stencil: false,
          depth: true,
          alpha: true,
          preserveDrawingBuffer: true // Android render sorunları için
        }} 
      >
        {/* --- IŞIKLANDIRMA --- */}
        {/* Mobilde Bloom olmadığı için ortam ışığını artırıyoruz */}
        <ambientLight intensity={isMobile ? 1.5 : 0.2} />
        
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow={!isMobile} // Mobilde gölge hesaplama
          color="#fdfbf7"
        />
        <spotLight 
          position={[-10, 5, -10]} 
          intensity={2} 
          color="#3b82f6" 
        />

        <Suspense fallback={<LoadingFallback />}>
          {/* Float: Yüzerlik Efekti */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Rocket />
          </Float>

          {/* Ortam Yansıması */}
          <Environment preset="city" /> 
          
          {/* Zemin Gölgeleri */}
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
          
          {/* ✨ SPARKLES (BEYAZ NOKTALAR) KALDIRILDI ✨ */}
          
        </Suspense>

        {/* --- POST PROCESSING --- */}
        {/* Sadece MASAÜSTÜNDE çalışsın. Siyah ekran sorununun ana çözümü bu. */}
        {!isMobile && (
            <EffectComposer disableNormalPass multisampling={0}>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.6} />
                <Vignette offset={0.1} darkness={1.1} />
            </EffectComposer>
        )}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}

// Preload
useGLTF.preload('/roket.glb')