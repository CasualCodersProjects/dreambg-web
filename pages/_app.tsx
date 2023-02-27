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
import { ModalsProvider } from "@mantine/modals";

const footerProps = {
  links: [],
  youtubeLink: "https://www.youtube.com/c/CasualCodersOfficial",
  instagramLink: "https://www.instagram.com/casualcodersprojects/",
  twitterLink: "https://twitter.com/casualcoders",
};

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
          fontFamily: "Greycliff CF, Open Sans, sans-serif",
          cursorType: "pointer",
          primaryColor: colorScheme === "dark" ? "pink" : "grape",
          colors: {
            "twitter-blue": [
              "#90C7E8",
              "#7FC0E8",
              "#6DB9E8",
              "#5CB4EA",
              "#4AAEEC",
              "#38A9EF",
              "#26A5F3",
              "#1E9EED",
              "#1897E5",
              "#1C8FD5",
            ],
            "deep-purple": [
              "#45177D",
              "#3E176E",
              "#381661",
              "#321556",
              "#2C114D",
              "#270E45",
              "#220C3E",
              "#1E0938",
              "#1B0833",
              "#18062D",
            ],
            teal: [
              "#A3FFF4",
              "#7CFFF0",
              "#58FFEC",
              "#38FFE8",
              "#1BFFE4",
              "#07FEDC",
              "#00F0CE",
              "#00D9BA",
              "#00C3A8",
              "#00B097",
            ],
            pink: [
              "#FFD7FF",
              "#FFA5FF",
              "#FF79FF",
              "#FF51FF",
              "#FF2DFF",
              "#FF0DFF",
              "#F300F5",
              "#DB00DD",
              "#C200C4",
              "#AC00AD",
            ],
            grape: [
              "#F9F2FF",
              "#DDB8FF",
              "#C484FF",
              "#AE56FF",
              "#9B2DFF",
              "#8A0DFF",
              "#7A04EB",
              "#6A00D1",
              "#5D00B9",
              "#5000A1",
            ],
          },
        }}
      >
        <NotificationsProvider position="top-center">
          <ModalsProvider>
            <AppShell
              header={
                <NavBar
                  colorScheme={colorScheme}
                  setColorScheme={setColorScheme}
                />
              }
              footer={<Footer {...footerProps} />}
            >
              <Component {...pageProps} />
            </AppShell>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </SessionContextProvider>
  );
}
