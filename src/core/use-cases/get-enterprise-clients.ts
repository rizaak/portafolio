import type { EnterpriseClient } from "../domain/entities/enterprise-client";
import type { EnterpriseClientRepository } from "../domain/repositories/enterprise-client-repository";

export async function getEnterpriseClients(
  repository: EnterpriseClientRepository
): Promise<EnterpriseClient[]> {
  return repository.listOrdered();
}
