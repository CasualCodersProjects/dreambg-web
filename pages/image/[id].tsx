import { useImage } from "@/hooks/useImages";
import { Center, Loader, Stack, Image, Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons";
import { useRouter } from "next/router";
import { createImageURL } from "@/utils/createImageURL";

export default function ImagePage() {
  const router = useRouter();
  const { id } = router.query;
  const { image } = useImage(id as string);

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
