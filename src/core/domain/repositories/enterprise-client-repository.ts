import type { EnterpriseClient } from "../entities/enterprise-client";

export interface EnterpriseClientRepository {
  listOrdered(): Promise<EnterpriseClient[]>;
}
