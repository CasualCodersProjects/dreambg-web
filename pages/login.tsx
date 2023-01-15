import { Paper, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import Head from "next/head";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

// this page needs improved

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://pub-b40b2b1230da43ca8e747ec1ee3e2be1.r2.dev/ai-images/6771e53f-1b52-4174-9197-018edd37bf26.jpg)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export function Login() {
  const { classes } = useStyles();
  const router = useRouter();
  const user = useUser();

  const supabase = useSupabaseClient();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  return (
    <div className={classes.wrapper}>
      <Head>
        <title>Login - DreamBG</title>
      </Head>
      <Paper className={classes.form} radius={0} p={30}>
        <Auth
          supabaseClient={supabase}
          magicLink={true}
          theme="dark"
          // providers={["google", "facebook", "apple"]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#1971c2",
                  brandAccent: "#1864ab",
                },
              },
            },
          }}
        />
      </Paper>
    </div>
  );
}

export default Login;
