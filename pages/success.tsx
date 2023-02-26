import Head from "next/head";
import { Center, Loader, Stack, Title } from "@mantine/core";
import { useActiveCustomer } from "@/hooks/useCustomer";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useUser } from "@supabase/auth-helpers-react";

export default function Home() {
  const { active, isLoading } = useActiveCustomer();
  const { height, width } = useWindowSize();
  const user = useUser();
  return (
    <div>
      {active && <Confetti width={width} height={height} />}
      <Head>
        {active && <title>DreamBG Pro - Welcome</title>}
        {!active && <title>DreamBG - Welcome</title>}
      </Head>
      <Center>
        {active && !isLoading && user && <Title>Welcome to DreamBG Pro!</Title>}
        {!active && !isLoading && user && (
          <Title>Thank you for signing up!</Title>
        )}
        {isLoading && <Loader size="xl" />}
        {!user && <Title>Not signed in</Title>}
      </Center>
    </div>
  );
}
