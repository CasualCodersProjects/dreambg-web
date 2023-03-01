import { userLikesFetcher } from "@/services/likesFetcher";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useSWR from "swr";

export const useUserLikes = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const { data, error, mutate } = useSWR(
    [user?.id, "likes"],
    ([user_id]) => userLikesFetcher(supabase, user_id)
  );

  return {
    likes: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
    mutate,
  };
}
