"use client";

import { useInView } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { useCountUp } from "./hooks/useCountUp";

const COUNT_IDS = new Set(["users-migration", "api-perf"]);

type Props = {
  id: string;
  headline: string;
  className?: string;
  style?: CSSProperties;
};

export function MetricHeadline({ id, headline, className, style }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldCount = COUNT_IDS.has(id);

  const mMatch = headline.match(/^(\d+)M\+(.*)$/);
  const pctMatch = headline.match(/^(\d+)%(.*)$/);
  const target = mMatch ? parseInt(mMatch[1], 10) : pctMatch ? parseInt(pctMatch[1], 10) : 0;
  const enabled = shouldCount && Boolean(mMatch || pctMatch) && inView;

  const count = useCountUp(target, enabled);

  if (!shouldCount) {
    return (
      <p ref={ref} className={className} style={style}>
        {headline}
      </p>
    );
  }

  if (!inView) {
    return (
      <p ref={ref} className={className} style={style}>
        {headline}
      </p>
    );
  }

  if (mMatch) {
    return (
      <p ref={ref} className={className} style={style}>
        {count}M+{mMatch[2]}
      </p>
    );
  }

  if (pctMatch) {
    return (
      <p ref={ref} className={className} style={style}>
        {count}%{pctMatch[2]}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} style={style}>
      {headline}
    </p>
  );
}
