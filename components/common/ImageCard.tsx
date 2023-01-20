import {
  ActionIcon,
  Card,
  Group,
  Image,
  Text,
  Center,
  Tooltip,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useState } from "react";
import Link from "next/link";
import {
  IconArrowBigTop,
  IconDeviceFloppy,
  IconDownload,
  IconTrash,
} from "@tabler/icons";
import abbrNum from "@/utils/abbrNumber";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useImage } from "@/hooks/useImages";
import { useSavedImage } from "@/hooks/useSavedImages";
import { useUserLiked, useLikes } from "@/hooks/useLikes";
import { showNotification } from "@mantine/notifications";
import { createImageURL } from "@/utils/createImageURL";
import ShareButton from "./ShareButton";

export interface ImageCardProps {
  id: string;
  width?: number | string;
  height?: number | string;
  disableHover?: boolean;
  sx?: any;
}

export const DEFAULT_WIDTH = 356;
export const DEFAULT_HEIGHT = 200;

const ImageCard = ({ id, width, height, disableHover, sx }: ImageCardProps) => {
  const { hovered, ref } = useHover();
  const [loadingSaved, setLoadingSaved] = useState<boolean>(false);
  const [loadingLiked, setLoadingLiked] = useState<boolean>(false);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { image } = useImage(id as string);
  const { image: savedImage, mutate } = useSavedImage(id as string);
  const { liked, mutate: mutateLike } = useUserLiked(id as string);
  const { likes, mutate: mutateLikes } = useLikes(id as string);

  const hoverStyle =
    hovered && !disableHover
      ? {
          ...sx,
          transform: "scale(1.05)",
        }
      : { ...sx };

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
    <Card ref={ref} radius="md" sx={hoverStyle}>
      <Card.Section>
        <Link href={`/image/${id}`}>
          <Image
            src={createImageURL("ai-images", image?.link as string)}
            alt={image?.link}
            height={height}
            width={width}
            withPlaceholder
            placeholder={<Text align="center">Image failed to load.</Text>}
          />
        </Link>
      </Card.Section>

      <Center mt="md">
        <Group>
          {typeof likes === "number" && <Text fw={700}>{abbrNum(likes)}</Text>}
          <Tooltip label={liked ? "Unlike" : "Like"}>
            <ActionIcon
              onClick={liked ? unlikeImage : likeImage}
              loading={loadingLiked}
              variant={liked ? "filled" : "subtle"}
              color={"orange"}
            >
              <IconArrowBigTop />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Download">
            <ActionIcon
              color="violet"
              component="a"
              href={createImageURL("ai-images", image?.link as string)}
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
          <ShareButton id={id} />
        </Group>
      </Center>
    </Card>
  );
};

export default ImageCard;
