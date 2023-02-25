import { customerFetcher, activeCustomerFetcher } from "@/services/customerFetcher";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useSWR from 'swr';

export const useCustomer = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const email = user?.email;
  const { data, error } = useSWR([email, 'customer'], ([email]) => customerFetcher(supabase, email));

  return {
    customer: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
}

export const useActiveCustomer = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const { data, error } = useSWR([user?.id, 'active-customer'], () => activeCustomerFetcher(supabase));

  return {
    active: data?.active as boolean,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
}
