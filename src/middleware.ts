import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  supportedLocaleSegments,
  verifySessionToken,
} from "@/lib/admin-session";

const PUBLIC_ADMIN_API = new Set(["/api/admin/login", "/api/admin/logout"]);

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/api/admin") && !PUBLIC_ADMIN_API.has(pathname)) {
    const session = await verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

    if (!session) {
      return NextResponse.json({ message: "Admin authentication required." }, { status: 401 });
    }
  }

  const [, locale, section, child] = pathname.split("/");
  const isSupportedLocale = supportedLocaleSegments.includes(
    locale as (typeof supportedLocaleSegments)[number],
  );

  if (!isSupportedLocale || section !== "admin") {
    return NextResponse.next();
  }

  const session = await verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
  const loginPath = `/${locale}/admin/login`;

  if (child === "login") {
    if (session) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/admin`;
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = loginPath;
    url.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
