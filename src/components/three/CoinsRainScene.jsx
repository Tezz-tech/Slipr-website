import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const COUNT = 150;

function Coins() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    return Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 14,
      y: Math.random() * 22 - 6,
      z: (Math.random() - 0.5) * 5,
      speed: 0.015 + Math.random() * 0.025,
      rotX: Math.random() * Math.PI,
      rotZ: (Math.random() - 0.5) * 0.5,
      rotSpeed: (Math.random() - 0.5) * 0.06,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    data.forEach((coin, i) => {
      coin.y -= coin.speed;
      coin.rotX += coin.rotSpeed;
      if (coin.y < -7) {
        coin.y = 14 + Math.random() * 4;
        coin.x = (Math.random() - 0.5) * 14;
      }

      dummy.position.set(
        coin.x + Math.sin(t * 0.3 + coin.phase) * 0.15,
        coin.y,
        coin.z
      );
      dummy.rotation.set(coin.rotX, 0, coin.rotZ);
      dummy.scale.setScalar(0.9 + Math.sin(t + coin.phase) * 0.08);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, COUNT]} castShadow>
      <cylinderGeometry args={[0.2, 0.2, 0.04, 20]} />
      <meshStandardMaterial
        color="#00C2A8"
        emissive="#00E8C8"
        emissiveIntensity={0.7}
        metalness={0.9}
        roughness={0.15}
      />
    </instancedMesh>
  );
}

function NairaSymbols() {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => (
    Array.from({ length: 30 }, () => ({
      x: (Math.random() - 0.5) * 14,
      y: Math.random() * 22 - 6,
      z: (Math.random() - 0.5) * 3 - 1,
      speed: 0.008 + Math.random() * 0.012,
      rot: Math.random() * Math.PI,
    }))
  ), []);

  useFrame(() => {
    if (!meshRef.current) return;
    data.forEach((s, i) => {
      s.y -= s.speed;
      s.rot += 0.01;
      if (s.y < -7) { s.y = 14; s.x = (Math.random() - 0.5) * 14; }
      dummy.position.set(s.x, s.y, s.z);
      dummy.rotation.set(0, 0, s.rot);
      dummy.scale.setScalar(0.6);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, 30]}>
      <torusGeometry args={[0.15, 0.04, 8, 16]} />
      <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
    </instancedMesh>
  );
}

export default function CoinsRainScene({ style }) {
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
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 6, 4]} intensity={2} color="#00C2A8" />
      <pointLight position={[-4, 2, 3]} intensity={1.2} color="#FFD700" />
      <Coins />
      <NairaSymbols />
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.2} intensity={1.8} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
