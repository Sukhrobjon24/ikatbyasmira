import { createClient } from "@supabase/supabase-js";
import { appEnv } from "./env";

export function createSupabasePublicClient() {
  if (!appEnv.supabaseUrl || !appEnv.supabaseAnonKey) {
    throw new Error("Supabase public environment variables are missing.");
  }

  return createClient(appEnv.supabaseUrl, appEnv.supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function createSupabaseServiceClient() {
  if (!appEnv.supabaseUrl || !appEnv.supabaseServiceRoleKey) {
    throw new Error("Supabase service role environment variables are missing.");
  }

  return createClient(appEnv.supabaseUrl, appEnv.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
