import type { Experience } from "../domain/entities/experience";
import type { ExperienceRepository } from "../domain/repositories/experience-repository";

export async function getCareerHistory(
  experienceRepository: ExperienceRepository
): Promise<Experience[]> {
  return experienceRepository.listOrdered();
}
