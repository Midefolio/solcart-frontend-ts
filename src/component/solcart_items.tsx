import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import useItemContext from "../hook/useItemContext";
import { useState, useEffect } from "react";
import useUtilsContext from "../hook/useUtilsContext";
import useUserAuthContext from "../hook/userUserAuthContext";
import useApi from "../hook/useApi";
import useUtils from "../utils/useutils";

const CartItems = ({ i }: any) => {
  const { ReserveditemsList } = useItemContext();
  const [updated, setUpdated] = useState<any>(i);
  const { setCart, cart, conv, BASE_URL } = useUtilsContext();
  const [totalPrice, setTotalPrice] = useState<number>(i?.item_price || 0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, currentUser } = useUserAuthContext();
  const { makeRequest } = useApi();
  const { notifySuccess } = useUtils();
  const api = `${BASE_URL}Items/add-to-cart`;

  // Find the item in ReserveditemsList that matches the item_id from the cart
  const reservedItem = ReserveditemsList?.find(
    (item: any) => item.title === i?.item_name
  );

  // Update the cart in the database
  const updateCartInDb = async (updatedCart: any) => {
    const cb = () => setIsDeleting(false);
    await makeRequest("POST", api, { user_id: currentUser?.user_id, data: updatedCart }, cb, user);
    setIsDeleting(false);
    notifySuccess('Item updated successfully');
  };

  // Update cart item when variation is changed
  const handleVariationChange = async (variation: string, value: string) => {
    const newVariations = updated.variations.map((v: any) =>
      v.variation === variation ? { ...v, value } : v
    );
    const newItem = { ...updated, variations: newVariations };
    setUpdated(newItem);
    const newCart = cart.map((cartItem: any) =>
      cartItem.item_id === newItem.item_id ? newItem : cartItem
    );
    setCart(newCart);
   await updateCartInDb(newCart); // Save to DB
  };

  // Handle delivery option change
  const handleDeliveryOptionChange = async(e: any) => {
    const selectedOption = e.target.value;
    const deliveryOption = reservedItem?.delivery_options.find(
      (option: any) => option.state === selectedOption
    );

    const newItem = {
      ...updated,
      delivery_option_selected: selectedOption,
      delivery_free_cost: deliveryOption?.price || 0,
      delivery_duration: deliveryOption?.duration || "",
    };

    setUpdated(newItem);
    const newCart = cart.map((cartItem: any) =>
      cartItem.item_id === newItem.item_id ? newItem : cartItem
    );
    setCart(newCart);
    await updateCartInDb(newCart); // Save to DB
  };

  // Handle quantity change
  const handleQuantityChange = async(e: any) => {
    const newQuantity = Number(e.target.value);
    const newItem = { ...updated, quantity: newQuantity };
    setUpdated(newItem);
    const newCart = cart.map((cartItem: any) =>
      cartItem.item_id === newItem.item_id ? newItem : cartItem
    );
    setCart(newCart);
    await updateCartInDb(newCart); // Save to DB
  };

  // Delete cart item
  const handleDelete = async (index:any) => {
    const confirm = window.confirm('Delete this Item ?')
    if(!confirm) {return}
    setIsDeleting(true);
    const newCart = cart.filter((cartItem: any) => cartItem.item_id !== i.item_id);
    setCart(newCart);
    await updateCartInDb(newCart); // Save to DB
    setIsDeleting(index);
  };

  // Calculate total price based on variations, quantity, and delivery cost
  useEffect(() => {
    const calculateTotalPrice = () => {
      let basePrice =
        parseFloat(reservedItem?.base_price?.toString().replace(/,/g, "")) || 0;
      let extraCost = 0;

      // Calculate extra cost from variations
      reservedItem?.variations?.forEach((variation: any) => {
        const selectedValue = updated?.variations?.find(
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

      // Calculate total price with delivery cost and quantity
      const validQuantity = updated?.quantity || 1;
      const validDeliveryCost = updated?.delivery_free_cost || 0;
      const itemTotalPrice = (basePrice + extraCost) * validQuantity;
      const total = itemTotalPrice + validDeliveryCost;
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [updated, reservedItem]);

  // Format the price to USDC with 4 decimal places
  const formatUSDC = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(amount);
  };

  // Convert the total price to USDC using the `conv` rate
  const totalPriceInUSDC = (price: number) => {
    return formatUSDC(price * conv);
  };

  return (
    <>
      <div className="pd-10 my-mother rad-10">
        <div className="my-col-2">
          <div className="img-container-cart">
            <img src={i?.item_image} alt="" />
          </div>
        </div>
        <div className="my-col-10">
          <div className="my-container down-2">
            <div className="my-moter">
              <div className="my-mother color-code-1 gap-elements top-3">
                <i className="fas fa-map-marker-alt px12 down-1"></i>
                <span className="px12">
                  {updated?.delivery_option_selected}
                </span>
              </div>
              <span className="ubuntuBold px18">{reservedItem?.title}</span>
            </div>
              <div className="ubuntuLight fl-riht">
                <i className="token-image"></i> {totalPriceInUSDC(totalPrice)} USDC {/* Updated Item Price in USDC */}
              </div>
            <div className="gap-20 down-2">
              {/* Render each variation */}
              {reservedItem?.variations?.map((variation: any, index: any) => (
                <select
                  key={index}
                  className="my-col-2 bg-faded-4 ubuntuBold px12 faded-3 rad-10 input-1"
                  value={
                    updated.variations.find(
                      (v: any) => v.variation === variation.name
                    )?.value || ""
                  }
                  onChange={(e) =>
                    handleVariationChange(variation.name, e.target.value)
                  }
                >
                  <option value="">Select {variation.name}</option>
                  {variation?.values?.map((value: any, vIndex: any) => (
                    <option key={vIndex} value={value.name}>
                      {value.name}
                    </option>
                  ))}
                </select>
              ))}

              {/* Delivery Options */}
              <select
                className="my-col-2 bg-faded-4 ubuntuBold px12 faded-3 rad-10 input-1"
                value={updated?.delivery_option_selected}
                onChange={handleDeliveryOptionChange}
              >
                <option value="">Select Delivery Option</option>
                {reservedItem?.delivery_options?.map((option: any, index: any) => (
                  <option key={index} value={`${option.city} ${option.state} - ${option.duration}`}>
                    {option.city} {option.state} - {option.duration}
                  </option>
                ))}
              </select>

              {/* Quantity input field */}
              <input
                value={updated?.quantity}
                onChange={handleQuantityChange}
                className="my-col-2 bg-faded-4 rad-10 input-1"
                type="number"
              />

              {/* Delete button */}
              <button
                onClick={()=> {handleDelete(i?.item_id)}}
                className="right-0 ubuntuBold px18 faded-sol pd-5 rad-10"
                disabled={isDeleting}  // Disable while deleting
              >
                {isDeleting == i.item_id ? <AiOutlineLoading3Quarters className="fas fa-spin" />  : <AiOutlineDelete />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
