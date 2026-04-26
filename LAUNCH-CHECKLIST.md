# IKAT Launch Checklist

## 1. GitHub

- Create a new private GitHub repository for `ikatbyasmira`
- Push this project to the repository
- Keep `.env.local` out of git

## 2. Supabase

- Create a new Supabase project
- Run [supabase/schema.sql](C:/Users/user/Documents/Codex/2026-04-24/salom-codex-menga-qanday-yordam-bera/supabase/schema.sql) in the SQL editor
- Copy:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Add them to local `.env.local` based on [.env.example](C:/Users/user/Documents/Codex/2026-04-24/salom-codex-menga-qanday-yordam-bera/.env.example)

## 3. Local Validation

- Run `npm install`
- Run `npm run dev`
- Open `http://localhost:3000/uz`
- Open `/uz/admin`
- Add one product and verify it appears in the catalog

## 4. Vercel

- Import the GitHub repository into Vercel
- Add the same environment variables from `.env.local`
- Set `NEXT_PUBLIC_SITE_URL` to `https://ikatbyasmira.uz`
- Deploy

## 5. Domain

- In Vercel, add the custom domain `ikatbyasmira.uz`
- Add the required DNS records in the domain provider panel
- Wait for SSL to activate

## 6. Before Client Demo

- Replace placeholder phone/email/social links with final brand details
- Verify all 4 languages
- Verify mobile layout and menu
- Verify admin writes are saving to Supabase
- Verify WhatsApp, Telegram, Instagram, and map links
- Verify images load correctly and no broken links remain
