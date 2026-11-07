import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
const types: Record<string, string> = { ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif", ".pdf": "application/pdf" };
export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!/^[a-f0-9-]{36}\.(jpg|png|webp|gif|pdf)$/.test(filename)) return new Response("Not found", { status: 404 });
  try {
    const directory = process.env.PORTFOLIO_DATA_DIR || path.join(process.cwd(), "data");
    const buffer = await readFile(path.join(directory, "uploads", filename));
    return new Response(new Uint8Array(buffer), { headers: { "Content-Type": types[path.extname(filename)], "X-Content-Type-Options": "nosniff", "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return new Response("Not found", { status: 404 });
    throw error;
  }
}
