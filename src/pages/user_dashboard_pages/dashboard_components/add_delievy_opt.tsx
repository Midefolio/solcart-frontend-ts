import { useState, useEffect } from "react";
import { State, City } from "country-state-city";
import { FixedSizeList as List } from "react-window";
import Select from "react-select";
import useUtilsContext from "../../../hook/useUtilsContext";
import useUserAuthContext from "../../../hook/userUserAuthContext";

const AddDeliveryOption = ({ Item, setAddOption, setItem }: any) => {
  const { country, setNewUser } = useUtilsContext();
  const { currentUser } = useUserAuthContext();
  const [isoCode, setIsoCode] = useState<string | null>(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [isFreeDelivery, setIsFreeDelivery] = useState(true);
  const [deliveryPrice, setDeliveryPrice] = useState("");
  
  const deliveryPeriodOptions = [
    { label: "within 24hrs", value: "within 24hrs" },
    { label: "within 48hrs", value: "within 48hrs" },
    { label: "within 72hrs", value: "within 72hrs" },
  ];

  const [deliveryPeriod, setDeliveryPeriod] = useState<any>(
    deliveryPeriodOptions[0] // Default to "within 24hrs"
  );

  const getStates = async () => {
    let stateArr: any = [];
    const states = State.getStatesOfCountry(country?.value);
    states.map((i) => {
      stateArr.push({ label: i.name, value: i.isoCode });
    });
    setStates(stateArr);
  };

  const getCities = async () => {
    let cityArr: any = [];
    const cities = City.getCitiesOfState(country?.value, `${isoCode}`);
    cities.map((i) => {
      cityArr.push({ label: i.name, value: i.name });
    });
    setCities(cityArr);
  };

  const selectState = (e: any): void => {
    setIsoCode(e.value);
    setCities([]); // Clear cities when state changes
    setSelectedCity(null); // Reset selected city
    setNewUser((prev: any) => ({ ...prev, state: e.label, city: "" }));
  };

  const selectCity = (e: any): void => {
    setSelectedCity(e);
    setNewUser((prev: any) => ({ ...prev, city: e.label }));
  };

  const selectDeliveryPeriod = (e: any): void => {
    setDeliveryPeriod(e);
  };

  useEffect(() => {
    getStates();
  }, [country?.value]);

  useEffect(() => {
    if (isoCode) {
      getCities();
    }
  }, [isoCode]);

  const saveOption = () => {
    // Create the delivery option object
    const newOption = {
      state: states.find((state: any) => state.value === isoCode)?.label || "", // Save state name
      city: selectedCity?.label || "",
      price: isFreeDelivery ? null : deliveryPrice,
      duration: deliveryPeriod.value,
    };

    // Update Item.delivery_options array
    const updatedItem = {
      ...Item,
      delivery_options: [...(Item.delivery_options || []), newOption],
    };

    // Save updated Item to local storage
    setItem(updatedItem);
    localStorage.setItem(`${currentUser?.user_id}`, JSON.stringify(updatedItem));
    setAddOption(false);
  };

  const height = 35;
  const MenuList = (props: any) => {
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;
    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        width={`100%`}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }: any) => <div style={style}>{children[index]}</div>}
      </List>
    );
  };

  return (
    <>
      <div className="my-modal bg-blur" onClick={()=> {setAddOption(false)}}>
        <div className="my-col-6 off-4 xs-container xs-down-10vh down-10 my-bottom-50 bg-white rad-10" onClick={(e) => {e.stopPropagation()}}>
          <div className="my-col-10 off-1 down-5 xs-10 xs-off-1 xs-down-10">
            <span className="my-mother ubuntuBold">Add Delivery Option</span>
            <div className="my-mother down-3 xs-down-6">
              <div className="my-mother xs-px12 down-1">
                I deliver anywhere within
              </div>
              <div className="my-mother down-1 xs-down-5">
                <div className="my-col-5">
                  <span className="px12">State</span>
                  <div>
                    <Select
                      name="state-select"
                      onChange={selectState}
                      options={states}
                      className="basic-select"
                      classNamePrefix="select"
                      components={{ MenuList }}
                    />
                  </div>
                </div>
                <div className="my-col-6 off-1 xs-12 xs-down-3">
                  <span className="px12">
                    City <sup className="px10 ubuntuLight">(optional)</sup>
                  </span>
                  <div>
                    <Select
                      name="city-select"
                      value={selectedCity}
                      onChange={selectCity}
                      options={cities}
                      className="basic-select"
                      classNamePrefix="select"
                      components={{ MenuList }}
                    />
                  </div>
                </div>
                <div className="my-mother down-2 xs-down-3">
                  <span className="px12">Price</span>
                  <div className="px12 my-mother down-1">
                    <input
                      type="checkbox"
                      className="px10"
                      checked={isFreeDelivery}
                      onChange={() => setIsFreeDelivery(!isFreeDelivery)}
                    />{" "}
                    free delivery
                  </div>
                  {!isFreeDelivery && (
                    <>
                      <div className="my-mother down-2">
                        <span className="input xs-px10 xs-2 xs-down-2 px12 my-col-1 unset-indent ubuntuBold bg-faded-4 flex">NGN</span>
                        <input
                          type="number"
                          value={deliveryPrice}
                          onChange={(e) => setDeliveryPrice(e.target.value)}
                          className="input my-col-7 xs-down-2 xs-10 bg-faded-4 px12 xs-px12"
                          placeholder="Enter delivery price"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="my-mother down-4 xs-down-4 ">
                <span className="px12">How long does it take to deliver?</span>
                <div className="my-mother down-1 xs-down-2">
                  <Select
                    name="delivery-period-select"
                    value={deliveryPeriod}
                    onChange={selectDeliveryPeriod}
                    options={deliveryPeriodOptions}
                    className="basic-select"
                    classNamePrefix="select"
                    components={{ MenuList }}
                  />
                </div>
              </div>
            </div>
            <div className="my-mother down-8 xs-down-10">
              <span 
                className="bg-green rad-10 white c-pointer xs-px12 pd-10"
                onClick={saveOption}
              >
                Save Option
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDeliveryOption;
