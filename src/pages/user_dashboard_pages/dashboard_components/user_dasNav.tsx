import {
  AiOutlineBars,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { DashboardMenu } from "../../../data/category";
import { useNavigate } from "react-router-dom";
import useUtilsContext from "../../../hook/useUtilsContext";
import ReactCountryFlag from 'react-country-flag';
import { useState } from "react";
import SwithCountry from "../../../component/country_swith";

const UserDasNav = () => {
  const Navigate = useNavigate();
  const { country } = useUtilsContext();
  const [switchCountry, setSwitchCountry] = useState(false)
  const [openMsideBar, setOpenMSideBar] = useState(false);

  const switchPageHandler = (url: any) => {
    localStorage.setItem("solCart-active", url);
    Navigate(`/profile/${url}`);
  };

  return (
    <>
      <div className="dash-nav hidden-xs shadow">
        <div className="my-container down-1">
          <div className="my-col-3">
            <span className="solCart-logo"></span>
          </div>
          <div className="my-col-9 right">
            <span
              onClick={() => {
                Navigate("/profile/Items?p=post-item");
              }}
              className="fl-right bg-img rad-10 mg-20 bg-color-code-1 ubuntuBold flex unset-indent pd-10 c-pointer white"
            >
              Sell Something
            </span>
            <span className="icons bg-faded-4 mg-20">
              <AiOutlineUser />
            </span>
            <span className="icons bg-faded-4 mg-20">
              <AiOutlineSetting />
            </span>
            <span className="icons bg-faded-4 mg-20">
              <CiLocationOn />
            </span>
          </div>
        </div>
      </div>

      {/* side nav */}

      <div className="dash-side-nav shadow hidden-xs">
        <div className="my-container down-5">
          <div className="my-container my-bottom-5 bd-botom down-10">
            <span className="my-col-2 px20">
              <AiOutlineBars />
            </span>
            <span className="px13 down-2 my-col-10 ubuntuBold">MENU</span>
          </div>
          <div className="my-container down-20">
            {DashboardMenu.map((i, index) => (
              <div
                className="pd-5 bd-left down-8 mainCat c-pointer"
                key={index}
                onClick={() => {
                  switchPageHandler(i.url);
                }}
              >
                <span className="">
                  <i className={i.icon}></i>
                </span>
                <span className="ubuntuBold px13 mg-10">{i.menu}</span>
                {i.types.length > 0 && (
                  <span className="fl-right px13">
                    <i className="fa fa-angle-right"></i>
                  </span>
                )}
                {i.types.length > 0 && (
                  <div className="subCat shadow mg-t">
                    <div className="my-col-8 off-2 down-10">
                      <div className="bd-bottom">
                        <span className="ubuntuBold black">{i.menu}</span>
                      </div>
                      <div className="black my-mother down-10 px13">
                        {i.types.map((x, index) => (
                          <div
                            className="pd-5 faded-sol px12 ubuntuBold down-3"
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              switchPageHandler(x.url);
                            }}
                          >
                            <span className="">
                              <i className={x.icon}></i>
                            </span>
                            <span className="mg-5">{x.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mobile-dash-nav hidden-ls">
        <div className="xs-container xs-down-4">
          <div onClick={() => {setOpenMSideBar(true)}} className="xs-1 xs-down-1 px20"><i className="fas fa-bars"></i></div>
          <div className="xs-3">
            <span className="mg-10 solCart-logo-2"></span>
          </div>
          <div className="xs-8">
            <span  onClick={() => {
                Navigate("/profile/Items?p=post-item");
              }} className="pd-10 bg-img rad-10 ubuntuBold white fl-right">Sell Something</span>
          </div>
        </div>
      </div>

      <div className="mobile-bottom-nav shadow hidden-ls">
        <div className="xs-container">
          <div className="xs-3 centered unset-indent">
           <div className="xs-12"> <i className="faded-sol fa fa-wallet"></i></div>
           <div className="xs-12 xs-top-3"><span className="px10 ubuntuLight">My Balance</span></div>
          </div>
          <div className="xs-3 centered unset-indent">
           <div className="xs-12"> <i className="faded-sol fa fa-shopping-cart"></i></div>
           <div className="xs-12 xs-top-3"><span className="px10 ubuntuLight">Orders</span></div>
          </div>
          <div className="xs-3 centered unset-indent" onClick={()=>{ Navigate("/profile/Items?p=items-for-sale");}}>
           <div className="xs-12"> <i className="faded-sol fa fa-box"></i></div>
           <div className="xs-12 xs-top-3"><span className="px10 ubuntuLight">Items</span></div>
          </div>
          <div className="xs-3 centered unset-indent">
           <div className="xs-12"> <i className="faded-sol fa fa-shop"></i></div>
           <div className="xs-12 xs-top-3"><span className="px10 ubuntuLight">Market Place</span></div>
          </div>
        </div>
      </div>



  {openMsideBar &&    <>   
    <div className="my-modal hidden-ls" onClick={()=> {setOpenMSideBar(false)}}></div>
      <div className="mobile-side-nav shadow">
          <div className="xs-10 xs-off-1 xs-down-5"><span className="ubuntuBold color-code-1 px20">Menu</span></div>
         <div className="xs-10 xs-off-1 xs-down-">
          {DashboardMenu.map((i, index) => (
              <div
                className="pd-5 bd-left xs-down-5 mainCat"
                key={index}
                onClick={() => {
                  switchPageHandler(i.url);
                }}
              >
                <span className="color-code-1">
                  <i className={i.icon}></i>
                </span>
                <span className="mg-10 xs-px12">{i.menu}</span>
                {i.types.length > 0 && (
                  <span className="fl-right px13">
                    <i className="fa fa-angle-right"></i>
                  </span>
                )}
                {i.types.length > 0 && (
                  <div className="subCat bg-white shadow xs-top-3">
                    <div className="xs-10 xs-off-1 xs-down-20">
                      <div className="bd-bottom">
                        <span className="ubuntuBold xs-px13 black">{i.menu}</span>
                      </div>
                      <div className="black my-mother xs-down-10 xs-px12">
                        {i.types.map((x, index) => (
                          <div
                            className="pd-5 px12 ubuntuBold xs-down-5"
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              switchPageHandler(x.url);
                              setOpenMSideBar(false)
                            }}
                            >
                            <span className="color-code-1" >
                              <i className={x.icon}></i>
                            </span>
                            <span className="mg-5 xs-px11">{x.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

          <div className="my-mother bd-bottom my-bottom-10 xs-down-10">
            <span className="ubuntuBold px13">Preference</span>
          </div>
          <div className="my-mother xs-down-10">
            <div className="my-mother" onClick={()=> {setSwitchCountry(true)}}>
              <span className="pd-10 px12 ubuntuBold faded-sol">Country <i className="fa fa-angle-right"></i></span>
              <span className="fl-right pd-10 xs-top-5">
                <span className="country-flag "><ReactCountryFlag countryCode={country?.value} svg /></span>
               <span className="mg-10 px10 ubuntuBold">{country?.label}</span>
              </span>
            </div>
            <div className="my-mother xs-down-5">
              <span className="pd-10 px12 ubuntuBold faded-sol">Language <i className="fa fa-angle-right"></i></span>
              <span className="fl-right pd-10 xs-top-5">
               <span className="mg-10 px10 ubuntuBold">English</span>
              </span>
            </div>
            <div className="my-mother xs-down-5">
              <span className="pd-10 px12 ubuntuBold faded-sol">Theme</span>
              <span className="fl-right pd-10 xs-top-5">
               <span className="mg-10 px10 ubuntuBold">Light</span>
              </span>
            </div>
          </div>
         </div>
      </div>

   </>
 }
      {switchCountry &&  <div className="hidden-ls"><SwithCountry SwithCountry={setSwitchCountry} /></div>}
    </>
  );
};

export default UserDasNav;
