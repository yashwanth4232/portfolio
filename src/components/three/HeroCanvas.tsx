"use client";

/**
 * HeroCanvas — lazy-loaded R3F scene for the hero section.
 *
 * Import via next/dynamic to avoid SSR:
 *
 * const HeroCanvas = dynamic(
 *   () => import("@/components/three/HeroCanvas"),
 *   { ssr: false, loading: () => null }
 * );
 *
 * Performance rules enforced here:
 * - frameloop="demand" — only re-renders on state change or pointer event
 * - dpr={[1, 1.5]} — caps device pixel ratio to prevent GPU overload
 * - No postprocessing effects
 * - Single geometry, one directional light + ambient
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import type { Mesh } from "three";

// ─── Scene Object ─────────────────────────────────────────────────────────
function SceneObject() {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Slow idle rotation
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
    // Subtle breath scale
    const t = state.clock.getElapsedTime();
    meshRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      castShadow
    >
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial
        color={hovered ? "#7c6aff" : "#4a4a4a"}
        metalness={0.9}
        roughness={0.1}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

// ─── Canvas Wrapper ───────────────────────────────────────────────────────
export default function HeroCanvas() {
  return (
    <Canvas
      // Only re-render when something changes — saves GPU on idle
      frameloop="demand"
      // Cap DPR: crisp on retina, not burning GPU on 3× screens
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7c6aff" />

      {/* Environment map for reflections */}
      <Environment preset="city" />

      {/* Scene */}
      <SceneObject />

      {/* Damped rotation only — no zoom/pan */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        dampingFactor={0.05}
        enableDamping
      />
    </Canvas>
  );
}
