import { useImage } from "@/hooks/useImages";
import Head from "next/head";
import { Center, Stack, Image, Button, Group, Skeleton, ActionIcon, Tooltip } from "@mantine/core";
import { IconDeviceFloppy, IconDownload, IconTrash } from "@tabler/icons";
import { useRouter } from "next/router";
import { createImageURL } from "@/utils/createImageURL";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import ShareButton from "@/components/common/ShareButton";
import { useSavedImage } from "@/hooks/useSavedImages";

export default function ImagePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { id } = router.query;
  const { image } = useImage(id as string);
  const { image: savedImage, mutate } = useSavedImage(id as string);

  const saveImage = async () => {
    if (!user) {
      showNotification({
        title: "Not Logged In",
        message: "Please log in to save images."
      })
      router.push("/login");
      return;
    }
    setLoading(true);
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
    setLoading(false);
  };

  const unSaveImage = async () => {
    setLoading(true);
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
    setLoading(false);
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
                <Tooltip label="Download">
                  <ActionIcon
                  component="a"
                  href={createImageURL("ai-images", image.link)}
                  target="_blank"
                  >
                    <IconDownload/>
                  </ActionIcon>
                </Tooltip>

                {!savedImage ? (
                  <Tooltip label="Save Image">
                    <ActionIcon
                    loading={loading}
                    onClick={saveImage}
                    >
                      <IconDeviceFloppy/>
                    </ActionIcon>
                  </Tooltip>
                  // <Button
                  //   loading={loading}
                  //   disabled={!user}
                  //   onClick={saveImage}
                  //   leftIcon={<IconDeviceFloppy size={18} />}
                  // >
                  //   {user ? "Save Image" : "Login to save"}
                  // </Button>
                ) : (
                  <Tooltip label="Unsave image">
                    <ActionIcon
                      loading={loading}
                      onClick={unSaveImage}
                      variant="filled"
                      color="red"
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Tooltip>
                )}

                <ShareButton />
              </Group>
            </Stack>
          </>
        )}
      </Center>
    </>
  );
}
