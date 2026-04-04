import type { PartnerShowcaseItem } from "../entities/partner-showcase";

export interface PartnerShowcaseRepository {
  listOrdered(): Promise<PartnerShowcaseItem[]>;
}
