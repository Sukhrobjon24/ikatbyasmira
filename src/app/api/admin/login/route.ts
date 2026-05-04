import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const result = await verifyAdminCredentials(payload.email ?? "", payload.password ?? "");

    if (result.reason === "misconfigured") {
      return NextResponse.json(
        {
          message:
            "Admin credentials are not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET.",
        },
        { status: 500 },
      );
    }

    if (!result.ok) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const token = await createAdminSessionToken(payload.email ?? "");
    const response = NextResponse.json({ ok: true });

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Unable to sign in." }, { status: 400 });
  }
}