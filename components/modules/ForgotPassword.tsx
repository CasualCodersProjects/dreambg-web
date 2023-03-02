import {
  createStyles,
  Paper,
  Text,
  TextInput,
  Button,
  Group,
  Anchor,
  Center,
  Box,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

interface ForgotPasswordProps {
  onClickBack(): void;
}

export function ForgotPassword({ onClickBack }: ForgotPasswordProps) {
  const { classes } = useStyles();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = useSupabaseClient();

  const onClickForgotPassword = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      console.error(error);
      showNotification({
        title: "Error Resetting Password",
        message: error.message,
        color: "red",
      });
      return;
    }
    showNotification({
      title: "Password Reset",
      message: "Please check your email for a password reset link.",
      color: "green",
    });
    setLoading(false);
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        Forgot your password?
      </Text>
      <Text mt="xs" color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>

      <TextInput
        my="xl"
        label="Your email"
        placeholder="me@example.com"
        required
        onChange={(event) => setEmail(event.currentTarget.value)}
        disabled={loading}
      />
      <Group position="apart" mt="lg" className={classes.controls}>
        <Anchor
          color="dimmed"
          size="sm"
          className={classes.control}
          type="button"
          onClick={onClickBack}
        >
          <Center inline>
            <IconArrowLeft size={12} stroke={1.5} />
            <Box ml={5}>Back to login page</Box>
          </Center>
        </Anchor>
        <Button
          loading={loading}
          onClick={onClickForgotPassword}
          radius="xl"
          className={classes.control}
        >
          Reset password
        </Button>
      </Group>
    </Paper>
  );
}
