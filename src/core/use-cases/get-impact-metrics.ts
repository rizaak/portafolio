import type { ImpactMetric } from "../domain/entities/impact-metric";
import type { ImpactMetricsRepository } from "../domain/repositories/impact-metrics-repository";

export async function getImpactMetrics(
  metricsRepository: ImpactMetricsRepository
): Promise<ImpactMetric[]> {
  return metricsRepository.listOrdered();
}
