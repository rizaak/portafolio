"use client";

import {
  ENTERPRISE_INDUSTRY_LABEL,
  type EnterpriseClient,
} from "@/core/domain/entities/enterprise-client";
import { motion } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  getEnterpriseLogoAsset,
  isRemoteLogoSrc,
  PREMIUM_MONOCHROME_FILTER,
} from "./enterprise-logo-assets";
import { SIMPLE_ICON_BY_CLIENT_ID } from "./enterprise-logo-registry";
import { TextLogo } from "./TextLogo";

const LOGO_HOVER_SHADOW =
  "transition-[opacity,box-shadow,filter] duration-300 ease-out group-hover:opacity-100 group-hover:drop-shadow-[0_0_14px_rgba(34,211,238,0.35)]";

const FALLBACK_NAME_CLASS =
  "text-center font-mono text-[11px] font-bold uppercase leading-snug tracking-widest text-white opacity-50 transition-[opacity,filter] duration-300 ease-out group-hover:opacity-100 sm:text-xs";

function LogoImageWithFallback({
  src,
  alt,
  companyName,
  onFailed,
}: {
  src: string;
  alt: string;
  companyName: string;
  onFailed?: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const remote = isRemoteLogoSrc(src);

  if (failed) {
    return (
      <div className="flex min-h-[52px] w-full max-w-[180px] items-center justify-center px-1">
        <span className={`max-w-[160px] ${FALLBACK_NAME_CLASS}`}>
          {companyName}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-[52px] w-full max-w-[180px] items-center justify-center opacity-50 ${LOGO_HOVER_SHADOW}`}
    >
      <div style={{ filter: PREMIUM_MONOCHROME_FILTER }}>
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
          className="h-11 w-auto max-w-[160px] object-contain"
          unoptimized={remote}
          placeholder="empty"
          onError={() => {
            console.log(
              `Image failed to load for ${companyName}. Check /public/enterprise-logos/ or remote URL.`
            );
            setFailed(true);
            onFailed?.();
          }}
        />
      </div>
    </div>
  );
}

type Props = {
  clients: EnterpriseClient[];
};

const MASK =
  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";

function EnterpriseLogoItem({ client }: { client: EnterpriseClient }) {
  const sectorLabel = ENTERPRISE_INDUSTRY_LABEL[client.industry];
  const tip = `Sector: ${sectorLabel}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  const resolved = getEnterpriseLogoAsset(client.id, client.name);
  const isText = resolved.kind === "text";
  const airbnbIcon =
    resolved.kind === "simple-icon" ? SIMPLE_ICON_BY_CLIENT_ID.airbnb : null;
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [client.id]);

  const updateTipPosition = () => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTipPos({ x: r.left + r.width / 2, y: r.top });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updateTipPosition();
    const onScroll = () => updateTipPosition();
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, [open]);

  const tooltip =
    open &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        role="tooltip"
        className="pointer-events-none fixed z-[9999] max-w-[min(90vw,280px)] -translate-x-1/2 -translate-y-full rounded-md border border-white/[0.14] bg-black/85 px-2.5 py-1.5 text-center text-[10px] font-medium leading-snug text-slate-100 shadow-lg backdrop-blur-md"
        style={{ left: tipPos.x, top: tipPos.y - 6 }}
      >
        {tip}
      </div>,
      document.body
    );

  const rasterOrSvg = !isText && (
    <>
      {resolved.kind === "image" ? (
        <LogoImageWithFallback
          src={resolved.src}
          alt={resolved.alt}
          companyName={client.name}
          onFailed={() => setImageFailed(true)}
        />
      ) : airbnbIcon ? (
        <svg
          role="img"
          viewBox="0 0 24 24"
          className="h-11 w-auto max-w-[120px] text-white"
          aria-hidden
        >
          <path fill="currentColor" d={airbnbIcon.path} />
        </svg>
      ) : null}
    </>
  );

  return (
    <>
      <div
        ref={wrapRef}
        className="flex w-[190px] shrink-0 flex-col items-center gap-2.5 px-2 sm:w-[210px]"
        aria-label={`${client.name}. ${tip}`}
        onMouseEnter={() => {
          setOpen(true);
          queueMicrotask(updateTipPosition);
        }}
        onMouseLeave={() => setOpen(false)}
      >
        <motion.div
          initial={false}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="group flex w-full cursor-default flex-col items-center gap-2"
          title={tip}
        >
          {isText ? (
            <div
              className={`flex min-h-[52px] w-full max-w-[200px] items-center justify-center px-1 opacity-50 ${LOGO_HOVER_SHADOW}`}
            >
              <TextLogo name={resolved.label} />
            </div>
          ) : (
            <>
              {resolved.kind === "image" ? (
                rasterOrSvg
              ) : (
                <div
                  className={`flex min-h-[52px] w-full max-w-[180px] items-center justify-center opacity-50 ${LOGO_HOVER_SHADOW}`}
                  style={{ filter: PREMIUM_MONOCHROME_FILTER }}
                >
                  {rasterOrSvg}
                </div>
              )}
              {resolved.kind !== "image" || !imageFailed ? (
                <p
                  className="w-full text-center font-sans text-[10px] font-medium leading-snug tracking-wide text-slate-200 sm:text-[11px]"
                  style={{
                    textShadow:
                      "0 1px 10px rgba(0,0,0,0.9), 0 0 18px rgba(0,0,0,0.5)",
                  }}
                >
                  {client.name}
                </p>
              ) : null}
            </>
          )}
        </motion.div>
      </div>
      {tooltip}
    </>
  );
}

export function EnterpriseLogoMarquee({ clients }: Props) {
  const loop = useMemo(() => {
    if (clients.length === 0) return [];
    return [...clients, ...clients];
  }, [clients]);

  if (loop.length === 0) return null;

  return (
    <div className="relative z-50 mt-14 min-w-0 max-w-full overflow-x-hidden">
      <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
        Enterprise collaborations
      </h3>
      <div
        className="relative z-50 mt-6 max-w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-transparent py-8 shadow-none"
        aria-label="Scrolling enterprise partner logos"
        style={{
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      >
        <div className="pointer-events-auto flex w-max animate-marquee-enterprise-slow items-start gap-x-4 pr-4 sm:gap-x-8 sm:pr-8">
          {loop.map((c, i) => (
            <div
              key={`${c.id}-${i}`}
              className="flex shrink-0 items-start gap-x-4 sm:gap-x-8"
            >
              <EnterpriseLogoItem client={c} />
              <span className="mt-7 text-slate-700/70" aria-hidden>
                ·
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
