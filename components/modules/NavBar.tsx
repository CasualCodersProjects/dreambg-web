import {
  ActionIcon,
  Autocomplete,
  Burger,
  createStyles,
  Group,
  Header,
  Image,
  Menu,
  Switch,
  Title,
} from "@mantine/core";
import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import {
  IconArrowBigTop,
  IconArrowRight,
  IconDeviceDesktop,
  IconDeviceFloppy,
  IconDeviceMobile,
  IconList,
  IconLogin,
  IconLogout,
  IconMoon,
  IconSearch,
  IconSettings,
  IconStar,
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
import { useVertical } from "@/hooks/useVertical";
import { useMediaQuery } from "@mantine/hooks";
import { useSearchParam } from "react-use";

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
  const query = useSearchParam("q");
  const [searchValue, setSearchValue] = useState("");
  const { vertical, setVertical } = useVertical();
  const { classes } = useStyles();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const openPaymentModal = usePaymentModal();
  const { active } = useActiveCustomer();
  const { tags } = useRandomTags(5);
  const { profile } = useProfile(user?.id);
  const xs = useMediaQuery("(max-width: 480px)");

  useAsync(async () => {
    if (!profile && user) {
      // create a new profile
      await supabase
        .from("profiles")
        .insert([{ id: user.id, username: user.email }]);
    }
  }, [profile, user]);

  useEffect(() => {
    if (query) {
      setSearchValue(query);
    }
  }, [query]);

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

  useEffect(() => {
    if (xs) {
      setVertical(true);
    }
  }, [xs, setVertical]);

  return (
    <Header height={64} className={classes.header} mb={120}>
      <div id="navbar" className={classes.inner}>
        <Group
          onClick={() => {
            if (user) {
              router.push("/browse");
            } else {
              router.push("/");
            }
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
              // this is a fix for issue #45
              if (window.location.pathname.includes("search")) {
                window.location.href = `${window.location.origin}/search?q=${searchValue}`;
              } else {
                router.push(`/search?q=${searchValue}`);
              }
            }
          }}
          rightSection={
            <ActionIcon
              radius="xl"
              variant="filled"
              size={30}
              color="primary"
              disabled={searchValue.length === 0}
              onClick={() => {
                // this is a fix for issue #45
                if (window.location.pathname.includes("search")) {
                  window.location.href = `${window.location.origin}/search?q=${searchValue}`;
                } else {
                  router.push(`/search?q=${searchValue}`);
                }
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
            <Menu.Label>Categories</Menu.Label>

            {router.pathname !== "/" && (
              <Menu.Item
                onClick={() => {
                  setVertical(!vertical);
                }}
                icon={vertical ? <IconDeviceDesktop /> : <IconDeviceMobile />}
              >
                Switch to {vertical ? "Horizontal" : "Vertical"}
              </Menu.Item>
            )}

            <Menu.Item
              onClick={() => router.push("/browse")}
              icon={<IconList />}
            >
              Browse Images
            </Menu.Item>

            <Menu.Item
              onClick={() => {
                router.push("/likes");
              }}
              icon={<IconArrowBigTop />}
            >
              Most Liked Images
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                router.push("/latest");
              }}
              icon={<IconStar />}
            >
              Latest Images
            </Menu.Item>
            <Menu.Label>
              {" "}
              Account & Settings {active && <ProBadge />}{" "}
            </Menu.Label>
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
                  if (window.location.pathname !== "/") {
                    router.push(
                      `/login?redirect=${
                        window.location.pathname + window.location.search
                      }`
                    );
                  } else {
                    router.push("/login");
                  }
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
                My Images
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
