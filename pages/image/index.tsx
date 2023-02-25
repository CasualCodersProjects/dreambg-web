import Head from "next/head";
import { Center, Loader } from "@mantine/core";
import ImageCard from "@/components/common/ImageCard";
import { useImageParams } from "@/hooks/useQueryParams";

export default function ImagePage() {
  const { image, uuid } = useImageParams();

  const id = image || uuid;

  return (
    <>
      <Head>
        <title>DreamBG - Image</title>
      </Head>
      <Center>
        {id && <ImageCard disableHover id={id as string} />}
        {!id && <Loader size="xl" />}
      </Center>
    </>
  );
}
