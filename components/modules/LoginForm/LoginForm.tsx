import { useToggle, upperFirst } from "@mantine/hooks";
import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { GoogleButton, FacebookButton } from "./SocialButtons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/database.types";
import { showNotification } from "@mantine/notifications";

interface LoginFormProps extends PaperProps {
  onClickForgotPassword?(): void;
}

export function LoginForm(props: LoginFormProps) {
  const supabase = useSupabaseClient<Database>();

  const [type, toggle] = useToggle(["login", "register"]);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
    terms: boolean;
  }) => {
    setLoading(true);
    if (type === "register") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        console.error(error);
        showNotification({
          title: "Error Registering",
          message: error.message,
          color: "red",
        });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error(error);
        showNotification({
          title: "Error Logging In",
          message: error.message,
          color: "red",
        });
      }
    }
    setLoading(false);
  };

  const handleFacebookLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
    if (error) {
      console.error(error);
      showNotification({
        title: "Error Logging In",
        message: error.message,
        color: "red",
      });
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error(error);
      showNotification({
        title: "Error Logging In",
        message: error.message,
        color: "red",
      });
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to DreamBG, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={handleGoogleLogin}>
          Google
        </GoogleButton>
        <FacebookButton radius="xl" onClick={handleFacebookLogin}>
          Facebook
        </FacebookButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@example.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            disabled={loading}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            disabled={loading}
          />

          {type === "register" && (
            <PasswordInput
              required
              label="Confirm password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.currentTarget.value)
              }
              error={
                confirmPassword !== form.values.password &&
                confirmPassword.length > 0 &&
                "Passwords do not match"
              }
              disabled={loading}
            />
          )}

          {/* {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )} */}
        </Stack>

        <Group position="apart" mt="xl">
          <Stack>
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            {type !== "register" && (
              <Anchor
                color="dimmed"
                size="xs"
                type="button"
                onClick={() => {
                  props.onClickForgotPassword?.();
                }}
              >
                Forgot password?
              </Anchor>
            )}
          </Stack>
          <Button loading={loading} radius="xl" type="submit">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
