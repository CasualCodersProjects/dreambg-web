import Head from "next/head";
import { useRouter } from "next/router";
import { Center } from "@mantine/core";
// import ImageCard from "@/components/common/ImageCard";
import { useEffect } from "react";

export default function ImagePage() {
  const router = useRouter();

  useEffect(() => {
    console.log(window.location.href);
  }, []);

  return (
    <>
      <Head>
        <title>DreamBG - Image</title>
      </Head>
      <Center>
        <h1>This is a test</h1>
      </Center>
    </>
  );
}
