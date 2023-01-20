import { Database } from "@/types/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function customerFetcher(
  supabase: SupabaseClient<Database>,
  user_id: string | undefined,
) {

  if (!user_id) {
    return {
      subscription: null,
      id: null,
    }
  }
  
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("subscription, id")
    .eq("user_id", user_id)
    .single();

  if (customerError) {
    throw customerError;
  }

  return customer;
}
