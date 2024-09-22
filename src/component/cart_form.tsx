import { useState, useEffect } from "react";
import useUtilsContext from "../hook/useUtilsContext";
import { v4 as uuidv4 } from "uuid";
import useApi from "../hook/useApi";
import useUserAuthContext from "../hook/userUserAuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useUtils from "../utils/useutils";

const CartForm = ({ i, setOpenC }: any) => {
  const [selectedVariation, setSelectedVariation] = useState<any>({});
  const { cart, conv, BASE_URL, setCart, setOpenCart } = useUtilsContext();
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);
  const { currentUser, user } = useUserAuthContext();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { makeRequest } = useApi();
  const { notifySuccess, notifyError } = useUtils(); // Import notifyError
  const [isAdding, setIsAdding] = useState<any>(false);
  const api = `${BASE_URL}Items/add-to-cart`;

  useEffect(() => {
    // Calculate total price whenever quantity, variations, or deliveryOption changes
    calculateTotalPrice();
  }, [selectedVariation, quantity, deliveryOption, deliveryCost]);

  const handleVariationChange = (variationName: string, value: string) => {
    setSelectedVariation({ ...selectedVariation, [variationName]: value });
  };

  const handleQuantityChange = (e: any) => {
    setQuantity(Number(e.target.value));
  };

  const handleDeliveryOptionChange = (e: any) => {
    const selectedOption = e.target.value;
    setDeliveryOption(selectedOption);

    // Find the cost for the selected delivery option
    const delivery = i?.delivery_options.find(
      (option: any) => option.state === selectedOption
    );

    if (delivery?.price !== null && delivery?.price !== undefined) {
      setDeliveryCost(parseFloat(delivery.price.toString().replace(/,/g, "")));
    } else {
      setDeliveryCost(0);
    }
  };

  const formatUSDC = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(amount);
  };

  const convToSolana = (price: any) => {
    if (!price || isNaN(price)) return "0.0000";
    const usdcValue = parseFloat(price?.toString().replace(/,/g, "")) * conv;
    return formatUSDC(usdcValue);
  };

  const calculateTotalPrice = () => {
    let basePrice =
      parseFloat(i?.base_price?.toString().replace(/,/g, "")) || 0;
    let extraCost = 0;

    i?.variations?.forEach((variation: any) => {
      const selectedValue = selectedVariation[variation.name];
      if (selectedValue) {
        const value = variation.values.find(
          (v: any) => v.name === selectedValue
        );
        if (value?.extraCost) {
          extraCost +=
            parseFloat(value.extraCost?.toString().replace(/,/g, "")) || 0;
        }
      }
    });

    const validQuantity = quantity || 1;
    const validDeliveryCost = deliveryCost || 0;

    const itemTotalPrice = (basePrice + extraCost) * validQuantity;
    const total = itemTotalPrice + validDeliveryCost;
    setTotalPrice(total);
  };

  const handleAddToCart = async () => {
    // Ensure every variation has a selected value
    const allVariationsSelected = i?.variations?.every(
      (variation: any) => selectedVariation[variation.name]
    );
  
    if (!allVariationsSelected) {
      notifyError("Please select a value for each variation.");
      return;
    }
  
    if (!deliveryOption) {
      notifyError("Please select a delivery option.");
      return;
    }
  
    // Proceed with adding the item to the cart
    setIsAdding(true);
    const newItem = {
      item_id: uuidv4(),
      quantity,
      item_image:i.images[0].secure_url,
      item_price:totalPrice,
      delivery_free_cost:deliveryCost,
      delivery_option_selected:deliveryOption,
      delivery_duration:
        i?.delivery_options.find(
          (option: any) => option.state === deliveryOption
        )?.duration || "",
      item_name: i?.title,
      variations: Object.entries(selectedVariation).map(
        ([variation, value]) => ({
          variation,
          value,
        })
      ),
      buyer:currentUser?.user_id,
      seller:i?.user_id,
      status:""
    };
  
    setCart((prevCart: any) => [...prevCart, newItem]);
    cart.push(newItem);
  
    // Save to DB
    const cb = () => {
      setIsAdding(false);
    };
    const saveToDb = await makeRequest(
      "POST",
      api,
      { user_id: currentUser?.user_id, data:cart },
      cb,
      user
    );
    if (saveToDb) {
      notifySuccess("Item added successfully");
      setIsAdding(false);
      setSelectedVariation({});
      setQuantity(1);
      setDeliveryOption("");
      setDeliveryCost(0);
      setOpenC(false)
      setOpenCart(true)
    }
  };
  

  return (
    <>
      <div className="my-modal bg-faded-3" onClick={() => setOpenC(false)}>
        <div
          className="my-col-6 off-3 down-5 my-bottom-50 bg-white rad-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="my-col-10 off-1 down-5">
            <div className="my-mother bd-bottom my-bottom-10">
              <span className="px13 faded-sol ubuntuBold">Place an Order</span>
            </div>
            <div className="my-mother down-2">
              <span className="ubuntuBold px18">
                {i?.title}
                <div className="my-mother down-1">
                  <span className="px40">
                    <i className="token-image-2 down-1"></i>{" "}
                    {convToSolana(totalPrice)} <span className="faded-sol">USDC</span>
                  </span>
                </div>
              </span>
            </div>

            {i?.variations?.length > 0 && (
              <div className="my-mother top-2">
                {i?.variations?.map((variation: any, vIndex: any) => (
                  <div key={vIndex} className="my-bottom-20 my-col-5 down-4">
                    <div className="ubuntuBold my-mother down-4 faded-sol px12">
                      Which {variation.name}:
                    </div>
                    <div className="my-mother down-3">
                      {variation?.values?.map((value: any, index: any) => (
                        <span
                          key={index}
                          className={`pd-5 bg-faded-4 c-pointer rad-30 px12 ubuntuBold mg-5 ${
                            selectedVariation[variation.name] === value.name
                              ? "bg-color-code-2 color-code-1"
                              : ""
                          }`}
                          onClick={() =>
                            handleVariationChange(variation.name, value.name)
                          }
                        >
                          {value.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="my-col-5">
              <label htmlFor="quantity" className="ubuntuBold px12 faded-sol">
                What Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="input-1 bg-faded-4 px10 my-bottom-20"
              />
            </div>

            <div className="my-col-5 off-1 down-3">
              <label htmlFor="delivery" className="ubuntuBold px16">
                Delivery Option:
              </label>
              <select
                id="delivery"
                value={deliveryOption}
                onChange={handleDeliveryOptionChange}
                className="input-1 px10"
              >
                <option value="">Select Delivery Option</option>
                {i?.delivery_options?.map((option: any, index: any) => (
                  <option
                    key={index}
                    value={`${option?.city} ${option.state} - ${option.duration}`}
                  >
                    {option?.city} {option.state} - {option.duration}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-mother down-5">
              {isAdding ? (
                <button className="btn-sm-full rad-10 flex undet-indent ubuntuBold white bg-color-code-1">
                  <AiOutlineLoading3Quarters className="fas fa-spin" />
                </button>
              ) : (
                <button
                  className="btn-sm-full rad-10 flex undet-indent ubuntuBold white bg-color-code-1"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartForm;
