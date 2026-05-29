"use client";

import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useRef } from "react";
import * as THREE from "three";
import { StageCanvas } from "./shared/StageCanvas";

/**
 * The home page centerpiece: a slow rotating metallic icosahedron with
 * glassy transmission material, a gold rim light, and a subtle cursor
 * parallax. The sigil is the identity object of the site.
 *
 * Camera is locked so nothing pushes the mesh out of frame. Group transforms
 * are clamped so cursor parallax cannot drift the form away forever.
 */
function Sigil() {
  const group = useRef<THREE.Group>(null);
  const meshA = useRef<THREE.Mesh>(null);
  const meshB = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05); // clamp huge frames after tab return
    // Cursor parallax. Pointer is in clip space [-1, 1] when over the canvas.
    const px = (state.pointer.x || 0) * 0.25;
    const py = (state.pointer.y || 0) * 0.15;
    target.current.x += (px - target.current.x) * 0.05;
    target.current.y += (py - target.current.y) * 0.05;

    g.rotation.y += dt * 0.18;
    g.rotation.x = target.current.y + Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
    // Hard clamp position so nothing can wander out of frustum.
    g.position.x = Math.max(-0.3, Math.min(0.3, target.current.x * 0.25));
    g.position.y = 0;
    g.position.z = 0;

    if (meshA.current) meshA.current.rotation.x += dt * 0.12;
    if (meshB.current) meshB.current.rotation.z -= dt * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshA}>
          <icosahedronGeometry args={[1.15, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={1.4}
            roughness={0.18}
            ior={1.4}
            chromaticAberration={0.04}
            distortion={0.12}
            distortionScale={0.4}
            temporalDistortion={0.06}
            color="#ECE7E1"
            attenuationColor="#B08A52"
            attenuationDistance={1.6}
          />
        </mesh>

        {/* Inner gold core that glows through the glass shell */}
        <mesh ref={meshB} scale={0.42}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#B08A52"
            metalness={0.95}
            roughness={0.22}
            emissive="#B08A52"
            emissiveIntensity={0.35}
          />
        </mesh>

        {/* Thin gold ring orbiting the form */}
        <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
          <torusGeometry args={[1.55, 0.012, 12, 96]} />
          <meshStandardMaterial
            color="#B08A52"
            metalness={0.9}
            roughness={0.28}
            emissive="#B08A52"
            emissiveIntensity={0.55}
          />
        </mesh>
      </Float>
    </group>
  );
}

function HeroSigilImpl() {
  return (
    <StageCanvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 4.2], fov: 38 }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#FFFAEC" />
      <directionalLight position={[-4, -2, -3]} intensity={0.45} color="#9DB4D8" />
      <pointLight position={[2, -1, 2]} intensity={0.6} color="#B08A52" />
      <Environment preset="studio" />
      <Sigil />
    </StageCanvas>
  );
}

export const HeroSigil = memo(HeroSigilImpl);
