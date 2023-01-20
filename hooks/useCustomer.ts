import { customerFetcher } from "@/services/customerFetcher";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from 'swr';

export const useCustomer = (user_id: string | undefined) => {
  const supabase = useSupabaseClient();
  const { data, error } = useSWR([user_id, 'customer'], ([user_id]) => customerFetcher(supabase, user_id));

  return {
    customer: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
}
