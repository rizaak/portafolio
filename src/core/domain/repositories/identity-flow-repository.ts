import type { IdentityFlow } from "../entities/identity-flow";

export interface IdentityFlowRepository {
  listOrdered(): Promise<IdentityFlow[]>;
}
