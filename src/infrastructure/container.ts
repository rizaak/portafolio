/**
 * Composition root — swap JSON implementations for HTTP/Redis/Postgres adapters in Phase 2.
 */
import type { ExperienceRepository } from "@/core/domain/repositories/experience-repository";
import type { IdentityFlowRepository } from "@/core/domain/repositories/identity-flow-repository";
import type { ImpactMetricsRepository } from "@/core/domain/repositories/impact-metrics-repository";
import type { PartnerShowcaseRepository } from "@/core/domain/repositories/partner-showcase-repository";
import type { ProjectRepository } from "@/core/domain/repositories/project-repository";
import { JsonExperienceRepository } from "./repositories/json-experience-repository";
import { JsonIdentityFlowRepository } from "./repositories/json-identity-flow-repository";
import { JsonImpactMetricsRepository } from "./repositories/json-impact-metrics-repository";
import { JsonPartnerShowcaseRepository } from "./repositories/json-partner-showcase-repository";
import { JsonProjectRepository } from "./repositories/json-project-repository";

export interface PortfolioContainer {
  experienceRepository: ExperienceRepository;
  impactMetricsRepository: ImpactMetricsRepository;
  identityFlowRepository: IdentityFlowRepository;
  projectRepository: ProjectRepository;
  partnerShowcaseRepository: PartnerShowcaseRepository;
}

export function createJsonBackedContainer(): PortfolioContainer {
  return {
    experienceRepository: new JsonExperienceRepository(),
    impactMetricsRepository: new JsonImpactMetricsRepository(),
    identityFlowRepository: new JsonIdentityFlowRepository(),
    projectRepository: new JsonProjectRepository(),
    partnerShowcaseRepository: new JsonPartnerShowcaseRepository(),
  };
}
