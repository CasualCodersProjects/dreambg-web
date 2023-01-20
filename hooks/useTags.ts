import { randomTagsFetcher, tagsFetcher } from "@/services/tagFetcher";
import useSWR from "swr";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const useTags = (page: number = 0, limit: number = 10) => {
  const supabase = useSupabaseClient();
  const { data, error } = useSWR([page, limit], ([page, limit]) =>
    tagsFetcher(supabase, page, limit)
  );

  return {
    tags: data ? data.map((tag) => tag.tag as string) : [],
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
};

export const useRandomTags = (limit: number = 10) => {
  const supabase = useSupabaseClient();
  const { data, error } = useSWR([limit], ([limit]) =>
    randomTagsFetcher(supabase, limit)
  );

  return {
    tags: data
      ? data.map((tag) => tag.tag as string).sort(() => Math.random() - 0.5)
      : [],
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
};
