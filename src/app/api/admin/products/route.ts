import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createProduct } from "@/lib/content-store";
import { isSupabaseWriteConfigured } from "@/lib/env";
import { deleteProduct, insertProduct } from "@/lib/site-content";

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
      name?: string;
      category?: string;
      shortDescription?: string;
      description?: string;
      price?: string;
    };

    const product = createProduct({
      image: payload.image ?? "",
      name: payload.name ?? "",
      category: payload.category ?? "",
      shortDescription: payload.shortDescription ?? "",
      description: payload.description ?? "",
      price: payload.price ?? "",
    });

    await insertProduct(product);

    return NextResponse.json({ item: product });
  } catch {
    return NextResponse.json(
      { message: "Unable to save product to Supabase." },
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
      return NextResponse.json({ message: "Product id is required." }, { status: 400 });
    }

    await deleteProduct(payload.id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Unable to delete product from Supabase." },
      { status: 500 },
    );
  }
}
