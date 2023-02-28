import {
  Container,
  Title,
  Accordion,
  createStyles,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import {
  IconPlus,
  TablerIcon,
  IconHeart,
  IconStar,
  IconPremiumRights,
  IconQuestionMark,
  IconFlask,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    minHeight: 650,
  },

  title: {
    marginBottom: theme.spacing.xl * 1.5,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,

    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  gradient: {
    backgroundImage: `radial-gradient(${
      theme.colors[theme.primaryColor][7]
    } 0%, ${theme.colors[theme.primaryColor][6]} 100%)`,
  },
}));

const faq: {
  question: string;
  answer: string;
  value: string;
  icon?: TablerIcon;
  color?: string;
}[] = [
  {
    icon: IconHeart,
    color: "red",
    value: "favorite-backgrounds",
    question: "How do I save my favorite backgrounds?",
    answer:
      'Simply click the "Save" button under the background you like, and it will be added to your virtual library for safe keeping. You can access your saved backgrounds at any time from your account page.',
  },
  {
    icon: IconQuestionMark,
    color: "blue",
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
    icon: IconStar,
    color: "yellow",
    value: "popular",
    question: "How do I know which backgrounds are the most popular?",
    answer:
      "User can vote on backgrounds they like by clicking the updoot icon. In the near future we will also be adding a view counter to each background.",
  },
  {
    icon: IconPremiumRights,
    color: "green",
    value: "commercial",
    question: "Can I use the backgrounds for commercial purposes?",
    answer:
      "DreamBG Pro members are permitted to use the image for commercial purposes as long as they are not selling the image itself. For example, you can use the image as a background for a website or stock image in a YouTube video, but you cannot sell prints or digital downloads of the image itself. If you are not a Pro member, you can use the image for personal use only.",
  },
  // {
  //   icon: IconPlus,
  //   color: "teal",
  //   value: "make-my-own",
  //   question: "Can I make my own backgrounds?",
  //   answer:
  //     "We plan on adding this feature in the future. There is no ETA at this time.",
  // },
  {
    icon: IconFlask,
    color: "teal",
    value: "other-services",
    question: "Will you offer other AI services in the future?",
    answer:
      "Yes! We are working on a few other projects that we will be announcing soon.",
  },
];

export function FAQ() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme?.colors?.[color]?.[theme.colorScheme === "dark" ? 6 : 7];

  return (
    <Container size="lg" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion
        styles={{
          chevron: {
            "&[data-rotate]": {
              transform: "rotate(45deg)",
              transition: "transform 250ms ease",
            },
            paddingRight: "1rem",
          },
        }}
        chevron={
          <ThemeIcon radius="xl" className={classes.gradient}>
            <IconPlus size={18} />
          </ThemeIcon>
        }
        variant="separated"
      >
        {faq.map((item, key) => (
          <Accordion.Item key={key} className={classes.item} value={item.value}>
            <Accordion.Control
              icon={
                item?.icon && (
                  <item.icon
                    size={20}
                    color={getColor(item?.color || "pink")}
                  />
                )
              }
            >
              {item.question}
            </Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
