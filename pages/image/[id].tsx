import Head from "next/head";
import { useRouter } from "next/router";
import { Center } from "@mantine/core";
import ImageCard from "@/components/common/ImageCard";

export default function ImagePage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>DreamBG - Image</title>
      </Head>
      <Center>
        <ImageCard disableHover id={id as string} />
      </Center>
    </>
  );
}
