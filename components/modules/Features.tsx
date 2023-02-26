import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from "@mantine/core";
import { IconSunset2, IconUser, IconDeviceMobile } from "@tabler/icons";

const mockdata = [
  {
    title: "Any Device",
    description:
      "With landscape, portrait, and even ultra-wide, your desktop has never looked better.",
    icon: IconDeviceMobile,
  },
  {
    title: "User Curated",
    description:
      "Users can vote on which are their favorites, and save the images to their virtual library for safe keeping.",
    icon: IconUser,
  },
  {
    title: "Every Genre",
    description:
      "From a crowded cyberpunk city to a serene mountain landscape, we have it all.",
    icon: IconSunset2,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

export function Features() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      p="xl"
    >
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  return (
    <>
      <Container id="features" size="lg" pt="xl">
        {/* <Group position="center">
        <Badge variant="filled" size="lg">
          Best company ever
        </Badge>
      </Group> */}

        <Title order={2} className={classes.title} align="center" mt="sm">
          An Infinite Number of Possibilities
        </Title>

        <Text
          color="dimmed"
          className={classes.description}
          align="center"
          mt="md"
        >
          Never run out of backgrounds for your devices again. Save, vote, and
          share your favorites with the community.
        </Text>

        <SimpleGrid
          cols={3}
          spacing="xl"
          mt={50}
          breakpoints={[{ maxWidth: "md", cols: 1 }]}
        >
          {features}
        </SimpleGrid>
      </Container>
    </>
  );
}
