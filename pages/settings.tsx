import Head from "next/head";
import { useRouter } from "next/router";
import { Center, Title, Stack, Button } from "@mantine/core";

export default function Settings() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Center>
        <Stack>
          <Title>Coming Soon</Title>
          <Button
            onClick={() => {
              router.push("/");
            }}
          >
            Go Home
          </Button>
        </Stack>
      </Center>
    </>
  );
}
