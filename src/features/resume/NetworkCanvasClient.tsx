"use client";

import { Canvas } from "@react-three/fiber";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { Suspense, useEffect, useRef } from "react";
import { DeepSpaceScene } from "./DeepSpaceScene";

export default function NetworkCanvasClient() {
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollRef.current = v;
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      className="pointer-events-none !absolute inset-0 touch-none"
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      camera={{ position: [0, 0, 14], fov: 45 }}
      dpr={[1, 2]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Suspense fallback={null}>
        <DeepSpaceScene scrollRef={scrollRef} mouseRef={mouseRef} />
      </Suspense>
    </Canvas>
  );
}
