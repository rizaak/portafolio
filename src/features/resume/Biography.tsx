"use client";

import { ScrollReveal } from "./ScrollReveal";

function Kw({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-semibold text-electric [text-shadow:0_0_24px_rgba(34,211,238,0.25)]">
      {children}
    </span>
  );
}

export function Biography() {
  return (
    <section
      className="relative px-6 pb-12 pt-4 sm:px-10 sm:pb-16 lg:px-16"
      aria-labelledby="biography-heading"
    >
      <ScrollReveal>
        <div className="glass-panel relative mx-auto max-w-3xl overflow-hidden px-8 py-10 sm:px-12 sm:py-12">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-electric/10 blur-3xl"
          aria-hidden
        />
        <h2
          id="biography-heading"
          className="relative text-xs font-medium uppercase tracking-[0.2em] text-slate-500"
        >
          Biography
        </h2>
        <div
          className="relative mt-8 space-y-8 text-[17px] leading-[1.75] text-slate-100/95 sm:text-lg"
          style={{ textShadow: "0 2px 18px rgba(0,0,0,0.75)" }}
        >
          <p>
            I am a Principal Fullstack Engineer with{" "}
            <Kw>Technical Lead</Kw> capabilities—over{" "}
            <span className="text-slate-200">10+ years</span> designing and
            delivering secure, high-scale systems end to end. I move comfortably
            across the stack, balancing JVM and service-oriented work in{" "}
            <span className="text-slate-200">Java</span> and{" "}
            <span className="text-slate-200">Node.js</span> with product-grade
            interfaces in <span className="text-slate-200">React</span> and{" "}
            <span className="text-slate-200">TypeScript</span>, keeping
            architecture, performance, and operability aligned.
          </p>
          <p>
            In identity and access management, I have shipped{" "}
            <Kw>OIDC</Kw>-backed integrations and large-scale migrations—systems
            trusted at <Kw>40M+ Users</Kw> scale—while favoring{" "}
            <Kw>Clean Architecture</Kw>, explicit domain boundaries, and
            implementations that can evolve when requirements or scale shift.
          </p>
          <p>
            Leadership, for me, is hands-on: mentoring engineers, raising the
            bar on code review and design, and streamlining delivery by pairing
            strong engineering discipline with AI-assisted workflows (Cursor,
            Claude) so teams ship faster without cutting corners on quality or
            security.
          </p>
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
