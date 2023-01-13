import { AppShell } from "@mantine/core";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

import NavBar from "@/components/modules/NavBar";
import Footer from "@/components/modules/Footer";

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

const navLinks = [
  { link: "/", label: "Home" },
  { link: "/about", label: "About" },
  { link: "/contact", label: "Contact" },
];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        fontFamily: "Open Sans, sans-serif",
        cursorType: "pointer",
      }}
    >
      <AppShell
        header={<NavBar links={navLinks} />}
        footer={<Footer {...footerProps} />}
      >
        <Component {...pageProps} />
      </AppShell>
    </MantineProvider>
  );
}
