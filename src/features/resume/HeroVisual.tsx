"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const GLOW = "drop-shadow(0 0 18px rgba(0, 229, 255, 0.42)) drop-shadow(0 0 48px rgba(0, 229, 255, 0.18))";

/**
 * Professional headshot placeholder (transparent-style cutout) with cyan outer glow
 * and subtle mouse-follow parallax. Replace `/headshot-placeholder.svg` when ready.
 */
export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 22, mass: 0.4 };
  const x = useSpring(mx, springConfig);
  const y = useSpring(my, springConfig);

  useEffect(() => {
    if (reduceMotion) {
      mx.set(0);
      my.set(0);
      return;
    }
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / 90);
      my.set((e.clientY - cy) / 90);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduceMotion]);

  return (
    <motion.div
      className="relative z-30 mx-auto w-full max-w-[280px] will-change-transform sm:max-w-[320px] lg:max-w-[360px]"
      style={{
        x: reduceMotion ? 0 : x,
        y: reduceMotion ? 0 : y,
      }}
    >
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-cyan-400/5 blur-3xl"
        aria-hidden
      />
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem]"
        style={{ filter: GLOW }}
      >
        <Image
          src="/headshot.jpg"
          alt="Ruben Isaac Lopez Pena"
          width={360}
          height={480}
          className="h-full w-full object-cover object-top"
          draggable={false}
          priority
          sizes="(max-width: 1024px) 90vw, 360px"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10"
          aria-hidden
        />
      </div>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
        Principal Engineer
      </p>
    </motion.div>
  );
}
