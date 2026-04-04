import type { Project } from "../entities/project";

export interface ProjectRepository {
  listOrdered(): Promise<Project[]>;
}
