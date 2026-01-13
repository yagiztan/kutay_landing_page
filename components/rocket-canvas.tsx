"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Sparkles, Float, ContactShadows } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { useRef, Suspense, useState, useEffect } from "react"
import type { Group } from "three"

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



  // Roketi yavaşça kendi ekseninde döndür (OrbitControls autoRotate ile çakışmaması için sadece Y ekseni)
  useFrame((state) => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={rocketRef}>
      {/* --- GÖVDE (Ana Parça) --- */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.35, 2.4, 64]} />
        {/* PhysicalMaterial ile daha gerçekçi metal/plastik hissi */}
        <meshPhysicalMaterial 
          color="#fdfbf7" 
          metalness={0.4} 
          roughness={0.2} 
          clearcoat={0.8} // Cila efekti (Kompozit gövde için)
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* --- BURUN KONİSİ --- */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[0.25, 0.8, 64]} />
        <meshPhysicalMaterial 
          color="#fdfbf7" 
          metalness={0.4} 
          roughness={0.2} 
          clearcoat={1}
        />
      </mesh>

      {/* --- KANATÇIKLAR (Daha Keskin ve Metalik) --- */}
      {[0, 120, 240].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.sin((angle * Math.PI) / 180) * 0.35, -1, Math.cos((angle * Math.PI) / 180) * 0.35]}
          rotation={[0, (angle * Math.PI) / 180, 0]}
          castShadow
        >
          {/* Box yerine daha aerodinamik bir şekil için extrude veya custom geometry kullanılabilir ama şimdilik inceltelim */}
          <boxGeometry args={[0.02, 0.6, 0.4]} />
          <meshPhysicalMaterial 
            color="#1e293b" // Kanatçıklar koyu renk (Lacivert/Siyah) olsun, kontrast yaratır
            metalness={0.8} 
            roughness={0.2} 
          />
        </mesh>
      ))}

      {/* --- MOTOR NOZULU (Parlayan Kısım) --- */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.2, 0.12, 0.25, 32]} />
        <meshStandardMaterial 
          color="#f97316" 
          emissive="#f97316" // Kendinden ışık saçsın
          emissiveIntensity={2} // Bloom efekti bunu patlatacak
          toneMapped={false}
        />
      </mesh>
      
      {/* Motorun içindeki saf beyaz ateş çekirdeği */}
      <mesh position={[0, -1.35, 0]}>
         <cylinderGeometry args={[0.1, 0.05, 0.1, 16]} />
         <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* --- GÖVDE HALKASI (Detay) --- */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.05, 64]} />
        <meshStandardMaterial 
          color="#f97316" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
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
        gl={{ antialias: true }} // Post-processing için antialias kapatılabilir, performansı artırır
      >
        {/* --- IŞIKLANDIRMA (Sinematik) --- */}
        <ambientLight intensity={0.2} />
        {/* Ana Işık (Key Light) */}
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          color="#fdfbf7"
        />
        {/* Arka Işık (Rim Light) - Silüeti vurgular */}
        <spotLight 
          position={[-10, 5, -10]} 
          intensity={2} 
          color="#3b82f6" // Mavi tonlu rim light (Uzay havası)
        />

        <Suspense fallback={<LoadingFallback />}>
          {/* Float: Roketin havada asılı kalma efekti (useFrame sinüs dalgasından daha doğal) */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Rocket />
          </Float>

          {/* Ortam Yansıması */}
          <Environment preset="city" /> 
          
          {/* Zemin Gölgeleri (Roketi yere basıyormuş gibi değil, havada süzülüyormuş gibi gösterir) */}
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
          
          {/* Uzay Tozu / Parçacıklar */}
          <Sparkles count={50} scale={6} size={4} speed={0.4} opacity={0.5} color="#fdfbf7" />
        </Suspense>

        {/* --- POST PROCESSING (Makyaj) --- */}
        <EffectComposer disableNormalPass>
            {/* Motorun parlamasını sağlayan efekt */}
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.6} />
            {/* Kenarları karartarak odağı merkeze toplar */}
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