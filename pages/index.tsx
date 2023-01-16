import Head from "next/head";
import { useEffect, useState } from "react";
import { useImages } from "@/hooks/useImages";
import ImageCard from "@/components/common/ImageCard";
import LoaderCard from "@/components/common/LoaderCard";
import { Loader, Center, SimpleGrid, Stack, Button } from "@mantine/core";
import { createImageURL } from "@/utils/createImageURL";
import range from "@/utils/range";

const PER_PAGE = 26;

export default function Home() {
  const [page, setPage] = useState(0);
  const { images } = useImages(page, PER_PAGE);

  const generateImages = () => {
    if (images) {
      return images.map((image, i) => {
        const vertical = image.height > image.width;
        return (
          <div key={i}>
            <ImageCard
              vertical={vertical}
              imageURL={createImageURL("ai-images", image.link)}
              href={`/image/${image.image}`}
            />
          </div>
        );
      });
    }

    return range(PER_PAGE - 1).map((i) => {
      return (
        <div key={i}>
          <LoaderCard />
        </div>
      );
    });
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 0) return;
    setPage(page - 1);
  };

  useEffect(() => {
    console.log({ page });
  }, [page]);

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
            breakpoints={[
              { maxWidth: "sm", cols: 1, spacing: "sm" },
              { maxWidth: "lg", cols: 2, spacing: "md" },
              { maxWidth: 2000, cols: 3, spacing: "lg" },
            ]}
          >
            {generateImages()}
          </SimpleGrid>
          <Button onClick={nextPage}>Load More</Button>
          <Button onClick={prevPage}>Previous Page</Button>
        </Stack>
      </Center>
    </>
  );
}
