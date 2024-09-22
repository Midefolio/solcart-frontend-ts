import { WalletContext } from "@solana/wallet-adapter-react";
import { useContext } from "react";


const useWalletContext  = (): any => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error(
      "useWalletContext  must be used inside an AuthContextProvider"
    );
  }

  return context;
};

export default useWalletContext ;
