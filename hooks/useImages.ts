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

export const useLatestImages = () => {
  const supabase = useSupabaseClient<Database>();
  const { data, error, size, setSize } = useSWRInfinite(getKey, (pageIndex) =>
    latestImagesFetcher(supabase, parseInt(pageIndex))
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

export const useMostLikedImages = () => {
  const supabase = useSupabaseClient<Database>();
  const { data, error, size, setSize } = useSWRInfinite(getKey, (pageIndex) =>
    mostLikedImageFetcher(supabase, parseInt(pageIndex))
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
