"use client";

import { Float } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CYAN = new THREE.Color("#00e5ff");
const DEEP_BLUE = new THREE.Color("#003d8a");
const PARTICLE_COUNT = 720;
const MAX_EDGE_DIST = 2.05;
const MAX_EDGES = 4800;

type Props = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
};

function buildParticles(count: number) {
  const base = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);
    const r = 3.2 + Math.random() * 2.4;
    const si = i * 3;
    base[si] = r * Math.sin(phi) * Math.cos(theta);
    base[si + 1] = r * Math.sin(phi) * Math.sin(theta);
    base[si + 2] = r * Math.cos(phi) * 0.85 + (Math.random() - 0.5) * 0.6;
  }
  return base;
}

function collectEdges(base: Float32Array, count: number) {
  const pairs: { i: number; j: number; d: number }[] = [];
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const a = i * 3;
      const b = j * 3;
      const dx = base[a] - base[b];
      const dy = base[a + 1] - base[b + 1];
      const dz = base[a + 2] - base[b + 2];
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (d < MAX_EDGE_DIST) {
        pairs.push({ i, j, d });
      }
    }
  }
  pairs.sort((x, y) => x.d - y.d);
  return pairs.slice(0, MAX_EDGES);
}

export function InteractiveNetwork({ scrollRef, mouseRef }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { base, edgePairs, linePos, lineColors, maxEdgeCount } = useMemo(() => {
    const b = buildParticles(PARTICLE_COUNT);
    const edges = collectEdges(b, PARTICLE_COUNT);
    const lp = new Float32Array(edges.length * 2 * 3);
    const lc = new Float32Array(edges.length * 2 * 3);
    return {
      base: b,
      edgePairs: edges,
      linePos: lp,
      lineColors: lc,
      maxEdgeCount: edges.length,
    };
  }, []);

  const work = useMemo(() => {
    const w = new Float32Array(base.length);
    w.set(base);
    return w;
  }, [base]);

  const pointGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(work, 3));
    return g;
  }, [work]);

  const lineGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    return g;
  }, [linePos, lineColors]);

  const pointMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: CYAN,
        size: 0.065,
        transparent: true,
        opacity: 0.92,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state, delta) => {
    const scroll = scrollRef.current;
    const mx = mouseRef.current.x * 15;
    const my = mouseRef.current.y * 11;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < base.length; i++) {
      work[i] = base[i];
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      let x = work[ix];
      let y = work[ix + 1];
      let z = work[ix + 2];
      const dx = x - mx * 0.35;
      const dy = y - my * 0.35;
      const dz = z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz * 0.35);
      const influence = Math.max(0, 1 - dist / 4.2);
      const repel = influence * 0.22;
      if (dist > 0.001) {
        x += (dx / dist) * repel;
        y += (dy / dist) * repel;
      }

      if (scroll > 0.48) {
        const pulse = Math.sin(t * 2.8 + i * 0.07) * 0.08 * (scroll - 0.48) * 2.2;
        x += pulse * 0.3;
        y += pulse * 0.25;
        z += pulse * 0.2;
      }

      work[ix] = x;
      work[ix + 1] = y;
      work[ix + 2] = z;
    }

    const posAttr = pointsRef.current?.geometry.getAttribute("position") as
      | THREE.BufferAttribute
      | undefined;
    if (posAttr) posAttr.needsUpdate = true;

    const density = 0.18 + scroll * 0.82;
    const visibleEdges = Math.max(
      120,
      Math.min(maxEdgeCount, Math.floor(maxEdgeCount * density))
    );

    const lp = lineGeom.getAttribute("position") as THREE.BufferAttribute;
    const lc = lineGeom.getAttribute("color") as THREE.BufferAttribute;
    const lpa = lp.array as Float32Array;
    const lca = lc.array as Float32Array;

    const colMix = Math.min(1, Math.max(0, (scroll - 0.42) * 1.6));
    const lineBase = new THREE.Color().lerpColors(CYAN, DEEP_BLUE, colMix);

    for (let e = 0; e < visibleEdges; e++) {
      const { i, j } = edgePairs[e];
      const ia = i * 3;
      const ja = j * 3;
      const v0 = e * 6;
      lpa[v0] = work[ia];
      lpa[v0 + 1] = work[ia + 1];
      lpa[v0 + 2] = work[ia + 2];
      lpa[v0 + 3] = work[ja];
      lpa[v0 + 4] = work[ja + 1];
      lpa[v0 + 5] = work[ja + 2];

      const midX = (work[ia] + work[ja]) * 0.5;
      const midY = (work[ia + 1] + work[ja + 1]) * 0.5;
      const dMouse = Math.hypot(midX - mx * 0.35, midY - my * 0.35);
      const glow = 0.35 + Math.max(0, 1 - dMouse / 5.5) * 1.25;

      for (let k = 0; k < 2; k++) {
        const o = (e * 2 + k) * 3;
        lca[o] = lineBase.r * glow;
        lca[o + 1] = lineBase.g * glow;
        lca[o + 2] = lineBase.b * glow;
      }
    }

    lp.needsUpdate = true;
    lc.needsUpdate = true;
    lineGeom.setDrawRange(0, visibleEdges * 2);

    pointMat.color.lerpColors(CYAN, DEEP_BLUE, colMix * 0.85);
    const pulseSize = 0.065 + (scroll > 0.48 ? Math.sin(t * 3.1) * 0.012 * (scroll - 0.48) * 3 : 0);
    pointMat.size = pulseSize;

    if (groupRef.current) {
      const rot =
        delta *
        (0.045 + scroll * 0.38 + scroll * scroll * 0.22 + (scroll > 0.25 ? scroll * 0.15 : 0));
      groupRef.current.rotation.y += rot;
      groupRef.current.rotation.x += delta * Math.sin(t * 0.35) * 0.04 * (1 - scroll * 0.35);
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <Float speed={1.35} rotationIntensity={0.25} floatIntensity={0.45}>
        <group ref={groupRef}>
          <points ref={pointsRef} geometry={pointGeom} material={pointMat} />
          <lineSegments geometry={lineGeom} material={lineMat} />
        </group>
      </Float>
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.35}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.92}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}
