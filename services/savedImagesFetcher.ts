import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function savedImageFetcher(
  supabaseClient: SupabaseClient<Database>,
  uuid: string,
  user_id: string | undefined
) {
  if (!user_id) {
    return null;
  }
  const { data, error } = await supabaseClient
    .from("user_saved_images")
    .select("*")
    // @ts-ignore
    .eq("image_id", uuid)
    // @ts-ignore
    .eq("user_id", user_id)
    .limit(1);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return data?.[0];
}

export async function savedImagesFetcher(
  supabaseClient: SupabaseClient<Database>,
  user_id: string | undefined
) {
  if (!user_id) {
    return null;
  }
  const { data, error } = await supabaseClient
    .from("saved_image_links")
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
