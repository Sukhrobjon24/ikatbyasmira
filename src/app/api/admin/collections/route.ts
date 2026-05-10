import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createCollectionVideo } from "@/lib/content-store";
import { isSupabaseWriteConfigured } from "@/lib/env";
import { deleteCollectionVideo, insertCollectionVideo } from "@/lib/site-content";

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ message: "Admin authentication required." }, { status: 401 });
  }

  if (!isSupabaseWriteConfigured) {
    return NextResponse.json(
      {
        message:
          "Supabase write access is not configured yet. Add the service role key to enable live admin writes.",
      },
      { status: 503 },
    );
  }

  try {
    const payload = (await request.json()) as {
      cover?: string;
      videoUrl?: string;
      title?: string;
      description?: string;
      date?: string;
    };

    const item = createCollectionVideo({
      cover: payload.cover ?? "",
      videoUrl: payload.videoUrl ?? "",
      title: payload.title ?? "",
      description: payload.description ?? "",
      date: payload.date ?? new Date().toISOString().slice(0, 10),
    });

    await insertCollectionVideo(item);

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json(
      { message: "Unable to save collection video to Supabase." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ message: "Admin authentication required." }, { status: 401 });
  }

  if (!isSupabaseWriteConfigured) {
    return NextResponse.json(
      {
        message:
          "Supabase write access is not configured yet. Add the service role key to enable live admin writes.",
      },
      { status: 503 },
    );
  }

  try {
    const payload = (await request.json()) as { id?: string };

    if (!payload.id) {
      return NextResponse.json(
        { message: "Collection video id is required." },
        { status: 400 },
      );
    }

    await deleteCollectionVideo(payload.id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Unable to delete collection video from Supabase." },
      { status: 500 },
    );
  }
}
