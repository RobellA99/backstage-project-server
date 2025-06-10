export interface Service {
  id: number;
  name: string;
  owner: string;
  status: "available" | "degraded" | "maintenance";
  repo_url: string;
  docs_slug: string;
  user_id: number;
}
