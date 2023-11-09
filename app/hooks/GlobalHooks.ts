import { useContext } from "react";
import { GlobalContext } from "../provider/GlobalProvider";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context.globalContext;
};

export const useSetGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useSetGlobalContext must be used within a GlobalProvider");
  }
  return context.setGlobalContext;
};
