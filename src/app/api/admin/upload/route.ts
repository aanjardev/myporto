import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";
const extensions: Record<string, string> = {
  "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif", "application/pdf": ".pdf",
};
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 });
    const extension = extensions[file.type];
    if (!extension) return NextResponse.json({ error: "Gunakan gambar JPG, PNG, WebP, GIF, atau PDF" }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Ukuran file maksimal 10 MB" }, { status: 400 });
    const directory = path.join(process.env.PORTFOLIO_DATA_DIR || path.join(process.cwd(), "data"), "uploads");
    await mkdir(directory, { recursive: true });
    const filename = `${randomUUID()}${extension}`;
    await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()), { flag: "wx" });
    return NextResponse.json({ url: `/api/uploads/${filename}` });
  } catch (error) {
    console.error("Local upload failed:", error);
    return NextResponse.json({ error: "File gagal disimpan" }, { status: 500 });
  }
}
