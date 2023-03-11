import { createStyles, Paper } from "@mantine/core";
import { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import LoginForm from "@/components/modules/LoginForm";
import { ForgotPassword } from "@/components/modules/ForgotPassword";
import { useRedirectParams } from "@/hooks/useQueryParams";

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
  const redirect = useRedirectParams();

  useEffect(() => {
    console.log({ redirect });
    if (user) router.push(redirect || "/browse");
  }, [user, router, redirect]);

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
