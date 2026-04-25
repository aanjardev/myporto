// types/credential.ts
export interface Credential {
  id: number;
  slug: string;
  title: string;
  issuer: string;
  type:
    | "certification"
    | "award"
    | "achievement"
    | "competition"
    | "course"
    | "license";
  description: string;
  image: string;
  date: string; // ISO date string
  expiryDate?: string; // Optional expiry date
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  featured?: boolean;
}
