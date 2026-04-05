"use client";

import type { Experience } from "@/core/domain/entities/experience";
import { motion } from "framer-motion";

type Props = {
  experiences: Experience[];
};

export function ProfessionalTimeline({ experiences }: Props) {
  return (
    <section
      className="relative min-w-0 max-w-full overflow-x-hidden px-6 pb-28 sm:px-10 lg:px-16"
      aria-label="Professional experience"
    >
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <motion.h2
          className="mb-4 text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Professional timeline
        </motion.h2>
        <motion.p
          className="mx-auto mb-14 max-w-xl text-center text-slate-400"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          From IAM specialization to principal-level delivery on platforms and migrations at global scale.
        </motion.p>

        <ol className="relative space-y-10 border-l border-white/[0.08] pl-8 sm:pl-10">
          <span
            className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-electric/50 via-electric/15 to-transparent"
            aria-hidden
          />
          {experiences.map((exp, index) => (
            <motion.li
              key={exp.id}
              className="relative"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <span
                className="absolute -left-[21px] top-2 flex h-[11px] w-[11px] items-center justify-center sm:-left-[25px]"
                aria-hidden
              >
                <span className="absolute h-3 w-3 rounded-full border border-electric/60 bg-void shadow-[0_0_14px_rgba(34,211,238,0.45)]" />
              </span>
              <article className="glass-panel p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
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
                <p className="mt-4 text-slate-300">{exp.summary}</p>
                <ul className="mt-5 space-y-2">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-sm text-slate-400 before:mt-1.5 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-electric/70"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
