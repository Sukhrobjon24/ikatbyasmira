create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  image text not null,
  name jsonb not null,
  category jsonb not null,
  short_description jsonb not null,
  description jsonb not null,
  price text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  title jsonb not null,
  location jsonb not null,
  description jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  cover text not null,
  date date not null,
  title jsonb not null,
  excerpt jsonb not null,
  body jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.gallery_items enable row level security;
alter table public.news_posts enable row level security;

create policy "public read products"
on public.products
for select
to anon, authenticated
using (true);

create policy "public read gallery"
on public.gallery_items
for select
to anon, authenticated
using (true);

create policy "public read news"
on public.news_posts
for select
to anon, authenticated
using (true);

create policy "authenticated manage products"
on public.products
for all
to authenticated
using (true)
with check (true);

create policy "authenticated manage gallery"
on public.gallery_items
for all
to authenticated
using (true)
with check (true);

create policy "authenticated manage news"
on public.news_posts
for all
to authenticated
using (true)
with check (true);
