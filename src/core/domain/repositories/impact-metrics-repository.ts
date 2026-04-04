import type { ImpactMetric } from "../entities/impact-metric";

export interface ImpactMetricsRepository {
  listOrdered(): Promise<ImpactMetric[]>;
}
