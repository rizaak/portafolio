import type { Project } from "@/core/domain/entities/project";
import type { ProjectRepository } from "@/core/domain/repositories/project-repository";
import raw from "../data/projects.json";

const data = raw as Project[];

export class JsonProjectRepository implements ProjectRepository {
  async listOrdered(): Promise<Project[]> {
    return [...data].sort((a, b) => a.sortOrder - b.sortOrder);
  }
}
