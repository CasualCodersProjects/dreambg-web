import { imageFetcher, imagesFetcher } from '@/services/imageFetcher';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useSWR from 'swr';

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
