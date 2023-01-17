import { Paper, createStyles, Skeleton } from "@mantine/core";
import { useHover } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  card: {
    height: 200,
    width: 356,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export interface LoaderCardProps {
  vertical?: boolean;
}

const LoaderCard = ({ vertical }: LoaderCardProps) => {
  const { classes } = useStyles();
  const { hovered, ref } = useHover();

  let height = 200;
  let width = 356;

  if (vertical) {
    height = 356;
    width = 200;
  }

  const sx = hovered
    ? {
        transform: "scale(1.05)",
        height,
        width,
      }
    : {
        height,
        width,
      };

  return (
    <Skeleton radius="md">
      <Paper
        ref={ref}
        shadow="md"
        p="xl"
        radius="md"
        sx={sx}
        className={classes.card}
      ></Paper>
    </Skeleton>
  );
};

export default LoaderCard;
