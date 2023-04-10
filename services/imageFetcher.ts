import { Database } from "@/types/database.types";
import { getDateRange, getPagination } from "@/utils/pagination";
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
  const { from, to } = getPagination(page, 24);
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
  range: "day" | "week" | "month" | "none"
) {
  const { from, to } = getPagination(page, 24);
  let query = supabase
    .from("image_info")
    .select("*")
    .eq("is_vertical", vertical ? 1 : 0)
  
  if(range !== "none") {
    const { today, desiredDate } = getDateRange(range)
    query = query.range(+today, +desiredDate, "created_at")
  }

  query = query
    .order("id", { ascending: false })
    .order("num_likes", { ascending: false })
    .range(from, to);
  const { data, error } = await query;

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return data;
}

export async function randomImagesFetcher(
  supabase: SupabaseClient<Database>,
  page: number,
  vertical: boolean = false,
) {
  const isVertical = vertical ? 1 : 0;
  const { from, to } = getPagination(page, 24);
  const { data, error } = await supabase
    .from("random_images")
    .select("*")
    .eq("is_vertical", isVertical)
    .range(from, to);

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return data;
}
