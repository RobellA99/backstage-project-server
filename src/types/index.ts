export interface Service {
  id: number;
  name: string;
  owner: string;
  status: "available" | "degraded" | "maintenance";
  repo_url: string;
  docs_slug: string;
  user_id: number;
}

export interface UserPayload {
  id: number;
  email: string;
}
