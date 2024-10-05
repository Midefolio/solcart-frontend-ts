import React, { createContext, useEffect, useState, ReactNode } from "react";
import useApi from "../hook/useApi";

// interface UtilsContextType {
//   BASE_URL: string | null;
//   country: string | null;
//   setCountry: React.Dispatch<React.SetStateAction<string | null>>;
//   newUser: any | null;
//   setNewUser: React.Dispatch<React.SetStateAction<any | null>>;
// }

export const UtilsContext = createContext<any | undefined>(
  undefined
);

interface UtilsContextProviderProps {
  children: ReactNode;
}

const UtilsContextProvider: React.FC<UtilsContextProviderProps> = ({
  children,
}) => {
  const BASE_URL = "http://localhost:4000/api/v1/";
  // const BASE_URL = "https://solcart-backend-ts.onrender.com/api/v1/";
  const { makeRequest } = useApi();
  const [country, setCountry] = useState<any>(null);
  const [conv, setConv] = useState<any>(0);
  const [cart, setCart] = useState<any[]>([]);
  const [openCart, setOpenCart] = useState<boolean>(false)
  const [cartTotalPrice, setCartTotalPrice] = useState<number>(0);
  const [ot, setOt] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    city: "",
    // phoneNumber:"",
    password: "",
  });
  // const [selected, setSelected] = useState<string | null>(null);

  const getCountryCode = async () => {
    const res: any = await makeRequest<any>("GET", "https://ipapi.co/json/");
    const COUNTRY_DETAILS = {
      value: res?.country,
      currency: res?.currency,
      label: res?.country_name,
      code: res?.country_calling_code,
    };
    setCountry(COUNTRY_DETAILS);
    setNewUser((prev: any) => ({ ...prev, country: res?.country }));
  };

  const getSolPrice = async()=> {
    const res: any = await makeRequest<any>("GET", `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${country?.currency}&tsyms=USDC`);
    if(res) {
      const price = res.RAW[country?.currency]["USDC"].PRICE
      setConv(price)
    }
  }

  useEffect(() => {
    getCountryCode();
  }, []);
  
  useEffect(() => {
    let interval: any;
  
    if (country) {
      getSolPrice(); // Initial call
      interval = setInterval(() => {
        getSolPrice(); // Run every 30 seconds
      }, 30000); // 30000 ms = 30 seconds
    }
  
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [country?.currency]); // Run this effect when `country?.currency` changes
  

  return (
    <UtilsContext.Provider
      value={{
        BASE_URL,
        country,
        setCountry,
        newUser,
        setNewUser,
        conv,
        cart, setCart,
        openCart, setOpenCart,
        cartTotalPrice, setCartTotalPrice,
        ot, setOt
      }}
    >
      {children}
    </UtilsContext.Provider>
  );
};

export default UtilsContextProvider;
