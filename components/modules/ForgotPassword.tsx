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
        <Button radius="xl" className={classes.control}>
          Reset password
        </Button>
      </Group>
    </Paper>
  );
}
