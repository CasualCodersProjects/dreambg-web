import { Database } from "@/types/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function profileFetcher(
  supabase: SupabaseClient<Database>,
  user_id: string | undefined
) {
  if (!user_id) {
    return {
      id: null,
      updated_at: null,
      username: null,
      website: null,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, updated_at, username, website")
    .eq("id", user_id)
    .single();

  if (profileError) {
    throw profileError;
  }

  return profile;
}
