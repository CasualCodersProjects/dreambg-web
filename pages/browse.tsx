import Head from "next/head";
import { useEffect } from "react";
import { useInfiniteImages } from "@/hooks/useImages";
import ImageCard from "@/components/common/ImageCard";
import { Center, SimpleGrid, Stack } from "@mantine/core";
import { useIntersection, useMediaQuery } from "@mantine/hooks";
import genLoaders from "@/utils/genLoaders";

export default function Browse() {
  const { ref, entry } = useIntersection();
  const { images: infiniteImages, size, setSize } = useInfiniteImages();
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

  // flatten infinite images
  const images = infiniteImages?.flat();

  const generateImages = () => {
    // check if images is an array of falsy values

    if (images) {
      return images.map((image, i) => {
        if (!image) return null;
        return (
          <div key={i}>
            <ImageCard id={image.image as string} />
          </div>
        );
      });
    }

    return genLoaders(24);
  };

  return (
    <>
      <Head>
        <title>DreamBG</title>
        <meta name="description" content="Generated by create next app" />
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
          </SimpleGrid>
          <div ref={ref}></div>
          <SimpleGrid
            cols={4}
            spacing="xl"
            px={xl ? "xl" : undefined}
            breakpoints={[
              { maxWidth: "sm", cols: 1, spacing: "sm" },
              { maxWidth: "lg", cols: 2, spacing: "md" },
              { maxWidth: "xl", cols: 3, spacing: "lg" },
            ]}
          >
            {genLoaders(12)}
          </SimpleGrid>
        </Stack>
      </Center>
    </>
  );
}
