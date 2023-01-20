import { Center, SimpleGrid, Stack, Title } from "@mantine/core";
import range from "@/utils/range";
import Head from "next/head";
import ImageCard from "@/components/common/ImageCard";
import LoaderCard from "@/components/common/LoaderCard";
import { useSavedImages } from "@/hooks/useSavedImages";
import { useUser } from "@supabase/auth-helpers-react";
import { createImageURL } from "@/utils/createImageURL";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";

export default function Saved() {
  const router = useRouter();
  const user = useUser();
  const { images } = useSavedImages(user?.id as string);

  useEffect(() => {
    if (!user) {
      showNotification({
        title: "Not logged in",
        message: "You must be logged in to view your saved images.",
      });
      router.push("/login");
    }
  }, [user, router]);

  const generateImages = () => {
    if (images) {
      return images.map((image: any, i: number) => {
        return (
          <div key={i}>
            <ImageCard id={image.uuid as string} />
          </div>
        );
      });
    }

    return range(24).map((i) => {
      return (
        <div key={i}>
          <LoaderCard />
        </div>
      );
    });
  };

  return (
    <>
      <Head>
        <title>Saved Images - DreamBG</title>
      </Head>
      <Center>
        <Stack>
          <Title>Saved Images</Title>
          <SimpleGrid
            cols={4}
            spacing="xl"
            breakpoints={[
              { maxWidth: "sm", cols: 1, spacing: "sm" },
              { maxWidth: "lg", cols: 2, spacing: "md" },
              { maxWidth: 2000, cols: 3, spacing: "lg" },
            ]}
          >
            {generateImages()}
          </SimpleGrid>
        </Stack>
      </Center>
    </>
  );
}
