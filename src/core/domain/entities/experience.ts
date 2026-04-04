export type EmploymentType = "current" | "past";

export interface Experience {
  id: string;
  company: string;
  role: string;
  periodLabel: string;
  employmentType: EmploymentType;
  /** Short overview (also used in condensed views). */
  summary: string;
  /** Legacy bullets; kept for backward compatibility with older UI. */
  highlights: string[];
  /** Concise responsibility narrative; emphasize Technical Lead where applicable. */
  responsibilities: string;
  /** Quantified or high-signal delivery bullets. */
  keyContributions: string[];
  /** Technologies and platforms for this role. */
  techStack: string[];
  sortOrder: number;
}
