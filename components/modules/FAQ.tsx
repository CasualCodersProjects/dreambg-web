import {
  createStyles,
  Title,
  Container,
  Accordion,
  ThemeIcon,
  MantineProvider,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("control");

  return {
    wrapper: {
      paddingTop: theme.spacing.xl * 2,
      minHeight: 820,
      backgroundImage: `radial-gradient(${theme.colors.pink[5]} 0%, ${theme.colors.grape[6]} 100%)`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top left",
      position: "relative",
      color: theme.black,
    },

    title: {
      color: theme.white,
      fontSize: 52,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      marginBottom: theme.spacing.xl * 1.5,
    },

    item: {
      backgroundColor: theme.white,
      borderBottom: 0,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.lg,
      overflow: "hidden",
    },

    control: {
      fontSize: theme.fontSizes.lg,
      padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
      color: theme.black,

      "&:hover": {
        backgroundColor: "transparent",
      },
    },

    content: {
      paddingLeft: theme.spacing.xl,
      lineHeight: 1.6,
      color: theme.black,
    },

    icon: {
      ref: icon,
      marginLeft: theme.spacing.md,
    },

    gradient: {
      backgroundImage: `radial-gradient(${
        theme.colors[theme.primaryColor][6]
      } 0%, ${theme.colors[theme.primaryColor][5]} 100%)`,
    },

    itemOpened: {
      [`& .${icon}`]: {
        transform: "rotate(45deg)",
      },
    },

    button: {
      display: "block",
      marginTop: theme.spacing.md,

      "@media (max-width: 755px)": {
        display: "block",
        width: "100%",
      },
    },
  };
});

const faq: { question: string; answer: string; value: string }[] = [
  {
    value: "favorite-backgrounds",
    question: "How do I save my favorite backgrounds?",
    answer:
      'Simply click the "Save" button under the background you like, and it will be added to your virtual library for safe keeping. You can access your saved backgrounds at any time from your account page.',
  },
  {
    value: "why-pay-4k",
    question: "Why do I need to pay for 4K and 1440p backgrounds?",
    answer:
      "4K and 1440p backgrounds require a lot of processing power and time to generate. We need to pay for the servers and the time it takes to generate the backgrounds.",
  },
  // {
  //   question: "How often do you add new backgrounds?",
  //   answer: "",
  // }
  {
    value: "popular",
    question: "How do I know which backgrounds are the most popular?",
    answer:
      "User can vote on backgrounds they like by clicking the updoot icon. In the near future we will also be adding a view counter to each background.",
  },
  {
    value: "commercial",
    question: "Can I use the backgrounds for commercial purposes?",
    answer:
      "DreamBG Pro members are permitted to use the image for commercial purposes as long as they are not selling the image itself. For example, you can use the image as a background for a website or stock image in a YouTube video, but you cannot sell prints or digital downloads of the image itself. If you are not a Pro member, you can use the image for personal use only.",
  },
  {
    value: "make-my-own",
    question: "Can I make my own backgrounds?",
    answer:
      "We plan on adding this feature in the future. There is no ETA at this time.",
  },
];

export function FAQ() {
  const { classes } = useStyles();
  return (
    <MantineProvider inherit theme={{ colorScheme: "light" }}>
      <div className={classes.wrapper}>
        <Container size="sm">
          <Title align="center" className={classes.title}>
            Frequently Asked Questions
          </Title>

          <Accordion
            chevronPosition="right"
            defaultValue="favorite-backgrounds"
            chevronSize={50}
            variant="separated"
            disableChevronRotation
            chevron={
              <ThemeIcon radius="xl" className={classes.gradient} size={32}>
                <IconPlus size={18} stroke={1.5} />
              </ThemeIcon>
            }
          >
            {faq.map((item, key) => {
              return (
                <Accordion.Item
                  key={key}
                  className={classes.item}
                  value={item.value}
                >
                  <Accordion.Control>{item.question}</Accordion.Control>
                  <Accordion.Panel>{item.answer}</Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Container>
      </div>
    </MantineProvider>
  );
}
