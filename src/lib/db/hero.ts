import { jsonStore } from "@/lib/json-store";

export interface HeroData {
  name: string;
  nickname: string;
  tagline: string;
  bio: string;
  availability: string;
  cvUrl: string | null;
  photos: { src: string; label: string }[];
  stats: { label: string; value: string; icon: string }[];
  socials: { label: string; url: string; icon: string }[];
}

export async function getHeroContent(): Promise<HeroData | null> {
  const hero = await jsonStore.heroContent.findFirst({
    include: {
      photos: { orderBy: { order: "asc" } },
      stats: { orderBy: { order: "asc" } },
      socials: { orderBy: { order: "asc" } },
    },
  });

  if (!hero) return null;

  return {
    name: hero.name,
    nickname: hero.nickname,
    tagline: hero.tagline,
    bio: hero.bio,
    availability: hero.availability,
    cvUrl: hero.cvUrl,
    photos: hero.photos.map((p) => ({ src: p.src, label: p.label })),
    stats: hero.stats.map((s) => ({
      label: s.label,
      value: s.value,
      icon: s.icon,
    })),
    socials: hero.socials.map((s) => ({
      label: s.label,
      url: s.url,
      icon: s.icon,
    })),
  };
}
