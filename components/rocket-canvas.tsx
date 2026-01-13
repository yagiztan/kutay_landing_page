"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Sparkles, Float, ContactShadows, useGLTF } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { useRef, Suspense, useState, useEffect } from "react"
import type { Group } from "three"

// Mobil kontrolü (İhtiyaç duyulursa diye tutuldu)
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

  // MODEL YÜKLEME: Dosyanı 'public' klasörüne koymalısın.
  // '/roket.glb' yerine kendi dosya ismini yaz.
  const { scene } = useGLTF('/roket.glb')

  // Roketi yavaşça kendi ekseninde döndür
  useFrame((state) => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={rocketRef}>
      {/* primitive: Dışarıdan yüklenen modeli sahneye koyar.
          scale: Modelin çok büyükse küçült (örn: 0.5) veya büyüt (örn: 2).
          position: Modeli tam merkeze oturtmak için Y eksenini ayarla.
      */}
      <primitive 
        object={scene} 
        scale={1.3} 
        position={[1, 0, 0]} 
        rotation={[-Math.PI / -2, 0, 0]} // X ekseninde -90 derece (Dik konuma getirir)
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
  return (
    <div className="h-full w-full min-h-125">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [4, 1, 5], fov: 35 }}
        // HATA DÜZELTME: 'alpha' hatasını önlemek için önemli ayarlar
        gl={{ 
          antialias: false, // Post-processing kullanırken false olmalı
          stencil: false,
          depth: true,
          alpha: true
        }} 
      >
        {/* --- IŞIKLANDIRMA --- */}
        <ambientLight intensity={0.2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow 
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
          
          {/* Uzay Tozu */}
          <Sparkles count={50} scale={6} size={4} speed={0.4} opacity={0.5} color="#fdfbf7" />
        </Suspense>

        {/* --- POST PROCESSING --- */}
        {/* multisampling={0} -> Alpha/Context hatasını çözer */}
        <EffectComposer disableNormalPass multisampling={0}>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.6} />
            <Vignette offset={0.1} darkness={1.1} />
        </EffectComposer>

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

// Performans için modeli önceden yükle
// Buradaki dosya yolunu da güncellemeyi unutma!
useGLTF.preload('/roket.glb')