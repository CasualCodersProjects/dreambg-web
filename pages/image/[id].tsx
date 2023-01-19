import { useImage } from "@/hooks/useImages";
import Head from "next/head";
import {
  Center,
  Stack,
  Image,
  Text,
  Group,
  Skeleton,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconDeviceFloppy,
  IconDownload,
  IconHeart,
  IconHeartOff,
  IconTrash,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { createImageURL } from "@/utils/createImageURL";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import ShareButton from "@/components/common/ShareButton";
import { useSavedImage } from "@/hooks/useSavedImages";
import { useLikes, useUserLiked } from "@/hooks/useLikes";
import abbrNum from "@/utils/abbrNumber";

export default function ImagePage() {
  const [loadingSaved, setLoadingSaved] = useState<boolean>(false);
  const [loadingLiked, setLoadingLiked] = useState<boolean>(false);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { id } = router.query;
  const { image } = useImage(id as string);
  const { image: savedImage, mutate } = useSavedImage(id as string);
  const { liked, mutate: mutateLike } = useUserLiked(id as string);
  const { likes, mutate: mutateLikes } = useLikes(id as string);

  const likeImage = async () => {
    if (!user) {
      showNotification({
        title: "Not Logged In",
        message: "Please log in to like images.",
      });
      router.push("/login");
      return;
    }

    setLoadingLiked(true);
    const { error } = await supabase
      .from("likes")
      .insert({ user_id: user?.id, image: id });

    if (error) {
      console.error(error);
    }

    showNotification({
      title: "Image liked",
      message: "The image has been liked.",
    });

    mutateLikes();
    await mutateLike();
    setLoadingLiked(false);
  };

  const unlikeImage = async () => {
    setLoadingLiked(true);
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", user?.id)
      .eq("image", id);

    if (error) {
      console.error(error);
    }

    showNotification({
      title: "Image unliked",
      message: "The image has been unliked.",
    });

    mutateLikes();
    await mutateLike();
    setLoadingLiked(false);
  };

  const saveImage = async () => {
    if (!user) {
      showNotification({
        title: "Not Logged In",
        message: "Please log in to save images.",
      });
      router.push("/login");
      return;
    }
    setLoadingSaved(true);
    const { error } = await supabase
      .from("user_saved_images")
      .insert({ user_id: user?.id, image_id: id });

    if (error) {
      console.error(error);
    }
    showNotification({
      title: "Image saved",
      message: "The image has been saved to your profile.",
    });
    await mutate();
    setLoadingSaved(false);
  };

  const unSaveImage = async () => {
    setLoadingSaved(true);
    const { error } = await supabase
      .from("user_saved_images")
      .delete()
      .eq("user_id", user?.id)
      .eq("image_id", id);

    if (error) {
      console.error(error);
    }
    showNotification({
      title: "Image unsaved",
      message: "The image has been unsaved from your profile.",
    });
    await mutate();
    setLoadingSaved(false);
  };

  return (
    <>
      <Head>
        {/* This image title should probably be a few of the image tags. */}
        <title>Image - DreamBG</title>
      </Head>
      <Center>
        {!image ? (
          <Skeleton sx={{ maxWidth: "95vw" }} height={"75vh"} radius="xl" />
        ) : (
          <>
            <Stack spacing="xl" align="center" justify="center">
              <Image
                src={createImageURL("ai-images", image.link)}
                alt={image.link}
                height={"75vh"}
                sx={{ maxWidth: "95vw" }}
                fit="contain"
                radius="xl"
              />
              <Group>
                {typeof likes === "number" && (
                  <Text fw={700}>{abbrNum(likes, 0)}</Text>
                )}
                <Tooltip label={liked ? "Unlike" : "Like"}>
                  <ActionIcon
                    onClick={liked ? unlikeImage : likeImage}
                    loading={loadingLiked}
                    variant={liked ? "filled" : "subtle"}
                    color={"red"}
                  >
                    {liked ? <IconHeartOff /> : <IconHeart />}
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Download">
                  <ActionIcon
                    color="violet"
                    component="a"
                    href={createImageURL("ai-images", image.link)}
                    target="_blank"
                  >
                    <IconDownload />
                  </ActionIcon>
                </Tooltip>

                <Tooltip label={savedImage ? "Unsave image" : "Save Image"}>
                  <ActionIcon
                    loading={loadingSaved}
                    onClick={savedImage ? unSaveImage : saveImage}
                    variant={savedImage ? "filled" : "subtle"}
                    color={savedImage ? "red" : "green"}
                  >
                    {savedImage ? <IconTrash /> : <IconDeviceFloppy />}
                  </ActionIcon>
                </Tooltip>
                <ShareButton />
              </Group>
            </Stack>
          </>
        )}
      </Center>
    </>
  );
}
