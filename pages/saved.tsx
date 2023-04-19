import { Center, SimpleGrid, Stack, Tabs, Title } from "@mantine/core";
import range from "@/utils/range";
import Head from "next/head";
import ImageCard from "@/components/common/ImageCard";
import LoaderCard from "@/components/common/LoaderCard";
import { useSavedImages } from "@/hooks/useSavedImages";
import { useUser } from "@supabase/auth-helpers-react";
import { createImageURL } from "@/utils/createImageURL";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";

export default function Saved() {
  const router = useRouter();
  const user = useUser();
  const [currentTab, setCurrentTab] = useState<string | null>("saved");
  const { images } = useSavedImages(
    user?.id as string,
    currentTab as "saved" | "liked" | "created"
  );

  useEffect(() => {
    if (!user) {
      showNotification({
        title: "Not logged in",
        message: "You must be logged in to view your saved images.",
      });
      router.push("/login?redirect=/saved");
    }
  }, [user, router]);

  const generateImages = () => {
    console.log(images);
    if (images) {
      return images.map((image, i: number) => {
        return (
          <div key={i}>
            <ImageCard
              id={image?.image_uuid as string}
              imageLink={image?.image_link as string}
              likes={image?.num_likes as number}
            />
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
        <title>My Images - DreamBG</title>
      </Head>
      <Tabs orientation="vertical" onTabChange={setCurrentTab}>
        <Tabs.List>
          {["saved", "liked"].map((i) => (
            <Tabs.Tab value={i}>
              {i.charAt(0).toUpperCase() + i.slice(1)} Images
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Center>
          {["saved", "liked"].map((i) => (
            <Tabs.Panel value={i}>
              <Stack>
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
            </Tabs.Panel>
          ))}
        </Center>
      </Tabs>
    </>
  );
}
