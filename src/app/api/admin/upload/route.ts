import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { isAdminRequest } from "@/lib/admin-auth";
import { appEnv, isSupabaseWriteConfigured } from "@/lib/env";
import { createSupabaseServiceClient } from "@/lib/supabase";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/ogg"]);

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ message: "Admin authentication required." }, { status: 401 });
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    return handleLocalDemoUpload(request);
  }

  if (!isSupabaseWriteConfigured) {
    return NextResponse.json(
      {
        message:
          "Supabase storage is not configured. Add Supabase URL, anon key, and service role key.",
      },
      { status: 503 },
    );
  }

  try {
    const payload = (await request.json()) as {
      fileName?: string;
      mimeType?: string;
      size?: number;
      kind?: "image" | "video";
    };

    const kind = payload.kind === "video" ? "video" : "image";
    const mimeType = payload.mimeType ?? "";
    const size = Number(payload.size ?? 0);
    const allowed = kind === "video" ? ALLOWED_VIDEO_TYPES : ALLOWED_IMAGE_TYPES;
    const maxSize = kind === "video" ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

    if (!allowed.has(mimeType)) {
      return NextResponse.json(
        { message: `Unsupported ${kind} format.` },
        { status: 400 },
      );
    }

    if (!Number.isFinite(size) || size <= 0 || size > maxSize) {
      return NextResponse.json(
        {
          message:
            kind === "video"
              ? "Video must be 50MB or smaller."
              : "Image must be 8MB or smaller.",
        },
        { status: 400 },
      );
    }

    const supabase = createSupabaseServiceClient();
    await ensurePublicBucket();

    const extension = getExtension(payload.fileName ?? "", mimeType);
    const safeName = sanitizeName(payload.fileName ?? `${kind}.${extension}`);
    const folder = kind === "video" ? "videos" : "images";
    const date = new Date().toISOString().slice(0, 10);
    const path = `${folder}/${date}/${crypto.randomUUID()}-${safeName}`;

    const { data, error } = await supabase.storage
      .from(appEnv.supabaseMediaBucket)
      .createSignedUploadUrl(path);

    if (error || !data) {
      throw error ?? new Error("Unable to create signed upload URL.");
    }

    const publicUrl = supabase.storage
      .from(appEnv.supabaseMediaBucket)
      .getPublicUrl(path).data.publicUrl;

    return NextResponse.json({
      bucket: appEnv.supabaseMediaBucket,
      path: data.path,
      token: data.token,
      publicUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? `Unable to prepare media upload: ${error.message}`
            : "Unable to prepare media upload.",
      },
      { status: 500 },
    );
  }
}

async function handleLocalDemoUpload(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const kind = formData.get("kind") === "video" ? "video" : "image";

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "File is required." }, { status: 400 });
    }

    const allowed = kind === "video" ? ALLOWED_VIDEO_TYPES : ALLOWED_IMAGE_TYPES;
    const maxSize = kind === "video" ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

    if (!allowed.has(file.type)) {
      return NextResponse.json(
        { message: `Unsupported ${kind} format.` },
        { status: 400 },
      );
    }

    if (file.size <= 0 || file.size > maxSize) {
      return NextResponse.json(
        {
          message:
            kind === "video"
              ? "Video must be 50MB or smaller."
              : "Image must be 8MB or smaller.",
        },
        { status: 400 },
      );
    }

    const safeName = sanitizeName(file.name || `${kind}.${getExtension("", file.type)}`);
    const folder = kind === "video" ? "videos" : "images";
    const date = new Date().toISOString().slice(0, 10);
    const relativePath = `/uploads/admin/${folder}/${date}/${crypto.randomUUID()}-${safeName}`;
    const absolutePath = path.join(process.cwd(), "public", ...relativePath.split("/").filter(Boolean));

    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({
      publicUrl: relativePath,
      mode: "local-demo",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to upload file in local demo mode." },
      { status: 500 },
    );
  }
}

async function ensurePublicBucket() {
  const supabase = createSupabaseServiceClient();
  const { error: getError } = await supabase.storage.getBucket(appEnv.supabaseMediaBucket);

  if (!getError) {
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(
    appEnv.supabaseMediaBucket,
    {
      public: true,
      allowedMimeTypes: [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES],
    },
  );

  if (createError && !createError.message.toLowerCase().includes("already exists")) {
    throw createError;
  }
}

function sanitizeName(fileName: string) {
  const cleaned = fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return cleaned || "media";
}

function getExtension(fileName: string, mimeType: string) {
  const fromName = fileName.split(".").pop();

  if (fromName && fromName.length <= 5) {
    return fromName.toLowerCase();
  }

  return mimeType.split("/")[1] ?? "bin";
}
