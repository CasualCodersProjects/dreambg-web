import { createStyles, Paper } from "@mantine/core";
import { useEffect, useState } from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import Head from "next/head";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import LoginForm from "@/components/modules/LoginForm";
import { ForgotPassword } from "@/components/modules/ForgotPassword";

const IMAGE_LIST = [
  "cyberpunkMountains.jpg",
  "cyberpunkMountains2.jpg",
  "cyberpunkMountains3.jpg",
];

const RANDOM_IMAGE = IMAGE_LIST[Math.floor(Math.random() * IMAGE_LIST.length)];

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundPositionY: "center",
    backgroundImage: `url(/images/${RANDOM_IMAGE})`,
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
  const [forgotPassword, setForgotPassword] = useState(false);
  const { classes } = useStyles();
  const router = useRouter();
  const user = useUser();

  const supabase = useSupabaseClient();

  useEffect(() => {
    if (user) router.push("/browse");
  }, [user, router]);

  return (
    <div className={classes.wrapper}>
      <Head>
        <title>Login - DreamBG</title>
      </Head>
      <Paper className={classes.form} radius={0} p={30}>
        {!forgotPassword && (
          <LoginForm onClickForgotPassword={() => setForgotPassword(true)} />
        )}
        {forgotPassword && (
          <ForgotPassword onClickBack={() => setForgotPassword(false)} />
        )}
      </Paper>
    </div>
  );
}

export default Login;
