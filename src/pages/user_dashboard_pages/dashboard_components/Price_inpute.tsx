import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key, useState } from "react";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import useUtilsContext from "../../../hook/useUtilsContext";
import AddVariations from "./add_item_variations";
import PriceInput from "./price_input";
import EditItemVarition from "./edit_item_variation";

const EnterPrice = ({Item, setItem}: any) => {
    const { currentUser } = useUserAuthContext();
    const { conv } = useUtilsContext();
    const [adVar, setAddVar] = useState(false);
    const [editVar, setEditVar] = useState<any>(null);

    const switchTypes = (value: boolean) => {
        setItem((prev: any) => ({ ...prev, isTypes: value }));
        Item.isTypes = value;
        localStorage.setItem(`${currentUser?.user_id}`, JSON.stringify(Item));
    }

    const formatUSDC = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
        }).format(amount);
    };

    const convToSolana = () => {
        const usdcValue = parseFloat(Item?.base_price?.replace(/,/g, '')) * conv;
        const formattedUSDC = formatUSDC(usdcValue);
        return formattedUSDC;
    }

    const amountAfterFee = () => {
        const basePrice = parseFloat(convToSolana().replace(/,/g, ''));
        const amountAfterFee = basePrice - (basePrice * 0.05);
        return formatUSDC(amountAfterFee);
    }

    return (
        <>
            {adVar && <AddVariations setAddVar={setAddVar} Item={Item} setItem={setItem} />}
            {Item?.variations.map((i: any, index: any) => (
                <>
                    {editVar == i.name && <EditItemVarition i={i} setAddVar={setEditVar} Item={Item} setItem={setItem} key={index} />}
                </>
            ))}
            <div className="my-mother">
                <div className="my-mother">
                    <div className="px12 xs-px10 lin- ubuntuLight faded-sol">
                        The price will be displayed in USDC{" "}
                        <span className="token-image"></span> equivalent. You will
                        need to connect your Phantom wallet to get paid.
                    </div>
                </div>
                <div className="my-col-4 xs-5 down-2 xs-down-2"><PriceInput Item={Item} setItem={setItem} /></div>
                <div className="my-col-1 xs-1 down-2 xs-down-2"><span className="input flex unset-indent ubuntuBold">=</span></div>
                <div className="my-col-7 xs-6 down-1 bg-faded-4  xs-down-2 rad-10">
                    <span className="token-image-2 my-col-1 xs-1 xs-down-3 mg-10 down-3"></span>
                    <span className="input down-1 my-col-10 xs-10 flex-1 px14 ubuntuBold">
                        <span className="xs-px10">
                            {convToSolana()}{" "}
                            <b className="faded-sol hidden-xs">USDC</b>
                        </span>
                    </span>
                </div>
                <div className="my-mother down-2">
                    <div className="my-col-12 down-1 bg-fded-4 rad-10">
                        <span className="input my-col-10 unset-indent flex-1 xs-px10 px14 ubuntuBold">
                          <span className="faded-so">You'll receive:</span>
                            <span className="mg-5">
                                {amountAfterFee()}{" "}
                                <b className="faded-sol">USDC</b> 
                            </span>
                           </span>
                           <span className="px12 xs-top-4 xs-px10 my-mother ubuntuLight faded-sol">solCart receives 5% service fee</span>
                    </div>
                </div>
                <div className="my-mother down-3 xs-down-3">
                    <span onClick={() => { switchTypes(true) }} className={`c-pointer color-code-1 ${Item?.isTypes && "color-code-1 my-bottom-5"} ubuntuBold px12`}>
                        This Item has variation(s)?
                    </span>
                </div>
                {Item?.isTypes &&
                    <div className="my-mother down-1 xs-down-2">
                        <div className="my-mother lin-3">
                            {
                                Item?.variations.map((i: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                                    <span onClick={() => { setEditVar(i.name) }} key={index} className="pd-5 mg-5 c-pointer bg-faded-3 rad-20 black xs-px10 px13">
                                        {i.name}<i className="fas mg-5 px10 fa-pen"></i>
                                    </span>
                                ))
                            }
                        </div>
                        <span className="pd-5 bd-code-1 rad-10 xs-px10 xs-down-3 xs-5 centered my-col-4 unset-indent  px13 c-pointer color-code-1 down-2" onClick={() => { setAddVar(true) }}>
                            Add variation <i className="fas fa-plus"></i>
                        </span>
                    </div>
                }
            </div>
        </>
    );
}

export default EnterPrice;
