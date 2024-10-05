import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import ItenImage from "../component/itemImage";
import NavBar from "../component/navbar";
import useUtilsContext from "../hook/useUtilsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../hook/useApi";
import TextContainer from "../component/text_container";
import useUtils from "../utils/useutils";
import Items from "../component/items";
import CustomSkeleton from "../component/skeleton";
import CartForm from "../component/cart_form";
import useUserAuthContext from "../hook/userUserAuthContext";
import icon from '../images/5898014022362579411__1_-removebg-preview.png'

const ViewItem = () => {
  const { BASE_URL, conv } = useUtilsContext();
  const { user } = useUserAuthContext();
  const { makeRequest } = useApi();
  const [openC, setOpenC] = useState<any>(null);
  const Navigate = useNavigate();
  const api = `${BASE_URL}NoAuth/Items/get-by-id`;
  const { timeAgo, formatNumber } = useUtils();
  const { itemId } = useParams();
  const [i, setI] = useState<any>(null);
  const [selectedVariationIndex, setSelectedVariationIndex] =
    useState<number>(0);

  const getItem = async () => {
    setI(null)
    const res = await makeRequest("POST", api, { item_id: itemId });
    if (res) {
      setI(res?.data);
    }
  };

  useEffect(() => {
    if (itemId) {
      getItem();
    }
  }, [itemId]);

  const formatUSDC = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(amount);
  };

  const convToSolana = (price:any) => {
    const usdcValue = parseFloat(price?.replace(/,/g, "")) * conv;
    const formattedUSDC = formatUSDC(usdcValue);
    return formattedUSDC;
  };

  const handleVariationClick = (index: number) => {
    setSelectedVariationIndex(index);
  };


  useEffect(() => {
    const metaDescriptionTag:any = document.querySelector('meta[name="description"]');
    if (metaDescriptionTag) {
      metaDescriptionTag.setAttribute('content', i?.title);
      document.title = i? i?.title : "Solcart";
    }
    const favicon:any = document.querySelector("link[rel='icon']");
    if (favicon) {
      {i?  favicon.href = i?.images[0].secure_url :  favicon.href = icon}
     
    }
  
    return () => {
      favicon.href = icon
      document.title = "Solcart";
      metaDescriptionTag.setAttribute('content', 'Escrow protocal for global.....');
    }
  }, [i]);


  return (
    <>
    {openC &&
    <CartForm setOpenC={setOpenC}  i={i} />
    }
      <NavBar />
      {!i && <div className="my-col-10 off-1 down-10"><CustomSkeleton/></div> }
      {i && <>
        <div className="my-container my-bottom-50 down-6">
        <div className="my-col-5">
          <div className="my-mother my-bottom-10 shadow bg-white rad-20">
            <div className="">
              <ItenImage images={i?.images} />
            </div>
          </div>
        </div>
        <div className="my-col-4">
          <div className="my-container my-bottom-50 shadow bg-white rad-20">
            <div className="my-col-10 off-1 down-3">
              <div className="my-mother">
                <div className="my-mother bd-botom my-bottom-20">
                  <span className="mg-10 px40 my-col-12 ubuntuMedium">
                    <span className="token-image-2"></span>{" "}
                    <span className="mg-3">{convToSolana(i?.base_price)}</span>
                    <span className="faded-sol ubuntuBold px13">USDC</span>
                  </span>
                  <div className="my-mother down-2">
                    <span className="px12 ubuntuBold pd-10 bg-color-code-2 green rad-30">
                      Negotiable
                    </span>
                  </div>
                </div>
                <div className="my-mother down-3">
                  <span className="ubuntuBold px20">{i?.title}</span>
                </div>
                <div className="my-mother bd-bttom my-bottom-20">
                  <span className="px13 ubuntuLight">
                    <TextContainer article={i?.description} />
                  </span>
                </div>
                <div className="my-mother">
                  <div className="my-mother">
                    {i?.variations?.length > 0 && (
                      <>
                        {i?.variations?.map((x: any, index: any) => (
                          <span key={index}>
                            <span
                              onClick={() => handleVariationClick(index)}
                              className={`my-bottom-10 faded-sol ubuntuBold c-pointer mg-5 pd-5 px12 ${
                                selectedVariationIndex === index
                                  ? "bd-bottom-bold-2 ubuntuBold color-code-1"
                                  : ""
                              }`}
                              >
                              {x.name}
                            </span>
                            {selectedVariationIndex === index && (
                              <div className="my-mother down-7">
                                {x?.values?.map(
                                  (value: any, valueIndex: any) => (
                                    <span
                                      key={valueIndex}
                                      className="pd-5 bg-faded-3 c-pointer rad-30 px10 ubuntuBold mg-5"
                                    >
                                      {value.name}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-container rad-20 shadow down-2 bg-white my-bottom-10">
            <div className="my-container down-3">
              <span className="btn-sm-full rad-20 flex undet-indent c-pointer ubuntuBold white bg-color-code-1">
                Buy Now
              </span>
              <span onClick={()=> {user ? setOpenC(true) : Navigate('/login')}} className="btn-sm-full down-3 c-pointer rad-20 color-code-1 undet-indent ubuntuBold bg-color-code-3">
                Add to Solcart
              </span>
              <div className="my-mother down-4">
                <span className="pd-5 rad-10 c-pointer px20 bg-fade">
                  <AiOutlineShareAlt />
                </span>
                <span className="pd-5 rad-10 c-pointer px20 bg-fade mg-5">
                  <AiOutlineHeart />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-col-3">
          <div className="my-col-12 my-bottom-20 bg-white shadow c-pointer rad-20">
            <div className="my-col-10 off-1 down-5 px18">
              <div className="my-col-2 down-2">
                <span className="icons bg-faded-4">
                  <img
                    src="https://img.icons8.com/?size=100&id=111402&format=png&color=000000"
                    alt=""
                  />
                </span>
              </div>
              <div className="my-col-8">
                <span className="ubuntuBold">
                  {i?.seller_fn} {i?.seller_ln}
                </span>
                <div className="my-mother top-3 faded-sol">
                  <span className="ubuntuLight px12">
                    Seller | Joined {timeAgo(i?.joined_since)}
                  </span>
                </div>
              </div>
              <div className="my-mother lin-3 down-5">
                <span className="input-1 flex down-3 px12 bg-faded-4 rad-30 unset-indent c-pointer ubuntuBold">
                  <i className="fas fa-phone pd-5"></i> Request Call-back
                </span>
                <div className="my-mother">
                  {i?.whatsapp && (
                    <span className="c-pointer bd-code-1 icons px15 ubuntuBold color-code-1">
                      <i className="fab pd-5 fa-whatsapp"></i>
                    </span>
                  )}
                  {i?.telegram && (
                    <span className="c-pointer bd-code-1 icons px13 ubuntuBold color-code-1">
                      <i className="fab pd-5 fa-telegram"></i>
                    </span>
                  )}
                  {i?.phoneNumber && (
                    <a
                      href={`tel:${i?.phoneNumber}`}
                      className="c-pointer bd-code-1 icons  px13 ubuntuBold color-code-1"
                    >
                        <i className="fa pd-5 fa-phone"></i>
                      </a>
                  )}
                </div>
              </div>
              <div className="my-mother down-5">
                <span className="px12 ubuntuBold">Delivery Options</span>
                <div className="my-mother down-2">
                  {i?.delivery_options?.map((i: any, index: any) => (
                    <span key={index}>
                      <div
                        className="my-mother c-pointer my-bottom-10 rad-10 xs-down-2  down-2"
                      >
                        <div className="xs-10 xs-off-1 xs-down-5 px12">
                          <div className="color-code-1 my-col-12">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="faded-sol mg-5 px12 ubuntuBold">
                              Anywhere within
                            </span>
                            <span className="upper-case ubuntuBold"> {i.city}</span>
                            <span className="upper-cae ubuntuBold"> {i.state == "Abuja Federal Capital Territory" ? "Abuja": i.state}</span>
                          </div>
                          <div className="my-col-6 xs-5 down-2 ubuntuBold px12 xs-down-3">
                            <i className="fas fa-money-bill"></i>{" "}
                            {i.price
                              ? `${convToSolana(i.price)}`
                              : "Free Delivery"}
                          </div>
                          <div className="my-col-6 ubuntuBold px12 xs-down-3 xs-5 down-2">
                            <i className="fas fa-shipping-fast"></i>{" "}
                            {i.duration}
                          </div>
                        </div>
                      </div>
               
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="my-col-11 my-bottom-20 down-5 bg-white shadow c-pointer rad-20">
            <div className="my-col-10 off-1 down-5 px18">
              <div className="my-col-8">
                <span className="ubuntuBold">Comments</span>
                <div className="my-mother down-4 faded-sol">
                  <span className="ubuntuLight px12">
                    16 Comments <i className="fas fa-angle-down mg-5"></i>
                  </span>
                </div>
              </div>
              <div className="my-mother down-5">
                <input
                  type="text"
                  className="input-1 bg-faded-4 rad-10 my-col-10 ubuntuLight px12"
                  placeholder="leave a comment"
                />
                <span className="input-1 flex unset-indent white bg-color-code-1 my-col-2">
                  <i className="fas fa-paper-plane"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="my-col-5 mg-10 shadow px13 input-1 down-8 bg-red ubuntuBold unset-indent flex white bg-color-code-1">
            <i className="fas fa-flag pd-10"></i> Report Abuse
          </div>
        </div>
        {i?.other_items_by_seller?.length > 1 &&  <>
        <div className="my-mother down-3">
          <div>
            <span className="px20 ubuntuBold">
              Other Items By {i?.seller_fn} {i?.seller_ln}
            </span>
            <div className="my-mother down-1">
              {i?.other_items_by_seller?.map((i: any, index: any) => (
                <span key={index}>
                  {i?.item_id !== itemId && (
                    <span
                     key={index}
                      onClick={() => {
                        Navigate(`/items/${i?.item_id}`);
                      }}
                    >
                      <Items i={i} />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        </>}
      </div>
      </>}
    </>
  );
};

export default ViewItem;
