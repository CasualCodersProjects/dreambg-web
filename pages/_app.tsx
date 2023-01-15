import { AppShell, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";

import NavBar from "@/components/modules/NavBar";
import Footer from "@/components/modules/Footer";
import { Database } from "@/types/database.types";
import { NotificationsProvider } from "@mantine/notifications";

const footerProps = {
  links: [
    {
      label: "About Us",
      link: "https://casualcoders.dev",
    },
    {
      label: "Contact",
      link: "mailto:info@casualcoders.dev",
    },
  ],
  youtubeLink: "https://www.youtube.com/c/CasualCodersOfficial",
  instagramLink: "https://www.instagram.com/casualcodersprojects/",
  twitterLink: "https://twitter.com/casualcoders",
};

const navLinks: any = [];

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "color-scheme",
    defaultValue: "dark",
  });

  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: colorScheme as "dark" | "light",
          fontFamily: "Open Sans, sans-serif",
          cursorType: "pointer",
        }}
      >
        <NotificationsProvider>
          <AppShell
            header={
              <NavBar
                colorScheme={colorScheme}
                setColorScheme={setColorScheme}
                links={navLinks}
              />
            }
            footer={<Footer {...footerProps} />}
          >
            <Component {...pageProps} />
          </AppShell>
        </NotificationsProvider>
      </MantineProvider>
    </SessionContextProvider>
  );
}
