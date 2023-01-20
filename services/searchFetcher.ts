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
    .from("single_images")
    .select("prompt, prompt_id, uuid, link, id")
    .textSearch("prompt", genFullTextQuery(query))
    .order("prompt", { ascending: false })
    .range(from, to);

  if (promptsError) {
    throw promptsError;
  }

  if (!prompts) {
    return [];
  }

  return prompts;
}
