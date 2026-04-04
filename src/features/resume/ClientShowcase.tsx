"use client";

import type { PartnerShowcaseItem } from "@/core/domain/entities/partner-showcase";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { FaAws } from "react-icons/fa6";
import { MdAccountBalance, MdTrendingUp } from "react-icons/md";
import { SiAuth0, SiOkta } from "react-icons/si";

type Props = {
  partners: PartnerShowcaseItem[];
};

const techIcons = {
  auth0: SiAuth0,
  okta: SiOkta,
  /** AWS mark via Font Awesome (Simple Icons omits a stable Si export in this react-icons build). */
  aws: FaAws,
} as const;

function SectorGlyph({ label }: { label: string }) {
  const Icon = label === "Fintech" ? MdTrendingUp : MdAccountBalance;
  return <Icon className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden />;
}

export function ClientShowcase({ partners }: Props) {
  const ticker = [...partners, ...partners];

  return (
    <section
      className="relative z-20 isolate px-6 pb-28 sm:px-10 lg:px-16"
      aria-labelledby="client-showcase-heading"
    >
      <ScrollReveal className="relative z-10">
        <div className="relative z-10 mx-auto max-w-6xl">
          <h2
            id="client-showcase-heading"
            className="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
          >
            Trusted by Enterprise Partners
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-center text-slate-300"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.75)" }}
          >
            Platforms, cloud, and regulated sectors where I have delivered identity programs and
            full-stack systems at enterprise scale.
          </p>

        <motion.ul
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.06 },
            },
          }}
        >
          {partners.map((p) => (
            <motion.li
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="group flex h-full min-h-[120px] flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.16] bg-white/[0.06] px-4 py-6 text-center shadow-glass backdrop-blur-md transition duration-300 hover:border-electric/40 hover:shadow-glow-sm"
              >
                {p.kind === "technology" && p.iconKey ? (
                  (() => {
                    const Icon = techIcons[p.iconKey];
                    return (
                      <Icon
                        className="h-9 w-9 grayscale opacity-60 transition duration-300 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-electric group-hover:drop-shadow-[0_0_14px_rgba(34,211,238,0.45)] sm:h-10 sm:w-10"
                        aria-hidden
                      />
                    );
                  })()
                ) : (
                  <div className="text-slate-500 grayscale transition duration-300 group-hover:grayscale-0 group-hover:text-electric">
                    <SectorGlyph label={p.label} />
                  </div>
                )}
                <span className="text-sm font-medium text-slate-400 transition duration-300 group-hover:text-slate-100">
                  {p.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600 group-hover:text-slate-500">
                  {p.kind === "technology" ? "Platform" : "Sector"}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <div className="relative z-10 mt-16 overflow-hidden rounded-2xl border border-white/[0.12] bg-black/20 py-5 shadow-glass backdrop-blur-md">
          <div className="flex w-max animate-marquee items-center gap-16 pr-16">
            {ticker.map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="flex shrink-0 items-center gap-3 grayscale opacity-50 transition hover:grayscale-0 hover:opacity-100"
              >
                {p.kind === "technology" && p.iconKey ? (
                  (() => {
                    const Icon = techIcons[p.iconKey];
                    return (
                      <Icon
                        className="h-6 w-6 text-slate-500 transition hover:text-electric"
                        aria-hidden
                      />
                    );
                  })()
                ) : (
                  <span className="text-slate-500">
                    <SectorGlyph label={p.label} />
                  </span>
                )}
                <span className="whitespace-nowrap font-mono text-xs uppercase tracking-wider text-slate-500">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
