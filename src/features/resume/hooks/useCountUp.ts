"use client";

import { useEffect, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function useCountUp(target: number, enabled: boolean, durationMs = 1650) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }
    if (target <= 0) return;
    let start: number | null = null;
    let frame = 0;
    const step = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(target * easeOutCubic(p)));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled, durationMs]);

  return value;
}
