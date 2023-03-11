import { imageFetcher, latestImagesFetcher, mostLikedImageFetcher } from '@/services/imageFetcher';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';
import { Database } from '@/types/database.types';

export const useImage = (uuid: string) => {
    const supabase = useSupabaseClient();
    const { data, error } = useSWR([uuid, 'image'], ([uuid]) => imageFetcher(supabase, uuid));

  return {
    image: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
};

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null;
  return `${pageIndex}`; // if this function returns a falsy value nothing will load.
};

export const useLatestImages = (vertical: boolean = false) => {
  const supabase = useSupabaseClient<Database>();
  const { data, error, size, setSize } = useSWRInfinite((pageIndex: number, previousPageData: any) => {
    const key = getKey(pageIndex, previousPageData);
    return { key, vertical }
  }, ({key}: {key: string}) =>
    (latestImagesFetcher(supabase, parseInt(key), vertical)),
  {
    parallel: true
  });

  return {
    images: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
    size,
    setSize,
  };
};

export const useMostLikedImages = (vertical: boolean = false) => {
  const supabase = useSupabaseClient<Database>();
  const { data, error, size, setSize } = useSWRInfinite((pageIndex: number, previousPageData: any) => {
    const key = getKey(pageIndex, previousPageData);
    return { key, vertical }
  }, ({key}: {key: string}) =>
    mostLikedImageFetcher(supabase, parseInt(key), vertical)
  );

  return {
    images: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
    size,
    setSize,
  };
};
