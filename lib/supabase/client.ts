import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const useLocalContent = /^(1|true|yes)$/i.test(process.env.NEXT_PUBLIC_USE_LOCAL_CONTENT ?? "");

export function hasSupabasePublicEnv() {
  return !useLocalContent && Boolean(publicUrl && publicAnonKey);
}

export function hasSupabaseAdminEnv() {
  return !useLocalContent && Boolean(publicUrl && serviceRoleKey);
}

export function getSupabasePublicClient(): SupabaseClient | null {
  if (useLocalContent || !publicUrl || !publicAnonKey) {
    return null;
  }

  return createClient(publicUrl, publicAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (useLocalContent || !publicUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(publicUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
