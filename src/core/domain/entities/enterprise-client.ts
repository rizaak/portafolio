/**
 * High-profile enterprise collaborations — grouped by industry for UI tooltips.
 */
export type EnterpriseIndustry =
  | "tech_global"
  | "cyber_cloud"
  | "fintech_finance"
  | "retail_enterprise"
  | "healthcare_life"
  | "education";

export interface EnterpriseClient {
  id: string;
  name: string;
  industry: EnterpriseIndustry;
  /** Spotlight in the featured glass row (e.g. Airbnb, HEB). */
  featured?: boolean;
  sortOrder: number;
}

export const ENTERPRISE_INDUSTRY_LABEL: Record<EnterpriseIndustry, string> = {
  tech_global: "Tech & Global",
  cyber_cloud: "Cybersecurity & Cloud",
  fintech_finance: "Fintech & Finance",
  retail_enterprise: "Retail & Enterprise",
  healthcare_life: "Healthcare & Life Sciences",
  education: "Education",
};
