import { Database } from "@/types/database.types";
import { getPagination } from "@/utils/pagination";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function imagesFetcher(
  supabase: SupabaseClient<Database>,
  page: number = 1,
  limit: number = 20,
  vertical: boolean = false
) {
  const { from, to } = getPagination(page, limit);
  const or = vertical ? 'height.eq.1280' : 'height.eq.725';
  const { data: images, error: imagesError } = await supabase
      .from("image_links")
      .select("image, link, width, height")
      .or(or)
      .order("id", { ascending: false })
      .range(from, to);

  if (imagesError) {
    throw imagesError;
  }
    
  return images;
}

export async function imageFetcher(supabase: SupabaseClient<Database>, uuid: string) {
  const { data, error } = await supabase
    .from("image_links")
    .select("link, width, height")
    // @ts-ignore
    .eq("image", uuid)
    .order("width", { ascending: false })
    .order("height", { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }
    
  return data?.[0];
}
