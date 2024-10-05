import React, { createContext, useState, ReactNode, useEffect } from "react";
import useApi from "../hook/useApi";
import useUtilsContext from "../hook/useUtilsContext";
import useUserAuthContext from "../hook/userUserAuthContext";
export const DashboardContext = createContext<any | undefined>(
  undefined
);

interface DashboardContextProviderProps {
  children: ReactNode;
}

const DashboardContextProvider: React.FC<DashboardContextProviderProps> = ({
  children,
}) => {
  const { makeRequest } = useApi();
  const {BASE_URL} = useUtilsContext();
  const { currentUser, user } = useUserAuthContext();
  const [orders, setOrders] = useState<any>(null);
  const [query, setQuery] = useState<any>(null);
  const [view, setView] = useState<any>();
  const [viewCo, setViewCo] = useState<any>();
  const [escrow, setEscrow] = useState<any>(null);
  const api_order =`${BASE_URL}Items/get-order`
  const api_escrow = `${BASE_URL}Items/get-escrow`


  const getOrders = async () => {
    const res = await makeRequest("POST", api_order, query, null, user);
    if (res) {
      setOrders(res.data);
      setView(res.data[0]);
    }
  };


  const getEscrows = async () => {
    const res = await makeRequest("POST", api_escrow, {seller_id:currentUser?.user_id}, null, user);
    if (res) {
      setEscrow(res.data);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setQuery({ buyer: currentUser?.user_id });
    }
  }, [currentUser]);

  
  useEffect(() => {
    if (currentUser && query) {
        getOrders();
    }
  }, [query, currentUser]);

 
return (
    <DashboardContext.Provider
      value={{
        view, setView,
        orders, setOrders,
        query, setQuery,
        escrow, setEscrow,
        getOrders,
        getEscrows,
        viewCo, setViewCo
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
