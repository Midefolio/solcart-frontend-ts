import React, { createContext, useEffect, useReducer, ReactNode, useState } from "react";
import useUtils from "../utils/useutils";
import useApi from "../hook/useApi";
import useUtilsContext from "../hook/useUtilsContext";

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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [ userContact, setUserContact ] = useState<any>({ wa_link: "", phone: "" });
  const { setCart } = useUtilsContext();
  const { BASE_URL } = useUtilsContext();
  const { isSending } = useUtils();
  const { makeRequest } = useApi();
  const user_api = `${BASE_URL}userAuth/get-current-user`;
  const cart_api = `${BASE_URL}Items/get-cart`;
  const email = localStorage.getItem("solCart-email");

  useEffect(() => {
    if (token) {
      dispatch({ type: "LOGIN", payload: token });
    }
  }, [token]);

  const getCurrentUser = async () => {
    const cb = () => {
      isSending(false);
    };
    const res = await makeRequest("POST", user_api, { email }, cb, state?.user);
    if (res) {
      setCurrentUser(res?.data);
      isSending(false);
    }
  };
  
  const getCart = async() => {
    const res = await makeRequest("POST", cart_api, {user_id:currentUser?.user_id}, null, state?.user);
    if(res){
      setCart(res?.data?.cart)
    }
  }

  useEffect(() => {
    if (!currentUser && state?.user) {
      getCurrentUser();
    }
  }, [state?.user, currentUser]);

  useEffect(()=> {
    if(currentUser){
      getCart()
    }
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ ...state, dispatch, currentUser, setCurrentUser, userContact, setUserContact  }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
