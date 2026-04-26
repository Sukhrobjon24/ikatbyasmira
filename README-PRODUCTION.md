# IKAT Production Notes

This project now supports two content modes:

- `demo`: falls back to local static data plus browser localStorage
- `supabase-readonly`: reads live content from Supabase, but admin writes are not enabled
- `supabase`: reads and writes live content through Supabase and API routes

## Required environment variables

Use [.env.example](C:/Users/user/Documents/Codex/2026-04-24/salom-codex-menga-qanday-yordam-bera/.env.example) as the template.

## Supabase structure

Run [supabase/schema.sql](C:/Users/user/Documents/Codex/2026-04-24/salom-codex-menga-qanday-yordam-bera/supabase/schema.sql) in your Supabase SQL editor before enabling live mode.

## Admin routes

The admin page uses these internal API endpoints:

- `/api/admin/products`
- `/api/admin/gallery`
- `/api/admin/news`

These routes need `SUPABASE_SERVICE_ROLE_KEY` to be configured for live writes.
