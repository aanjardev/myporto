import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const secret = process.env.ADMIN_SECRET;

  if (!secret || password !== secret) {
    return Response.json({ error: "Password salah" }, { status: 401 });
  }

  const response = Response.json({ success: true });
  // Set cookie HTTP-only, expires 7 hari
  const headers = new Headers(response.headers);
  headers.set(
    "Set-Cookie",
    `admin_token=${secret}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`
  );

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers,
  });
}

export async function DELETE() {
  const headers = new Headers();
  headers.set(
    "Set-Cookie",
    "admin_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
  );
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers,
  });
}
