import { jsonStore } from "@/lib/json-store";
import { NextRequest } from "next/server";

export async function GET() {
  const hero = await jsonStore.heroContent.findFirst({
    include: { photos: { orderBy: { order: "asc" } }, stats: { orderBy: { order: "asc" } }, socials: { orderBy: { order: "asc" } } },
  });
  return Response.json(hero);
}

export async function PUT(request: NextRequest) {
  const { name, nickname, tagline, bio, availability, cvUrl, photos, stats, socials } = await request.json();
  const data = {
    name, nickname, tagline, bio, availability, cvUrl: cvUrl ?? null,
    photos: { create: (photos ?? []).map((p: { src: string; label: string }, order: number) => ({ src: p.src, label: p.label, order })) },
    stats: { create: (stats ?? []).map((s: { label: string; value: string; icon: string }, order: number) => ({ label: s.label, value: s.value, icon: s.icon, order })) },
    socials: { create: (socials ?? []).map((s: { label: string; url: string; icon: string }, order: number) => ({ label: s.label, url: s.url, icon: s.icon, order })) },
  };
  const existing = await jsonStore.heroContent.findFirst();
  if (existing) await jsonStore.heroContent.update({ where: { id: existing.id }, data });
  else await jsonStore.heroContent.create({ data });
  return Response.json({ success: true });
}
