import { useEffect, useState } from "react";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import useApi from "../../../hook/useApi";
import useUtilsContext from "../../../hook/useUtilsContext";
import CustomSkeleton from "../../../component/skeleton";
import useUtils from "../../../utils/useutils";
import useItemContext from "../../../hook/useItemContext";
import useDasnboardContext from "../../../hook/useDashboardContext";
import DeliveryCountdown from "../dashboard_components/countdown";




const ConfirmOrders =({setseeFullMsg}:any)=> {
  return ( <>
    <div className="my-modal bg-faded-3" onClick={()=> {setseeFullMsg(false)}}>
       <div className="my-col-6 off-3 down-10 rad-10 my-bottom-20 bg-white ">
           <div className="my-col-10 off-1 down-5">
               <span>Confirm Delivery</span>
               <div className="my-mother down-5">
                   <span className="ubuntuBold red pd-10 px13 bg-color-code-5 rad-10">Records show your seller is yet to deliver this Item</span>
                   {/* <p>We are pleased to inform you that <span className="color-code-1 ubuntuBold">{convToSolana(i?.amount)} USDC</span> payment for your item, <span className="ubuntuBold">[{i?.order?.item_name}]</span>, has been successfully transferred to our secure escrow account by a buyer.</p> */}
                   <p className="down-3">If you have received this item, please contact the seller to mark it as delivered from their end so they can receive their payment</p>
                   <p className="gap-elements my-mother">
                       {/* <button className="pd-10 bg-color-code-1 white px13 ubuntuBold" onClick={viewOrder}>View Order</button> */}
                       <button className="pd-10 bg-color-code-1 white px13 ubuntuBold rad-10"  onClick={()=> {setseeFullMsg(false)}}>Close</button>
                   </p>
               </div>
           </div>
       </div>
    </div>
   </>  );
}


const ConfirmDelivery =({setThankYou}:any)=> {
  return ( <>
    <div className="my-modal bg-faded-3" onClick={()=> {setThankYou(false)}}>
       <div className="my-col-4 off-5 down-15 rad-10 centered my-bottom-20 bg-white ">
           <div className="my-col-10 off-1 down-4">
               <div className="my-mother down-2"><span><img src="https://img.icons8.com/?size=100&id=oqvgUacBOlCn&format=png&color=000000" alt="" /></span></div>
               <span className="px20 ubuntuBold">Thanks for using Solcart !!</span>
               <div><span>Seller has been credited</span></div>
           </div>
       </div>
    </div>
   </>  );
}

const ConfirmDeliveryStatus =({makeAsDelivered, setcds}:any)=> {
  return ( <>
    <div className="my-modal bg-faded-3" onClick={()=> {setcds(false)}}>
       <div className="my-col-6 off-3 down-10 rad-10 my-bottom-20 bg-white" onClick={(e)=> {e.stopPropagation()}}>
           <div className="my-col-10 off-1 down-5">
               <span>Confirm Delivery</span>
               <div className="my-mother down-5">
                   <span className="ubuntuBold green pd-10 px13 bg-color-code-3 rad-10">Records show your seller has deliver this Item</span>
                   {/* <p>We are pleased to inform you that <span className="color-code-1 ubuntuBold">{convToSolana(i?.amount)} USDC</span> payment for your item, <span className="ubuntuBold">[{i?.order?.item_name}]</span>, has been successfully transferred to our secure escrow account by a buyer.</p> */}
                   <p className="down-4">If you have not received this item, or aren't not please with what you received kindly file a dispute and follow our refund policy.</p>

                   <p className="red ubuntuBold">  Once you confirm, seller gets credited and there's no going back</p>
                   <p className="gap-elements my-mother">
                       {/* <button className="pd-10 bg-color-code-1 white px13 ubuntuBold" onClick={viewOrder}>View Order</button> */}
                       <button className="pd-10 bg-red white px13 ubuntuBold rad-10"  onClick={()=> {setcds(false)}}>File Despute</button>
                       <button className="pd-10 bg-color-code-2 color-code-1 px13 ubuntuBold rad-10"  onClick={()=> {makeAsDelivered()}}>Confirm Delivery</button>
                   </p>
               </div>
           </div>
       </div>
    </div>
   </>  );
}




const MyOrders = () => {
  const [actv, setActv] = useState("review");
  const { timeAgo, notifySuccess, isSending } = useUtils();
  const { makeRequest } = useApi();
  const { currentUser, user } = useUserAuthContext();
  const { BASE_URL, conv } = useUtilsContext();
  const [fullMsg, setseeFullMsg] = useState(false);
  const [thankyou, setThankYou] = useState(false);
  const [orders, setOrders] = useState<any>(null);
  const [query, setQuery] = useState<any>(null);
  const [cds, setcds] = useState<any>(null);
  const [view, setView] = useState<any>();
  const api_order =`${BASE_URL}Items/get-order`
  const api = `${BASE_URL}Items/confirm-order`

  const handleClick = (title: string) => {
    setActv(title);
    setQuery({ buyer: currentUser?.user_id });
  };

  
  const getOrders = async () => {
    const res = await makeRequest("POST", api_order, query, null, user);
    if (res) {
      setOrders(res.data);
      setView(res.data[0]);
    }
  };



  useEffect(() => {
      if (currentUser) {
        setQuery({ buyer: currentUser?.user_id }); // Set query when currentUser is available
      }
    }, [currentUser]);
    
    useEffect(() => {
      if (query) {
        getOrders(); // Fetch orders when the query is set
      }
    }, [query]);
    

  const makeAsDelivered = async ()=> {
    if(!view?.seller_d_status) {
      setseeFullMsg(true)   // seller hasent deliverd yet
      return
    }
    const confirm = window.confirm('Have you received this item ?');
    if(!confirm){return}
    isSending(true, "")
    const cb =()=> {isSending(false)}
    const res = await makeRequest('POST', api, view, cb, user);
    if(res) {
      await getOrders()
      setcds(false)
      notifySuccess("Successfull, Thanks for using Solcart");
      setThankYou(true)
    }
  }

  const formatUSDC = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(amount);
  };

  const totalPriceInUSDC = (price: number) => {
    return formatUSDC(price * conv);
  };




  return (
     <>
     {thankyou && <ConfirmDelivery setThankYou={setThankYou}/>}
       {fullMsg && <ConfirmOrders setseeFullMsg={setseeFullMsg} />}
      {cds && <ConfirmDeliveryStatus makeAsDelivered={makeAsDelivered} setcds={setcds}/>}
        <div className="my-col-10 off-2 xs-12 xs-down-9vh">
        <div className="my-container down-8 xs-container bg-wite rad-10 my-bottom-50 xs-down-">
          <div className="my-col-12 xs-container xs-down-5 down-3">
            <span className="px20 xs-px15 ubuntuBold">My Orders</span>
          </div>
          <div className="my-col-12 xs-container xs-down-5 down-1 faded-sol ubuntuBold bd-bottom my-bottom-10 my-items-links">
            <span
              className={actv === "review" ? "actv color-code-1" : ""}
              onClick={() => handleClick("review")}
            >
              Orders
            </span>
            <span
              className={actv === "live" ? "actv color-code-1" : ""}
              onClick={() => handleClick("live")}
            >
              Dispute
            </span>
          </div>
          {!orders && (
            <div className="my-col-12  down-5">
              <CustomSkeleton />
            </div>
          )}
          {orders?.length > 0 && (
            <>
              <div className="my-col-12 xs-container xs-down-3 down-3">
                <div className="gap-elements">
                  <div className="my-col-4 ov-scroll-400 my-bottom-50 bg-white rad-10">
                    <div className="my-col-10 off-1 down-5">
                      <span className="ubuntuBold px13">Orders History</span>
                      <div className="my-mother gap-elements down-3">
                        <input
                          type="text"
                          placeholder="search order"
                          className="input-1 px12 InterLight rad-30 bg-faded-4"
                        />
                        <button>
                          <i className="fas fa-filter down-3"></i>
                        </button>
                      </div>
                      <div className="my-mother down-8 v-gap-20">
                        {orders?.map((i: any, index: number) => (
                          <div
                            className="my-mother orders gap-20 c-pointer bd-bottom my-bottom-5"
                            onClick={() => {
                              setView(i);
                            }}
                          >
                            {view == i && <span className="o-act"></span>}
                            <div className="mg-10 my-col-12">
                              <div className="px10 ubuntuBold upper-case">
                                #{i?._id?.slice(6, 12)}
                              </div>
                              <span className="px10">{i?.item_name}...</span>
                            </div>
                            <div className="my-col-5">
                              <span className="px10 InterLight color-code-1 down-3">
                                {" "}
                                {i?.status == "pending" ? (
                                  <span className="ubuntuBold">
                                    <i className="fas fa-shipping-fast"></i> In
                                    progress
                                  </span>
                                ) : (
                                  <span className="green">
                                    <i className="fas green fa-check"></i>{" "}
                                    Delivered
                                  </span>
                                )}
                              </span>
                              <div className="px10 faded-sol">
                                {timeAgo(i?.createdAt)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="my-col-8 my-bottom-0 bg-white rad-10">
                    <div className="my-col-10 off-1 down-3">
                      <div className="ubuntuBol px20 gap-20">
                        <span className="upper-case">
                          Order - #{view?._id?.slice(6, 12)}
                        </span>
                        <span className="faded-sol px13">
                          {timeAgo(view?.createdAt)}
                        </span>
                      </div>
                      <div className="gap-elements down-2">
                        <div className="my-col-8">
                          <div className="img-container-order">
                            <img src={view?.item_image} alt="" />
                          </div>
                        </div>
                        <div className="my-col-12 mg-5 down-">
                          <div className="my-col-12">
                            <span className="px13 ubuntuBold">
                              {view?.item_name}
                            </span>
                          </div>
                          <span className="ubuntuBod my-col-12 px20">
                            <span className="">
                              {totalPriceInUSDC(view?.item_price)}
                              <span className="faded-sol"> USDC</span>
                            </span>
                          </span>
                          <div className="my-mother down-2">
                            <div className="my-col-12 bd-bottom my-bottom-5">
                              <span className="px13 faded-sol ubuntuBold">
                                Properties
                              </span>
                            </div>
                            <div className="my-mother down-2 gap-elements">
                              {view?.variations?.map((i: any, index: any) => (
                                <div>
                                  <span className="px12">
                                    <span className="ubuntuBold black">
                                      {i?.variation}
                                    </span>
                                    : {i?.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="my-mother down-1 gap-elements">
                              <div className="px12">
                                <span className="ubuntuBold px12">
                                  Location
                                </span>
                                :{" "}
                                <span className="px12">
                                  {view?.delivery_option_selected}
                                </span>
                              </div>
                              <div></div>
                            </div>
                            <div className="my-col-12 bd-bottom my-bottom-5 down-2">
                              <span className="px12 faded-sol ubuntuBold">
                                Delivery Status
                              </span>
                            </div>
                            <div className="my-mother down-1">
                            <span className="px12 color-code-1 ubuntuBold">
                                {view?.status == "pending" ? (
                                  "In progress"
                                ) : (
                                  <span className="green">Delivered</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-bottom-20 gap-20 down-3 my-mother">
                        <div className="my-col-3">
                          {" "}
                          {view?.seller_d_status && !view?.buyer_d_status && <button  onClick={()=> {setcds(true)}} className="bg-green rad-10 pd-10 white ubuntuLight px12">
                            Confirm Delivery{" "}
                          </button>}
                        </div>
                        <div className="my-col-6 down-2 right ">
                          {" "}
                          <span className="color-code-1">
                            {!view?.buyer_d_status && <DeliveryCountdown
                              createdAt={view?.createdAt}
                              locationString={view?.delivery_option_selected}
                              from="buyer"
                            />}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {orders?.length < 1 && (
            <div className="my-mother down-3 xs-down-8">
              <span className="pd-5 px13 faded-sol ubuntuBold">
                No Items in this category
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
