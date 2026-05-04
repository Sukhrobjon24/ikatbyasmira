export const ADMIN_SESSION_COOKIE = "ikat_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;
export const supportedLocaleSegments = ["uz", "ru", "en"] as const;

type AdminConfig = {
  email: string;
  password: string;
  secret: string;
};

export type AdminSession = {
  email: string;
  expiresAt: number;
};

export function getAdminConfig(): AdminConfig {
  return {
    email: process.env.ADMIN_EMAIL ?? "",
    password: process.env.ADMIN_PASSWORD ?? "",
    secret: process.env.ADMIN_SESSION_SECRET ?? "",
  };
}

export function isAdminConfigured(config = getAdminConfig()) {
  return Boolean(config.email && config.password && config.secret);
}

export async function verifyAdminCredentials(email: string, password: string) {
  const config = getAdminConfig();

  if (!isAdminConfigured(config)) {
    return { ok: false, reason: "misconfigured" as const };
  }

  const [emailOk, passwordOk] = await Promise.all([
    safeEqual(email.trim().toLowerCase(), config.email.trim().toLowerCase(), config.secret),
    safeEqual(password, config.password, config.secret),
  ]);

  return { ok: emailOk && passwordOk, reason: "checked" as const };
}

export async function createAdminSessionToken(email: string, now = Date.now()) {
  const config = getAdminConfig();
  const expiresAt = now + ADMIN_SESSION_MAX_AGE * 1000;
  const emailPart = base64UrlEncode(email.trim().toLowerCase());
  const payload = `${emailPart}.${expiresAt}`;
  const signature = await hmacHex(config.secret, payload);

  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null) {
  const config = getAdminConfig();

  if (!token || !isAdminConfigured(config)) {
    return null;
  }

  const [emailPart, expiresAtPart, signature] = token.split(".");
  const expiresAt = Number(expiresAtPart);

  if (!emailPart || !expiresAtPart || !signature || !Number.isFinite(expiresAt)) {
    return null;
  }

  if (expiresAt <= Date.now()) {
    return null;
  }

  const payload = `${emailPart}.${expiresAt}`;
  const expected = await hmacHex(config.secret, payload);

  if (!(await safeEqual(signature, expected, config.secret))) {
    return null;
  }

  try {
    const email = base64UrlDecode(emailPart);
    return { email, expiresAt } satisfies AdminSession;
  } catch {
    return null;
  }
}

export async function verifySessionCookie(cookieHeader: string | null) {
  return verifySessionToken(readCookie(cookieHeader, ADMIN_SESSION_COOKIE));
}

function readCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) {
    return null;
  }

  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.slice(name.length + 1));
}

async function safeEqual(a: string, b: string, secret: string) {
  const [aDigest, bDigest] = await Promise.all([
    hmacHex(`compare:${secret}`, a),
    hmacHex(`compare:${secret}`, b),
  ]);

  return a.length === b.length && aDigest === bDigest;
}

async function hmacHex(secret: string, value: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function base64UrlEncode(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    Math.ceil(value.length / 4) * 4,
    "=",
  );
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}