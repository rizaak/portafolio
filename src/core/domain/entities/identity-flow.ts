/**
 * Represents an IAM/OIDC integration pattern — ready for Phase 2 API hydration.
 */
export interface IdentityFlow {
  id: string;
  name: string;
  protocol: "OIDC" | "SAML" | "OAuth2" | "SCIM";
  description: string;
  sortOrder: number;
}
