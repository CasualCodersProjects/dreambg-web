import Head from "next/head";
import { Center, Stack } from "@mantine/core";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome to DreamBG Pro</title>
      </Head>
      <Center>
        <Stack align="center">
          <h1>Welcome to DreamBG Pro!</h1>
        </Stack>
      </Center>
    </div>
  );
}
