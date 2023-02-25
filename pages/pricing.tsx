import Head from "next/head";
import PricingCard from "@/components/common/PricingCard";
import { Center } from "@mantine/core";

export default function Pricing() {
  return (
    <>
      <Head>
        <title>DreamBG - Pricing</title>
      </Head>
      <Center>
        <PricingCard />
      </Center>
    </>
  );
}
