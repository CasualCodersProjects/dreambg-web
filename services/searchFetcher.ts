import { Database } from "@/types/database.types";
import genFullTextQuery from "@/utils/genFullTextQuery";
import { getPagination } from "@/utils/pagination";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function searchFetcher(
  supabase: SupabaseClient<Database>,
  query: string,
  page: number,
  limit: number = 10
) {
  const { from, to } = getPagination(page, limit);
  const { data: prompts, error: promptsError } = await supabase
    .from("image_info")
    .select("*")
    .textSearch("image_prompt", genFullTextQuery(query))
    .order("image_prompt", { ascending: false })
    .range(from, to);

  if (promptsError) {
    throw promptsError;
  }

  if (!prompts) {
    return [];
  }

  return prompts;
}
