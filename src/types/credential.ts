// types/credential.ts
export interface Credential {
  id: number;
  title: string;
  slug: string;
  type: "certification" | "award" | "achievement" | "competition" | "course" | "license";
  issuer: string;
  date: string;
  expiryDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  description: string;
  skills: string[];
  image: string;
}