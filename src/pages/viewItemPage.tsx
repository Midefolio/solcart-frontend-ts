import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import ItenImage from "../component/itemImage";
import NavBar from "../component/navbar";

const ViewItem = () => {
  return ( <>
    <NavBar/>
      <div className="my-container my-bottom-50 down-9">
        <div className="my-col-5">
         <div className="my-mother my-bottom-10 shadow bg-white rad-20">
            <div className=""><ItenImage/></div>
         </div>
        </div>
        <div className="my-col-4">
         <div className="my-container my-bottom-50 shadow bg-white rad-20">
          <div className="my-col-10 off-1 down-3">
            <div className="my-mother">
              <div className="my-mother bd-botom my-bottom-20">
               <span className="token-image-2 my-col-1 down-2"></span>
               <span className="mg-10 px30 my-col-6 ubuntuMedium">140 <span className="faded-sol ubuntuMedium">USDC</span></span>
                <div className="my-mother">
                  <span className="ubuntuBold faded-sol"><s>145 USDC</s></span>
                  <span className="mg-5 ubuntuBold color-code-1">15% off</span>
                  <span className="mg-5 px10 pd-5 bg-color-code-3 color-code-1 rad-30"> <i className="fa fa-bolt-lightning"></i> Offer ends In: <b>10d: 51m: 30s</b></span>
                </div>
                <div className="my-mother down-2">
                  <span className="px12 ubuntuBold">Negotiable |</span> 
                  <span className="px12 ubuntuBol red mg-5"> <i className="fas fa-bicycle"></i> free shipping</span> 
                </div>
              </div>
              <div className="my-mother down-3 bd-bttom my-bottom-20">
                <span className="px18 lin-1 ubuntuBold">3 gig ram teckno phone for sale. with 8 years warrantee on it.</span>
              </div>
              <div className="my-mother down-4">
                <div className="my-mother">
                 <span className="my-bottom-10 ubuntuBold c-pointer bd-bottom-bold pd-5 px12 color-code-1">Color</span>
                 <span className="my-bottom-10 ubuntuLight c-pointer mg-10 bd-bottom-bold pd-5 faded-sol px12 ">Size</span>
                 <span className="my-bottom-10 ubuntuLight c-pointer mg-10 bd-bottom-bold pd-5 faded-sol  px12 ">Spec</span>
                </div>
                <div className="my-mother down-8">
                    <span className="pd-5 bg-faded-3 c-pointer rad-30 px13 ubuntuBold m-5">black</span>
                    <span className="pd-5 bg-faded-3 c-pointer rad-30 px13 ubuntuBold mg-5">aliceblue</span>
                    <span className="pd-5 bg-faded-3 c-pointer rad-30 px13 ubuntuBold mg-5">peach</span>
                </div>
              </div>
            </div>
          </div>
         </div>
         <div className="my-container rad-20 shadow down-2 bg-white my-bottom-10">
          <div className="my-container down-3">
            <span className="btn-sm-full rad-20  flex undet-indent c-pointer ubuntuBold white bg-color-code-1">Buy Now</span>
            <span className="btn-sm-full down-3 c-pointer rad-20 color-code-1 undet-indent ubuntuBold bg-color-code-3">Add to SolCart</span>
            <div className="my-mother down-4">
             <span className="pd-5 rad-10 c-pointer px20 bg-fade"><AiOutlineShareAlt/></span>
             <span className="pd-5 rad-10 c-pointer px20 bg-fade mg-5"><AiOutlineHeart/></span>
            </div>
          </div>
         </div>
        </div>
        <div className="my-col-3">
         <div className="my-col-11 my-bottom-20 bg-white shadow c-pointer rad-20">
          <div className="my-col-10 off-1 down-5 px18">
            <div className="my-col-3"><span className="icons"></span></div>
            <div className="my-col-8">
              <span className="ubuntuBold">Topresa Property...</span>
              <div className="my-mother top-3 faded-sol"><span className="ubuntuLight px12">Seller | Joined since 2024</span></div>
            </div>
            <div className="my-mother down-5">
            <span className="btn-sm-full rad-10 flex undet-indent c-pointer ubuntuBold white bg-color-code-1"><i className="fas fa-phone pd-10"></i>  Show Contact</span>
            <span className="btn-sm-full down-3 c-pointer rad-10 color-code-1 undet-indent ubuntuBold bg-color-code-3"><i className="fab pd-10 fa-whatsapp"></i> Message on Whatsapp</span>
           </div>
          </div>
         </div>
         <div className="my-col-11 my-bottom-20 down-5 bg-white shadow c-pointer rad-20">
          <div className="my-col-10 off-1 down-5 px18">
            <div className="my-col-8">
              <span className="ubuntuBold">Comments</span>
              <div className="my-mother down-4 faded-sol">
                {/* <span className="ubuntuLight px12">No Comments available</span> */}
                <span className="ubuntuLight px12">16 Comments <i className="fas fa-angle-down mg-5"></i></span>
              </div>
            </div>
            <div className="my-mother down-5">
              <input type="text" className="input-1 bg-faded-4 rad-10 my-col-10 ubuntuLight px12 faded" placeholder="leave a comment" />
              <span className="input-1 flex unset-indent white bg-color-code-1 my-col-2"><i className="fas fa-paper-plane"></i></span>
            </div>
          </div>
         </div>
         <div className="my-col-5 mg-10 shadow px13 input-1 down-8 bg-red ubuntuBold unset-indent flex white bg-color-code-1"><i className="fas fa-flag pd-10"></i> Report Abuse</div>
        </div>
        <div className="my-mother down-3">
          <div><span className="px20 ubuntuBold">Similar Items</span></div>
        </div>
      </div>
    </> );
}
 
export default ViewItem;