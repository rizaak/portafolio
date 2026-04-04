import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050508",
        slate: {
          850: "#172033",
          950: "#0c1018",
        },
        electric: {
          DEFAULT: "#22d3ee",
          dim: "#0891b2",
          glow: "#67e8f9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgb(5 5 8)), radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.12), transparent 55%)",
        "glass-edge":
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(34,211,238,0.06) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glow-sm": "0 0 40px rgba(34, 211, 238, 0.15)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 42s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
