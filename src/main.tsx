import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./all.css";
import "./typography.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UtilsContextProvider from "./context/utilsContext.tsx";
import AuthContextProvider from "./context/userAuthContext.tsx";
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <UtilsContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </UtilsContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
