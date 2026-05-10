# IKAT Production Notes

This project supports three content modes:

- `demo`: uses local static data plus browser `localStorage`
- `supabase-readonly`: reads live content from Supabase, while admin writes stay disabled
- `supabase`: reads and writes live content through Supabase and protected API routes

## Required environment variables

Copy `.env.example` to `.env.local` for local development or configure the same values in Vercel.

```env
NEXT_PUBLIC_SITE_URL=https://ikatbyasmira.uz

NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_PRIVATE_SERVICE_ROLE_KEY
SUPABASE_MEDIA_BUCKET=ikat-media

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-with-a-strong-password
ADMIN_SESSION_SECRET=replace-with-a-long-random-secret

NEXT_PUBLIC_WHATSAPP_NUMBER=998901234567
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hello, I would like to learn more about IKAT collections.
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/ikatbyasmira
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/ikatbyasmira
NEXT_PUBLIC_MAPS_URL=https://maps.google.com/?q=Samarkand%2C%20Uzbekistan
```

## Supabase structure

Run `supabase/schema.sql` in the Supabase SQL editor before enabling live mode.
The schema keeps public `anon` access read-only. Admin writes are handled only by protected server API routes using `SUPABASE_SERVICE_ROLE_KEY`.

Media uploads use Supabase Storage. The protected upload route creates signed upload URLs and stores files in `SUPABASE_MEDIA_BUCKET` (`ikat-media` by default). Keep the bucket public for read access so uploaded images and videos can render on the website.
When Supabase is not configured, local development falls back to saving admin uploads under `public/uploads/admin`. This is only for local demos; production deployments should use Supabase Storage.

## Admin security

The admin panel lives at `/:locale/admin` and is protected by a signed, `HttpOnly` session cookie. Only the single account configured with `ADMIN_EMAIL` and `ADMIN_PASSWORD` can sign in. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` in Vercel before presenting the admin panel to a client.

Admin writes use these internal API endpoints:

- `/api/admin/products`
- `/api/admin/gallery`
- `/api/admin/news`
- `/api/admin/collections`
- `/api/admin/upload`

These routes require both a valid admin session and `SUPABASE_SERVICE_ROLE_KEY`. The service role key must only be configured as a server-side environment variable.
