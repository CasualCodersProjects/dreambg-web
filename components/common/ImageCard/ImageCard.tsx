import { useElementSize, useHover, useViewportSize } from "@mantine/hooks";
import { createImageURL } from "@/utils/createImageURL";
import { Card, Image, Center } from "@mantine/core";
import Link from "next/link";
import ImageControls from "./ImageControls";
import { useVertical } from "@/hooks/useVertical";
import { useMediaQuery } from "@mantine/hooks";

export interface ImageCardProps {
  id: string;
  width?: number;
  height?: number;
  disableHover?: boolean;
  sx?: any;
  imageLink: string;
  likes?: number;
  views?: number;
}

const ImageCard = ({
  id,
  width,
  height,
  disableHover,
  sx,
  imageLink,
  likes,
  views,
}: ImageCardProps) => {
  const { hovered, ref } = useHover();
  const { ref: sizeRef, width: refWidth } = useElementSize();
  const { width: viewWidth } = useViewportSize();
  const { vertical: isMobile } = useVertical();
  const xs = useMediaQuery("(max-width: 480px)");

  const hoverStyle =
    hovered && !disableHover
      ? {
          ...sx,
          transform: "scale(1.02)",
          transition: "transform 125ms ease",
          maxHeight: isMobile ? undefined : 530,
          minWidth: xs ? viewWidth * 0.9 : viewWidth * 0.2,
        }
      : {
          ...sx,
          transform: "scale(1)",
          transition: "transform 125ms ease",
          maxHeight: isMobile ? undefined : 530,
          minWidth: xs ? viewWidth * 0.9 : viewWidth * 0.2,
        };

  const vertical = width && height ? height > width : false;

  return (
    <Card
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      ref={ref}
      radius="md"
      sx={hoverStyle}
    >
      <Card.Section ref={sizeRef}>
        <Link href={`/image?uuid=${id}`}>
          <Image
            height={isMobile ? refWidth * 1.7 : refWidth * 0.6}
            width={refWidth}
            src={createImageURL("ai-images", imageLink)}
            alt={"image"}
          />
        </Link>
      </Card.Section>

      <Center mt="md">
        <ImageControls
          id={id}
          likes={likes}
          views={views}
          vertical={vertical}
        />
      </Center>
    </Card>
  );
};

export default ImageCard;
