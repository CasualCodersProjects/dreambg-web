import { savedImageFetcher, savedImagesFetcher } from "@/services/savedImagesFetcher";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";

export const useSavedImage = (uuid: string) => {
    const supabase = useSupabaseClient();
    const { data, error } = useSWR([uuid], ([uuid]) => savedImageFetcher(supabase, uuid));

    return {
        image: data,
        isLoading: !error && !data,
        isError: !!error,
        error,
    }
}

export const useSavedImages = (user_id: string) => {
    const supabase = useSupabaseClient();
    const { data, error } = useSWR([user_id], ([user_id]) => savedImagesFetcher(supabase, user_id));

    return {
        images: data,
        isLoading: !error && !data,
        isError: !!error,
        error,
    }
}
