import Head from "next/head";
import { useRouter } from "next/router";
import { Center, Stack, Button } from "@mantine/core";

export default function PaymentFailed() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Payment Failed</title>
      </Head>
      <Center>
        <Stack align="center">
          <h1>Payment failed.</h1>
          <Button
            onClick={() => router.push("/browse")}
            variant="subtle"
            size="md"
          >
            Take me back to home page
          </Button>
        </Stack>
      </Center>
    </div>
  );
}
