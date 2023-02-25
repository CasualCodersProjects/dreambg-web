import { Database } from "@/types/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function customerFetcher(
  supabase: SupabaseClient<Database>,
  email: string | undefined,
) {

  if (!email) {
    return {
      subscription: null,
      id: null,
    }
  }
  
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("subscription, id")
    .eq("email", email)
    .single();

  if (customerError) {
    throw customerError;
  }

  return customer;
}

export async function activeCustomerFetcher(
  supabase: SupabaseClient<Database>,
) {
  // invoke the is-active-customer function
  const { data, error: isActiveError } = await supabase.functions.invoke('is-active-customer');

  if (isActiveError) {
    throw isActiveError;
  }

  return data;
}
