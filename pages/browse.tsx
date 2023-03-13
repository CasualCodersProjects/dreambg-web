import Head from "next/head";
import { useEffect } from "react";
import { useRandomImages } from "@/hooks/useImages";
import ImageCard from "@/components/common/ImageCard";
import { Center, SimpleGrid, Stack } from "@mantine/core";
import { useIntersection, useMediaQuery } from "@mantine/hooks";
import genLoaders from "@/utils/genLoaders";
import { useVertical } from "@/hooks/useVertical";

export default function Browse() {
  const { ref, entry } = useIntersection();
  const { vertical } = useVertical();
  const { images: randomImages, size, setSize } = useRandomImages(vertical);
  const xl = useMediaQuery("(min-width: 1250px)");

  const loadMore = () => {
    setSize(size + 1);
  };

  useEffect(() => {
    if (entry?.isIntersecting) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  // flatten images
  const images = randomImages?.flat();

  const generateImages = () => {
    // check if images is an array of falsy values

    if (images) {
      return images.map((image, i) => {
        if (!image) return null;
        return (
          <div key={i} ref={i === images.length - 1 ? ref : undefined}>
            <ImageCard
              id={image?.image_uuid as string}
              imageLink={image?.image_link as string}
              likes={image?.num_likes as number}
              height={image?.height as number}
              width={image?.width as number}
            />
          </div>
        );
      });
    }

    return genLoaders(24);
  };

  return (
    <>
      <Head>
        <title>DreamBG - Browse Backgrounds</title>
        <meta
          name="description"
          content="The coolest backgrounds you've never seen."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center>
        <Stack align="center">
          <SimpleGrid
            cols={4}
            spacing="xl"
            px={xl ? "xl" : undefined}
            breakpoints={[
              { maxWidth: "sm", cols: 1, spacing: "sm" },
              { maxWidth: "lg", cols: 2, spacing: "md" },
              { maxWidth: 1500, cols: 3, spacing: "lg" },
            ]}
          >
            {generateImages()}
            {genLoaders(12)}
          </SimpleGrid>
        </Stack>
      </Center>
    </>
  );
}
