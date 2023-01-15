import { profileFetcher } from "@/services/profileFetcher";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from 'swr';

export const useProfile = (user_id: string | undefined) => {
  const supabase = useSupabaseClient();
  const { data, error } = useSWR([user_id], ([user_id]) => profileFetcher(supabase, user_id));

  return {
    profile: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
}
