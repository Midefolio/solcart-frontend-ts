import { useState } from "react";
import AddDeliveryOption from "./add_delievy_opt";
import useUtilsContext from "../../../hook/useUtilsContext";
import useUtils from "../../../utils/useutils";

const DeliveryOptions = ({ Item, setItem }: any) => {
  const [addOption, setAddOption] = useState(false);
  const { country } = useUtilsContext();
  const { formatNumber, notifySuccess, notifyError } = useUtils();

  const handleDeleteOption = (index: number) => {
    if (window.confirm("Are you sure you want to delete this delivery option?")) {
      const updatedOptions = Item.delivery_options.filter(
        (_: any, i: number) => i !== index
      );
      setItem((prev: any) => ({
        ...prev,
        delivery_options: updatedOptions,
      }));
      localStorage.setItem(
        `${Item.user_id}`,
        JSON.stringify({ ...Item, delivery_options: updatedOptions })
      );
      notifySuccess("Delivery option deleted successfully.");
    }
  };

  return (
    <>
      {addOption && (
        <AddDeliveryOption
          Item={Item}
          setItem={setItem}
          setAddOption={setAddOption}
        />
      )}
      <div className="my-mother">
        {Item.delivery_options &&
          Item.delivery_options.map((option: any, index: number) => (
            <div
              key={index}
              className="my-mother c-pointer my-bottom-10 bd-code-1 rad-10 xs-down-2  down-2"
            >
              <div className="my-container xs-10 xs-off-1 xs-down-5 px12 down-2">
                <div className="color-code-1 my-col-12">
                  <i className="fas fa-map-marker-alt"></i>
                  <span className="faded-sol mg-5">Anywhere within</span>
                  <span className="upper-case"> {option.city}</span>
                  <span className="upper-case"> {option.state}</span>
                </div>
                <div className="my-col-4 xs-5 down-2 xs-down-3">
                  <i className="fas fa-money-bill"></i>{" "}
                  {option.price
                    ? `${country?.currency} ${formatNumber(option.price)}`
                    : "Free Delivery"}
                </div>
                <div className="my-col-4 xs-down-3 xs-5 down-2">
                  <i className="fas fa-shipping-fast"></i> {option.duration}
                </div>
                <div className="my-col-4 xs-2 xs-down-4 down-2 right">
                  <i
                    className="fas fa-trash-alt fl-right color-code-1 c-pointer"
                    onClick={() => handleDeleteOption(index)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
      </div>
      <span
        onClick={() => {
          setAddOption(true);
        }}
        className="input-1 c-pointer color-code-1 flex bd-code-1 xs-7 xs-down-5 down-3 my-col-6 rad-10"
      >
        <i className="fa fa-plus"></i>
        <span className="mg-5 px13 ubuntuLight">Add delivery option</span>
      </span>
    </>
  );
};

export default DeliveryOptions;
