"use client";

import type { ImpactMetric } from "@/core/domain/entities/impact-metric";
import { motion } from "framer-motion";
import { MetricHeadline } from "./MetricHeadline";

type Props = {
  metrics: ImpactMetric[];
};

export function ImpactMetricsGrid({ metrics }: Props) {
  return (
    <section className="relative px-6 pb-20 sm:px-10 lg:px-16" aria-label="Impact metrics">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-slate-400"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}
        >
          Impact at a glance
        </motion.h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.li
              key={m.id}
              className="glass-panel group relative overflow-hidden p-6 shadow-glow-sm transition hover:border-electric/25"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-electric/10 blur-2xl transition group-hover:bg-electric/20" />
              <MetricHeadline
                id={m.id}
                headline={m.headline}
                className={`relative text-2xl tracking-tight text-white sm:text-[1.65rem] ${
                  m.id === "users-migration" || m.id === "iam-clients"
                    ? "font-bold"
                    : "font-semibold"
                }`}
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.75)" }}
              />
              <p
                className="relative mt-3 text-sm leading-relaxed text-slate-300"
                style={{ textShadow: "0 1px 16px rgba(0,0,0,0.65)" }}
              >
                {m.subline}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
