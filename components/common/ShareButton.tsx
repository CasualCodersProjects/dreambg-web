import { useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Stack,
  TextInput,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconBrandReddit, IconBrandTwitter, IconShare } from "@tabler/icons";
import { redditShareLink, twitterShareLink } from "@/utils/share";

interface ShareButtonProps {
  id?: string;
}

const ShareButton = ({ id }: ShareButtonProps) => {
  const theme = useMantineTheme();
  const [location, setLocation] = useState<any>(null);
  const clipboard = useClipboard();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocation(window?.location);
    }
  }, [location]);

  const contentLink = id
    ? `${location?.origin}/image?uuid=${id}`
    : location?.href;

  const ModalContent = (
    <>
      <Stack>
        <TextInput
          onClick={() => {
            clipboard.copy(contentLink);
            showNotification({
              title: "Link copied",
              message: "The link has been copied to your clipboard.",
            });
          }}
          label={"Click to copy link"}
          value={contentLink}
        />

        <Center>
          <Group>
            <Button
              component="a"
              href={twitterShareLink(
                `Check out this DreamBG image! ${contentLink}`
              )}
              target="_blank"
              leftIcon={<IconBrandTwitter size={18} />}
              color="twitter-blue"
            >
              Tweet
            </Button>
            <Button
              color="orange"
              leftIcon={<IconBrandReddit size={18} />}
              component="a"
              target="_blank"
              href={redditShareLink(
                contentLink,
                "Check out this DreamBG image"
              )}
            >
              Post
            </Button>
          </Group>
        </Center>
      </Stack>
    </>
  );

  return (
    <Tooltip label="Share Image">
      <ActionIcon
        variant="subtle"
        color={theme.colorScheme === "dark" ? "teal" : "blue"}
        onClick={() => {
          openModal({
            title: "Share",
            children: ModalContent,
          });
        }}
        radius="xl"
      >
        <IconShare />
      </ActionIcon>
    </Tooltip>
  );
};

export default ShareButton;
