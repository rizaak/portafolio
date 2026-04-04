"use client";

import type { IdentityFlow } from "@/core/domain/entities/identity-flow";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

type Props = {
  flows: IdentityFlow[];
};

const protocolStyles: Record<IdentityFlow["protocol"], string> = {
  OIDC: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
  SAML: "border-violet-500/30 bg-violet-500/10 text-violet-200",
  OAuth2: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  SCIM: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
};

export function IdentityCapabilities({ flows }: Props) {
  return (
    <section className="relative px-6 pb-28 sm:px-10 lg:px-16" aria-label="IAM capabilities">
      <ScrollReveal>
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-slate-400"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.75)" }}
          >
            IAM &amp; federation depth
          </h2>
          <p
            className="mx-auto mb-12 max-w-2xl text-center text-slate-300"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.75)" }}
          >
            Representative patterns from enterprise identity work — data-backed domain model, ready to plug into a real backend.
          </p>
          <ul className="grid gap-4 md:grid-cols-3">
            {flows.map((f, i) => (
              <motion.li
                key={f.id}
                className="glass-panel flex flex-col p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07 }}
              >
                <span
                  className={`inline w-fit rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${protocolStyles[f.protocol]}`}
                >
                  {f.protocol}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{f.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">
                  {f.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
