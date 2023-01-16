import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function savedImageFetcher(supabaseClient: SupabaseClient<Database>, uuid: string) {
  const { data, error } = await supabaseClient
    .from("user_saved_images")
    .select("*")
    // @ts-ignore
    .eq("image_id", uuid)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }
    
  return data;
}

export async function savedImagesFetcher(supabaseClient: SupabaseClient<Database>, user_id: string) {
  const { data, error } = await supabaseClient
    .from("user_saved_images")
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
