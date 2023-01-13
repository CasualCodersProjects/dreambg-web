import { createStyles, Anchor, Group, ActionIcon, Title } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

interface FooterProps {
  links: Array<{ link: string; label: string }>;
  twitterLink?: string;
  youtubeLink?: string;
  instagramLink?: string;
}

export default function Footer({
  links,
  twitterLink,
  youtubeLink,
  instagramLink,
}: FooterProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<"a">
      color="dimmed"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Title
          styles={(theme) => ({
            color:
              theme.colorScheme === "dark"
                ? theme.colors.white[0]
                : theme.colors.gray[0],
          })}
        >
          Casual Coders
        </Title>
        <Group className={classes.links}>{items}</Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon
            component="a"
            href={twitterLink || "#"}
            size="lg"
            variant="default"
            radius="xl"
          >
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            component="a"
            href={youtubeLink || "#"}
            size="lg"
            variant="default"
            radius="xl"
          >
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            component="a"
            href={instagramLink || "#"}
            size="lg"
            variant="default"
            radius="xl"
          >
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
