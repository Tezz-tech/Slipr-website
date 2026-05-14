/**
 * ThreeCanvas — WebGL scene renderer for SectionBridge portals.
 * Each variant is a self-contained gamification animation that runs on
 * a transparent canvas overlaid on the dark bridge section background.
 *
 * Variants: vortex | network | coins | shield | burst | stars | wave | ripple | pulse
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── Brand palette ────────────────────────────────────────────────────────────
const TEAL  = new THREE.Color('#00C2A8');
const WHITE = new THREE.Color('#ffffff');
const GOLD  = new THREE.Color('#F5A623');

// ─── Scene builders ───────────────────────────────────────────────────────────

/** Torus ring of particles slowly rotating — Home */
function buildVortex(scene) {
  const COUNT = 2200;
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.random() * Math.PI * 2;
    const R = 3.4 + (Math.random() - 0.5) * 0.7;
    const r = 0.85 + (Math.random() - 0.5) * 0.6;
    pos[i*3]   = (R + r * Math.cos(phi)) * Math.cos(theta);
    pos[i*3+1] = r * Math.sin(phi);
    pos[i*3+2] = (R + r * Math.cos(phi)) * Math.sin(theta);
    const t = Math.random();
    const c = t < 0.62 ? TEAL : t < 0.84 ? WHITE : GOLD;
    col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size: 0.038, vertexColors: true, transparent: true, opacity: 0.82 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  return {
    animate(t) {
      pts.rotation.y = t * 0.13;
      pts.rotation.x = Math.sin(t * 0.04) * 0.14;
      const s = 1 + Math.sin(t * 0.55) * 0.025;
      pts.scale.setScalar(s);
    },
    dispose() { geo.dispose(); mat.dispose(); scene.remove(pts); },
  };
}

/** Living network of connected nodes — HowItWorks */
function buildNetwork(scene) {
  const N = 62;
  const BOUNDS = 4.5;
  const CONNECT = 2.0;
  const MAX_SEGS = 180;

  const sphereGeo = new THREE.SphereGeometry(0.058, 8, 8);
  const matT = new THREE.MeshBasicMaterial({ color: TEAL });
  const matW = new THREE.MeshBasicMaterial({ color: WHITE });

  const nodes = Array.from({ length: N }, (_, i) => {
    const mesh = new THREE.Mesh(sphereGeo, i % 7 === 0 ? matW : matT);
    mesh.position.set(
      (Math.random() - 0.5) * BOUNDS * 2,
      (Math.random() - 0.5) * BOUNDS,
      (Math.random() - 0.5) * BOUNDS,
    );
    scene.add(mesh);
    return {
      mesh,
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.009,
        (Math.random() - 0.5) * 0.009,
        (Math.random() - 0.5) * 0.009,
      ),
    };
  });

  const linePos = new Float32Array(MAX_SEGS * 6);
  const lineBuf = new THREE.BufferAttribute(linePos, 3);
  lineBuf.setUsage(THREE.DynamicDrawUsage);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', lineBuf);
  lineGeo.setDrawRange(0, 0);
  const lineMat = new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.2 });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  return {
    animate() {
      nodes.forEach(n => {
        n.mesh.position.add(n.vel);
        if (Math.abs(n.mesh.position.x) > BOUNDS)    n.vel.x *= -1;
        if (Math.abs(n.mesh.position.y) > BOUNDS / 2) n.vel.y *= -1;
        if (Math.abs(n.mesh.position.z) > BOUNDS / 2) n.vel.z *= -1;
      });
      let seg = 0;
      for (let i = 0; i < N && seg < MAX_SEGS; i++) {
        for (let j = i + 1; j < N && seg < MAX_SEGS; j++) {
          if (nodes[i].mesh.position.distanceTo(nodes[j].mesh.position) < CONNECT) {
            const o = seg * 6;
            linePos[o]   = nodes[i].mesh.position.x; linePos[o+1] = nodes[i].mesh.position.y; linePos[o+2] = nodes[i].mesh.position.z;
            linePos[o+3] = nodes[j].mesh.position.x; linePos[o+4] = nodes[j].mesh.position.y; linePos[o+5] = nodes[j].mesh.position.z;
            seg++;
          }
        }
      }
      lineBuf.needsUpdate = true;
      lineGeo.setDrawRange(0, seg * 2);
    },
    dispose() {
      sphereGeo.dispose(); matT.dispose(); matW.dispose();
      lineGeo.dispose(); lineMat.dispose();
      nodes.forEach(n => scene.remove(n.mesh));
      scene.remove(lines);
    },
  };
}

/** Gold coins floating upward — ForTipsters */
function buildCoins(scene) {
  const COUNT = 110;
  const coinGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.035, 16);
  const coinMat = new THREE.MeshBasicMaterial({ color: GOLD });
  const mesh = new THREE.InstancedMesh(coinGeo, coinMat, COUNT);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(mesh);

  const dummy = new THREE.Object3D();
  const coins = Array.from({ length: COUNT }, () => ({
    x: (Math.random() - 0.5) * 11,
    y: (Math.random() - 0.5) * 6,
    z: (Math.random() - 0.5) * 4 - 1,
    speed: 0.007 + Math.random() * 0.011,
    tilt: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.04,
  }));

  return {
    animate(t) {
      coins.forEach((c, i) => {
        c.y += c.speed;
        c.tilt += c.spin;
        if (c.y > 4) { c.y = -4; c.x = (Math.random() - 0.5) * 11; }
        dummy.position.set(c.x, c.y, c.z);
        dummy.rotation.set(c.tilt, t * 0.4 + i * 0.28, 0);
        dummy.scale.setScalar(0.85 + Math.sin(t * 1.2 + i) * 0.1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    },
    dispose() { coinGeo.dispose(); coinMat.dispose(); scene.remove(mesh); },
  };
}

/** Rotating wireframe + orbiting particle ring — ForBuyers */
function buildShield(scene) {
  const octGeo = new THREE.IcosahedronGeometry(1.4, 1);
  const octMat = new THREE.MeshBasicMaterial({ color: TEAL, wireframe: true, transparent: true, opacity: 0.38 });
  const oct = new THREE.Mesh(octGeo, octMat);
  scene.add(oct);

  const RING = 420;
  const ringPos = new Float32Array(RING * 3);
  for (let i = 0; i < RING; i++) {
    const angle = (i / RING) * Math.PI * 2;
    const rad = 2.8 + Math.sin(i * 0.48) * 0.28;
    ringPos[i*3]   = Math.cos(angle) * rad;
    ringPos[i*3+1] = Math.sin(i * 0.3) * 0.45;
    ringPos[i*3+2] = Math.sin(angle) * rad;
  }
  const ringGeo = new THREE.BufferGeometry();
  ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
  const ringMat = new THREE.PointsMaterial({ color: TEAL, size: 0.042, transparent: true, opacity: 0.72 });
  const ring = new THREE.Points(ringGeo, ringMat);
  scene.add(ring);

  // Inner glow sphere
  const glowGeo = new THREE.SphereGeometry(0.9, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({ color: TEAL, wireframe: true, transparent: true, opacity: 0.1 });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glow);

  return {
    animate(t) {
      oct.rotation.y = t * 0.22;
      oct.rotation.x = t * 0.09;
      ring.rotation.y = -t * 0.14;
      ring.rotation.x = Math.sin(t * 0.18) * 0.12;
      glow.rotation.y = t * 0.3;
      const s = 1 + Math.sin(t * 0.8) * 0.04;
      oct.scale.setScalar(s);
    },
    dispose() {
      octGeo.dispose(); octMat.dispose(); ringGeo.dispose(); ringMat.dispose();
      glowGeo.dispose(); glowMat.dispose();
      scene.remove(oct); scene.remove(ring); scene.remove(glow);
    },
  };
}

/** Particle firework bursting in loops — Pricing */
function buildBurst(scene) {
  const COUNT = 550;
  const pos = new Float32Array(COUNT * 3);
  const vel = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const life = new Float32Array(COUNT);

  const reset = (i) => {
    pos[i*3] = (Math.random() - 0.5) * 0.15;
    pos[i*3+1] = (Math.random() - 0.5) * 0.15;
    pos[i*3+2] = (Math.random() - 0.5) * 0.15;
    const spd = 0.018 + Math.random() * 0.038;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    vel[i*3]   = spd * Math.sin(ph) * Math.cos(th);
    vel[i*3+1] = spd * Math.sin(ph) * Math.sin(th);
    vel[i*3+2] = spd * Math.cos(ph);
    const c = Math.random() < 0.55 ? TEAL : Math.random() < 0.5 ? GOLD : WHITE;
    col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
    life[i] = 80 + Math.random() * 80;
  };

  for (let i = 0; i < COUNT; i++) reset(i);

  const geo = new THREE.BufferGeometry();
  const posBuf = new THREE.BufferAttribute(pos, 3);
  posBuf.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute('position', posBuf);
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size: 0.065, vertexColors: true, transparent: true, opacity: 0.92 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  return {
    animate(t) {
      for (let i = 0; i < COUNT; i++) {
        pos[i*3]   += vel[i*3];
        pos[i*3+1] += vel[i*3+1] - 0.00025;
        pos[i*3+2] += vel[i*3+2];
        vel[i*3]   *= 0.992;
        vel[i*3+1] *= 0.992;
        vel[i*3+2] *= 0.992;
        life[i]--;
        if (life[i] <= 0) reset(i);
      }
      posBuf.needsUpdate = true;
      pts.rotation.y = t * 0.04;
    },
    dispose() { geo.dispose(); mat.dispose(); scene.remove(pts); },
  };
}

/** Constellation sphere with faint connecting lines — About */
function buildStars(scene) {
  const COUNT = 900;
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const R = 3.6;

  for (let i = 0; i < COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = R + (Math.random() - 0.5) * 0.55;
    pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    pos[i*3+1] = r * Math.cos(phi);
    pos[i*3+2] = r * Math.sin(phi) * Math.sin(theta);
    const t = Math.random();
    const c = t < 0.48 ? WHITE : t < 0.76 ? TEAL : GOLD;
    col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size: 0.048, vertexColors: true, transparent: true, opacity: 0.88 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  // Constellation lines from a subset
  const LINE_N = 55;
  const lp = new Float32Array(LINE_N * 6);
  for (let i = 0; i < LINE_N; i++) {
    const a = Math.floor(Math.random() * 180);
    const b = Math.floor(Math.random() * 180);
    lp[i*6] = pos[a*3]; lp[i*6+1] = pos[a*3+1]; lp[i*6+2] = pos[a*3+2];
    lp[i*6+3] = pos[b*3]; lp[i*6+4] = pos[b*3+1]; lp[i*6+5] = pos[b*3+2];
  }
  const lGeo = new THREE.BufferGeometry();
  lGeo.setAttribute('position', new THREE.BufferAttribute(lp, 3));
  const lMat = new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.13 });
  const lSeg = new THREE.LineSegments(lGeo, lMat);
  scene.add(lSeg);

  return {
    animate(t) {
      pts.rotation.y  = t * 0.055;
      pts.rotation.x  = Math.sin(t * 0.035) * 0.09;
      lSeg.rotation.y = pts.rotation.y;
      lSeg.rotation.x = pts.rotation.x;
    },
    dispose() {
      geo.dispose(); mat.dispose(); lGeo.dispose(); lMat.dispose();
      scene.remove(pts); scene.remove(lSeg);
    },
  };
}

/** Radial sine wave ripple grid — FAQ */
function buildWave(scene) {
  const COLS = 36, ROWS = 36;
  const COUNT = COLS * ROWS;
  const pos = new Float32Array(COUNT * 3);
  const posBuf = new THREE.BufferAttribute(pos, 3);
  posBuf.setUsage(THREE.DynamicDrawUsage);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', posBuf);
  const mat = new THREE.PointsMaterial({ color: TEAL, size: 0.068, transparent: true, opacity: 0.68 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);
  const sx = 8 / COLS, sz = 5 / ROWS;

  return {
    animate(t) {
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const idx = i * ROWS + j;
          const x = (i - COLS / 2) * sx;
          const z = (j - ROWS / 2) * sz;
          const d = Math.sqrt(x * x + z * z);
          pos[idx*3]   = x;
          pos[idx*3+1] = Math.sin(d * 1.6 - t * 2.4) * 0.55 * Math.exp(-d * 0.14);
          pos[idx*3+2] = z;
        }
      }
      posBuf.needsUpdate = true;
    },
    dispose() { geo.dispose(); mat.dispose(); scene.remove(pts); },
  };
}

/** Colour-shifting circular ripple — Blog */
function buildRipple(scene) {
  const COLS = 32, ROWS = 32;
  const COUNT = COLS * ROWS;
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const posBuf = new THREE.BufferAttribute(pos, 3);
  const colBuf = new THREE.BufferAttribute(col, 3);
  posBuf.setUsage(THREE.DynamicDrawUsage);
  colBuf.setUsage(THREE.DynamicDrawUsage);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', posBuf);
  geo.setAttribute('color',    colBuf);
  const mat = new THREE.PointsMaterial({ size: 0.075, vertexColors: true, transparent: true, opacity: 0.78 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);
  const sx = 8 / COLS, sz = 5 / ROWS;

  return {
    animate(t) {
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const idx = i * ROWS + j;
          const x = (i - COLS / 2) * sx;
          const z = (j - ROWS / 2) * sz;
          const d = Math.sqrt(x * x + z * z);
          const wave = Math.sin(d * 2.2 - t * 3.0);
          pos[idx*3]   = x;
          pos[idx*3+1] = wave * 0.48 * Math.max(0, 1 - d / 5.5);
          pos[idx*3+2] = z;
          const blend = (wave + 1) / 2;
          col[idx*3]   = TEAL.r * blend + GOLD.r * (1 - blend);
          col[idx*3+1] = TEAL.g * blend + GOLD.g * (1 - blend);
          col[idx*3+2] = TEAL.b * blend + GOLD.b * (1 - blend);
        }
      }
      posBuf.needsUpdate = true;
      colBuf.needsUpdate = true;
    },
    dispose() { geo.dispose(); mat.dispose(); scene.remove(pts); },
  };
}

/** Concentric pulsing rings — Contact */
function buildPulse(scene) {
  const RINGS = 5, PER = 220;
  const COUNT = RINGS * PER;
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const posBuf = new THREE.BufferAttribute(pos, 3);
  posBuf.setUsage(THREE.DynamicDrawUsage);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', posBuf);
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({ size: 0.048, vertexColors: true, transparent: true, opacity: 0.82 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);

  for (let r = 0; r < RINGS; r++) {
    for (let i = 0; i < PER; i++) {
      const idx = r * PER + i;
      const c = r % 2 === 0 ? TEAL : WHITE;
      col[idx*3] = c.r; col[idx*3+1] = c.g; col[idx*3+2] = c.b;
    }
  }

  return {
    animate(t) {
      for (let r = 0; r < RINGS; r++) {
        const pulse = 1 + Math.sin(t * 0.9 + r * 0.65) * 0.28;
        const baseR = (r + 1) * 0.88;
        for (let i = 0; i < PER; i++) {
          const idx = r * PER + i;
          const angle = (i / PER) * Math.PI * 2;
          const rad = baseR * pulse;
          pos[idx*3]   = Math.cos(angle) * rad;
          pos[idx*3+1] = Math.sin(t * 0.22 + r * 0.4) * 0.18;
          pos[idx*3+2] = Math.sin(angle) * rad;
        }
      }
      posBuf.needsUpdate = true;
      pts.rotation.y = t * 0.07;
    },
    dispose() { geo.dispose(); mat.dispose(); scene.remove(pts); },
  };
}

// ─── Scene registry ───────────────────────────────────────────────────────────
const BUILDERS = {
  vortex:  buildVortex,
  network: buildNetwork,
  coins:   buildCoins,
  shield:  buildShield,
  burst:   buildBurst,
  stars:   buildStars,
  wave:    buildWave,
  ripple:  buildRipple,
  pulse:   buildPulse,
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ThreeCanvas({ variant = 'vortex' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    let w = parent.clientWidth || 800;
    let h = parent.clientHeight || 520;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.z = 8;

    const clock   = new THREE.Clock();
    const builder = BUILDERS[variant] ?? buildVortex;
    const { animate, dispose } = builder(scene);

    let animId;
    const loop = () => {
      animId = requestAnimationFrame(loop);
      animate(clock.getElapsedTime());
      renderer.render(scene, camera);
    };
    loop();

    const ro = new ResizeObserver(() => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      dispose();
      renderer.dispose();
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
    />
  );
}
