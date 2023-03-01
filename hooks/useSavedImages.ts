import { savedImagesFetcher } from "@/services/savedImagesFetcher";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";

export const useSavedImages = (user_id: string | undefined) => {
  const supabase = useSupabaseClient();
  const { data, error, mutate } = useSWR([user_id, "saved_images"], ([user_id]) =>
    savedImagesFetcher(supabase, user_id)
  );

  return {
    images: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
    mutate,
  };
};
