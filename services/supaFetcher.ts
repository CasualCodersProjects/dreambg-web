import { getPagination } from "@/utils/pagination";
import { supabase } from "@/db/supabaseClient";

export async function imagesFetcher(
  page: number = 1,
  limit: number = 20,
) {
  const { from, to } = getPagination(page, limit);
  const { data: images, error: imagesError } = await supabase
      .from("image_links")
      .select("link, width, height")
      .lte("width", 500)
      .lte("height", 500)
      .order("image", { ascending: false })
      .order("width", { ascending: false })
      .order("height", { ascending: false })
      .range(from, to);

  if (imagesError) {
    throw imagesError;
  }
    
  return images;
}

export async function supaFetcher(table: string, page: number, limit: number) {
  const { data, error } = await supabase.from(table).select("*").range(page, limit);

  if (error) {
    throw error;
  }

  return data;
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
