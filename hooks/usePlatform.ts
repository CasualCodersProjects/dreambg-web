import { useOs } from "@mantine/hooks";

const usePlatform = () => {
  const browserPlatform = useOs();
  // @ts-expect-error
  const isTauri = window.__TAURI__ !== undefined && !isCapacitor;

  const isMobile =
    browserPlatform === "android" ||
    browserPlatform === "ios";

  const isWeb = !isTauri && !isMobile;
  
  return {
    isWeb,
    isTauri,
    isMobile,
  };
};

export default usePlatform;
