"use client";

import type { EnterpriseClient } from "@/core/domain/entities/enterprise-client";
import type { PartnerShowcaseItem } from "@/core/domain/entities/partner-showcase";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useEffect, useRef } from "react";
import { FaAws } from "react-icons/fa6";
import { MdAccountBalance, MdTrendingUp } from "react-icons/md";
import { SiAuth0, SiOkta } from "react-icons/si";
import { EnterpriseLogoMarquee } from "./EnterpriseLogoMarquee";
import { ScrollReveal } from "./ScrollReveal";
import { healthcarePulseTargetRef } from "./scene-healthcare-pulse";

type Props = {
  partners: PartnerShowcaseItem[];
  enterpriseClients: EnterpriseClient[];
};

const techIcons = {
  auth0: SiAuth0,
  okta: SiOkta,
  aws: FaAws,
} as const;

const TEXT_SHADOW_READABLE =
  "0 2px 14px rgba(0,0,0,0.88), 0 0 18px rgba(0,0,0,0.55), 0 0 1px rgba(0,0,0,0.95)";

function SectorGlyph({ label }: { label: string }) {
  const Icon = label === "Fintech" ? MdTrendingUp : MdAccountBalance;
  return <Icon className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden />;
}

export function ClientShowcase({ partners, enterpriseClients }: Props) {
  const healthcareCardRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = healthcareCardRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        healthcarePulseTargetRef.current =
          entry.isIntersecting && entry.intersectionRatio > 0.1 ? 1 : 0;
      },
      { root: null, rootMargin: "0px", threshold: [0, 0.08, 0.15, 0.35, 0.6] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative z-50 isolate min-w-0 max-w-full overflow-x-hidden px-6 pb-28 sm:px-10 lg:px-16"
      aria-labelledby="client-showcase-heading"
    >
      <ScrollReveal className="relative z-50 min-w-0 max-w-full">
        <div className="relative z-50 mx-auto w-full min-w-0 max-w-6xl">
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
            Platforms, cloud, regulated sectors, and high-profile collaborations across industries
            — identity programs and full-stack systems at enterprise scale.
          </p>

          <motion.ul
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
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
            {partners.map((p) => {
              const isHealthcare = p.id === "healthcare-life-sciences";

              return (
                <motion.li
                  key={p.id}
                  ref={isHealthcare ? healthcareCardRef : undefined}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className={
                      isHealthcare
                        ? "group flex h-full min-h-[120px] flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-400/20 bg-white/[0.06] px-4 py-6 text-center shadow-glass backdrop-blur-md transition duration-300 hover:border-emerald-400/45 hover:shadow-[0_0_28px_rgba(16,185,129,0.12)]"
                        : "group flex h-full min-h-[120px] flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.16] bg-white/[0.06] px-4 py-6 text-center shadow-glass backdrop-blur-md transition duration-300 hover:border-electric/40 hover:shadow-glow-sm"
                    }
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
                    ) : isHealthcare ? (
                      <Activity
                        className="h-9 w-9 text-slate-500 opacity-60 grayscale transition duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 group-hover:text-teal-300 group-hover:drop-shadow-[0_0_16px_rgba(45,212,191,0.45)] sm:h-10 sm:w-10"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    ) : (
                      <div className="text-slate-500 grayscale transition duration-300 group-hover:grayscale-0 group-hover:text-electric">
                        <SectorGlyph label={p.label} />
                      </div>
                    )}
                    <span
                      className={
                        isHealthcare
                          ? "text-sm font-medium text-slate-200 transition duration-300 group-hover:text-white"
                          : "text-sm font-medium text-slate-400 transition duration-300 group-hover:text-slate-100"
                      }
                      style={{ textShadow: TEXT_SHADOW_READABLE }}
                    >
                      {p.label}
                    </span>
                    {p.impactText ? (
                      <p
                        className="mt-1 max-w-[22rem] text-balance text-center text-[11px] leading-relaxed text-slate-300/95 sm:text-xs"
                        style={{ textShadow: TEXT_SHADOW_READABLE }}
                      >
                        {p.impactText}
                      </p>
                    ) : null}
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-600 group-hover:text-slate-500">
                      {p.kind === "technology" ? "Platform" : "Sector"}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>

          <EnterpriseLogoMarquee clients={enterpriseClients} />
        </div>
      </ScrollReveal>
    </section>
  );
}
