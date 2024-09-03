import { useState } from "react";
import useUtilsContext from "../../../hook/useUtilsContext";
import useUserAuthContext from "../../../hook/userUserAuthContext";

const AddVariations = ({ Item, setAddVar, setItem }: any) => {
    const { conv } = useUtilsContext();
    const [extraCost, setExtraCost] = useState<string>("");
    const [name, setName] = useState<string>("");
    const { currentUser } = useUserAuthContext();
    const [variation, setVariation] = useState<any>({
        name: "",
        values: []
    });

    // Format USDC value with commas and four decimal places
    const formatUSDC = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
        }).format(amount);
    };

    const convToSolana = () => {
        const basePrice = parseFloat(Item?.base_price?.replace(/,/g, '')) || 0;
        const extraCostValue = parseFloat(extraCost?.replace(/\D/g, "")) || 0;
        const usdcValue = (basePrice + extraCostValue) * conv;
        const formattedUSDC = formatUSDC(usdcValue);
        return isNaN(usdcValue) ? " " : formattedUSDC;
    };

    // Format the price input with commas
    const formatPrice = (value: string): string => {
        return value.replace(/\D/g, "")?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Add a variation with name and extra cost to the variations array in Item
    const addVariation = () => {
        if (!name) {
            window.alert('Please enter value');
            return;
        }
        
        const newVariation = { name, extraCost:formatPrice(extraCost) };

        setVariation((prev: any) => ({
            ...prev,
            values: [...prev.values, newVariation]
        }));

        // Update the Item state with the new variatio

        setName(""); // Clear the input fields after adding
        setExtraCost(""); // Clear the extra cost input field
    };

    // Remove a variation by index
    const removeVariation = (index: number) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this value ?");
        if (!isConfirmed) {
            return; // Exit if the user cancels
        }
        setVariation((prev: any) => ({
            ...prev,
            values: prev.values.filter((_: any, i: number) => i !== index)
        }));
    };



    const saveVariation =()=> {
        if (!variation.name) {
            window.alert('Please enter variation name');
            return;
        }
        if (variation.values.length < 1) {
            window.alert('Please add at least 1 value');
            return;
        }
        let newVAriation = {name:variation?.name, values:variation?.values}
        setItem((prevItem: any) => ({
            ...prevItem,
            variations: [...prevItem.variations, newVAriation]
        })); 
        Item.variations = [...Item.variations, newVAriation];
        localStorage.setItem(`${currentUser?.user_id}`, JSON.stringify(Item));
        setAddVar(false)
    }

    return (
        <>
            <div className="bg-blur my-modal" onClick={()=> {setAddVar(false)}}>
                <div className="my-col-8 xs-10 xs-off-1 xs-down-10vh bg-white rad-10 my-bottom-20 down-8 off-3" onClick={(e)=> {e.stopPropagation()}}>
                    <div className="my-col-10 xs-10 xs-off-1 xs-down-5 off-1 down-5">
                        <div className="bd-bottom-"><span>Add Variations</span></div>
                        <div className="my-mother xs-down-10 down-4">
                            <span className="ubuntuBold px13 my-col-2">Variation Title</span>
                            <input
                                onChange={(e) => setVariation((prev: any) => ({ ...prev, name: e.target.value }))}
                                type="text"
                                placeholder="enter title (e.g Color)"
                                className="bg-faed bd-code-1 rad-10 px13 my-col-5 top-2 my-input"
                            />
                        </div>
                        <div className="my-mother xs-down-5 down-2">
                            <div className="my-mother lin-3">
                                {variation?.values.map((i: any, index: number) => (
                                    <span
                                        key={index}
                                        className="pd-10 mg-5 xs-down-10 rad-30 bg-faded-4  xs-px10 c-pointer ubuntuBold px13"
                                        onClick={() => removeVariation(index)}
                                    >
                                        {i.name} {i.extraCost && <>+ {i.extraCost}</>} <i className="fas fa-trash-alt px10 mg-10"></i>
                                    </span>
                                ))}
                            </div>
                            <div className="my-mother xs-down-8 bd-bottom my-bottom-10 down-4 ubuntuBold  xs-px12 faded-sol">Add Values</div>
                            <div className="my-mother xs-down-5 xs-11 pd-10 bg-faded rad-10 down-3">
                                <div className="my-col-2 xs-4">
                                    <span className="ubuntuBold px12 xs-px10">Value</span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g White"
                                        className="my-col-12  px12 my-input"
                                    />
                                </div>
                                <div className="my-col-8 xs-6 xs-off-1">
                                    <span className="ubuntuBold mg-10 xs-px10 px12 my-col-12">Extra Cost <sup className="px10 faded-sol"> (Optional)</sup></span>
                                    <input
                                        value={formatPrice(extraCost)}
                                        onChange={(e) => setExtraCost(e.target.value)}
                                        type="tel"
                                        placeholder="enter cost"
                                        className="my-col-4 mg-10 px12 my-input"
                                    />
                                    <input
                                        type="text"
                                        placeholder=""
                                        readOnly
                                        value={"+" + "NGN " + Item?.base_price}
                                        className="my-col-3 xs-12 xs-down-5 down-1 ubuntuBold unset-indent  px13 input"
                                    />
                                    <div className="input my-col-4 down-2">
                                        <span className="">=</span>
                                        <span className="pd-"><span className="token-image"></span> {convToSolana()}</span>
                                    </div>
                                </div>
                                <div className="my-col- c-pointer" onClick={addVariation}>
                                    <span className="input-1 xs-4 bg-img my-col-1 px10 rad-10 flex white ubuntuBold unset-indent down-3 bg-color-code-1">Add Value</span>
                                </div>


                            </div>
                                <div className="my-mother xs-down-10 down-2">
                                <span onClick={saveVariation} className="input my-col-2 xs-5 px12 rad-10 flex white ubuntuBold unset-indent down-3 bg-green c-pointer">Save Variation</span>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddVariations;
