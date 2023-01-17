import { Image, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import Link from "next/link";

export interface ImageCardProps {
  imageURL: string;
  vertical?: boolean;
  href?: string;
}

const ImageCard = ({ imageURL, vertical, href }: ImageCardProps) => {
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
      }
    : {};

  return href ? (
    <Link href={href}>
      <Image
        ref={ref}
        radius="md"
        src={imageURL}
        alt=""
        height={height}
        width={width}
        sx={sx}
        withPlaceholder
        placeholder={<Text align="center">Image failed to load.</Text>}
      />
    </Link>
  ) : (
    <Image
      ref={ref}
      radius="md"
      src={imageURL}
      alt=""
      height={height}
      width={width}
      sx={sx}
      withPlaceholder
      placeholder={<Text align="center">Image failed to load.</Text>}
    />
  );
};

export default ImageCard;
