import { useEffect, useState } from "react";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import useApi from "../../../hook/useApi";
import useUtilsContext from "../../../hook/useUtilsContext";
import CustomSkeleton from "../../../component/skeleton";
import useUtils from "../../../utils/useutils";
import useItemContext from "../../../hook/useItemContext";
import useDasnboardContext from "../../../hook/useDashboardContext";
import DeliveryCountdown from "../dashboard_components/countdown";

const ConfirmOrders = ({ setseeFullMsg, makeAsDelivered }: any) => {
  return (
    <>
      <div
        className="my-modal bg-faded-3"
        onClick={() => {
          setseeFullMsg(false);
        }}
      >
        <div
          className="my-col-6 off-3 down-10 rad-10 my-bottom-20 bg-white "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="my-col-10 off-1 down-5">
            <span className="">Confirm Delivery</span>
            <div className="my-mother">
              <p className="down-3 ubuntuBold">
                Are you sure you have delivered this Item ?
              </p>
              <p className="gap-elements my-mother">
                {/* <button className="pd-10 bg-color-code-1 white px13 ubuntuBold" onClick={viewOrder}>View Order</button> */}
                <button
                  className="pd-10 bg-color-code-3 color-code-1 px13 ubuntuBold rad-10"
                  onClick={() => {
                    makeAsDelivered()
                  }}
                >
                  Yes I have
                </button>
                <button
                  className="pd-10 bg-color-code-1 white px13 ubuntuBold rad-10"
                  onClick={() => {
                    setseeFullMsg(false);
                  }}
                >
                  Close
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ConfirmDelivery = ({ setThankYou, view }: any) => {
  return (
    <>
      <div
        className="my-modal bg-faded-3"
        onClick={() => {
          setThankYou(false);
        }}
      >
        <div className="my-col-4 off-5 down-15 rad-10  my-bottom-20 bg-white" onClick={(e)=> {e.stopPropagation()}}>
          <div className="my-col-10 off-1 down-4">
            <span className="px15 ubuntuBold">Buyer's Contact</span>
            <div className="my-mother down-3">
              <span className="my-mother faded-sol px13 bd-bottom my-bottom-10">
               Name: <span className="color-code-1">{view?.buyer_name}</span>
              </span>
              <span className="my-mother faded-sol px13 down-2 bd-bottom my-bottom-10">
               Phone:  <span className="color-code-1">{view?.buyer_phone}</span>
              </span>
              <span className="my-mother faded-sol px13 down-2 bd-bottom my-bottom-10">
               Whatsapp: 
              </span>
              <span className="my-mother faded-sol px13 down-2 bd-bottom my-bottom-10">
               X: 
              </span>
              <span className="my-mother faded-sol px13 down-2 bd-bottom my-bottom-10">
               telegram: 
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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
  const [view, setView] = useState<any>();
  const api_order = `${BASE_URL}Items/get-order`;
  const api = `${BASE_URL}Items/update-order`;

  const handleClick = (title: string) => {
    setActv(title);
    setQuery({ seller: currentUser?.user_id });
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
      setQuery({ seller: currentUser?.user_id }); // Set query when currentUser is available
    }
  }, [currentUser]);

  useEffect(() => {
    if (query) {
      getOrders(); // Fetch orders when the query is set
    }
  }, [query]);

  const makeAsDelivered = async () => {
    isSending(true, "Confirming Delivery...");
    const cb = () => {
      isSending(false, "");
    };
    const res = await makeRequest(
      "POST",
      api,
      {_id: view?._id, status:"delivered", seller_d_status:true},
      cb,
      user
    );
    if (res) {
      await getOrders();
      setseeFullMsg(false);
    }
  };
  const undo = async () => {
    isSending(true, "");
    const cb = () => {
      isSending(false);
    };
    const res = await makeRequest(
      "POST",
      api,
      {_id: view?._id, status:"pending", seller_d_status:false},
      cb,
      user
    );
    if (res) {
      await getOrders();
      setseeFullMsg(false);
    }
  };

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
      {thankyou && <ConfirmDelivery view={view} setThankYou={setThankYou} />}
      {fullMsg && (
        <ConfirmOrders
          makeAsDelivered={makeAsDelivered}
          setseeFullMsg={setseeFullMsg}
        />
      )}
      <div className="my-col-10 off-2 xs-12 xs-down-9vh">
        <div className="my-container down-8 xs-container bg-wite rad-10 my-bottom-50 xs-down-">
          <div className="my-col-12 xs-container xs-down-5 down-3">
            <span className="px20 xs-px15 ubuntuBold">Customer Orders</span>
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
                        <div className="my-col-10">
                          {" "}
                          {!view?.seller_d_status && <span  onClick={()=> {setseeFullMsg(true)}} className="bg-color-code-1 white rad-10 c-pointer pd-10 faded-sol ubuntuLight px12">Mark as delivered</span>  }
                          {view?.buyer_d_status && view?.seller_d_status && <span onClick={()=> {setseeFullMsg(true)}} className="bg-faded-3 rad-10 pd-10 faded-sol ubuntuLight px12">Delivered</span>  }
                          {!view?.buyer_d_status && view?.seller_d_status && (
                           <>
                             <span
                              className="rad-10 lin-1 ubunutBold orange px12"
                            >
                              Waiting for the buyer to confirm delivery{" "}
                              <i className="fas mg-5 orange fa-spinner fa-spin"></i>{" "}
                            </span>
                           <div  onClick={()=> {undo()}} className="my-mother down-3">
                            <span className="color-code-1 ubuntuLight px12 c-pointer">Undo delivery status</span>
                           </div>
                           </>

                          )}
                        </div>
                        <div className="my-col-6 right down-1">
                          {" "}
                          <span className="color-code-1">
                            <DeliveryCountdown
                              createdAt={view?.createdAt}
                              locationString={view?.delivery_option_selected}
                              from=""
                            />
                          </span>
                          <div onClick={()=> {setThankYou(true)}} className="pd-5 down-2 my-mother c-pointer">See Buyer Details</div>
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
