import React, { createContext, useEffect, useState, ReactNode } from "react";
import useApi from "../hook/useApi";
import useUtilsContext from "../hook/useUtilsContext";

export const ItemContext = createContext<any | undefined>(
  undefined
);

interface ItemContextProviderProps {
  children: ReactNode;
}

const ItemContextProvider: React.FC<ItemContextProviderProps> = ({
  children,
}) => {
  const { makeRequest } = useApi();
  const { BASE_URL } = useUtilsContext();
  const [query, setQuery] = useState<any>();
  const api =`${BASE_URL}/Items/get-by-props`

  const getItems = async (query:any, cb: any): Promise<any> => {
    const data = await makeRequest("POST", api, query, cb);
    if(data) {
      return data
    }
  }

return (
    <ItemContext.Provider
      value={{
       query, setQuery,
       getItems
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;
