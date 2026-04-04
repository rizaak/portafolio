import type { ImpactMetric } from "@/core/domain/entities/impact-metric";
import type { ImpactMetricsRepository } from "@/core/domain/repositories/impact-metrics-repository";
import raw from "../data/impact-metrics.json";

const data = raw as ImpactMetric[];

export class JsonImpactMetricsRepository implements ImpactMetricsRepository {
  async listOrdered(): Promise<ImpactMetric[]> {
    return [...data].sort((a, b) => a.sortOrder - b.sortOrder);
  }
}
