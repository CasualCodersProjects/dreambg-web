import { getPagination } from "@/utils/pagination";
import { supabase } from "@/db/supabaseClient";

export async function imagesFetcher(
  page: number = 1,
  limit: number = 20,
  ascending: boolean = false
) {
  const { from, to } = getPagination(page, limit);
  const { data, error } = await supabase
    .from("images")
    .select("id", { count: "exact" })
    // @ts-ignore
    .order(id, { ascending })
    .range(from, to);

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  const { data: images, error: imagesError } = await supabase
    .from("image_links")
    .select("links, height, width")
    // @ts-ignore
    .in("image", data.map((image) => image.id));

  if (imagesError) {
    throw imagesError;
  }
    
  return images;
}

export async function supaSingleFetcher(table: string, id: string) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    // @ts-ignore
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function imageFetcher(id: number) {
  const { data, error } = await supabase
    .from("images")
    .select("id")
    // @ts-ignore
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  const { data: images, error: imagesError } = await supabase
    .from("image_links")
    .select("links, height, width")
    // @ts-ignore
    .eq("image", data?.id);

  if (imagesError) {
    throw imagesError;
  }
    
  return images;
}
