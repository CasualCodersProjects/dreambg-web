import { imageFetcher, imagesFetcher } from '@/services/supaFetcher';
import useSWR from 'swr';

export const useImage = (id: number) => {
    const { data, error } = useSWR([id], imageFetcher);

    return {
        images: data,
        isLoading: !error && !data,
        isError: !!error,
        error,
    }
}

export const useImages = (page: number, limit: number) => {
    const { data, error } = useSWR([page, limit], imagesFetcher);

    return {
        images: data,
        isLoading: !error && !data,
        isError: !!error,
        error,
    }
}
