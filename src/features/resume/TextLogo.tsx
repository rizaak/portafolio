"use client";

type Props = {
  name: string;
  className?: string;
};

/**
 * Text-only enterprise label: mono (Geist-like via JetBrains), bold, widest tracking, uppercase.
 */
export function TextLogo({ name, className = "" }: Props) {
  return (
    <span
      className={`inline-block max-w-[min(100%,240px)] text-center font-mono text-[11px] font-bold uppercase leading-snug tracking-widest text-white sm:text-xs ${className}`}
      style={{
        textShadow:
          "0 0 20px rgba(34, 211, 238, 0.12), 0 2px 12px rgba(0,0,0,0.88)",
      }}
    >
      {name}
    </span>
  );
}
