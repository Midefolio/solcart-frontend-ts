import { AiOutlineHeart } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import useUtilsContext from "../hook/useUtilsContext";
import useUtils from "../utils/useutils";

const Items = ({i}: any) => {
  const { conv } = useUtilsContext();
  const { timeAgo } = useUtils();
  const formatUSDC = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
    }).format(amount);
};

const convToSolana = () => {
    const usdcValue = parseFloat(i?.base_price?.replace(/,/g, '')) * conv;
    const formattedUSDC = formatUSDC(usdcValue);
    return formattedUSDC;
}


    return ( <>
      <div className="xs-12 my-col-3 xs-down-1">
      <div className="my-container xs-12 items-hover bg-white rad-10">
        <div className="xs-mg-10 xs-3 my-col-12 xs-down-3 my-bottom-10">
          <div className="img-container-product"><img src={i?.images[0].secure_url} alt="" /> </div>
        </div>
        <div className="my-container xs-9 top-3">
          <div className="xs-container">
           <div className="my-mother down-2 xs-down-5"><span className="px13 ubuntuBold">{i?.title?.slice(0, 30)}{".."}</span></div>
           <div className="my-mother ls-my-bottom-10 xs-down-1 top-1">
            <div><span className="token-image"/>
            <span className="px12 mg-2 ubuntuBold">{convToSolana()} <span className="faded-sol ubuntuBold">USDC </span> <span className="faded-sol px10"></span></span>
            {i?.condition == 'New' ? 
            <span className="green ubuntuBold pd-5 bg-color-code-3 rad-30 color-code-1 px8 xs-px10 mg-5">{i?.condition}</span>
            :
            <span className="green ubuntuBold pd-5 bg-color-code-2 green rad-30 color-ode-1 px10 mg-5">{i?.condition}</span>
            }
            {/* <span className="mg-5 InterSemiBold px10 faded-sol hidden-xs">{timeAgo(i?.createdAt)}</span> */}
            </div>
            <span className="faded-sol xs-6 InterSemiBold px10 xs-down-3 xs-px12 hidden-s"> {timeAgo(i?.createdAt)} <span className="faded-sol px10"></span></span>
            <span className="right xs-6 hidden-ls"><AiOutlineHeart className="pd-5 color-code-1 px20 fl-right" title="save this item for later"/></span>
          </div>
          </div>
        </div>
      </div>
     </div>
    </> );
}
 
export default Items;