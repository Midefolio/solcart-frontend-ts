import useUtilsContext from "../../../hook/useUtilsContext";
import useUserAuthContext from "../../../hook/userUserAuthContext";

const PriceInput = ({Item, setItem}: any) => { 

  const { country } = useUtilsContext();
  const { currentUser } = useUserAuthContext();

  const formatPrice = (inputValue: any) => {
    const formattedValue = inputValue?.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedValue;
  };

  const handleChange = (event:any) => {
    const inputValue = event.target.value;
    setItem((prev: any) => ({
      ...prev,
      base_price: formatPrice(inputValue)
    }));
    Item.base_price = formatPrice(inputValue)
    localStorage.setItem(
      `${currentUser?.user_id}`,
      JSON.stringify(Item)
    );
  };

  return (
    <>
    <div className="my-mother rad-10 bg-faded-4">
    <span className="my-col-3 xs-3 xs-px9 flex input bg-faded-4 ubuntuBold px13">{country?.currency}</span>
     <input 
      value={formatPrice(Item?.base_price)}
      onChange={handleChange}
      type="tel"
      className="input ubuntuBold xs-px10 xs-8 my-col-9 bg-faded-4"
     />
    </div>
    </>
  );
};

export default PriceInput;
