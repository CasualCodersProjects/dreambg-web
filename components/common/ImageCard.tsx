import {
  ActionIcon,
  Card,
  Center,
  Group,
  Image,
  Text,
  Tooltip,
  Menu,
  Badge,
  ThemeIcon,
  Loader,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { useState } from "react";
import Link from "next/link";
import {
  IconArrowBigTop,
  IconDeviceFloppy,
  IconDownload,
  IconPhoto,
  IconPhotoPlus,
  IconTrash,
  IconX,
} from "@tabler/icons";
import abbrNum from "@/utils/abbrNumber";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useDownloadImage, useImage } from "@/hooks/useImages";
import { useSavedImage } from "@/hooks/useSavedImages";
import { useLikes, useUserLiked } from "@/hooks/useLikes";
import { showNotification } from "@mantine/notifications";
import { createImageURL } from "@/utils/createImageURL";
import ShareButton from "./ShareButton";
import { useActiveCustomer } from "@/hooks/useCustomer";
import { usePaymentModal } from "@/hooks/usePaymentModal";
import ProBadge from "./ProBadge";

export interface ImageCardProps {
  id: string;
  width?: number | string;
  height?: number | string;
  disableHover?: boolean;
  sx?: any;
}

interface ImagesState {
  link: string;
  width: number;
  height: number;
}

export const DEFAULT_WIDTH = 356;
export const DEFAULT_HEIGHT = 200;

const ImageCard = ({ id, width, height, disableHover, sx }: ImageCardProps) => {
  const { image } = useImage(id);
  const [images, setImages] = useState<ImagesState[]>([]);
  const { hovered, ref } = useHover();
  const [loadingSaved, setLoadingSaved] = useState<boolean>(false);
  const [loadingLiked, setLoadingLiked] = useState<boolean>(false);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { image: savedImage, mutate } = useSavedImage(id as string);
  const { liked, mutate: mutateLike } = useUserLiked(id as string);
  const { likes, mutate: mutateLikes } = useLikes(id as string);
  const { active } = useActiveCustomer();
  const openPaymentModal = usePaymentModal();

  const imageLink720p = createImageURL("ai-images", image?.link as string);

  const imageLink1080p = createImageURL(
    "ai-images",
    images?.[1]?.link as string
  );

  const imageLink1440p = createImageURL(
    "ai-images",
    images?.[2]?.link as string
  );

  const imageLink2160p = createImageURL(
    "ai-images",
    images?.[3]?.link as string
  );

  const downloadImage = async (imageLink: string) => {
    setIsDownloadingImage(true);
    // if we are gonna add advertisements, we should
    // add a check here to see if the user is a paid customer
    // if they are not, we should show a modal with an advertisement
    // and tell them if they are a member they can download the image with no ads

    // fetch the image
    const response = await fetch(imageLink);
    // get the response as a blob
    const blob = await response.blob();
    // create an invisible link
    const link = document.createElement("a");
    // attach the object to it
    link.href = URL.createObjectURL(blob);
    // set the name (we should change this later to be tags but for now its fine)
    link.download = id + ".jpg";
    // download the image to their disk
    link.click();
    setIsDownloadingImage(false);
  };

  const hoverStyle =
    hovered && !disableHover
      ? {
          ...sx,
          transform: "scale(1.01)",
          transition: "transform 125ms ease",
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

  const getImageDownload = async () => {
    if (!user) {
      showNotification({
        title: "Not Logged In",
        message: "Please log in to download images. (Its free! 😄 )",
        color: "yellow",
      });
      router.push("/login");
    }
    setIsLoadingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke("get-images", {
        body: { uuid: id },
      });
      if (error) {
        throw error;
      }
      setImages(data as ImagesState[]);
    } catch (e) {
      console.error(e);
      showNotification({
        color: "red",
        title: "Error",
        icon: <IconX />,
        message: "There was an error getting the image download.",
      });
    }
    setIsLoadingImage(false);
  };

  return (
    <Card
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      ref={ref}
      radius="md"
      sx={hoverStyle}
    >
      <Card.Section>
        <Link href={`/image?uuid=${id}`}>
          <Image
            src={imageLink720p}
            alt={"image"}
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
          <Menu
            opened={menuOpen}
            onChange={setMenuOpen}
            onOpen={getImageDownload}
            position="bottom-start"
          >
            <Menu.Target>
              <Tooltip label="Download">
                <ActionIcon
                  color="violet"
                  variant={menuOpen ? "filled" : "subtle"}
                  loading={isDownloadingImage}
                  disabled={isDownloadingImage}
                >
                  <IconDownload />
                </ActionIcon>
              </Tooltip>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Download Image</Menu.Label>
              <Menu.Item
                disabled={isLoadingImage}
                fw={700}
                onClick={() => downloadImage(imageLink720p)}
                icon={
                  isLoadingImage ? (
                    <Loader color="pink" size="xs" />
                  ) : (
                    <IconPhoto size={14} />
                  )
                }
              >
                720p
              </Menu.Item>
              <Menu.Item
                onClick={() => downloadImage(imageLink1080p)}
                disabled={isLoadingImage}
                fw={700}
                icon={
                  isLoadingImage ? (
                    <Loader color="pink" size="xs" />
                  ) : (
                    <IconPhoto size={14} />
                  )
                }
              >
                1080p
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                onClick={() =>
                  active ? downloadImage(imageLink1440p) : openPaymentModal()
                }
                disabled={isLoadingImage}
                fw={700}
                icon={
                  isLoadingImage ? (
                    <Loader color="pink" size="xs" />
                  ) : (
                    <IconPhotoPlus size={14} />
                  )
                }
              >
                1440p <ProBadge />
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  active ? downloadImage(imageLink2160p) : openPaymentModal()
                }
                disabled={isLoadingImage}
                fw={700}
                icon={
                  isLoadingImage ? (
                    <Loader color="pink" size="xs" />
                  ) : (
                    <IconPhotoPlus size={14} />
                  )
                }
              >
                4K <ProBadge />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

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
