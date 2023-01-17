import { redditShareLink, twitterShareLink } from "@/utils/share";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Stack,
  TextInput,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconBrandReddit, IconBrandTwitter, IconShare } from "@tabler/icons";

const ShareButton = () => {
  const clipboard = useClipboard();

  const ModalContent = (
    <>
      <Stack>
        <TextInput
          onClick={() => {
            clipboard.copy(window?.location.href);
            showNotification({
              title: "Link copied",
              message: "The link has been copied to your clipboard.",
            });
          }}
          label={"Click to copy link"}
          value={window?.location.href}
        />

        <Center>
          <Group>
            <Button
              component="a"
              href={twitterShareLink(
                `Check out this DreamBG image! ${window?.location.href}`
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
                window?.location.href,
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
    <Button
      onClick={() => {
        openModal({
          title: "Share",
          children: ModalContent,
        });
      }}
      leftIcon={<IconShare size={18} />}
    >
      Share
    </Button>
  );
};

export default ShareButton;
