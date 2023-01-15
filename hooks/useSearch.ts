import { searchFetcher } from "@/services/searchFetcher";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";

export const useSearch = (query: string, page: number = 0, limit: number = 10) => {
  const supabase = useSupabaseClient();
  const { data, error } = useSWR([query, page, limit], ([query, page, limit]) =>
    searchFetcher(supabase, query, page, limit)
  );

  return {
    images: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
}
