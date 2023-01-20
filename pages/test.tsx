import Head from "next/head";
import { Center, SimpleGrid, Stack } from "@mantine/core";
import PaymentModal from "../components/common/PaymentModal";

export default function Home() {

  return (
    <div>
      <Head>
        <title>Test Page - DreamBG</title>
      </Head>
      <Center>
        <Stack align="center">
          <h1>Test page</h1>
          <PaymentModal />
        </Stack>
      </Center>
    </div>
  );

}

