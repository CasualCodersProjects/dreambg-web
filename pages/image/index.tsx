import Head from "next/head";
import { Center, Loader } from "@mantine/core";
import ImageCard from "@/components/common/ImageCard";
import { useImageParams } from "@/hooks/useQueryParams";
import { useImage } from "@/hooks/useImages";
import { useEffect, useState } from "react";

export default function ImagePage() {
  const [imageUUID, setImageUUID] = useState<string | null>(null);
  const { uuid } = useImageParams();
  const { image: img, isLoading } = useImage(imageUUID as string);

  useEffect(() => {
    if (uuid) {
      setImageUUID(uuid);
    }
  }, [uuid]);

  return (
    <>
      <Head>
        <title>DreamBG - Image</title>
      </Head>
      <Center>
        {!isLoading && (
          <ImageCard
            disableHover
            imageLink={img?.image_link as string}
            id={img?.image_uuid as string}
            likes={img?.num_likes as number}
          />
        )}
        {isLoading && <Loader size="xl" />}
      </Center>
    </>
  );
}
