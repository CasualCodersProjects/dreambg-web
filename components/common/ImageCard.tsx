import { Paper, createStyles } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import Link from "next/link";

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

interface CardProps {
  image: string;
  vertical?: boolean;
  href?: string;
}

function Card({ image, vertical, href }: CardProps) {
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
        backgroundImage: `url(${image})`,
        height,
        width,
      }
    : {
        backgroundImage: `url(${image})`,
        height,
        width,
      };

  return href ? (
    <Link href={href}>
      <Paper
        ref={ref}
        shadow="md"
        p="xl"
        radius="md"
        sx={sx}
        className={classes.card}
      ></Paper>
    </Link>
  ) : (
    <Paper
      ref={ref}
      shadow="md"
      p="xl"
      radius="md"
      sx={sx}
      className={classes.card}
    ></Paper>
  );
}

export interface ImageCardProps {
  imageURL: string;
  vertical?: boolean;
  href?: string;
}

const ImageCard = ({ imageURL, vertical, href }: ImageCardProps) => {
  return <Card vertical={vertical} image={imageURL} href={href} />;
};

export default ImageCard;
