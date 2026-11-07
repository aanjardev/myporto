import { jsonStore } from "@/lib/json-store";
import { Credential } from "@/types/credential";

function mapCredential(c: {
  id: number;
  title: string;
  slug: string;
  type: string;
  issuer: string;
  date: string;
  expiryDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  description: string;
  image: string;
  skills: { name: string }[];
}): Credential {
  return {
    id: c.id,
    title: c.title,
    slug: c.slug,
    type: c.type as Credential["type"],
    issuer: c.issuer,
    date: c.date,
    expiryDate: c.expiryDate,
    credentialId: c.credentialId,
    credentialUrl: c.credentialUrl,
    description: c.description,
    image: c.image,
    skills: c.skills.map((s) => s.name),
  };
}

export async function getAllCredentials(): Promise<Credential[]> {
  const credentials = await jsonStore.credential.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
    include: {
      skills: { orderBy: { order: "asc" } },
    },
  });
  return credentials.map(mapCredential);
}

export async function getCredentialBySlug(
  slug: string
): Promise<Credential | null> {
  const c = await jsonStore.credential.findUnique({
    where: { slug },
    include: { skills: { orderBy: { order: "asc" } } },
  });
  if (!c) return null;
  return mapCredential(c);
}

export async function getCredentialsByType(
  type: Credential["type"]
): Promise<Credential[]> {
  const credentials = await jsonStore.credential.findMany({
    where: { isVisible: true, type },
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });
  return credentials.map(mapCredential);
}
