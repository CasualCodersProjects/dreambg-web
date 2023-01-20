import { getPagination } from "@/utils/pagination";
import { Database } from "@/types/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function tagsFetcher(
  supabase: SupabaseClient<Database>,
  page: number,
  limit: number = 10
) {
  const { from, to } = getPagination(page, limit);
  const { data: tags, error: tagsError } = await supabase
    .from("tags")
    .select("tag")
    .order("id", { ascending: false })
    .range(from, to);

  if (tagsError) {
    throw tagsError;
  }

  return tags;
}

export async function randomTagsFetcher(
  supabase: SupabaseClient<Database>,
  limit: number = 10
) {
  const { data: tags, error: tagsError } = await supabase
    .from("random_tags")
    .select("tag")
    .limit(limit);

  if (tagsError) {
    throw tagsError;
  }

  return tags;
}
