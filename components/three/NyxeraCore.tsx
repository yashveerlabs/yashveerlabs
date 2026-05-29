"use client";

import { Environment, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { StageCanvas } from "./shared/StageCanvas";

function Core() {
  const inner = useRef<THREE.Mesh>(null);
  const outer = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (inner.current) {
      inner.current.rotation.y += delta * 0.4;
      inner.current.rotation.x += delta * 0.15;
    }
    if (outer.current) {
      outer.current.rotation.y -= delta * 0.12;
    }
    if (ring.current) {
      ring.current.rotation.z = state.clock.elapsedTime * 0.6;
      ring.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group>
      {/* Glow halo */}
      <Sphere ref={outer} args={[1.55, 64, 64]}>
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.06} />
      </Sphere>
      {/* Pulsing distort core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.4}
          distort={0.35}
          speed={2.4}
        />
      </mesh>
      {/* Scanline ring */}
      <mesh ref={ring}>
        <torusGeometry args={[1.85, 0.008, 8, 96]} />
        <meshBasicMaterial color="#00D9FF" />
      </mesh>
    </group>
  );
}

export function NyxeraCore() {
  return (
    <StageCanvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 4.6], fov: 38 }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 2, 2]} intensity={1.4} color="#00D9FF" />
      <pointLight position={[-3, -2, -2]} intensity={0.7} color="#5E8FFF" />
      <Stars radius={40} depth={20} count={1400} factor={2} fade speed={0.4} />
      <Environment preset="city" />
      <Core />
    </StageCanvas>
  );
}
