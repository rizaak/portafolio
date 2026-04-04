import type { IdentityFlow } from "../domain/entities/identity-flow";
import type { IdentityFlowRepository } from "../domain/repositories/identity-flow-repository";

export async function getIdentityFlows(
  repository: IdentityFlowRepository
): Promise<IdentityFlow[]> {
  return repository.listOrdered();
}
