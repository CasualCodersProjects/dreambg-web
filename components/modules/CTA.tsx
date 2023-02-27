import {
  createStyles,
  Overlay,
  Container,
  Text,
  Button,
  Group,
} from "@mantine/core";
import { useEffect, useState } from "react";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // backgroundAttachment: "fixed",
    backgroundImage: "url(/images/cyberpunkMountains3.jpg)",
    backgroundPositionX: "center",
    backgroundPositionY: "center",
  },

  inner: {
    position: "relative",
    paddingTop: 80,
    paddingBottom: 80,
    zIndex: 1,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.white,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export function CTA() {
  const { classes } = useStyles();

  return (
    <div onContextMenu={(e) => e.preventDefault()} className={classes.wrapper}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={10}
        zIndex={0}
      />
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Are you ready for your{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "", to: "grape.3" }}
            inherit
          >
            next background?
          </Text>{" "}
        </h1>

        <Group className={classes.controls}>
          <Button
            component="a"
            href="/login"
            size="xl"
            radius="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "grape", to: "pink" }}
          >
            Create Account
          </Button>

          <Button
            component="a"
            href="/browse"
            size="xl"
            variant="gradient"
            radius="xl"
            gradient={{ from: "teal", to: "green" }}
            className={classes.control}
          >
            Browse Images
          </Button>
        </Group>
      </Container>
    </div>
  );
}
