import { useImage } from "@/hooks/useImages";
import { useState } from "react";
import { Center, Loader, Stack, Image, Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons";
import { useRouter } from "next/router";
import { createImageURL } from "@/utils/createImageURL";
import useAsyncEffect from "use-async-effect";
import { supabase } from "@/db/supabaseClient";

export default function ImagePage() {
  const [image, setImage] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useAsyncEffect(async () => {
    console.log(id);
    const { data, error } = await supabase
      .from("image_links")
      .select("*")
      .eq("image", id)
      .order("width", { ascending: false })
      .order("height", { ascending: false })
      .order("id", { ascending: false })
      .limit(1);

    if (error) {
      console.log(error);
    }

    if (data) {
      setImage(data[0]);
    }
  }, [id]);

  return (
    <Center>
      {!image ? (
        <Loader size="xl" />
      ) : (
        <>
          <Stack spacing="xl" align="center" justify="center">
            <Image
              src={createImageURL("ai-images", image.link)}
              alt={image.link}
            />
            <Button
              component="a"
              href={createImageURL("ai-images", image.link)}
              target="_blank"
              about="Download the image."
              leftIcon={<IconDownload size={18} />}
            >
              {" "}
              Download{" "}
            </Button>
          </Stack>
        </>
      )}
    </Center>
  );
}
