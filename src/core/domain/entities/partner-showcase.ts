export type PartnerShowcaseKind = "technology" | "sector";

/**
 * Enterprise partners, platforms, and sectors — hydrated via repository (JSON now, API later).
 */
export interface PartnerShowcaseItem {
  id: string;
  label: string;
  kind: PartnerShowcaseKind;
  /** Maps to branded icon in UI when kind is technology. */
  iconKey?: "auth0" | "okta" | "aws";
  /** Sector impact line (HIPAA, regulated delivery, etc.). */
  impactText?: string;
  sortOrder: number;
}
