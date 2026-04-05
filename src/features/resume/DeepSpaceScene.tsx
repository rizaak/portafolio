"use client";

import { Float } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { healthcarePulseTargetRef } from "./scene-healthcare-pulse";

const CYAN = new THREE.Color("#00e5ff");
/** Healthcare constellation — teal / emerald, aligned with sector card. */
const HEALTH_GREEN = new THREE.Color("#2dd4bf");

const CONSTELLATION_COUNT = 5;

const STAR_COUNT = 4200;
const R_MIN = 42;
const R_MAX = 88;

function buildConstellationData() {
  const ring = 6;
  const local: THREE.Vector3[] = [];
  for (let i = 0; i < ring; i++) {
    const a = (i / ring) * Math.PI * 2;
    local.push(
      new THREE.Vector3(Math.cos(a) * 1.6, Math.sin(a) * 1.6, (Math.random() - 0.5) * 0.35)
    );
  }
  local.push(new THREE.Vector3(0, 0, 0));

  const pairs: [number, number][] = [];
  for (let i = 0; i < ring; i++) {
    pairs.push([i, (i + 1) % ring]);
    pairs.push([i, ring]);
  }

  const offsets = [
    new THREE.Vector3(36, 10, 14),
    new THREE.Vector3(-32, -8, 22),
    new THREE.Vector3(12, -34, -18),
    new THREE.Vector3(-16, 28, -26),
    new THREE.Vector3(20, 32, -24),
  ];

  const rotations = [0, Math.PI * 0.35, Math.PI * 0.6, Math.PI * 0.9, Math.PI * 0.22];

  return { local, pairs, offsets, rotations, ring };
}

type Props = {
  scrollRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
};

type Comet = {
  active: boolean;
  t: number;
  start: THREE.Vector3;
  dir: THREE.Vector3;
};

const MAX_COMETS = 10;

export function DeepSpaceScene({ scrollRef, mouseRef }: Props) {
  const sceneRef = useRef<THREE.Group>(null);
  const constGroupRefs = useRef<(THREE.Group | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const healthcarePulseSmooth = useRef(0);

  const { starPositions, twinklePhase, constellation } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const phase = new Float32Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = R_MIN + Math.random() * (R_MAX - R_MIN);
      const si = i * 3;
      pos[si] = r * Math.sin(phi) * Math.cos(theta);
      pos[si + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[si + 2] = r * Math.cos(phi);
      phase[i] = Math.random() * Math.PI * 2;
    }
    return { starPositions: pos, twinklePhase: phase, constellation: buildConstellationData() };
  }, []);

  const starColors = useMemo(() => new Float32Array(STAR_COUNT * 3), []);

  const starGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const col = new THREE.BufferAttribute(starColors, 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const o = i * 3;
      col.array[o] = 0.92;
      col.array[o + 1] = 0.95;
      col.array[o + 2] = 1;
    }
    g.setAttribute("color", col);
    return g;
  }, [starPositions, starColors]);

  const starMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.022,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const { lineGeoms, lineMats, pointGeoms, pointMats } = useMemo(() => {
    const { pairs, ring } = constellation;
    const lineGeoms: THREE.BufferGeometry[] = [];
    const pointGeoms: THREE.BufferGeometry[] = [];
    const lineMats: THREE.LineBasicMaterial[] = [];
    const pointMats: THREE.PointsMaterial[] = [];

    for (let g = 0; g < CONSTELLATION_COUNT; g++) {
      const posArr = new Float32Array(pairs.length * 2 * 3);
      const lg = new THREE.BufferGeometry();
      lg.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
      lineGeoms.push(lg);

      const lp = new Float32Array((ring + 1) * 3);
      const pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.BufferAttribute(lp, 3));
      pointGeoms.push(pg);

      const lineColor = g === 4 ? HEALTH_GREEN : CYAN;
      const pointColor = g === 4 ? HEALTH_GREEN : CYAN;
      const baseLineOp = g === 4 ? 0.14 : 0.2;
      const basePointOp = g === 4 ? 0.52 : 0.88;

      lineMats.push(
        new THREE.LineBasicMaterial({
          color: lineColor,
          transparent: true,
          opacity: baseLineOp,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      pointMats.push(
        new THREE.PointsMaterial({
          color: pointColor,
          size: g === 4 ? 0.078 : 0.085,
          transparent: true,
          opacity: basePointOp,
          sizeAttenuation: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
    }

    return { lineGeoms, lineMats, pointGeoms, pointMats };
  }, [constellation]);

  const cometGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(MAX_COMETS * 2 * 3);
    const col = new Float32Array(MAX_COMETS * 2 * 3);
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, []);

  const cometMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  const cometsRef = useRef<Comet[]>(
    Array.from({ length: MAX_COMETS }, () => ({
      active: false,
      t: 0,
      start: new THREE.Vector3(),
      dir: new THREE.Vector3(),
    }))
  );

  const spawnCooldownRef = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;
    const mx = mouseRef.current.x * 0.12;
    const my = mouseRef.current.y * 0.1;

    const colorAttr = starGeom.getAttribute("color") as THREE.BufferAttribute;
    const ca = colorAttr.array as Float32Array;

    for (let i = 0; i < STAR_COUNT; i++) {
      const tw = 0.55 + 0.45 * Math.sin(t * (1.2 + (i % 7) * 0.08) + twinklePhase[i]);
      const cyanMix = 0.08 + 0.12 * Math.sin(t * 0.7 + i * 0.01);
      const o = i * 3;
      ca[o] = THREE.MathUtils.lerp(0.85, 1, tw);
      ca[o + 1] = THREE.MathUtils.lerp(0.9, 1, tw);
      ca[o + 2] = THREE.MathUtils.lerp(0.95, 1, tw) + cyanMix * 0.15;
    }
    colorAttr.needsUpdate = true;

    const rotSpeed = 0.016 + scroll * 0.055;
    if (sceneRef.current) {
      sceneRef.current.rotation.y += delta * rotSpeed;
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        my * 0.07,
        0.025
      );
      sceneRef.current.rotation.z = THREE.MathUtils.lerp(
        sceneRef.current.rotation.z,
        -mx * 0.055,
        0.025
      );
    }

    const { local, pairs, ring, offsets, rotations } = constellation;

    for (let gi = 0; gi < CONSTELLATION_COUNT; gi++) {
      const grp = constGroupRefs.current[gi];
      if (grp) {
        grp.rotation.y += delta * (0.032 + gi * 0.006);
        grp.rotation.z = rotations[gi] + Math.sin(t * 0.14 + gi) * 0.045;
      }

      const pg = pointGeoms[gi].getAttribute("position") as THREE.BufferAttribute;
      const pa = pg.array as Float32Array;
      for (let i = 0; i <= ring; i++) {
        const v = local[i].clone();
        v.applyAxisAngle(new THREE.Vector3(0, 1, 0), t * 0.07 + gi * 0.2);
        pa[i * 3] = v.x;
        pa[i * 3 + 1] = v.y;
        pa[i * 3 + 2] = v.z;
      }
      pg.needsUpdate = true;

      const lg = lineGeoms[gi].getAttribute("position") as THREE.BufferAttribute;
      const la = lg.array as Float32Array;
      let li = 0;
      for (const [ai, bi] of pairs) {
        const va = new THREE.Vector3(pa[ai * 3], pa[ai * 3 + 1], pa[ai * 3 + 2]);
        const vb = new THREE.Vector3(pa[bi * 3], pa[bi * 3 + 1], pa[bi * 3 + 2]);
        la[li] = va.x;
        la[li + 1] = va.y;
        la[li + 2] = va.z;
        la[li + 3] = vb.x;
        la[li + 4] = vb.y;
        la[li + 5] = vb.z;
        li += 6;
      }
      lg.needsUpdate = true;
      lineGeoms[gi].setDrawRange(0, pairs.length * 2);
    }

    healthcarePulseSmooth.current += (healthcarePulseTargetRef.current - healthcarePulseSmooth.current) *
      Math.min(1, delta * 5);
    const pulse = healthcarePulseSmooth.current;
    const heartbeat = Math.sin(t * 4.15) * 0.5 + 0.5;
    const linePulse = lineMats[4];
    const pointPulse = pointMats[4];
    if (linePulse && pointPulse) {
      linePulse.opacity = 0.12 + pulse * heartbeat * 0.26;
      pointPulse.opacity = 0.4 + pulse * heartbeat * 0.48;
    }

    spawnCooldownRef.current += delta;
    const comets = cometsRef.current;
    const activeCount = comets.filter((c) => c.active).length;
    if (spawnCooldownRef.current > 0.9 && activeCount < 5 && Math.random() < 0.08) {
      spawnCooldownRef.current = 0;
      const slot = comets.find((c) => !c.active);
      if (slot) {
        slot.active = true;
        slot.t = 0;
        slot.dir = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize();
        slot.start = slot.dir.clone().multiplyScalar(72 + Math.random() * 22);
      }
    }

    const cpos = cometGeom.getAttribute("position") as THREE.BufferAttribute;
    const ccol = cometGeom.getAttribute("color") as THREE.BufferAttribute;
    const cpa = cpos.array as Float32Array;
    const cca = ccol.array as Float32Array;

    for (let i = 0; i < MAX_COMETS; i++) {
      const base = i * 6;
      const c = comets[i];
      if (!c.active) {
        for (let j = 0; j < 6; j++) cpa[base + j] = 0;
        continue;
      }

      c.t += delta * 0.55;
      if (c.t > 1) {
        c.active = false;
        for (let j = 0; j < 6; j++) cpa[base + j] = 0;
        continue;
      }

      const head = c.start.clone().addScaledVector(c.dir, -c.t * 58);
      const tail = head.clone().addScaledVector(c.dir, -5.2 - (1 - c.t) * 7);
      cpa[base] = tail.x;
      cpa[base + 1] = tail.y;
      cpa[base + 2] = tail.z;
      cpa[base + 3] = head.x;
      cpa[base + 4] = head.y;
      cpa[base + 5] = head.z;

      const fade = 1 - c.t;
      for (let k = 0; k < 2; k++) {
        const o = (i * 2 + k) * 3;
        cca[o] = 0.35 + 0.65 * fade;
        cca[o + 1] = 0.9 + 0.1 * fade;
        cca[o + 2] = 1;
      }
    }
    cpos.needsUpdate = true;
    ccol.needsUpdate = true;
    cometGeom.setDrawRange(0, MAX_COMETS * 2);
  });

  const { offsets, rotations } = constellation;

  return (
    <>
      <ambientLight intensity={0.2} />
      <Float speed={0.55} rotationIntensity={0.07} floatIntensity={0.22}>
        <group ref={sceneRef}>
          <points geometry={starGeom} material={starMat} />

          {[0, 1, 2, 3, 4].map((gi) => (
            <group
              key={gi}
              ref={(el) => {
                constGroupRefs.current[gi] = el;
              }}
              position={offsets[gi]}
              rotation={[0, rotations[gi], 0]}
            >
              <points geometry={pointGeoms[gi]} material={pointMats[gi]} />
              <lineSegments geometry={lineGeoms[gi]} material={lineMats[gi]} />
            </group>
          ))}

          <lineSegments geometry={cometGeom} material={cometMat} />
        </group>
      </Float>
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.05}
          luminanceThreshold={0.22}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}
