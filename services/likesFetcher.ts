import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function userLikesFetcher(
  supabaseClient: SupabaseClient<Database>,
  user_id: string | undefined
) {
  if (!user_id) {
    return null;
  }
  const { data, error } = await supabaseClient
    .from("likes")
    .select("*")
    // @ts-ignore
    .eq("user_id", user_id);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return data;
}
