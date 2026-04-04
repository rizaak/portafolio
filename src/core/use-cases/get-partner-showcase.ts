import type { PartnerShowcaseItem } from "../domain/entities/partner-showcase";
import type { PartnerShowcaseRepository } from "../domain/repositories/partner-showcase-repository";

export async function getPartnerShowcase(
  repository: PartnerShowcaseRepository
): Promise<PartnerShowcaseItem[]> {
  return repository.listOrdered();
}
