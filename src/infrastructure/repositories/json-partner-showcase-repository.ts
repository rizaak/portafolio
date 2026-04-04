import type { PartnerShowcaseItem } from "@/core/domain/entities/partner-showcase";
import type { PartnerShowcaseRepository } from "@/core/domain/repositories/partner-showcase-repository";
import raw from "../data/partner-showcase.json";

const data = raw as PartnerShowcaseItem[];

export class JsonPartnerShowcaseRepository implements PartnerShowcaseRepository {
  async listOrdered(): Promise<PartnerShowcaseItem[]> {
    return [...data].sort((a, b) => a.sortOrder - b.sortOrder);
  }
}
