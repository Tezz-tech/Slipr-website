import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const ORBS = [
  { color: '#00C2A8', emissive: '#00E8C8', size: 0.22, orbitR: 1.2, speed: 1.0, tilt: 0 },
  { color: '#2ECC71', emissive: '#2ECC71', size: 0.18, orbitR: 1.8, speed: -0.7, tilt: 0.5 },
  { color: '#FFD700', emissive: '#FFD700', size: 0.25, orbitR: 2.3, speed: 0.55, tilt: -0.3 },
  { color: '#F5A623', emissive: '#F5A623', size: 0.15, orbitR: 2.7, speed: -0.9, tilt: 0.8 },
  { color: '#00C2A8', emissive: '#00C2A8', size: 0.12, orbitR: 1.5, speed: 1.5, tilt: -0.6 },
  { color: '#E74C3C', emissive: '#E74C3C', size: 0.14, orbitR: 3.0, speed: 0.4, tilt: 0.4 },
  { color: '#2ECC71', emissive: '#2ECC71', size: 0.1, orbitR: 3.4, speed: -0.6, tilt: -0.9 },
  { color: '#FFD700', emissive: '#FFD700', size: 0.16, orbitR: 0.9, speed: -1.2, tilt: 0.2 },
  { color: '#00C2A8', emissive: '#00E8C8', size: 0.2, orbitR: 2.0, speed: 0.8, tilt: 1.0 },
  { color: '#F5A623', emissive: '#F5A623', size: 0.13, orbitR: 2.5, speed: -0.5, tilt: -0.4 },
  { color: '#2ECC71', emissive: '#2ECC71', size: 0.11, orbitR: 3.2, speed: 1.1, tilt: 0.7 },
  { color: '#00C2A8', emissive: '#00C2A8', size: 0.09, orbitR: 3.7, speed: -0.8, tilt: -0.2 },
];

function CenterCore() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.4;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    meshRef.current.material.emissiveIntensity = 1.2 + Math.sin(clock.getElapsedTime() * 1.5) * 0.4;
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[0.45, 0]} />
      <meshStandardMaterial
        color="#00C2A8"
        emissive="#00E8C8"
        emissiveIntensity={1.2}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

function OrbitalBall({ color, emissive, size, orbitR, speed, tilt }) {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current || !meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    groupRef.current.rotation.z = tilt;
    meshRef.current.position.set(
      Math.cos(t) * orbitR,
      Math.sin(t) * orbitR * 0.3,
      Math.sin(t) * orbitR
    );
    meshRef.current.material.emissiveIntensity = 0.8 + Math.sin(clock.getElapsedTime() * 2 + orbitR) * 0.3;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 12, 12]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.8} metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

function OrbitTrails() {
  const trails = useMemo(() => {
    return ORBS.map((orb) => {
      const pts = [];
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(
          Math.cos(a) * orb.orbitR,
          Math.sin(a) * orb.orbitR * 0.3,
          Math.sin(a) * orb.orbitR
        ));
      }
      return { pts, color: orb.color };
    });
  }, []);

  return (
    <>
      {trails.map((trail, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(trail.pts.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={trail.color} transparent opacity={0.06} />
        </line>
      ))}
    </>
  );
}

function PriceTag({ position, label }) {
  return null; // text labels removed for perf — handled by HTML overlay
}

export default function OddsParticlesScene({ style }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  if (isMobile) return null;

  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, ...style }}
      camera={{ position: [0, 2, 9], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 3]} intensity={3} color="#00C2A8" />
      <pointLight position={[4, 3, -2]} intensity={1.2} color="#FFD700" />
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <CenterCore />
      </Float>
      {ORBS.map((orb, i) => <OrbitalBall key={i} {...orb} />)}
      <OrbitTrails />
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.12} intensity={2.0} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
