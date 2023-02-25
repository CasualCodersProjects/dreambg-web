import { useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useActiveCustomer } from "@/hooks/useCustomer";

const PaymentModal = ({ id }: any) => {
  const [location, setLocation] = useState<any>(null);
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { active } = useActiveCustomer();

  const handleClick = async () => {
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
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocation(window?.location);
    }
  }, [location]);

  const ModalContent = (
    <>
      <Stack>
        <Center>
          <Group>
            <h1>Become a DreamBG Pro Member!</h1>
            {/* <form action="/create-checkout-session" method="POST">
            <input type="hidden" name="priceId" value="price_G0FvDp6vZvdwRZ" />
            <button type="submit">Checkout</button>
          </form> */}
            <Button disabled={active} onClick={handleClick}>
              Checkout
            </Button>
          </Group>
        </Center>
      </Stack>
    </>
  );

  return (
    <div>
      <h1>Payment Modal</h1>
      <Tooltip label="Dreambg Pro">
        <Button
          onClick={() => {
            openModal({
              title: "Subscribe",
              children: ModalContent,
            });
          }}
        >
          Open payment
        </Button>
      </Tooltip>
    </div>
  );
};

export default PaymentModal;
