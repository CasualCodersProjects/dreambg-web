import { likeCountFetcher, userLikedFetcher } from "@/services/likesFetcher";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";

export const useUserLiked = (image_id: string) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const { data, error, mutate } = useSWR(
    [image_id, user?.id, "likes"],
    ([image_id, user_id]) => userLikedFetcher(supabase, user_id, image_id)
  );

  return {
    liked: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
    mutate,
  };
};

export const useLikes = (image_id: string) => {
  const supabase = useSupabaseClient();
  const { data, error, mutate } = useSWR(
    [image_id, "likes_count"],
    ([image_id]) => likeCountFetcher(supabase, image_id)
  );

  return {
    likes: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
    mutate,
  };
};
