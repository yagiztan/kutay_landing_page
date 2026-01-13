"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useRef, Suspense } from "react"
import type { Group } from "three"

function Rocket() {
  const rocketRef = useRef<Group>(null)

  useFrame((state) => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y += 0.003
      rocketRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={rocketRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 2.4, 32]} />
        <meshStandardMaterial color="#fdfbf7" metalness={0.2} roughness={0.3} />
      </mesh>

      {/* Nose Cone */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.25, 0.8, 32]} />
        <meshStandardMaterial color="#fdfbf7" metalness={0.2} roughness={0.3} />
      </mesh>

      {/* Fins - sleeker */}
      {[0, 120, 240].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.sin((angle * Math.PI) / 180) * 0.35, -1, Math.cos((angle * Math.PI) / 180) * 0.35]}
          rotation={[0, (angle * Math.PI) / 180, 0]}
        >
          <boxGeometry args={[0.03, 0.5, 0.35]} />
          <meshStandardMaterial color="#fdfbf7" metalness={0.2} roughness={0.3} />
        </mesh>
      ))}

      {/* Engine Nozzle */}
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.2, 0.12, 0.25, 32]} />
        <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.1, 32]} />
        <meshStandardMaterial color="#f97316" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#fdfbf7" wireframe />
    </mesh>
  )
}

export function RocketCanvas() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [3, 1.5, 4], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, -3, 0]} color="#f97316" intensity={0.3} />
        <Suspense fallback={<LoadingFallback />}>
          <Rocket />
          <Environment preset="night" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
