import useSWRInfinite from 'swr/infinite';
import { Database } from '@/types/database.types';
import { searchFetcher, searchCountFetcher } from "@/services/searchFetcher";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";

export const useSearch = (
  query: string,
  page: number = 0,
  limit: number = 10
) => {
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
};

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${pageIndex}`; // if this function returns a falsy value nothing will load.
};

export const useInfiniteSearch = (query: string) => {
  const supabase = useSupabaseClient<Database>();
  const { data, error, size, setSize } = useSWRInfinite((pageIndex: number, previousPageData: any) => {
    const key = getKey(pageIndex, previousPageData);
    return { key, query }
  }, ({key}: {key: string}) => {
    return searchFetcher(supabase, query, parseInt(key), 24)
  }, {
    parallel: true
  });

  return {
    images: data?.flat(2),
    isLoading: !error && !data,
    isError: !!error,
    error,
    size,
    setSize,
  };
};

export const useSearchCount = (query: string) => {
  const supabase = useSupabaseClient<Database>();
  const { data, error } = useSWR([query], ([query]) =>
    searchCountFetcher(supabase, query)
  );

  return {
    count: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
}
