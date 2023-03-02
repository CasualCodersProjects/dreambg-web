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
  PasswordInput,
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

export function ResetPassword() {
  const { classes } = useStyles();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = useSupabaseClient();

  const onClickResetPassword = async () => {
    if (password !== confirmPassword) {
      showNotification({
        title: "Error Resetting Password",
        message: "Passwords do not match",
        color: "red",
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
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
      title: "Password Changed",
      message: "Password changing successfully!",
      color: "green",
    });
    setLoading(false);
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        Reset Password
      </Text>
      <Text mt="xs" color="dimmed" size="sm" align="center">
        Enter please enter your new password. Passwords should be longer than 8
        characters.
      </Text>

      <PasswordInput
        my="xl"
        label="New Password"
        placeholder="Your New Password"
        required
        onChange={(event) => setPassword(event.currentTarget.value)}
        disabled={loading}
      />
      <PasswordInput
        my="xl"
        label="Confirm Password"
        placeholder="Confirm Your New Password"
        required
        onChange={(event) => setConfirmPassword(event.currentTarget.value)}
        error={
          password !== confirmPassword && confirmPassword.length > 0
            ? "Passwords do not match"
            : undefined
        }
        disabled={loading}
      />
      <Group position="apart" mt="lg" className={classes.controls}>
        <Button
          loading={loading}
          onClick={onClickResetPassword}
          radius="xl"
          className={classes.control}
        >
          Reset password
        </Button>
      </Group>
    </Paper>
  );
}
