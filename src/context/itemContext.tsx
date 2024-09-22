import React, { createContext, useState, ReactNode, useEffect } from "react";
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
  const { country, BASE_URL, cart, setCartTotalPrice } = useUtilsContext();
  const [query, setQuery] = useState<any>();
  const [Item, setItems] = useState(null)
  const [ReserveditemsList, setReserveditemsLists] = useState<any>(null)
  const api =`${BASE_URL}NoAuth/Items/get-by-props`

  const getItems = async (query:any, cb?: any): Promise<any> => {
    const data = await makeRequest("POST", api, query, cb);
    if(data) {
      return data
    }
  }

  const calculateCartTotalPrice = () => {
    const total = cart.reduce((acc: number, cartItem: any) => {
      let itemPrice = 0;
  
      // Find the matching reserved item
      const reservedItem = ReserveditemsList?.find(
        (item: any) => item.title === cartItem.item_name
      );
  
      if (reservedItem) {
        let basePrice =
          parseFloat(reservedItem?.base_price?.toString().replace(/,/g, "")) || 0;
        let extraCost = 0;
  
        // Calculate extra cost from variations
        reservedItem?.variations?.forEach((variation: any) => {
          const selectedValue = cartItem?.variations?.find(
            (v: any) => v.variation === variation.name
          )?.value;
  
          if (selectedValue) {
            const value = variation.values.find(
              (v: any) => v.name === selectedValue
            );
            if (value?.extraCost) {
              extraCost += parseFloat(value.extraCost?.toString().replace(/,/g, "")) || 0;
            }
          }
        });
  
        // Calculate total price for the item
        const validQuantity = cartItem?.quantity || 1;
        const validDeliveryCost = cartItem?.delivery_free_cost || 0;
        const itemTotalPrice = (basePrice + extraCost) * validQuantity;
        itemPrice = itemTotalPrice + validDeliveryCost;
      }
  
      return acc + itemPrice;
    }, 0);
  
    setCartTotalPrice(total);
  };

  
  useEffect(() => {
    calculateCartTotalPrice()
  }, [ReserveditemsList, cart])
  

  const getAllItems = async () => {
    const query = {country:country?.value}
    // const query = {country:country?.value, deployment_status:'live'}
    const Items = await getItems(query);
    setItems(Items?.data)
    setReserveditemsLists(Items?.data)
  }

 useEffect(() => {
    if(country !== null || undefined){
      getAllItems();
    }
 }, [country])




return (
    <ItemContext.Provider
      value={{
       query, setQuery,
       getItems,
       Item, setItems,
       ReserveditemsList, setReserveditemsLists,
       calculateCartTotalPrice
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;
