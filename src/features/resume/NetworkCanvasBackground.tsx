"use client";

import dynamic from "next/dynamic";

const NetworkCanvasClient = dynamic(() => import("./NetworkCanvasClient"), {
  ssr: false,
  loading: () => null,
});

/**
 * Deep space starfield + constellations + comets. z-0, pointer-events none.
 */
export function NetworkCanvasBackground() {
  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-0 h-full w-full max-w-full overflow-hidden"
      aria-hidden
      style={{ contain: "layout style paint" }}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0c1a2e_0%,_#06080f_42%,_#000000_100%)]"
        style={{ willChange: "opacity" }}
      />
      <div
        className="absolute inset-0 max-w-full overflow-hidden"
        style={{ willChange: "transform" }}
      >
        <NetworkCanvasClient />
      </div>
    </div>
  );
}
