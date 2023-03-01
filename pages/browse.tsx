import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Browse() {
  const router = useRouter();

  useEffect(() => {
    router.push("/likes");
  }, [router]);
  return (
    <>
      <Head>
        <title>DreamBG - Backgrounds</title>
      </Head>
    </>
  );
}
