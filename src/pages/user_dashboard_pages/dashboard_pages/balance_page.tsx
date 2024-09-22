import { AiOutlineExport, AiOutlineInbox, AiOutlineShop, AiOutlineWallet } from "react-icons/ai";

const Balance = () => {
  return ( <>
   <div className="my-col-10 off-2 down-10">
    <div className="my-container">
      <div className="my-mother top-3">
        <span className="px20 ubuntuBold">Ayomide Babatunde</span>
        <div><span className="faded-sol px13 InterLight">Welcome to your Solcart Dashboard</span></div>
      </div>
      <div className="gap-elements down-3 my-mother">
        <div className="my-col-4 bg-white rad-10">
          <div className="my-col-10 off-1 down-5 my-bottom-10">
            <div><span className="faded-sol px13">Total Balance</span></div>
            <div className="my-mother down-2 gap-elements">
               <span className="px30 faded-sol"><AiOutlineWallet/></span>
               <span className="px20 down-1 ubuntuBold">89,5904.09<span className="faded-sol interBold px10"> USDC</span></span>
            </div>
          </div>
        </div>
        <div className="my-col-4 bg-white rad-10">
          <div className="my-col-10 off-1 down-5 my-bottom-10">
            <div><span className="faded-sol px13">Total Sales</span></div>
            <div className="my-mother down-2 gap-elements">
               <span className="px30 faded-sol"><AiOutlineExport/></span>
               <span className="px20 down-1 ubuntuBold">89</span>
            </div>
          </div>
        </div>
        <div className="my-col-4 bg-white rad-10">
          <div className="my-col-10 off-1 down-5 my-bottom-10">
            <div><span className="faded-sol px13">Total Items</span></div>
            <div className="my-mother down-2 gap-elements">
               <span className="px30 faded-sol"><AiOutlineInbox/></span>
               <span className="px20 down-1 ubuntuBold">4</span>
            </div>
          </div>
        </div> 
      </div>
      <div className="my-mother gap-elements down-1">
        <button className="bg-img pd-10 rad-1 ubuntuBold white ">Withdraw Funds <AiOutlineExport/></button>
        <button className="bg-img pd-10 rad-1 ubuntuBold white ">USDC To Fiat <AiOutlineExport/></button>
      </div>
       <div className="my-container down-5 my-bottom-5">
        <div className="faded-sol px18">Call Request</div>
       </div>
    </div>
   </div>
  
  </> );
}
 
export default Balance;