import { ResetPassword } from "@/components/modules/ResetPassword";
import { Center } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PasswordReset() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      showNotification({
        title: "You must be logged in to access this page",
        message: "Please login to continue",
        color: "red",
      });
      router.push("/login");
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>DreamBG - Password Reset</title>
      </Head>
      <Center>
        <ResetPassword />
      </Center>
    </>
  );
}
