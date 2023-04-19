import {
  userLikedImagesFetcher,
  userCreatededImagesFetcher,
} from "@/services/imageFetcher";
import { savedImagesFetcher } from "@/services/savedImagesFetcher";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";

export const useSavedImages = (
  user_id: string | undefined,
  tab: "saved" | "liked" | "created" = "saved"
) => {
  const supabase = useSupabaseClient();
  const { data, error, mutate } = useSWR([user_id, tab], ([user_id, tab]) =>
    tab == "saved"
      ? savedImagesFetcher(supabase, user_id)
      : tab == "liked"
      ? userLikedImagesFetcher(supabase, user_id)
      : userCreatededImagesFetcher(supabase, user_id)
  );

  return {
    images: data,
    isLoading: !error && !data,
    isError: !!error,
    error,
    mutate,
  };
};
