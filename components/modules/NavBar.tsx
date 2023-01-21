import {
  ActionIcon,
  Autocomplete,
  Burger,
  createStyles,
  Group,
  Header,
  Image,
  Menu,
  Title,
} from "@mantine/core";
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import {
  IconDeviceFloppy,
  IconLogin,
  IconLogout,
  IconMoon,
  IconSearch,
  IconSettings,
  IconSun,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import { useRandomTags } from "@/hooks/useTags";
import { useProfile } from "@/hooks/useProfile";
import { useAsync } from "react-use";
import { useCustomer } from "@/hooks/useCustomer";

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

  leftHeader: {
    cursor: "pointer",
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
  colorScheme: string;
  setColorScheme: (value: string) => void;
}

function NavBar({ colorScheme, setColorScheme }: NavBarProps) {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const { classes } = useStyles();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { tags } = useRandomTags(5);
  const { profile } = useProfile(user?.id);
  const { customer } = useCustomer(user?.id);

  useAsync(async () => {
    if (!profile && user) {
      // create a new profile
      await supabase
        .from("profiles")
        .insert([{ id: user.id, username: user.email }]);
    }
  }, [profile, user]);

  useAsync(async () => {
    if (!customer && user) {
      // create a new customer
      await supabase.functions.invoke("new-customer");
    }
  }, [customer, user]);

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

  const toggleColorScheme = () => {
    if (colorScheme == "dark") {
      setColorScheme("light");
    } else {
      setColorScheme("dark");
    }
  };

  const toggleOpen = () => {
    setBurgerOpen(!burgerOpen);
  };

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group
          onClick={() => {
            router.push("/");
          }}
          className={classes.leftHeader}
        >
          <ActionIcon>
            <Image src="/favicon.ico" alt="DreamBG" />
          </ActionIcon>
          <Title className={classes.title}>DreamBG</Title>
        </Group>
        <Autocomplete
          placeholder="Search"
          icon={<IconSearch size={16} stroke={1.5} />}
          data={tags}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/search?q=${e.currentTarget.value}`);
            }
          }}
        />

        <Menu
          shadow="md"
          width={300}
          opened={burgerOpen}
          onChange={setBurgerOpen}
        >
          <Menu.Target>
            <Burger onClick={toggleOpen} opened={burgerOpen} />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>DreamBG</Menu.Label>

            <Menu.Item
              icon={colorScheme === "dark" ? <IconSun /> : <IconMoon />}
              onClick={toggleColorScheme}
            >
              Toggle Theme
            </Menu.Item>
            {!user && (
              <Menu.Item
                icon={<IconLogin />}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Sign In / Sign Up
              </Menu.Item>
            )}

            {user && (
              <Menu.Item
                icon={<IconDeviceFloppy />}
                onClick={() => {
                  router.push("/saved");
                }}
              >
                Saved Images
              </Menu.Item>
            )}

            {user && (
              <Menu.Item
                icon={<IconSettings />}
                onClick={() => {
                  router.push("/settings");
                }}
              >
                Settings
              </Menu.Item>
            )}

            {user && (
              <Menu.Item icon={<IconLogout />} onClick={logOutUser}>
                Log Out
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </div>
    </Header>
  );
}

export default NavBar;
