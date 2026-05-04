import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  verifySessionCookie,
  verifySessionToken,
  type AdminSession,
} from "@/lib/admin-session";

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  return verifySessionToken(token);
}

export async function isAdminRequest(request: Request) {
  return Boolean(await verifySessionCookie(request.headers.get("cookie")));
}