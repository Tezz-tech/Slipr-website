import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function StadiumParticles() {
  const mesh = useRef();
  const count = 7000;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const white = new THREE.Color('#D0D0E8');
    const teal = new THREE.Color('#00C2A8');
    const gold = new THREE.Color('#FFD700');

    for (let i = 0; i < count; i++) {
      const tier = Math.floor(Math.random() * 4);
      const angle = Math.random() * Math.PI * 2;
      const baseR = 3.5 + tier * 0.9;
      const scaleX = 1.6;
      const scaleZ = 1.0;
      const radiusNoise = (Math.random() - 0.5) * 0.4;
      const r = baseR + radiusNoise;

      pos[i * 3] = Math.cos(angle) * r * scaleX;
      pos[i * 3 + 1] = tier * 0.55 + (Math.random() - 0.5) * 0.35;
      pos[i * 3 + 2] = Math.sin(angle) * r * scaleZ;

      const rnd = Math.random();
      const c = rnd < 0.78 ? white : rnd < 0.96 ? teal : gold;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.025;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

function Football() {
  const mesh = useRef();

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.6;
    mesh.current.rotation.y = t * 0.9;
    mesh.current.position.y = Math.sin(t * 0.8) * 0.18;
  });

  return (
    <mesh ref={mesh} position={[0, 1.2, 0]}>
      <sphereGeometry args={[0.45, 32, 32]} />
      <meshStandardMaterial
        color="#00C2A8"
        emissive="#00E8C8"
        emissiveIntensity={1.2}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}

function Floodlights() {
  const positions = useMemo(() => [
    [-5.5, 3.5, -2.5],
    [5.5, 3.5, -2.5],
    [-5.5, 3.5, 2.5],
    [5.5, 3.5, 2.5],
  ], []);

  return (
    <>
      {positions.map((pos, i) => (
        <pointLight
          key={i}
          position={pos}
          intensity={0.9}
          distance={14}
          color="#FFFDE7"
          decay={2}
        />
      ))}
      <pointLight position={[0, 2.5, 0]} intensity={2.5} distance={10} color="#00C2A8" decay={2} />
      <ambientLight intensity={0.18} />
    </>
  );
}

function MouseParallax() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.6 - target.current.x) * 0.04;
    target.current.y += (mouse.current.y * 0.25 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = 4.5 + target.current.y;
  });

  return null;
}

export default function StadiumHeroScene({ style }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  if (isMobile) return null;

  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, ...style }}
      camera={{ position: [0, 4.5, 9.5], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <StadiumParticles />
      <Football />
      <Floodlights />
      <Stars radius={60} depth={30} count={1500} factor={2} saturation={0} fade speed={0.4} />
      <MouseParallax />
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.12} luminanceSmoothing={0.8} intensity={2.2} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}
