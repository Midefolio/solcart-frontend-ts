import SelectCategory from "../dashboard_components/category_input";
import UploadImages from "../dashboard_components/upload_image";
import EnterPrice from "../dashboard_components/Price_inpute";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import useUserAuthContext from "../../../hook/userUserAuthContext";
import useUtils from "../../../utils/useutils";
import DeliveryOptions from "../dashboard_components/delivery_opt";
import ContactMe from "../dashboard_components/contact_me._details";
import TermsOfPosting from "../dashboard_components/solcart_terms";
import useUtilsContext from "../../../hook/useUtilsContext";
import useApi from "../../../hook/useApi";
import { useNavigate } from "react-router-dom";

const PostItem = () => {
  const { currentUser, user } = useUserAuthContext();
  const { BASE_URL } = useUtilsContext();
  const { notifyError, notifySuccess, isSending } = useUtils();
  const [page, setPage] = useState(1);
  const { makeRequest } = useApi()
  const Navigate = useNavigate();
  const post_item_api = BASE_URL + 'Items/add-item';

  const [Item, setItem] = useState<any>({
    deployment_status:"live",   // review, live, rejected  
    user_id: "",
    seller_name: "",
    seller_logo: "",
    condition: "",
    main_category: "",
    sub_category: "",
    under_sub_category: "",
    title: "",
    description: "",
    isTypes: false,
    images: [],
    video_link: "",
    variations: [],
    delivery_options: [],
    comments: [],
    base_price:"",
    country: "",
    isNegotiable: "",
    whatsapp:"",
    telegram:"",
    phoneNumber:""
  });

  useEffect(() => {
    if (currentUser) {
      const str = localStorage.getItem(`${currentUser?.user_id}`);
      if (str) {
        const item = JSON.parse(str);
        setItem(item);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    setItem((prev: any) => ({
      ...prev,
      seller_name: currentUser?.firstName + " " + currentUser?.lastName,
      user_id: currentUser?.user_id,
      country:currentUser?.country
    }));
  }, [currentUser]);

  const handleNegotiableChange = (value: boolean) => {
    setItem((prev: any) => ({
      ...prev,
      isNegotiable: value,
    }));
    Item.isNegotiable = value;
    localStorage.setItem(`${currentUser?.user_id}`, JSON.stringify(Item));
  };

  const handleNextPage = () => {
    if (page === 1) {
      if (!Item.main_category || !Item.images.length) {
        notifyError("Please fill in all required fields on this page.");
        return;
      }
    }

    if (page === 2) {
      if (Item.title.length < 20 || Item.title.length > 60) {
        notifyError("Title must be between 20 and 60 characters.");
        return;
      }
      if (Item.description.length < 20) {
        notifyError("Description must be at least 20 characters long.");
        return;
      }
      if (!Item.title || !Item.description || !Item.base_price) {
        notifyError("Please fill in all required fields on this page.");
        return;
      }
    }
  
    if(page === 3) {
      // if (Item?.delivery_options?.length < 1) {
      //   notifyError("Please provide at least one delivery option.");
      //   return ;
      // }
    }
    if(page === 4) {
      if (!Item.whatsapp && !Item.telegram && !Item.phoneNumber) {
        notifyError("Please provide at least one contact option.");
        return ;
      }
    }

    if (page < 5) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

 const postItem = async () => {
  isSending(true, "Submitting...")
   const cb =()=> {isSending(false)}
   const res = await makeRequest('POST', post_item_api, Item, cb, user);
   if(res){
    isSending(false);
    notifySuccess('Item posted succesfully !');
    localStorage.removeItem(`${currentUser?.user_id}`)
    Navigate('/profile/Items?p=items-for-sale');
   }
 }

  return (
    <>
      <div className="my-col-10 xs-12 xs-down-12vh off-2 down-8">
        <div className="my-container xs-container my-bottom-50">
          <div className="my-col-8 my-bottom-50 xs-12 xs-top-4 off-2 rad-10 bg-white">
            <div className="my-col-8 xs-10 xs-off-1 xs-down-5 off-2 down-2 bd-bottom my-bottom-5">
              <span className="ubuntuBold px20 xs-px15">Post Item</span>
            </div>

            <div className="my-col-8 xs-10 xs-off-1 xs-down-3 off-2">
              {page === 1 && (
                <div className="my-mother">
                  <div className="my-mother xs-down-5">
                    <SelectCategory Item={Item} setItem={setItem} />
                  </div>
                  <div className="my-mother">
                    <UploadImages Item={Item} setItem={setItem} />
                  </div>
                  <div className="my-mother down-4 xs-down-8">
                    <span className="px13 ubuntuBold">
                      Youtube Or Loom Link{" "}
                      <sup className="faded-sol">(optional)</sup>
                    </span>
                    <div className="my-mother xs-down-1 down-1">
                      <input
                        type="text"
                        value={Item?.video_link}
                        className="input bg-faded-4 InterLight px12"
                        placeholder="paste link here"
                        onChange={(e: any) => {
                          setItem((prev: any) => ({
                            ...prev,
                            video_link: e.target.value,
                          }));
                          Item.video_link = e.target.value;
                          localStorage.setItem(
                            `${currentUser?.user_id}`,
                            JSON.stringify(Item)
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="my-mother down-5  xs-down-5 right">
                    <span
                      className="ubuntuBold bg-img xs-4 my-col-2 c-pointer fl-right rad-10 white unset-indent px13 bg-color-code-1 input flex"
                      onClick={handleNextPage}
                    >
                      Next
                    </span>
                  </div>
                </div>
              )}

              {page === 2 && (
                <div className="my-mother">
                  <span
                    className="ubuntuBold c-pointer my-col-3 down-3 rad-10 color-code-1 unset-indent px13 "
                    onClick={handlePreviousPage}
                  >
                    <i className="fas fa-angle-left"></i> Previous
                  </span>
                  <div className="my-mother down-5 xs-down-5">
                    <span className=" px13 xs-px12">
                      Title <sup className="red">*</sup>
                      <div className="my-mother xs-top-1">
                        <span className="px12 xs-px10 faded-sol ubuntuLight">
                          e.g "Blockchain books For Sale"
                        </span>
                      </div>
                    </span>
                  </div>
                  <div className="my-mother">
                    <input
                      type="text"
                      value={Item.title}
                      placeholder="type here"
                      className="input bg-faded-4 my-mother px13 InterLight xs-down-1 down-1"
                      maxLength={60}
                      onChange={(e: any) => {
                        setItem((prev: any) => ({
                          ...prev,
                          title: e.target.value,
                        }));
                        Item.title = e.target.value;
                        localStorage.setItem(
                          `${currentUser?.user_id}`,
                          JSON.stringify(Item)
                        );
                      }}
                    />
                    <span className="px12 color-code-1 xs-px10 fl-right">
                      {Item.title.length}/60
                    </span>
                  </div>
                  <div className="my-mother xs-top-1">
                    <span className=" px13 xs-px12">
                      Description <sup className="red">*</sup>
                      <div className="my-mother xs-top-1">
                        <span className="px12 xs-px10 faded-sol ubuntuLight">
                          e.g "Everything you need to know about blockchain and
                          crypto"
                        </span>
                      </div>
                    </span>
                    <span className="px12 hidden-xs color-code-1 fl-right">
                      {Item.description.length}/∞
                    </span>
                  </div>
                  <div className="my-mother xs-down-1 top-3 rad-10 bg-faded-4">
                    <ReactQuill
                      theme="snow"
                      value={Item.description}
                      onChange={(e: any) => {
                        setItem((prev: any) => ({
                          ...prev,
                          description: e,
                        }));
                        Item.description = e;
                        localStorage.setItem(
                          `${currentUser?.user_id}`,
                          JSON.stringify(Item)
                        );
                      }}
                      placeholder="Write something..."
                    />
                  </div>
                  <div className="my-mother down-3 xs-down-5">
                    <span className="px13 xs-px12">
                      Base Price <sup className="red">*</sup>
                    </span>
                    <div className="my-mother down-1">
                      <EnterPrice Item={Item} setItem={setItem} />
                    </div>
                    <div className="my-mother down-3 xs-down-5">
                      <span className="px13 xs-px12 ">
                        Are you open to negotiation?
                      </span>
                    </div>
                    <div className="my-col-2 xs-3 xs-down-3 down-1 px12">
                      <input
                        type="radio"
                        name="negotiable"
                        onChange={() => handleNegotiableChange(true)}
                        checked={Item.isNegotiable === true}
                      />
                      <span className="mg-5 faded-sol">Yes</span>
                    </div>
                    <div className="my-col-2 xs-3 xs-down-3 down-1 px12">
                      <input
                        type="radio"
                        name="negotiable"
                        onChange={() => handleNegotiableChange(false)}
                        checked={Item.isNegotiable === false}
                      />
                      <span className="mg-5 faded-sol">No</span>
                    </div>
                    <div className="my-mother down-5 xs-down-10 right">
                      <span
                        className="ubuntuBold bg-img c-pointer xs-4 fl-right my-col-2 rad-10 white unset-indent px13 bg-color-code-1 input flex"
                        onClick={handleNextPage}
                      >
                        Next
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {page === 3 && (
                <div className="my-mother">
                  <span
                    className="ubuntuBold c-pointer my-col-3 down-3 rad-10 color-code-1 unset-indent px13 "
                    onClick={handlePreviousPage}
                  >
                    <i className="fas fa-angle-left"></i> Previous
                  </span>
                  <div className="my-mother down-2 xs-down-5">
                    <span className="faded-sol xs-px12">Delivery is limited to your country. Upgrade to <a href="" className="color-code-1"><u>Manufacturer's Account</u></a> to enable international delivery.</span>
                  </div>
                  <div className="my-mother down-">
                    <DeliveryOptions Item={Item} setItem={setItem} />
                  </div>
                  <div className="my-mother xs-down-10 down-5">
                    <span
                      className="ubuntuBold xs-4 bg-img c-pointer fl-right my-col-2 rad-10 white unset-indent px13 bg-color-code-1 input flex"
                      onClick={handleNextPage}
                    >
                      Next
                    </span>
                  </div>
                </div>
              )}

              {page === 4 && (
                <div className="my-mother">
                  <span
                    className="ubuntuBold c-pointer my-col-3 down-3 rad-10 color-code-1 unset-indent px13 "
                    onClick={handlePreviousPage}
                  >
                    <i className="fas fa-angle-left"></i> Previous
                  </span>
                  <div className="my-mother down-2 xs-down-5">
                    <ContactMe Item={Item} setItem={setItem} />
                  </div>
                  <div className="my-mother xs-down-4 down-5">
                    <span
                      className="ubuntuBold bg-img xs-4 c-pointer fl-right my-col-2 rad-10 white unset-indent px13 bg-color-code-1 input flex"
                      onClick={handleNextPage}
                    >
                      Next
                    </span>
                  </div>
                </div>
              )}

             {page === 5 && (
                <div className="my-mother">
                  <span
                    className="ubuntuBold c-pointer my-col-3 down-3 rad-10 color-code-1 unset-indent px13 "
                    onClick={handlePreviousPage}
                  >
                    <i className="fas fa-angle-left"></i> Previous
                  </span>
                  <div className="my-mother down-2">
                    <TermsOfPosting/>
                  </div>
                  <div className="my-mother down-5 xs-down-10">
                    <span
                      className="ubuntuBold c-pointer fl-rigt my-col-4 fl-right rad-10 white unset-indent px13 bg-green input flex"
                      onClick={postItem}
                    >
                      Agree and Submit
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItem;
