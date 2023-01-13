import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

interface NavBarProps {
  links: Array<{ link: string; label: string }>;
}

function NavBar({ links }: NavBarProps) {
  const { classes } = useStyles();

  const items = links.map((link) => (
    <Link
      style={{
        fontWeight: "bold",
      }}
      key={link.label}
      href={link.link}
      className={classes.link}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Title
            onClick={() => {
              window.location.href = "/";
            }}
            style={{
              cursor: "pointer",
            }}
            styles={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.white[0]
                  : theme.colors.gray[0],
            })}
          >
            DreamBG
          </Title>
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          {/* <ActionToggle /> */}
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={[]}
          />
        </Group>
      </div>
    </Header>
  );
}

export default NavBar;
