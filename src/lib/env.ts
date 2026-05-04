export const appEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  supabaseMediaBucket: process.env.SUPABASE_MEDIA_BUCKET ?? "ikat-media",
};

export const isSupabaseConfigured =
  appEnv.supabaseUrl.length > 0 && appEnv.supabaseAnonKey.length > 0;

export const isSupabaseWriteConfigured =
  isSupabaseConfigured && appEnv.supabaseServiceRoleKey.length > 0;
