import { useInfiniteSearch, useSearchCount } from "@/hooks/useSearch";
import ImageCard from "@/components/common/ImageCard";
import { Center, SimpleGrid, Stack, Title } from "@mantine/core";
import Head from "next/head";
import { useEffect } from "react";
import { useSearchParam } from "react-use";
import genLoaders from "@/utils/genLoaders";
import { useIntersection, useMediaQuery } from "@mantine/hooks";
import { Image } from "@/types/imageInfo";

export default function Search() {
  const { ref, entry } = useIntersection();
  const query = useSearchParam("q");
  const { images, size, setSize } = useInfiniteSearch(query || "");
  const { count } = useSearchCount(query || "");
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

  useEffect(() => {
    console.log(count, images?.length);
  }, [count, images]);

  const generateImages = () => {
    if (images) {
      return images.map((image: Image, i) => {
        // if its the last card,
        // add the intersection observer
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
        <title>Search - DreamBG</title>
      </Head>

      <Center>
        <Stack align="center">
          <Title>Search Results</Title>
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
            {count === 0 && <Title>No results found</Title>}
            {count && images && count >= images.length && genLoaders(12)}
          </SimpleGrid>
        </Stack>
      </Center>
    </>
  );
}
