export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link?: string;
  sortOrder: number;
}
