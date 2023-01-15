import {
  createStyles,
  Header,
  Group,
  Title,
  Menu,
  ActionIcon,
  Autocomplete,
} from "@mantine/core";
import { useUser } from "@supabase/auth-helpers-react";
import { IconLogout, IconMenu2, IconSettings, IconSearch } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import { useRandomTags } from "@/hooks/useTags";

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
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { tags } = useRandomTags(5);

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

  const logOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    showNotification({
      title: "Logged out",
      message: "You have been logged out.",
    });
  };

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Title
            onClick={() => {
              router.push("/");
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
        <Autocomplete
          className={classes.search}
          placeholder="Search"
          icon={<IconSearch size={16} stroke={1.5} />}
          data={tags}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/search?q=${e.currentTarget.value}`);
            }
          }}
        />
        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
            {!user && (
              <Link
                style={{
                  fontWeight: "bold",
                }}
                className={classes.link}
                href="/login"
              >
                {" "}
                Login{" "}
              </Link>
            )}
          </Group>
          {user && (
            <Menu shadow="md">
              <Menu.Target>
                <ActionIcon variant="filled">
                  <IconMenu2 />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>{user?.email}</Menu.Label>
                <Menu.Item
                  onClick={() => {
                    router.push("/settings");
                  }}
                  icon={<IconSettings size={14} />}
                >
                  Settings
                </Menu.Item>
                <Menu.Item onClick={logOutUser} icon={<IconLogout size={14} />}>
                  Log Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </div>
    </Header>
  );
}

export default NavBar;
