"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { HeroVisual } from "./HeroVisual";

const HEADLINE_SEGMENTS = [
  "FullStack Software Engineer",
  "Java",
  "React",
  "Node",
  "IAM",
] as const;

/** Delay lets the Three.js canvas settle before copy “emerges”. */
const EMERGE_DELAY_S = 0.42;

const heroBlock = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: EMERGE_DELAY_S,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:px-10 sm:pb-24 sm:pt-28 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] lg:items-center lg:gap-14">
        <div className="relative order-2 isolate min-w-0 lg:order-1">
          {/* Oscurece el centro detrás del copy para separarlo de la red Three.js */}
          <div
            className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 sm:-inset-x-10 sm:-inset-y-12"
            aria-hidden
          >
            <div
              className="h-full w-full rounded-[2rem] bg-[radial-gradient(ellipse_85%_75%_at_50%_42%,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.45)_38%,rgba(0,0,0,0.12)_62%,transparent_82%)]"
              style={{ filter: "blur(0.5px)" }}
            />
          </div>

          <motion.div
            className="relative z-10 font-sans drop-shadow-[0_4px_32px_rgba(0,0,0,0.85)]"
            variants={heroBlock}
            initial="hidden"
            animate="show"
          >
          <motion.p
            variants={heroItem}
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-electric/90 sm:text-xs"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
          >
            Why hire me
          </motion.p>

          <motion.h1
            variants={heroItem}
            className="text-balance text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{
              textShadow:
                "0 2px 8px rgba(0,0,0,0.95), 0 4px 28px rgba(0,0,0,0.85), 0 0 80px rgba(0,0,0,0.55)",
            }}
          >
            Ruben Isaac Lopez Peña
          </motion.h1>

          <motion.h2
            variants={heroItem}
            className="mt-4 flex max-w-4xl flex-wrap items-baseline gap-x-2 gap-y-2 font-semibold text-base leading-snug tracking-[0.06em] sm:text-lg sm:tracking-[0.07em] lg:text-2xl lg:tracking-[0.08em]"
            style={{
              filter: "drop-shadow(0 3px 14px rgba(0,0,0,0.9))",
            }}
          >
            {HEADLINE_SEGMENTS.map((segment, i) => (
              <Fragment key={segment}>
                {i > 0 && (
                  <span className="text-slate-400/90 select-none" aria-hidden>
                    |
                  </span>
                )}
                <span className="bg-gradient-to-r from-[#ffffff] via-[#c8f4fc] to-[#00e5ff] bg-clip-text text-transparent">
                  {segment}
                </span>
              </Fragment>
            ))}
          </motion.h2>

          <motion.p
            variants={heroItem}
            className="mt-7 max-w-2xl text-base leading-relaxed tracking-wide text-slate-100 sm:text-lg"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.88), 0 1px 3px rgba(0,0,0,0.9)" }}
          >
            Building secure, event-driven systems that scale to millions.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-wrap gap-2 sm:gap-3"
          >
            <span className="glass-panel inline-flex items-center gap-2 px-4 py-2 text-sm tracking-wide text-slate-200">
              <span className="h-2 w-2 shrink-0 rounded-full bg-electric shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              High-scale systems
            </span>
            <span className="glass-panel inline-flex items-center gap-2 px-4 py-2 text-sm tracking-wide text-slate-200">
              <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-400/90" />
              Security &amp; IAM
            </span>
            <span className="glass-panel inline-flex items-center gap-2 px-4 py-2 text-sm tracking-wide text-slate-200">
              <span className="h-2 w-2 shrink-0 rounded-full bg-slate-400" />
              Full SDLC ownership
            </span>
          </motion.div>
          </motion.div>
        </div>

        <div className="relative z-30 order-1 flex justify-center lg:order-2 lg:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
