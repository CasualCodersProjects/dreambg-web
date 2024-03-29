import {
  createStyles,
  Overlay,
  Container,
  Title,
  Button,
  Text,
  Stack,
  Group,
} from "@mantine/core";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage: "url(/images/cyberpunkMountains.jpg)",
    backgroundSize: "cover",
    // backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  },

  container: {
    height: 700,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
    },
  },

  title: {
    color: theme.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

interface BannerProps {
  onClickLearnMore?: () => void;
  onClickGetStarted?: () => void;
}

export function Banner({ onClickLearnMore, onClickGetStarted }: BannerProps) {
  const { classes } = useStyles();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{
        backgroundPosition: `center -${scrollY * 0.5 + 100}px`,
      }}
      className={classes.hero}
    >
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        <Title className={classes.title}>
          The Coolest Backgrounds You&apos;ve Never Seen
        </Title>
        <Text className={classes.description} size="xl" mt="xl">
          Endless AI backgrounds for all your devices.
        </Text>

        <Group>
          <Button
            variant="gradient"
            gradient={{ from: "grape", to: "pink" }}
            size="xl"
            radius="xl"
            className={classes.control}
            onClick={onClickGetStarted}
          >
            Get started
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "green" }}
            size="xl"
            radius="xl"
            className={classes.control}
            onClick={onClickLearnMore}
          >
            Learn more
          </Button>
        </Group>
      </Container>
    </div>
  );
}
