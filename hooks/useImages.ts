import { imageFetcher, imagesFetcher, infiniteImagesFetcher } from '@/services/imageFetcher';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';
import { Database } from '@/types/database.types';

export const useImage = (uuid: string) => {
    const supabase = useSupabaseClient();
    const { data, error } = useSWR([uuid], ([uuid]) => imageFetcher(supabase, uuid));

    return {
        image: data,
        isLoading: !error && !data,
        isError: !!error,
        error,
    }
}

export const useImages = (page: number, limit: number, vertical: boolean = false) => {
    const supabase = useSupabaseClient();
    const { data, error } = useSWR([page, limit, vertical], ([page, limit, vertical]) => imagesFetcher(supabase, page, limit, vertical));

    return {
        images: data,
        isLoading: !error && !data,
        isError: !!error,
        error,
    }
}

const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${pageIndex}`; // if this function returns a falsy value nothing will load.
}

export const useInfiniteImages = (vertical: boolean = false) => {
    const supabase = useSupabaseClient<Database>();
    const { data, error, size, setSize } = useSWRInfinite(getKey, (pageIndex) => infiniteImagesFetcher(supabase, parseInt(pageIndex), vertical));

    return {
        images: data,
        isLoading: !error && !data,
        isError: !!error,
        error,
        size,
        setSize,
    }
}
