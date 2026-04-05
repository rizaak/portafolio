import type { EnterpriseClient } from "@/core/domain/entities/enterprise-client";
import type { EnterpriseClientRepository } from "@/core/domain/repositories/enterprise-client-repository";
import raw from "../data/enterprise-clients.json";

const data = raw as EnterpriseClient[];

export class JsonEnterpriseClientRepository implements EnterpriseClientRepository {
  async listOrdered(): Promise<EnterpriseClient[]> {
    return [...data].sort((a, b) => a.sortOrder - b.sortOrder);
  }
}
