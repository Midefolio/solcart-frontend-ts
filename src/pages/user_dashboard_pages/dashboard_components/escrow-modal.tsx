import { useNavigate } from "react-router-dom";
import useDasnboardContext from "../../../hook/useDashboardContext";
import useUtilsContext from "../../../hook/useUtilsContext";

const EscrowModal = ({i, setseeFullMsg}:any) => {
    const {setView} = useDasnboardContext();
    const navigate = useNavigate();
    const { conv } = useUtilsContext();

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
    
    
    const viewOrder = () => {
       setView(i?.order);
       navigate('/profile/orders?p=my-orders')
    }

    return ( <>
     <div className="my-modal bg-faded-3" onClick={()=> {setseeFullMsg(null)}}>
        <div className="my-col-6 off-3 down-10 rad-10 my-bottom-20 bg-white ">
            <div className="my-col-10 off-1 down-5">
                <span>Escrow Notification</span>
                <div className="my-mother down-3">
                    <span className="ubuntuBold">Payment Received for Your Item</span>
                    <p>We are pleased to inform you that <span className="color-code-1 ubuntuBold">{convToSolana(i?.amount)} USDC</span> payment for your item, <span className="ubuntuBold">[{i?.order?.item_name}]</span>, has been successfully transferred to our secure escrow account by a buyer.</p>
                    <p>You can now proceed with the next steps to fulfill the order. Once the item has been delivered and the buyer confirms receipt, the funds will be released from escrow to your account.</p>
                    <p className="gap-elements down-2 my-mother">
                        <button className="pd-10 bg-color-code-1 white px13 ubuntuBold" onClick={viewOrder}>View Order</button>
                        <button className="pd-10 bg-red white px13 ubuntuBold" >Report Issues</button>
                    </p>
                </div>
            </div>
        </div>
     </div>
    </>  );
}
 
export default EscrowModal;