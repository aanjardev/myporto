import { jsonStore } from "@/lib/json-store";
import { NextRequest } from "next/server";

export async function GET() {
  const credentials = await jsonStore.credential.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });
  return Response.json(credentials);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { skills, ...data } = body;

  const cred = await jsonStore.credential.create({
    data: {
      ...data,
      skills: { createMany: { data: (skills ?? []).map((n: string, i: number) => ({ name: n, order: i })) } },
    },
  });
  return Response.json(cred, { status: 201 });
}
