import { Center, Loader, Stack, ThemeIcon, Title } from "@mantine/core";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { IconAlertCircle, IconCheckbox } from "@tabler/icons";
import Head from "next/head";
import { useState } from "react";
import { useAsync } from "react-use";

export default function SignupSuccess() {
  const [isLoading, setIsLoading] = useState<boolean | null>(true);
  const supabase = useSupabaseClient();
  const user = useUser();

  useAsync(async () => {
    const { data, error } = await supabase.functions.invoke("new-customer");

    if (data) {
      setIsLoading(false);
    } else {
      console.error(error);
      setIsLoading(null);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Signup - DreamBG</title>
      </Head>

      <Center>
        {isLoading ? (
          <Stack>
            <Title>Finalizing Signup...</Title>
            <Center>
              <Loader size="xl" />
            </Center>
          </Stack>
        ) : isLoading === false ? (
          <Stack>
            <Title>Signup Successful!</Title>
            <Center>
              <ThemeIcon size="xl" color="green" variant="outline">
                <IconCheckbox />
              </ThemeIcon>
            </Center>
          </Stack>
        ) : (
          <Stack>
            <Title>Signup Failed.</Title>
            <Center>
              <ThemeIcon size="xl" color="red" variant="outline">
                <IconAlertCircle />
              </ThemeIcon>
            </Center>
          </Stack>
        )}
      </Center>
    </>
  );
}
