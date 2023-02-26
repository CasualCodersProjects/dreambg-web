import { Banner } from "@/components/modules/Banner";
import { ComingSoon } from "@/components/modules/ComingSoon";
import { Features } from "@/components/modules/Features";
import { scrollToDiv } from "@/utils/scrollToDiv";
import { useRouter } from "next/router";
import Head from "next/head";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

export default function About() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.push("/browse");
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>DreamBG - The Coolest Backgrounds You&apos;ve Never Seen</title>
      </Head>
      <Banner
        onClickLearnMore={() => {
          scrollToDiv("features");
        }}
        onClickGetStarted={() => {
          router.push("/browse");
        }}
      />
      <Features />
      <ComingSoon />
    </>
  );
}
