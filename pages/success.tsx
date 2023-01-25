import Head from "next/head";
import { Center, SimpleGrid, Stack } from "@mantine/core";
import PaymentModal from "../components/common/PaymentModal";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome to DreamBG Pro</title>
      </Head>
      <Center>
        <Stack align="center">
          <h1>Welcome to DreamBG Pro</h1>
        </Stack>
      </Center>
    </div>
  );
}
