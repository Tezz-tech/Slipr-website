import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const BALLS = [
  { pos: [-2.2, 0, 0], color: '#00C2A8', emissive: '#00E8C8', size: 0.7, speed: 1.0, floatInt: 0.6 },
  { pos: [0, 0.4, -1], color: '#2ECC71', emissive: '#2ECC71', size: 0.5, speed: 1.4, floatInt: 0.8 },
  { pos: [2.2, -0.2, 0.5], color: '#FFD700', emissive: '#FFD700', size: 0.55, speed: 0.8, floatInt: 0.5 },
  { pos: [-0.8, 1.2, 1], color: '#00C2A8', emissive: '#00C2A8', size: 0.3, speed: 1.8, floatInt: 1.0 },
  { pos: [1.0, -1.0, -0.5], color: '#F5A623', emissive: '#F5A623', size: 0.28, speed: 1.2, floatInt: 0.9 },
];

function SportBall({ position, color, emissive, size, speed, floatIntensity }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.4;
    meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.6;
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={floatIntensity}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.8}
          roughness={0.25}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
}

function ConnectingLines() {
  const ref = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = [];
    for (let i = 0; i < BALLS.length; i++) {
      for (let j = i + 1; j < BALLS.length; j++) {
        verts.push(...BALLS[i].pos, ...BALLS[j].pos);
      }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.opacity = 0.06 + Math.sin(clock.getElapsedTime() * 0.5) * 0.04;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#00C2A8" transparent opacity={0.08} />
    </lineSegments>
  );
}

function Particles() {
  const ref = useRef();
  const count = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00C2A8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function FloatBallsScene({ style }) {
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
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#00C2A8" />
      <pointLight position={[-4, -2, 2]} intensity={1} color="#2ECC71" />
      {BALLS.map((b, i) => <SportBall key={i} position={b.pos} {...b} />)}
      <ConnectingLines />
      <Particles />
      <Stars radius={40} depth={20} count={800} factor={1.5} fade speed={0.3} />
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.18} intensity={1.6} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
