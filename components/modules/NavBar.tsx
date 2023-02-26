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
  IconArrowRight,
  IconDeviceFloppy,
  IconLogin,
  IconLogout,
  IconMoon,
  IconSearch,
  IconSettings,
  IconSun,
  IconUpload,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import { useRandomTags } from "@/hooks/useTags";
import { useProfile } from "@/hooks/useProfile";
import { useAsync } from "react-use";
import { useActiveCustomer } from "@/hooks/useCustomer";
import { usePaymentModal } from "@/hooks/usePaymentModal";
import ProBadge from "../common/ProBadge";

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

  autocomplete: {
    position: "fixed",
    left: "50%",
    marginTop: 8,
    transform: "translateX(-50%)",
    [theme.fn.largerThan(1000)]: {
      width: 400,
    },
  },

  leftHeader: {
    cursor: "pointer",
    marginLeft: 5,
    marginTop: 8,
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
  const [searchValue, setSearchValue] = useState("");
  const { classes } = useStyles();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const openPaymentModal = usePaymentModal();
  const { active } = useActiveCustomer();
  const { tags } = useRandomTags(5);
  const { profile } = useProfile(user?.id);

  useAsync(async () => {
    if (!profile && user) {
      // create a new profile
      await supabase
        .from("profiles")
        .insert([{ id: user.id, username: user.email }]);
    }
  }, [profile, user]);

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
    router.push("/");
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
    <Header height={64} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group
          onClick={() => {
            router.push("/");
          }}
          className={classes.leftHeader}
        >
          <ActionIcon>
            <Image height={48} width={48} src="/icon2.png" alt="DreamBG" />
          </ActionIcon>
          <Title ml="xs" className={classes.title}>
            DreamBG
          </Title>
        </Group>
        <Autocomplete
          className={classes.autocomplete}
          placeholder="Search"
          icon={<IconSearch size={16} stroke={1.5} />}
          data={tags}
          radius="xl"
          onChange={(e) => {
            setSearchValue(e);
          }}
          value={searchValue}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchValue.length > 0) {
              router.push(`/search?q=${searchValue}`);
            }
          }}
          rightSection={
            <ActionIcon
              radius="xl"
              variant="filled"
              size={30}
              color="teal"
              disabled={searchValue.length === 0}
              onClick={() => {
                router.push(`/search?q=${searchValue}`);
              }}
            >
              <IconArrowRight size={16} stroke={1.5} />
            </ActionIcon>
          }
        />

        <Menu
          shadow="md"
          width={300}
          opened={burgerOpen}
          onChange={setBurgerOpen}
        >
          <Menu.Target>
            <Burger
              sx={{ margin: 5, marginTop: 12 }}
              onClick={toggleOpen}
              opened={burgerOpen}
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>DreamBG {active && <ProBadge />}</Menu.Label>

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

            {user && !active && (
              <Menu.Item icon={<IconUpload />} onClick={openPaymentModal}>
                Upgrade to <ProBadge />
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
