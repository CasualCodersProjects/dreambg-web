import { useSearch } from "@/hooks/useSearch";
import ImageCard from "@/components/common/OldImageCard";
import { Center, SimpleGrid, Stack, Button, Title } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import { useSearchParam } from "react-use";
import genLoaders from "@/utils/genLoaders";

export default function Search() {
  const [page, setPage] = useState(0);
  const query = useSearchParam("q");
  const { images } = useSearch(query as string, page, 26);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 0) return;
    setPage(page - 1);
  };

  const generateImages = () => {
    if (images) {
      return images.map((image, i) => {
        return (
          <div key={i}>
            <ImageCard id={image.uuid as string} />
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
