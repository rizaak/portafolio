/**
 * Enterprise logos: local files under /public/enterprise-logos/, one remote SVG (Dataminar),
 * Airbnb via Simple Icons, Phoenix as text only, no-src → company name as text (e.g. TDECU).
 */

export type EnterpriseResolvedLogo =
  | { kind: "image"; src: string; alt: string }
  | { kind: "simple-icon"; clientId: "airbnb" }
  | { kind: "text"; label: string; na: boolean };

/** Paths are absolute from site root (/public). Remote URLs allowed where noted. */
const LOGO_BY_CLIENT_ID: Record<string, { src: string; alt: string }> = {
  heb: { src: "/enterprise-logos/heb.png", alt: "HEB" },
  proofpoint: { src: "/enterprise-logos/pf.png", alt: "Proofpoint" },
  retailmenot: { src: "/enterprise-logos/rmn.png", alt: "RetailMeNot" },
  dataminer: {
    src: "https://cdn.brandfetch.io/idvdEBhJby/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    alt: "Dataminar",
  },
  ommacash: { src: "/enterprise-logos/oc.png", alt: "Ommacash" },
  uplift: { src: "/enterprise-logos/up.png", alt: "Uplift" },
  acima: { src: "/enterprise-logos/acima.png", alt: "Acima" },
  idue: { src: "/enterprise-logos/idue.png", alt: "IDue" },
  echo: { src: "/enterprise-logos/echo.png", alt: "ECHO" },
  "mmbb-financial": { src: "/enterprise-logos/mmbb.png", alt: "MMBB Financial" },
  "reverse-mortgage-funding": {
    src: "/enterprise-logos/rmf.png",
    alt: "Reverse Mortgage Funding",
  },
  amerilife: { src: "/enterprise-logos/ame.png", alt: "Amerilife" },
  "bend-health": { src: "/enterprise-logos/bh.png", alt: "Bend Health" },
  "illinois-iit": { src: "/enterprise-logos/iit.png", alt: "Illinois IIT" },
  yunius: { src: "/enterprise-logos/yn.png", alt: "Yunius" },
};

export function getEnterpriseLogoAsset(
  clientId: string,
  fallbackName: string
): EnterpriseResolvedLogo {
  if (clientId === "airbnb") {
    return { kind: "simple-icon", clientId: "airbnb" };
  }
  if (clientId === "phoenix") {
    return { kind: "text", label: "PHOENIX", na: true };
  }
  const logo = LOGO_BY_CLIENT_ID[clientId];
  if (logo) {
    return { kind: "image", src: logo.src, alt: logo.alt };
  }
  return { kind: "text", label: fallbackName, na: false };
}

export function isRemoteLogoSrc(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

export const PREMIUM_MONOCHROME_FILTER =
  "grayscale(100%) brightness(0) invert(1)" as const;
