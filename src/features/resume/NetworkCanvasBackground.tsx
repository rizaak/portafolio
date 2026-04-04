"use client";

import dynamic from "next/dynamic";

const NetworkCanvasClient = dynamic(() => import("./NetworkCanvasClient"), {
  ssr: false,
  loading: () => null,
});

/**
 * Full-viewport Three.js “data neural network” — scroll + mouse reactive.
 * Renders client-only; radial gradient sits behind transparent WebGL.
 */
export function NetworkCanvasBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
      style={{ contain: "layout style paint" }}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0c1a2e_0%,_#06080f_42%,_#000000_100%)]"
        style={{ willChange: "opacity" }}
      />
      <div className="absolute inset-0" style={{ willChange: "transform" }}>
        <NetworkCanvasClient />
      </div>
    </div>
  );
}
