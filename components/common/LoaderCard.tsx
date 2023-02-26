import { createStyles, Paper, Skeleton } from "@mantine/core";
import { useHover } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  card: {
    height: 372.65,
    width: 552,
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

const LoaderCard = () => {
  const { classes } = useStyles();
  const { hovered, ref } = useHover();

  const sx = hovered
    ? {
        transform: "scale(1.05)",
      }
    : {};

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
