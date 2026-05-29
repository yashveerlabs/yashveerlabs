"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { StageCanvas } from "./shared/StageCanvas";

type Variant = "gold" | "cyan" | "violet";

function Particles({ count = 220, color = "#B08A52" }: { count?: number; color?: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Grid({ color = "#B08A52" }: { color?: string }) {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.015;
  });
  return (
    <gridHelper
      ref={ref}
      args={[40, 40, color, color]}
      position={[0, -3.5, -2]}
      rotation={[Math.PI / 2.3, 0, 0]}
    >
      <meshBasicMaterial
        attach="material"
        color={color}
        transparent
        opacity={0.05}
      />
    </gridHelper>
  );
}

/**
 * Low-intensity ambient background scene. Sits behind page content at ~5%
 * visual weight. Use this on every page for atmospheric depth.
 */
export function AmbientBackdrop({ variant = "gold" }: { variant?: Variant }) {
  const color =
    variant === "cyan" ? "#00D9FF" : variant === "violet" ? "#9D7EE0" : "#B08A52";
  return (
    <StageCanvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 55 }}
    >
      <fog attach="fog" args={["#0F0A12", 4, 16]} />
      <ambientLight intensity={0.3} />
      <Particles count={260} color={color} />
      <Grid color={color} />
    </StageCanvas>
  );
}
