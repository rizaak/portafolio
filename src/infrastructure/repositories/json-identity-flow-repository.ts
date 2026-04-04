import type { IdentityFlow } from "@/core/domain/entities/identity-flow";
import type { IdentityFlowRepository } from "@/core/domain/repositories/identity-flow-repository";
import raw from "../data/identity-flows.json";

const data = raw as IdentityFlow[];

export class JsonIdentityFlowRepository implements IdentityFlowRepository {
  async listOrdered(): Promise<IdentityFlow[]> {
    return [...data].sort((a, b) => a.sortOrder - b.sortOrder);
  }
}
