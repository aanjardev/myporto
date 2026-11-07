// JSON storage records. Dates are serialized as ISO strings.
export interface HeroContent {
  id: number;
  name: string;
  nickname: string;
  tagline: string;
  bio: string;
  availability: string;
  cvUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HeroPhoto {
  id: number;
  heroId: number;
  src: string;
  label: string;
  order: number;
}

export interface HeroStat {
  id: number;
  heroId: number;
  label: string;
  value: string;
  icon: string;
  order: number;
}

export interface SocialLink {
  id: number;
  heroId: number;
  label: string;
  url: string;
  icon: string;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  type: "freelance" | "side" | "social";
  category: string | null;
  client: string | null;
  period: string | null;
  description: string;
  longDescription: string | null;
  challenge: string | null;
  solution: string | null;
  image: string;
  liveUrl: string | null;
  githubUrl: string | null;
  myRole: string | null;
  teamSize: string | null;
  goal: string | null;
  outcome: string | null;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectScreenshot {
  id: number;
  projectId: number;
  src: string;
  order: number;
}

export interface ProjectTech {
  id: number;
  projectId: number;
  name: string;
  order: number;
}

export interface ProjectFeature {
  id: number;
  projectId: number;
  text: string;
  order: number;
}

export interface ProjectResponsibility {
  id: number;
  projectId: number;
  text: string;
  order: number;
}

export interface ProjectHighlight {
  id: number;
  projectId: number;
  text: string;
  order: number;
}

export interface WorkExperience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkExperienceTech {
  id: number;
  expId: number;
  name: string;
  order: number;
}

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
  image: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CredentialSkill {
  id: number;
  credentialId: number;
  name: string;
  order: number;
}

export interface TechStackItem {
  id: number;
  name: string;
  icon: string;
  category: string;
  experience: string;
  projects: string;
  order: number;
  isVisible: boolean;
}

export interface FamiliarTech {
  id: number;
  name: string;
  order: number;
}

export interface StoreModels {
  heroContent: HeroContent;
  heroPhoto: HeroPhoto;
  heroStat: HeroStat;
  socialLink: SocialLink;
  project: Project;
  projectScreenshot: ProjectScreenshot;
  projectTech: ProjectTech;
  projectFeature: ProjectFeature;
  projectResponsibility: ProjectResponsibility;
  projectHighlight: ProjectHighlight;
  workExperience: WorkExperience;
  workExperienceTech: WorkExperienceTech;
  credential: Credential;
  credentialSkill: CredentialSkill;
  techStackItem: TechStackItem;
  familiarTech: FamiliarTech;
}
