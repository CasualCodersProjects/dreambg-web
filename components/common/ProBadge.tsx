import { Badge } from "@mantine/core";

interface ProBadgeProps {
  ml?: string;
}

const ProBadge = ({ ml }: ProBadgeProps) => (
  <Badge ml={ml} variant="gradient" gradient={{ from: "blue", to: "pink" }}>
    Pro
  </Badge>
);

export default ProBadge;
