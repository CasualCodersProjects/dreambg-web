import {
  createStyles,
  Header,
  Group,
  Title,
  Menu,
  ActionIcon,
  Autocomplete,
  Burger,
  Image,
  Text
} from "@mantine/core";
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import {
  IconLogout,
  IconSettings,
  IconSearch,
  IconSun,
  IconLogin,
  IconMoon,
  IconDeviceFloppy,
  IconMenu2,
  IconAdjustments
} from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import { useRandomTags } from "@/hooks/useTags";
import { useProfile } from "@/hooks/useProfile";

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
    // [theme.fn.smallerThan("md")]: {
    //   display: "none",
    // },
  },

  search: {
    // [theme.fn.smallerThan("xs")]: {
    //   display: "none",
    // },
  },

  title: {
    [theme.fn.smallerThan(700)]: {
      display: "none",
    },
  },

  icon: {
    [theme.fn.largerThan(700)]: {
      display: "none",
    },
    paddingRight: "8px",
  },

  darkmode: {
    [theme.fn.smallerThan(600)]: {
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
  colorScheme: string;
  setColorScheme: (value: string) => void;
}

function NavBar({ links, colorScheme, setColorScheme }: NavBarProps) {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const { classes } = useStyles();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { tags } = useRandomTags(5);
  const { profile } = useProfile(user?.id);

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

  const setDarkMode = () => {
    setColorScheme("dark");
  };

  const setLightMode = () => {
    setColorScheme("light");
  };

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <ActionIcon
          onClick={() => {
            router.push("/");
          }}
        >
          <Image src="/favicon.ico" alt="DreamBG" />
        </ActionIcon>
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

        <Menu shadow="md" width={300}>
          <Menu.Target>
            <ActionIcon>
              <IconMenu2/>
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>DreamBG</Menu.Label>
            <Menu.Item icon={<IconSun/>}>Toggle Theme</Menu.Item>
            <Menu.Item icon={<IconLogin/>}>Sign In / Sign Up</Menu.Item>
          </Menu.Dropdown>
        </Menu>

        {/* <Group>
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
            <Menu shadow="md" opened={burgerOpen} onChange={setBurgerOpen}>
              <Menu.Target>
                <Burger
                  opened={burgerOpen}
                  onClick={() => {
                    setBurgerOpen(!burgerOpen);
                  }}
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>{profile?.username || user?.email}</Menu.Label>
                <Menu.Item
                  onClick={() => {
                    router.push("/saved");
                  }}
                  icon={<IconDeviceFloppy size={14} />}
                >
                  Saved Images
                </Menu.Item>
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
          {colorScheme === "dark" ? (
            <ActionIcon onClick={setLightMode} className={classes.darkmode}>
              <IconSun size={20} />
            </ActionIcon>
          ) : (
            <ActionIcon onClick={setDarkMode} className={classes.darkmode}>
              <IconMoon />
            </ActionIcon>
          )}
        </Group> */}
      </div>
    </Header>
  );
}

export default NavBar;
