import { Banner } from "@/components/modules/Banner";
import { ComingSoon } from "@/components/modules/ComingSoon";
import { Features } from "@/components/modules/Features";
import { FAQ } from "@/components/modules/FAQ";
import { scrollToDiv } from "@/utils/scrollToDiv";
import { useRouter } from "next/router";
import Head from "next/head";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { Center } from "@mantine/core";
import PricingCard from "@/components/common/PricingCard";
import { CTA } from "@/components/modules/CTA";

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
      <Center mt={50}>
        <PricingCard />
      </Center>
      <ComingSoon />
      <FAQ />
      <CTA />
    </>
  );
}
