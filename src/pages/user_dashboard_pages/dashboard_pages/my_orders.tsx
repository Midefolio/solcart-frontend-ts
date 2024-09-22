import { useEffect, useState } from "react";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import useApi from "../../../hook/useApi";
import useUtilsContext from "../../../hook/useUtilsContext";
import CustomSkeleton from "../../../component/skeleton";
import useUtils from "../../../utils/useutils";

const MyOrders = () => {
  const [actv, setActv] = useState("review");
  const [orders, setOrders] = useState<any>(null);
  const [query, setQuery] = useState<any>(null);
  const { makeRequest } = useApi();
		const [view, setView] = useState<any>();
  const { timeAgo } = useUtils();
  const { currentUser, user } = useUserAuthContext();
  const { BASE_URL } = useUtilsContext();
  const api = `${BASE_URL}Items/get-order`;
  // const delete_item_api = `${BASE_URL}Items/delete-item`;

  const handleClick = (title: string) => {
    setActv(title);
    setQuery({ buyer: currentUser?.user_id });
  };

  const getOrders = async () => {
    setOrders(null);
    const res = await makeRequest("POST", api, query, null, user);
    if (res) {
      setOrders(res.data);
						setView(res.data[0])
    }
  };

  useEffect(() => {
    if (currentUser) {
      setQuery({ buyer: currentUser?.user_id });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && query) {
							getOrders();
     }
  }, [query, currentUser]);

  // const deleteItems = async (item_id: string, name: string) => {
  //   const confirmDelete = window.confirm(
  //     `Are you sure you want to delete "${name?.slice(0, 9)}..." item?`
  //   );
  //   if (!confirmDelete) {
  //     return;
  //   }
  //   isSending(true, "Deleting...");
  //   const res = await makeRequest(
  //     "POST",
  //     delete_item_api,
  //     { item_id },
  //     () => isSending(false),
  //     user
  //   );
  //   if (res) {
  //     isSending(false);
  //     setItems((prevItems: any) =>
  //       prevItems?.filter((item: any) => item._id !== item_id)
  //     );
  //     notifySuccess("Item deleted successfully");
  //   }
  // };

  return (
    <>
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
          {!orders && <div className="my-col-12  down-5"><CustomSkeleton /></div> }
										{orders?.length > 0 && <>
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
																			 {orders?.map((i:any, index:number) => (
                    <div className="my-mother orders gap-20 c-pointer bd-bottom my-bottom-5" onClick={()=> {setView(i)}}>
                      {view == i &&  <span className="o-act"></span> }
                      <div className="mg-10 my-col-12">
                        <div className="px10 ubuntuBold upper-case">#{i?._id?.slice(6, 12)}</div>
                        <span className="px10">{i?.item_name}...</span>
                      </div>
                      <div className="my-col-5">
                        <span className="px10 InterLight color-code-1 down-3">
                          {" "}
																										{i?.status == 'pending' ?
                           <span className="ubuntuBold"><i className="fas fa-shipping-fast"></i> In progress</span>
																											: 
                           <span className="green"><i className="fas green fa-check"></i> Delivered</span>
																										}
                        </span>
                        <div className="px10 faded-sol">{timeAgo(i?.createdAt)}</div>
                      </div>
                    </div>
																				))}
                  </div>
                </div>
              </div>
              <div className="my-col-8 my-bottom-0 bg-white rad-10">
                <div className="my-col-10 off-1 down-3">
                  <div className="ubuntuBol px20 gap-20">
                    <span className="upper-case">Order - #{view?._id?.slice(6, 12)}</span>
                    <span className="faded-sol px13">{timeAgo(view?.createdAt)}</span>
                  </div>
                  <div className="gap-elements down-2">
                    <div className="my-col-8">
                      <div className="img-container-order">
                        <img
                          src={view?.item_image}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="my-col-12 mg-5 down-2">
                      <div className="my-col-12">
                        <span className="px20 ubuntuBold">
                         {view?.item_name}
                        </span>
                      </div>
                      <span className="ubuntuBod my-col-12 px20">
                        <span className="">
                          1.8975
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
																									{view?.variations?.map((i:any, index:any) => (
                          <div>
                            <span className="px12">
                              <span className="ubuntuBold black">
                                {i?.variation}
                              </span>: {i?.value}
                            </span>
                          </div>
																									))}
                        </div>
                        <div className="my-mother down-1 gap-elements">
                          <div className="px12">
                              <span className="ubuntuBold px12">
                                Location 
                              </span>: <span className="px12">{view?.delivery_option_selected}</span>
                          </div>
                          <div>
                          </div>
                        </div>
                        <div className="my-col-12 bd-bottom my-bottom-5 down-2">
                          <span className="px12 faded-sol ubuntuBold">
                            Status
                          </span>
                        </div>
                        <div className="my-mother down-1">
                          <span className="px12 color-code-1 ubuntuBold">
                            Delivery In progress
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
										</>}
            {orders?.length < 1 && (
														<div className="my-mother xs-down-8">
																		<span className="pd-5 px13 faded-sol ubuntuBold">No Items in this category</span>
														</div>
													)}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
