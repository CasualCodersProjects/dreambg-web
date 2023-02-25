import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function userLikedFetcher(
  supabaseClient: SupabaseClient<Database>,
  user_id: string | undefined,
  image_id: string
) {
  if (!user_id) {
    return null;
  }
  const { data, error } = await supabaseClient
    .from("likes")
    .select("*")
    // @ts-ignore
    .eq("user_id", user_id)
    // @ts-ignore
    .eq("image", image_id)
    .limit(1);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return !!data.length;
}

export async function likeCountFetcher(
  supabaseClient: SupabaseClient<Database>,
  image_id: string
) {
  const { data, error } = await supabaseClient
    .from("likes_count")
    .select("*")
    // @ts-ignore
    .eq("image", image_id)
    .limit(1);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return data[0]?.likes_count || 0;
}
