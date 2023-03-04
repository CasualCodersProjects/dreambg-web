import { useMediaQuery } from "@mantine/hooks";
import { useContext, useState, createContext } from "react";

interface VerticalContextProps {
  vertical: boolean;
  setVertical: (value: boolean) => void;
}

const VerticalContext = createContext({} as VerticalContextProps);

export const VerticalProvider = ({ children }: { children: JSX.Element }) => {
  const [vertical, setVertical] = useState<boolean>(false);

  return (
    <VerticalContext.Provider value={{ vertical, setVertical }}>
      {children}
    </VerticalContext.Provider>
  );
};

export const useVertical = () => {
  const { vertical, setVertical } = useContext(VerticalContext);

  return { vertical, setVertical };
};
