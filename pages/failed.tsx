import Head from "next/head";
import { Center, Stack } from "@mantine/core";

export default function PaymentFailed() {
  return (
    <div>
      <Head>
        <title>Payment Failed</title>
      </Head>
      <Center>
        <Stack align="center">
          <h1>Payment failed.</h1>
        </Stack>
      </Center>
    </div>
  );
}
