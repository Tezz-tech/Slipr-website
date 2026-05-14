import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Shield() {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.2;
      wireRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#00C2A8"
          emissive="#00E8C8"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.75}
          wireframe={false}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          color="#00C2A8"
          emissive="#00C2A8"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, count, speed, color, tilt }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(() => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2), [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    phases.forEach((phase, i) => {
      const angle = phase + t;
      dummy.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5) * 0.3,
        Math.sin(angle) * radius
      );
      dummy.rotation.set(0, -angle, tilt);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
    </instancedMesh>
  );
}

function CheckMarks() {
  const ref = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    angle: (i / 12) * Math.PI * 2,
    r: 2.4 + (Math.random() - 0.5) * 0.6,
    y: (Math.random() - 0.5) * 2,
    phase: Math.random() * Math.PI * 2,
  })), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    data.forEach((d, i) => {
      dummy.position.set(
        Math.cos(d.angle + t * 0.1) * d.r,
        d.y + Math.sin(t * 0.5 + d.phase) * 0.15,
        Math.sin(d.angle + t * 0.1) * d.r
      );
      dummy.scale.setScalar(0.5 + Math.sin(t + d.phase) * 0.08);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[null, null, 12]}>
      <octahedronGeometry args={[0.12, 0]} />
      <meshStandardMaterial color="#2ECC71" emissive="#2ECC71" emissiveIntensity={1.0} />
    </instancedMesh>
  );
}

export default function ShieldOrbScene({ style }) {
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
      camera={{ position: [0, 1, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#00C2A8" />
      <pointLight position={[-3, -2, 2]} intensity={1} color="#2ECC71" />
      <Shield />
      <OrbitRing radius={1.85} count={24} speed={0.5} color="#00C2A8" tilt={0} />
      <OrbitRing radius={2.1} count={18} speed={-0.35} color="#2ECC71" tilt={Math.PI / 4} />
      <OrbitRing radius={2.35} count={14} speed={0.25} color="#FFD700" tilt={Math.PI / 6} />
      <CheckMarks />
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.15} intensity={2.0} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
