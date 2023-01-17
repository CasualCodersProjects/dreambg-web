import { savedImageFetcher, savedImagesFetcher } from "@/services/savedImagesFetcher";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";

export const useSavedImage = (uuid: string) => {
    const supabase = useSupabaseClient();
    const user = useUser();
    const { data, error, mutate } = useSWR([uuid, user?.id], ([uuid, user_id]) => savedImageFetcher(supabase, uuid, user_id));

    return {
        image: data,
        isLoading: !error && !data,
        isError: !!error,
        error,
        mutate,
    }
}

export const useSavedImages = (user_id: string | undefined) => {
    const supabase = useSupabaseClient();
    const { data, error } = useSWR([user_id, 'saved_images'], ([user_id]) => savedImagesFetcher(supabase, user_id));

    return {
        images: data,
        isLoading: !error && !data,
        isError: !!error,
        error,
    }
}
