import React, { createContext, useEffect, useReducer, ReactNode, useState } from "react";

// Define the shape of your Auth state and actions
interface AuthState {
  user: string | null;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: string;
}

export const AuthContext = createContext<any>(undefined);

// Auth reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload || null };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// Define the props for the provider component
interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const token = localStorage.getItem("solCart_JWT");
  const [currentUser, setCurrentUser] = useState<any>()

  useEffect(() => {
    if (token) {
      dispatch({ type: "LOGIN", payload: token });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
