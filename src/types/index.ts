export interface Service {
  id: number;
  name: string;
  owner: string;
  status: "available" | "degraded" | "maintenance";
  repo_url: string;
  docs_slug: string;
  user_id: number;
}

export interface Docs {
  id: number;
  slug: string;
  title: string;
  content: string;
}

export interface UserPayload {
  id: number;
  email: string;
}
