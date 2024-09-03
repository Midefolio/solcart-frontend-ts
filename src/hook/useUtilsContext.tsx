import { useContext } from "react";
import { UtilsContext } from "../context/utilsContext";

const useUtilsContext = (): any => {
  const context = useContext(UtilsContext);

  if (!context) {
    throw new Error(
      "useUtilsContext must be used inside an AuthContextProvider"
    );
  }

  return context;
};

export default useUtilsContext;
