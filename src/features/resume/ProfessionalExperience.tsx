"use client";

import type { Experience } from "@/core/domain/entities/experience";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import { ScrollReveal } from "./ScrollReveal";

type Props = {
  experiences: Experience[];
};

/** Highlights "Technical Lead" phrases for leadership emphasis. */
function highlightTechnicalLead(text: string) {
  const parts = text.split(/(Technical Lead)/gi);
  return parts.map((part, i) =>
    /^technical lead$/i.test(part) ? (
      <span key={`${i}-${part}`} className="font-semibold text-electric">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function ProfessionalExperience({ experiences }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      className="relative min-w-0 max-w-full overflow-x-hidden px-6 pb-24 sm:px-10 lg:px-16"
      aria-labelledby="professional-experience-heading"
    >
      <ScrollReveal>
        <div className="mx-auto w-full min-w-0 max-w-4xl">
          <h2
            id="professional-experience-heading"
            className="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.8)" }}
          >
            Professional experience
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-center text-slate-300"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.75)" }}
          >
            Detailed roles with Technical Lead delivery, key contributions, and stack depth—expand each
            position for the full picture.
          </p>

          <LayoutGroup id="experience-accordion">
          <ul className="mt-14 space-y-4">
            {experiences.map((exp, index) => {
              const isOpen = openId === exp.id;
              return (
                <motion.li
                  key={exp.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.article
                    layout
                    transition={{ layout: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } }}
                    className="glass-panel overflow-hidden rounded-2xl border border-white/[0.08]"
                  >
                    <motion.button
                      layout="position"
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : exp.id)}
                      className="flex w-full items-start gap-4 px-6 py-5 text-left transition hover:bg-white/[0.02] sm:px-8 sm:py-6"
                      aria-expanded={isOpen}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-lg font-semibold text-white">{exp.company}</span>
                          <span
                            className={`font-mono text-xs uppercase tracking-wider ${
                              exp.employmentType === "current"
                                ? "text-electric"
                                : "text-slate-500"
                            }`}
                          >
                            {exp.periodLabel}
                          </span>
                        </div>
                        <p className="mt-1 font-mono text-sm text-slate-400">{exp.role}</p>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                          {exp.summary}
                        </p>
                      </div>
                      <motion.span
                        layout="position"
                        className="mt-1 shrink-0 text-slate-500"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.28 }}
                        aria-hidden
                      >
                        <HiChevronDown className="h-5 w-5" />
                      </motion.span>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          layout
                          key={`${exp.id}-detail`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.22 },
                          }}
                          className="overflow-hidden border-t border-white/[0.06]"
                        >
                          <div className="space-y-8 px-6 pb-8 pt-2 sm:px-8">
                            <div>
                              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                                Responsibilities
                              </h3>
                              <p className="mt-3 text-[15px] leading-[1.75] text-slate-300 sm:text-base">
                                {highlightTechnicalLead(exp.responsibilities)}
                              </p>
                            </div>
                            <div>
                              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                                Key technical contributions
                              </h3>
                              <ul className="mt-4 space-y-3">
                                {exp.keyContributions.map((line) => (
                                  <li
                                    key={line}
                                    className="flex gap-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]"
                                  >
                                    <span
                                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric/80"
                                      aria-hidden
                                    />
                                    {line}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                                Tech stack
                              </h3>
                              <motion.ul
                                layout
                                className="mt-4 flex flex-wrap gap-2"
                              >
                                {exp.techStack.map((tag) => (
                                  <motion.li
                                    layout
                                    key={tag}
                                    className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-slate-300"
                                  >
                                    {tag}
                                  </motion.li>
                                ))}
                              </motion.ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                </motion.li>
              );
            })}
          </ul>
          </LayoutGroup>
        </div>
      </ScrollReveal>
    </section>
  );
}
