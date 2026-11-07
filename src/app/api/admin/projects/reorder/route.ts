import { reorder } from "@/lib/json-store";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { items } = await request.json();
    
    if (!Array.isArray(items)) {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    await reorder("project", items);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to reorder projects:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
