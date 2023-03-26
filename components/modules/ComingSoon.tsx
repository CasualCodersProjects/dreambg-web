import {
  createStyles,
  Text,
  SimpleGrid,
  Container,
  Title,
} from "@mantine/core";
import { TablerIcon, IconApps, IconPhotoPlus, IconApi } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  feature: {
    position: "relative",
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: "absolute",
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    zIndex: 1,
  },

  content: {
    position: "relative",
    zIndex: 2,
  },

  icon: {
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  sectionTitle: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
    marginBottom: theme.spacing.xl,
  },
}));

interface FeatureProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: TablerIcon;
  title: string;
  description: string;
}

function Feature({
  icon: Icon,
  title,
  description,
  className,
  ...others
}: FeatureProps) {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={38} className={classes.icon} stroke={1.5} />
        <Text weight={700} size="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text color="dimmed" size="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: IconApps,
    title: "Mobile App",
    description:
      "Automatically set your desktop or mobile background to a new image every day.",
  },
  {
    icon: IconPhotoPlus,
    title: "CustomBG",
    description:
      "Create your own custom images with our easy to use image generator.",
  },
  {
    icon: IconApi,
    title: "API Access",
    description:
      "Search for images and download them directly from our API. From 480p up to 4K.",
  },
];

export function ComingSoon() {
  const { classes } = useStyles();
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <Title className={classes.sectionTitle} order={2} align="center" mt="sm">
        Coming Soon
      </Title>
      <SimpleGrid
        cols={3}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        spacing={50}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}
