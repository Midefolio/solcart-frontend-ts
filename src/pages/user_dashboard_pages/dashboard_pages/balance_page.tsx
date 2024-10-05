import {AiOutlineExport, AiOutlineInbox, AiOutlineMoneyCollect, AiOutlineShop, AiOutlineWallet } from "react-icons/ai";
import EscrowModal from "../dashboard_components/escrow-modal";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import useUtilsContext from "../../../hook/useUtilsContext";
import { useEffect, useState } from "react";
import useUtils from "../../../utils/useutils";
import useDasnboardContext from "../../../hook/useDashboardContext";

const Balance = () => {
  const {currentUser} = useUserAuthContext();
  const { conv } = useUtilsContext();
  const { timeAgo } = useUtils();
  const { escrow, getEscrows } = useDasnboardContext();
  const [seeFullMsg, setseeFullMsg] = useState<any>(null);
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
  

  useEffect(() => {
    if(currentUser){
      getEscrows();
    }
  }, [currentUser])


  return ( <>
   <div className="my-col-10 off-2 down-10">
    <div className="my-container">
      <div className="my-mother top-3">
        <span className="px20 ubuntuBold">{currentUser?.firstName} {" "} {currentUser?.lastName}</span>
        <div><span className="faded-sol px13 InterLight">Welcome to your Solcart Dashboard</span></div>
      </div>
      <div className="gap-elements down-3 my-mother">
        <div className="my-col-4 bg-white rad-10">
          <div className="my-col-10 off-1 down-5 my-bottom-10">
            <div><span className="faded-sol px13">Total Balance</span></div>
            <div className="my-mother down-2 gap-elements">
               <span className="px30 faded-sol"><AiOutlineWallet/></span>
               <span className="px20 down-1 ubuntuBold">{convToSolana(currentUser?.balance)}<span className="faded-sol interBold px10"> USDC</span></span>
            </div>
          </div>
        </div>
        <div className="my-col-4 bg-white rad-10">
          <div className="my-col-10 off-1 down-5 my-bottom-10">
            <div><span className="faded-sol px13">New Order</span></div>
            <div className="my-mother down-2 gap-elements">
               <span className="px30 faded-sol"><AiOutlineExport/></span>
               <span className="px20 down-1 ubuntuBold">0</span>
            </div>
          </div>
        </div>
        <div className="my-col-4 bg-white rad-10">
          <div className="my-col-10 off-1 down-5 my-bottom-10">
            <div><span className="faded-sol px13">Total Items</span></div>
            <div className="my-mother down-2 gap-elements">
               <span className="px30 faded-sol"><AiOutlineInbox/></span>
               <span className="px20 down-1 ubuntuBold">{currentUser?.itemCount}</span>
            </div>
          </div>
        </div> 
      </div>
      <div className="my-mother gap-elements down-2">
        <button className="bg-img pd-10 rad-10 ubuntuBold white ">Withdraw Funds <AiOutlineExport/></button>
        <button className="bg-img pd-10 rad-10 ubuntuBold white ">USDC To Fiat <AiOutlineExport/></button>
      </div>
       <div className="my-mother down-3 my-bottom-5">
        <div className="faded-sol bd-bottom my-bottom-10 px18 gap-20">Escrow Notifications
          <span>Transaction Time</span>
        </div>
        <div className="my-mother down-1">
          <div className="my-mother rad-10 my-bottom-50 top-1 bg-wite">
           {escrow?.length > 0 && <>
           {escrow?.map((i:any, index:number) => (
             <>
              { seeFullMsg == i?._id && <EscrowModal i={i} setseeFullMsg={setseeFullMsg} /> }
               <div className="bd-bottom c-pointer down-1 my-bottom-10 bg-whte rad-10" onClick={()=> {setseeFullMsg(i?._id)}}>
               <div className="gap-20">
                <span className="iconss centered bg-white"><i className="fas fa-arrow-down color-code-1"></i></span>
                <span className="down-1 ubuntuBold color-code-1 px13">+{convToSolana(i?.amount)} USDC</span>
                <span className="down-1 faded-sol"><span className="ubuntuBold color-code-2 px13">Action Required</span> - <span className="ubuntuold faded-sol">{convToSolana(i?.amount)} USDC</span> has been successfully transferred to our secure escrow account</span>
                <span className="pd-10 rad-10 c-pointer px12 ">...View More</span>
                 <span className="down-1">{timeAgo(i?.createdAt)}</span>
              </div>
            </div>
             </>
           ))}
          </>}  
          </div>
        </div>
       </div>
    </div>
   </div>
    </> );
}
 
export default Balance;