import { useActiveCustomer } from "@/hooks/useCustomer";
import { useUserLikes } from "@/hooks/useLikes";
import { useSavedImages } from "@/hooks/useSavedImages";
import { usePaymentModal } from "@/hooks/usePaymentModal";
import { Database } from "@/types/database.types";
import { useElementSize, useHover, useViewportSize } from "@mantine/hooks";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import abbrNum from "@/utils/abbrNumber";
import { createImageURL } from "@/utils/createImageURL";
import { showNotification } from "@mantine/notifications";
import {
  IconArrowBigTop,
  IconDeviceFloppy,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconDownload,
  IconPhoto,
  IconPhotoPlus,
  IconTrash,
  IconX,
} from "@tabler/icons";
import {
  Card,
  Image,
  Text,
  Center,
  Group,
  Tooltip,
  ActionIcon,
  Menu,
  Loader,
  ThemeIcon,
} from "@mantine/core";
import Link from "next/link";
import ShareButton from "./ShareButton";
import ProBadge from "./ProBadge";
import usePlatform from "@/hooks/usePlatform";

export interface ImageCardProps {
  id: string;
  width?: number;
  height?: number;
  disableHover?: boolean;
  sx?: any;
  imageLink: string;
  likes?: number;
  views?: number;
}

interface ImagesState {
  link: string;
  width: number;
  height: number;
}

const ImageCard = ({
  id,
  width,
  height,
  disableHover,
  sx,
  imageLink,
  likes,
  views,
}: ImageCardProps) => {
  const [imageLikes, setImageLikes] = useState(likes || 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [imageDownloads, setImageDownloads] = useState<ImagesState[]>([]);
  const [loadingImageLinks, setLoadingImageLinks] = useState(false);
  const [loadingLike, setLoadingLiked] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const { hovered, ref } = useHover();
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient<Database>();
  const { ref: sizeRef, width: refWidth } = useElementSize();
  const { width: viewWidth } = useViewportSize();

  const openPaymentModal = usePaymentModal();
  const { active } = useActiveCustomer();
  const { likes: userLikes, mutate: mutateLikes } = useUserLikes();
  const { images: userSaves, mutate: mutateSaved } = useSavedImages(user?.id);
  const { isMobile } = usePlatform();

  const liked = userLikes?.some((like) => like.image === id);
  const saved = userSaves?.some((save) => save.image_uuid === id);

  const hoverStyle =
    hovered && !disableHover
      ? {
          ...sx,
          transform: "scale(1.02)",
          transition: "transform 125ms ease",
          maxHeight: isMobile ? undefined : 530,
          minWidth: isMobile ? viewWidth * 0.9 : viewWidth * 0.2,
        }
      : {
          ...sx,
          transform: "scale(1)",
          transition: "transform 125ms ease",
          maxHeight: isMobile ? undefined : 530,
          minWidth: isMobile ? viewWidth * 0.9 : viewWidth * 0.2,
        };

  const vertical = width && height ? height > width : false;

  const downloadImage = async (imageLink: string) => {
    setIsDownloadingImage(true);
    // if we are gonna add advertisements, we should
    // add a check here to see if the user is a paid customer
    // if they are not, we should show a modal with an advertisement
    // and tell them if they are a member they can download the image with no ads

    // fetch the image
    const response = await fetch(createImageURL("ai-images", imageLink));
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

    setImageLikes(imageLikes + 1);

    mutateLikes();
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

    setImageLikes(imageLikes - 1);

    mutateLikes();
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
    await mutateSaved();
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
    await mutateSaved();
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
      return;
    }
    setLoadingImageLinks(true);
    try {
      const { data, error } = await supabase.functions.invoke("get-images", {
        body: { uuid: id },
      });
      if (error) {
        throw error;
      }
      setImageDownloads(data as ImagesState[]);
    } catch (e) {
      console.error(e);
      showNotification({
        color: "red",
        title: "Error",
        icon: <IconX />,
        message: "There was an error getting the image download.",
      });
    }
    setLoadingImageLinks(false);
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
      <Card.Section ref={sizeRef}>
        <Link href={`/image?uuid=${id}`}>
          <Image
            height={isMobile ? refWidth * 1.7 : refWidth * 0.6}
            width={refWidth}
            src={createImageURL("ai-images", imageLink)}
            alt={"image"}
          />
        </Link>
      </Card.Section>

      <Center mt="md">
        <Group>
          {typeof likes === "number" && (
            <Text fw={700}>{abbrNum(imageLikes)}</Text>
          )}
          <Tooltip label={liked ? "Unlike" : "Like"}>
            <ActionIcon
              onClick={liked ? unlikeImage : likeImage}
              loading={loadingLike}
              variant={liked ? "filled" : "subtle"}
              color={"orange.5"}
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
                  color="grape"
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
                disabled={loadingImageLinks || imageDownloads.length === 0}
                fw={700}
                onClick={() => downloadImage(imageDownloads[0].link)}
                icon={
                  loadingImageLinks ? (
                    <Loader color="pink" size="xs" />
                  ) : (
                    <IconPhoto size={14} />
                  )
                }
              >
                720p
              </Menu.Item>
              <Menu.Item
                disabled={loadingImageLinks || imageDownloads.length === 0}
                onClick={() => downloadImage(imageDownloads[1].link)}
                fw={700}
                icon={
                  loadingImageLinks ? (
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
                disabled={loadingImageLinks || imageDownloads.length === 0}
                onClick={() =>
                  active
                    ? downloadImage(imageDownloads[2].link)
                    : openPaymentModal()
                }
                fw={700}
                icon={
                  loadingImageLinks ? (
                    <Loader color="pink" size="xs" />
                  ) : (
                    <IconPhotoPlus size={14} />
                  )
                }
              >
                1440p <ProBadge ml="sm" />
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  active
                    ? downloadImage(imageDownloads[3].link)
                    : openPaymentModal()
                }
                disabled={loadingImageLinks || imageDownloads.length === 0}
                fw={700}
                icon={
                  loadingImageLinks ? (
                    <Loader color="pink" size="xs" />
                  ) : (
                    <IconPhotoPlus size={14} />
                  )
                }
              >
                4K <ProBadge ml="sm" />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Tooltip label={saved ? "Unsave image" : "Save Image"}>
            <ActionIcon
              loading={loadingSaved}
              onClick={saved ? unSaveImage : saveImage}
              variant={saved ? "filled" : "subtle"}
              color={saved ? "red" : "green.4"}
            >
              {saved ? <IconTrash /> : <IconDeviceFloppy />}
            </ActionIcon>
          </Tooltip>
          <ShareButton id={id} />
          {height && width && (
            <Tooltip label={`Optimized for ${vertical ? "mobile" : "desktop"}`}>
              <ThemeIcon variant="default">
                {vertical ? <IconDeviceMobile /> : <IconDeviceDesktop />}
              </ThemeIcon>
            </Tooltip>
          )}
        </Group>
      </Center>
    </Card>
  );
};

export default ImageCard;
