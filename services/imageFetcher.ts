import { Database } from "@/types/database.types";
import { getPagination } from "@/utils/pagination";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function imageFetcher(
  supabase: SupabaseClient<Database>,
  uuid: string
) {
  const { data, error } = await supabase
    .from("image_info")
    .select("*")
    // @ts-ignore
    .eq("image_uuid", uuid)
    .limit(1);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return data?.[0];
}

export async function latestImagesFetcher(
  supabase: SupabaseClient<Database>,
  page: number,
  vertical: boolean = false,
) {
  const isVertical = vertical ? 1 : 0;
  const { from, to } = getPagination(page, 23);
  const { data, error } = await supabase
    .from("image_info")
    .select("*")
    .eq("is_vertical", isVertical)
    .order("id", { ascending: false })
    .range(from, to);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return data;
}

export async function mostLikedImageFetcher(
  supabase: SupabaseClient<Database>,
  page: number,
  vertical: boolean = false,
) {
  const isVertical = vertical ? 1 : 0;
  const { from, to } = getPagination(page, 23);
  const { data, error } = await supabase
    .from("image_info")
    .select("*")
    .eq("is_vertical", isVertical)
    .order("id", { ascending: false })
    .order("num_likes", { ascending: false })
    .range(from, to);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return data;
}
