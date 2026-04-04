import type { Experience } from "../entities/experience";

export interface ExperienceRepository {
  listOrdered(): Promise<Experience[]>;
  getById(id: string): Promise<Experience | null>;
}
