import { AiOutlineHeart } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";

const Items = () => {
    return ( <>
      <div className="my-col-3 xs-12 down-1 xs-down-1">
      <div className="my-col-11 xs-12 bg-white rad-10">
        <div className="xs-mg-10 xs-3 my-col-12 xs-down-3 my-bottom-10">
          <div className="img-container-product"><img src="https://img.freepik.com/free-psd/mobile-phone-with-selfie-stick-mock-up_1310-124.jpg?t=st=1723600637~exp=1723604237~hmac=d6c06da91be98bbe3cbdd0f34917e0a4241b3ce4d310219bad06c9d57b6bec6a&w=740" alt="" /> </div>
        </div>
        <div className="my-container xs-8 top-3">
          <div className="xs-container">
              {/* <span className="add-to-cart-btn"><BsBag/></span> */}
           <div className="my-mother down-2 xs-down-5"><span className="px13 InterSemiBold">3 gig ram teckno phone for sale..</span></div>
           <div className="my-mother xs-down-">
            <span className="px12 faded-sol InterSemiBold">Ayomide Ab </span>
            <MdVerified className="color-code-1" />
           </div>
           <div className="my-mother xs-down-3"><span className="token-image"/>
            <span className="px10 mg-5 InterSemiBold">140 <span className="faded-sol">USDC </span> <span className="faded-sol px10">|</span></span>
            <span className="faded-sol mg-5 InterSemiBold px10">2d ago  <span className="faded-sol px10">|</span></span>
            <span className="green InterSemiBold pd-5 bg-color-code-3 rad-30 color-code-1 px10 mg-5">free <FaShippingFast/></span>
            <span className="fl-right pd-5 c-pointer"><AiOutlineHeart/></span>
          </div>
          </div>
        </div>
      </div>
     </div>
    </> );
}
 
export default Items;