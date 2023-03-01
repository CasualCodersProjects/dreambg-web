import Head from "next/head";
import {
  Badge,
  Center,
  Group,
  Image,
  Loader,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { ImageControls } from "@/components/common/ImageCard";
import { useImageParams } from "@/hooks/useQueryParams";
import { useImage } from "@/hooks/useImages";
import { useEffect, useState } from "react";
import { createImageURL } from "@/utils/createImageURL";
import { useImageTags } from "@/hooks/useTags";

export default function ImagePage() {
  const theme = useMantineTheme();
  const [imageUUID, setImageUUID] = useState<string | null>(null);
  const { uuid } = useImageParams();
  const { image: img, isLoading } = useImage(imageUUID as string);
  const { tags } = useImageTags(imageUUID ? imageUUID : undefined);

  const getRandomColor = () => {
    const colors = Object.keys(theme.colors);
    const random = Math.floor(Math.random() * 13) + 2;
    return colors[random];
  };

  const searchTag = (tag: string) => {
    window.location.href = `${window.location.origin}/search?q=${tag}`;
  };

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
      <Center mx="xl">
        <Stack>
          {!isLoading && (
            <Image
              alt="image"
              fit="contain"
              height="60vh"
              src={createImageURL("ai-images", img?.image_link as string)}
              radius="xl"
            />
          )}
          {isLoading && <Loader size="xl" />}
          <Group position="center" sx={{ maxWidth: 1500 }}>
            {tags?.length > 0 &&
              tags.map((tag, key) => {
                const color = getRandomColor();
                return (
                  <Badge
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => searchTag(tag)}
                    color={color}
                    key={key}
                  >
                    {tag}
                  </Badge>
                );
              })}
          </Group>
          <Center>
            {!isLoading && (
              <ImageControls
                id={imageUUID as string}
                likes={img?.num_likes as number}
                vertical={
                  img?.height && img?.width ? img?.height > img?.width : false
                }
              />
            )}
          </Center>
        </Stack>
      </Center>
    </>
  );
}
