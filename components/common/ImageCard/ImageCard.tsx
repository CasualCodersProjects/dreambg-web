import { useElementSize, useHover, useViewportSize } from "@mantine/hooks";
import { createImageURL } from "@/utils/createImageURL";
import { Card, Image, Center } from "@mantine/core";
import Link from "next/link";
import usePlatform from "@/hooks/usePlatform";
import ImageControls from "./ImageControls";

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

  const { isMobile } = usePlatform();

  const hoverStyle =
    hovered && !disableHover
      ? {
          ...sx,
          transform: "scale(1.02)",
          transition: "transform 125ms ease",
          maxHeight: isMobile ? undefined : 530,
          minWidth: isMobile ? viewWidth * 0.9 : viewWidth * 0.2,
        }
      : {
          ...sx,
          transform: "scale(1)",
          transition: "transform 125ms ease",
          maxHeight: isMobile ? undefined : 530,
          minWidth: isMobile ? viewWidth * 0.9 : viewWidth * 0.2,
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
