import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./all.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./typography.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UtilsContextProvider from "./context/utilsContext.tsx";
import AuthContextProvider from "./context/userAuthContext.tsx";
import ItemContextProvider from "./context/itemContext.tsx";
import WalletProviderWrapper from "./component/wallectProvoder.tsx";

import { Buffer } from 'buffer'
globalThis.Buffer = Buffer


// import { WalletProvider } from '@solana/wallet-adapter-react';
// import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
// import { Buffer } from 'buffer';

// This ensures Buffer is available globally
// window.Buffer = window.Buffer || Buffer;


// const network = 'devnet'; // Change to 'mainnet-beta' for production
// const wallets = [new PhantomWalletAdapter()];

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <UtilsContextProvider>
        <AuthContextProvider>
          <ItemContextProvider>
            <WalletProviderWrapper>
              <App />
            </WalletProviderWrapper>
          </ItemContextProvider>
        </AuthContextProvider>
      </UtilsContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
