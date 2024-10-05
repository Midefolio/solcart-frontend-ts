import { useContext } from "react";
import { ItemContext } from "../context/itemContext";
import { DashboardContext } from "../context/dashboardContext";

const useDasnboardContext = (): any => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDasnboardContext must be used inside an bashboardCntext"
    );
  }

  return context;
};

export default useDasnboardContext;
