import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createGalleryItem } from "@/lib/content-store";
import { isSupabaseWriteConfigured } from "@/lib/env";
import { deleteGalleryItem, insertGalleryItem } from "@/lib/site-content";

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
      location?: string;
      description?: string;
    };

    const item = createGalleryItem({
      image: payload.image ?? "",
      title: payload.title ?? "",
      location: payload.location ?? "",
      description: payload.description ?? "",
    });

    await insertGalleryItem(item);

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json(
      { message: "Unable to save gallery item to Supabase." },
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
      return NextResponse.json({ message: "Gallery item id is required." }, { status: 400 });
    }

    await deleteGalleryItem(payload.id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Unable to delete gallery item from Supabase." },
      { status: 500 },
    );
  }
}
