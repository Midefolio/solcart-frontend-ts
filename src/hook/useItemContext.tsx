import { useContext } from "react";
import { ItemContext } from "../context/itemContext";

const useItemContext = (): any => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error(
      "useItemContext must be used inside an AuthContextProvider"
    );
  }

  return context;
};

export default useItemContext;
