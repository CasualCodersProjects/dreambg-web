import Head from "next/head";
import {
  Avatar,
  Button,
  Center,
  Loader,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import emailToGravatar from "@/utils/emailToGravatar";
import { IconExternalLink, IconUpload } from "@tabler/icons";
import { useDebouncedState } from "@mantine/hooks";
import { useProfile } from "@/hooks/useProfile";
import { useEffect, useState } from "react";
import { useAsync } from "react-use";
import { useRouter } from "next/router";
import { showNotification } from "@mantine/notifications";
import { Database } from "@/types/database.types";
import { useActiveCustomer } from "@/hooks/useCustomer";
import PaymentModal from "../components/common/PaymentModal";
import { usePaymentModal } from "@/hooks/usePaymentModal";

export default function Settings() {
  const supabase = useSupabaseClient<Database>();
  const [loading, setLoading] = useState<boolean>(false);
  const [displayName, setDisplayName] = useDebouncedState("", 500);
  const [website, setWebsite] = useDebouncedState("", 500);
  const user = useUser();
  const { profile } = useProfile(user?.id);
  const router = useRouter();
  const openPaymentModal = usePaymentModal();
  const { active } = useActiveCustomer();

  console.log({ profile });

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useAsync(async () => {
    if (!displayName && !website) return;
    setLoading(true);
    const { error } = await supabase.from("profiles").upsert({
      username: displayName,
      website,
      id: user?.id as string, // important, they can only update the row with their id
      // @ts-ignore
      updated_at: new Date(),
    });
    if (error) {
      console.error(error);
    }
    setLoading(false);
    showNotification({
      title: "Profile updated",
      message: "Your profile has been updated.",
    });
  }, [displayName, website]);

  const handleCancelSubscription = async () => {
    const { error } = await supabase.functions.invoke("delete-customer");

    if (error) {
      console.error(error);
      showNotification({
        title: "Error",
        message:
          "There was an error cancelling your subscription. Please contact support.",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Settings - DreamBG {active ? "Pro" : ""}</title>
      </Head>
      <Center>
        <Stack>
          <Title>Account Settings</Title>
          <Center>
            <Avatar
              size="xl"
              radius="xl"
              src={emailToGravatar(user?.email as string)}
            />
          </Center>
          <Center>
            <Button
              radius="md"
              component="a"
              target="_blank"
              href="https://gravatar.com"
              rightIcon={<IconExternalLink />}
            >
              Change Avatar
            </Button>
          </Center>
          <TextInput
            defaultValue={profile?.username || ""}
            label="Display Name"
            placeholder={profile?.username || user?.email}
            onChange={(e) => {
              setDisplayName(e.currentTarget.value);
            }}
            rightSection={loading ? <Loader size="sm" color="blue" /> : null}
          />
          <TextInput
            defaultValue={profile?.website || ""}
            label="Website"
            placeholder={profile?.website || "https://example.com"}
            onChange={(e) => {
              setWebsite(e.currentTarget.value);
            }}
            rightSection={loading ? <Loader size="sm" color="blue" /> : null}
          />

          <Title order={2}>Billing</Title>

          {active ? (
            <Button onClick={handleCancelSubscription} color="red">
              Cancel Subscription
            </Button>
          ) : (
            <Button
              variant="gradient"
              gradient={{ from: "blue", to: "red" }}
              onClick={openPaymentModal}
              leftIcon={<IconUpload />}
              radius="md"
            >
              Upgrade to Pro
            </Button>
          )}
        </Stack>
      </Center>
    </>
  );
}
