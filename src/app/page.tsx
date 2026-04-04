import { getCareerHistory } from "@/core/use-cases/get-career-history";
import { getIdentityFlows } from "@/core/use-cases/get-identity-flows";
import { getImpactMetrics } from "@/core/use-cases/get-impact-metrics";
import { getPartnerShowcase } from "@/core/use-cases/get-partner-showcase";
import {
  Biography,
  ClientShowcase,
  HeroSection,
  IdentityCapabilities,
  ImpactMetricsGrid,
  ProfessionalExperience,
} from "@/features/resume";
import { createJsonBackedContainer } from "@/infrastructure/container";

export default async function HomePage() {
  const container = createJsonBackedContainer();
  const [experiences, metrics, flows, partners] = await Promise.all([
    getCareerHistory(container.experienceRepository),
    getImpactMetrics(container.impactMetricsRepository),
    getIdentityFlows(container.identityFlowRepository),
    getPartnerShowcase(container.partnerShowcaseRepository),
  ]);

  return (
    <main className="relative isolate z-[1]">
      <HeroSection />
      <Biography />
      <ImpactMetricsGrid metrics={metrics} />
      <ProfessionalExperience experiences={experiences} />
      <ClientShowcase partners={partners} />
      <IdentityCapabilities flows={flows} />
      <footer className="border-t border-white/[0.06] px-6 py-10 text-center text-sm text-slate-500 sm:px-10">
        <p>
          Ruben Isaac Lopez Peña — FullStack Software Engineer | Java | React | Node | IAM
        </p>
      </footer>
    </main>
  );
}
