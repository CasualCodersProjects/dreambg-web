import {
  Center,
  Group,
  Stack,
  Text,
  Card,
  List,
  ThemeIcon,
  Button,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { IconCircleCheck, IconClock } from "@tabler/icons";
import { useRouter } from "next/router";
import { useActiveCustomer } from "../../hooks/useCustomer";

const PricingCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();
  const { active } = useActiveCustomer();
  const user = useUser();
  const router = useRouter();

  const onClickBuy = async () => {
    if (!user) {
      router.push("/login");
      showNotification({
        title: "Please login or create an account to continue.",
        color: "red",
        message: "You must be logged in to purchase a subscription.",
      });
      return;
    }
    setIsLoading(true);
    const { data, error } = await supabase.functions.invoke(
      "checkout-customer"
    );
    if (error) {
      console.log(error);
    }
    if (!data?.url) {
      alert("Missing checkout url.");
    }
    //redirect to checkout session on stripe
    router.push(data.url);
    setIsLoading(false);
  };

  return (
    <Card radius="lg">
      <Card.Section inheritPadding py="md">
        <Center>
          <Stack>
            <Text fw={700} size="xl">
              Become a DreamBG Pro Member!
            </Text>
            <Center pb="xs">
              <Title
                fw={500}
                sx={{
                  fontSize: "4rem",
                }}
              >
                $5
              </Title>{" "}
              <Text ml="xs" size="sm">
                / month
              </Text>
            </Center>
          </Stack>
        </Center>
      </Card.Section>
      <Center pb="md">
        <List
          spacing="xs"
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size={16} />
            </ThemeIcon>
          }
        >
          <List.Item>No Ads!</List.Item>
          <List.Item>4K QHD Images!</List.Item>
          <List.Item>Commercial Use!</List.Item>
          <List.Item>Early Access to New Features!</List.Item>
          <List.Item>Support DreamBG Development!</List.Item>
          {/* <List.Item
            icon={
              <ThemeIcon color="grape" size={24} radius="xl">
                <IconBrandDiscord size={16} />
              </ThemeIcon>
            }
          >
            Elevated Discord Role!
          </List.Item> */}
          <List.Item
            icon={
              <ThemeIcon color="yellow" size={24} radius="xl">
                <IconClock size={16} />
              </ThemeIcon>
            }
          >
            <Text span fw={700}>
              Coming Soon:
            </Text>{" "}
            Create Your Own Backgrounds!
          </List.Item>
        </List>
      </Center>
      <Button
        disabled={active}
        variant="gradient"
        gradient={{ from: "grape", to: "pink" }}
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={onClickBuy}
        loading={isLoading}
      >
        {active ? "You're already a Pro!" : "Become a Pro!"}
      </Button>
    </Card>
  );
};

export default PricingCard;
