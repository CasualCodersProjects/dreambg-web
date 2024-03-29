import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          {/* Tell dark reader that this is a dark mode site */}
          <meta name="darkreader" content="false" />
          <meta
            name="name"
            content="DreamBG | Unique AI Generated Backgrounds"
          />
          <meta name="description" content="Unique AI Generated Backgrounds" />
          <link rel="icon" href="/favicon.ico" />
          {/* <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-2FPXE911CQ"
          />
          <Script id="">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-2FPXE911CQ');`}
          </Script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
