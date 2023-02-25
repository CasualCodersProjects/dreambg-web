import { openModal } from "@mantine/modals";
import PricingCard from "@/components/common/PricingCard";

export const usePaymentModal = () => {
  const children = <PricingCard />;
  const open = () => {
    openModal({
      children,
      title: "Upgrade to Pro",
    });
  };

  return open;
};
