import { useState, useEffect } from "react";
import { ActionIcon, Button, Center, Group, Stack, TextInput, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

const PaymentModal = ({ id }: any) => {


  const [location, setLocation] = useState<any>(null);
  const clipboard = useClipboard();

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
            <button>Subscribe</button>
          </Group>
        </Center>
      </Stack>
    </>
  );

  return (
    <div>
      <h1>Payment Modal</h1>
      <Tooltip label="Dreambg Pro">
        <Button onClick={() => {
            openModal({
              title: "Share",
              children: ModalContent,
            });
          }}>Open payment</Button>
      </Tooltip>
    </div>
  );
};

export default PaymentModal;
