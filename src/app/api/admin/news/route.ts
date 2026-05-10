import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createNewsItem } from "@/lib/content-store";
import { isSupabaseWriteConfigured } from "@/lib/env";
import { deleteNewsItem, insertNewsItem } from "@/lib/site-content";

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
      image?: string;
      title?: string;
      excerpt?: string;
      body?: string;
      date?: string;
    };

    const item = createNewsItem({
      image: payload.image ?? "",
      title: payload.title ?? "",
      excerpt: payload.excerpt ?? "",
      body: payload.body ?? "",
      date: payload.date ?? new Date().toISOString().slice(0, 10),
    });

    await insertNewsItem(item);

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json(
      { message: "Unable to save news post to Supabase." },
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
      return NextResponse.json({ message: "News post id is required." }, { status: 400 });
    }

    await deleteNewsItem(payload.id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Unable to delete news post from Supabase." },
      { status: 500 },
    );
  }
}
