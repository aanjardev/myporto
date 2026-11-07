import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Inject pathname ke header agar root layout bisa deteksi /admin
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (pathname.startsWith("/api/admin/") && pathname !== "/api/admin/auth") {
    const secret = process.env.ADMIN_SECRET;
    if (!secret || request.cookies.get("admin_token")?.value !== secret) {
      return NextResponse.json({ error: "Silakan login terlebih dahulu" }, { status: 401 });
    }
  }

  // Proteksi rute /admin/* (kecuali /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_token")?.value;
    const secret = process.env.ADMIN_SECRET;

    if (!token || !secret || token !== secret) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|images/).*)"],
};
