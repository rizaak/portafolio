import type { Experience } from "@/core/domain/entities/experience";
import type { ExperienceRepository } from "@/core/domain/repositories/experience-repository";
import raw from "../data/experience.json";

const data = raw as Experience[];

export class JsonExperienceRepository implements ExperienceRepository {
  async listOrdered(): Promise<Experience[]> {
    return [...data].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getById(id: string): Promise<Experience | null> {
    return data.find((e) => e.id === id) ?? null;
  }
}
