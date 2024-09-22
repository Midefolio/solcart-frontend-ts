import { AiOutlineDashboard, AiOutlineExport, AiOutlineLogout, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineSun, AiOutlineUser, AiOutlineWallet } from "react-icons/ai";
import { HiBars3 } from "react-icons/hi2";
import countryList from "react-select-country-list";
import ReactCountryFlag from "react-country-flag";
import { BsBag } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router-dom";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import useUtilsContext from "../hook/useUtilsContext";
import CatSideBar from "./categorySideBar";
import { useState } from "react";
import SwithCountry from "./country_swith";
import useUserAuthContext from "../hook/userUserAuthContext";
import SolCart from "./sol_cart";
import Exchange from "./exchange";

export interface navBarProps {
  active: string;
}
const height = 35;

const NavBar = () => {
  const code: any = countryList().getData();
  const navigate = useNavigate();
  const { country, setCountry, cart, openCart, setOpenCart } = useUtilsContext();
  const [openMsideBar, setOpenMSideBar] = useState(false);
  const [switchCountry, setSwitchCountry] = useState(false);
  const { user, dispatch, currentUser, setCurrentUser } = useUserAuthContext();
  const [buyUsdc, setBuyUsdc] = useState(false)

  const logout =()=> {
    const confirm = window.confirm(" Are you sure you want to logout");
    if(!confirm){return}
    localStorage.removeItem("solCart_JWT");
    localStorage.removeItem("solCart-active");
    localStorage.removeItem("solCart-email");
    setCurrentUser(null)
    dispatch({ type: "LOGOUT" });
    navigate(`/`);
  }

  const MenuList = (props: any) => {
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;
    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        width={`100%`}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }: any) => <div style={style}>{children[index]}</div>}
      </List>
    );
  };

  const selectCountry = (e: any): void => {
    setCountry((prev: any) => ({ ...prev, value: e.value, label: e.label }));
  };

  return (
    <>
      {openCart && <SolCart/>}
      {buyUsdc && <Exchange setBuyUsdc={setBuyUsdc}/>}
      <nav className="hidden-xs">
        <div className="my-container gap-20">
           <div><div className="solCart-logo down-2"  onClick={() => {navigate("/")}}></div></div>  
          <div className="my-col-3  off-1">
            <div className="my-mother down-1 pd-10 bg-faded-4 rad-30">
              <input
                type="text"
                placeholder="Search for something"
                className="my-col-9 InterLight px15 input-1 bg-faded"
              />
              <span className="rad-30 input-1 my-col-2 c-pointer off-1 flex bg-color-code-1 white px20 InterSemiBold">
                <AiOutlineSearch />
              </span>
            </div>
          </div>
          <div className="my-col-5 gap-20">
            <div className="auth my-col-4 down-2 country c-pointer">
              <span className="px13 faded-sol">Location <i className="fas fa-angle-down"></i></span>
              <div className="ubuntuBold top-1 gap-elements">
                <span className="country-flag top-2"><ReactCountryFlag countryCode={country?.value} svg /></span>
                <span className="px12">{country?.label?.slice(0, 10) +  "..."}</span>
              </div>
              <div className="nav-extended-2">
                  <div className="my-col-10 off-1">
                    <Select
                      name="basic-select"
                      value={country}
                      onChange={selectCountry}
                      options={code}
                      className="basic-select"
                      classNamePrefix="select"
                      components={{ MenuList }}
                    />
                  </div>
              </div>
            </div>
            <div className="my-col-5 down-2 auth rad-30 c-pointer">
                {user ? (
                 <>
                  <span className="px13 faded-sol">Welcome</span>
                  <div className="top-1 px12 ubuntuBold">
                   <span> {currentUser?.firstName}</span>
                   <span className="upper-case"> {currentUser?.lastName.slice(0,1)}..</span>
                  </div>
                  <div className="shadow top-1 bg-white nav-extended">
                    <div className="my-col-10 off-1 down-5">
                     <div className="gap-elements pd-10 bd-bottom" onClick={()=> { navigate("/profile/main");}}>
                       <span className="down-1 color-code-1"><AiOutlineDashboard className=""/></span>
                       <span className="px13 faded-sol">My Dashboard</span>
                     </div>
                     <div className="gap-elements pd-10 bd-bottom" onClick={()=> { navigate("/profile/Items?p=post-item");}}>
                       <span className="down-1 color-code-1"><AiOutlineExport/></span>
                       <span className="px13 faded-sol">Sell Something</span>
                     </div>
                     <div className="gap-elements pd-10 bd-bottom" onClick={logout}>
                       <span className="down-1 color-code-1"><AiOutlineLogout/></span>
                       <span className="px13 faded-sol">Logout</span>
                     </div>
                    </div>
                  </div>
                 </>
                ) : (
                  <>
                    <div className="my-col-8">
                      <div>
                        <span className="px13 faded-sol">
                          Welcome{" "}
                          <i className="fas fa-angle-down"></i>
                        </span>
                      </div>
                      <div className="my-mother top-4">
                        <span className="ubuntuBold px12">
                          Register / Sign-in
                        </span>
                      </div>
                    </div>
                    <div className="shadow bg-white nav-extended">
                      <div className="my-col-10 off-1 bd-bottom down-10">
                        <div
                          className="input-1 px12"
                          onClick={() => {
                            navigate("/registration");
                          }}
                        >
                          <span>Register / Sign-in</span>
                        </div>
                      </div>
                      <div className="my-col-10 off-1 bg-white bd-bottom down-5">
                        <div className="input-1 px12 ubuntuLight">
                          <span>
                            Register / Sign-in <b> ( Company )</b>
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div onClick={()=> {setBuyUsdc(true)}} className="down-3 ubuntuBold px13 bg-img white my-col-4 c-pointer my-b-shaow rad-30 input-1 flex unset-indent gap-elements"><i className="fas fa-plus px12"/> USDC TopUp </div>
              <div className="my-col-4 gap-20 down-2 c-pointer">
                <span className="pd-10 color-code-1" onClick={()=> {user? setOpenCart(true): navigate('/registration')}} title="Solana Cart">
                  <AiOutlineShoppingCart className="px20" />
                  {cart?.length > 0 &&
                  <sup className="pd-5 rad-30 bg-color-code-1 white InterSemiBold">
                  {cart?.length}
                </sup>
                  }
                </span>
              </div>
          </div>
        </div>
      </nav>
      {/* mobile navigation header */}
      <div className="mobile-nav hidden-ls">
        <div className="xs-container xs-down-2">
          <span
            className="px30 xs-1 xs-down-1"
            onClick={() => {
              setOpenMSideBar(true);
            }}
          >
            <HiBars3 />{" "}
          </span>
          <span
            className="solCart-logo xs-off-1 xs-4"
            onClick={() => {
              navigate("/");
            }}
          ></span>
          <div className="xs-6 xs-down-2 right">
            <span className="xs-3 xs-off-5 color-code-1 xs-down-4 px20">
              <BsBag />
            </span>
            <span className="xs-3 mg-10 color-code-1 xs-down- px20">
              {user ? (
                <span
                  onClick={() => {
                    navigate("/profile/main");
                  }}
                  className="icons xs-down-10 bg-img rad-30 white px13 upper-case ubuntuBold"
                >
                  <AiOutlineUser />
                </span>
              ) : (
                // <span  className="pd-10 mg-10 bg-img rad-30 white px13 upper-case ubuntuBold">{currentUser?.firstName?.slice(0, 1)}{currentUser?.lastName?.slice(0, 1)}</span>
                <>
                  <span
                    onClick={() => {
                      navigate("/registration");
                    }}
                    className="xs-down-15 rad-30 px13 upper-case ubuntuBold"
                  >
                    login
                  </span>
                </>
              )}
            </span>
          </div>
          <div className="my-mother bg-faded-4 rad-20">
            <input
              type="text"
              placeholder="Search for something"
              className="xs-10 InterLight px12 input rad-30 bg-faded"
            />
            <span className="rad-30 input-1 mt-5 xs-2 c-pointer flex bg-color-code-1 white px20 InterSemiBold">
              <AiOutlineSearch />
            </span>
          </div>
        </div>
      </div>

      {openMsideBar && (
        <>
          <div
            className="my-modal hidden-ls"
            onClick={() => {
              setOpenMSideBar(false);
            }}
          ></div>
          <div className="mobile-side-nav hidden-ls shadow">
            <div className="xs-10 xs-off-1 xs-down-5">
              <div className="my-mother">
                <span className="ubuntuBold color-code-1 px20">Menu</span>
              </div>
              <div className="my-mother bd-bottom my-bottom-10 xs-down-10">
                <span className="ubuntuBold px13">Login / Register</span>
              </div>
              <div className="my-mother xs-down-5">
                <div
                  className="my-mother"
                  onClick={() => {
                    navigate("/registration");
                  }}
                >
                  <span className="pd-10 px12 ubuntuBold faded-sol">
                    Sign-in / Register
                  </span>
                </div>
                <div className="my-mother xs-down-8">
                  <span className="pd-10 px12 ubuntuBold faded-sol">
                    Sign-in / Register <b className="black">( Company )</b>
                  </span>
                </div>
              </div>
              <div className="my-mother bd-bottom my-bottom-10 xs-down-10">
                <span className="ubuntuBold px13">Preference</span>
              </div>
              <div className="my-mother xs-down-5">
                <div
                  className="my-mother"
                  onClick={() => {
                    setSwitchCountry(true);
                  }}
                >
                  <span className="pd-10 px12 ubuntuBold faded-sol">
                    Country <i className="fa fa-angle-right"></i>
                  </span>
                  <span className="fl-right pd-10 xs-top-5">
                    <span className="country-flag ">
                      <ReactCountryFlag countryCode={country?.value} svg />
                    </span>
                    <span className="mg-10 px10 ubuntuBold">
                      {country?.label}
                    </span>
                  </span>
                </div>
                <div className="my-mother xs-down-5">
                  <span className="pd-10 px12 ubuntuBold faded-sol">
                    Language <i className="fa fa-angle-right"></i>
                  </span>
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
              <div className="my-mother bd-bottom my-bottom-10 xs-down-10">
                <span className="ubuntuBold px13">All Categries</span>
              </div>
              <div className="my-mother xs-down-5">
                <CatSideBar />
              </div>
            </div>
          </div>
        </>
      )}
      {switchCountry && (
        <div className="hidden-ls">
          <SwithCountry SwithCountry={setSwitchCountry} />
        </div>
      )}
    </>
  );
};

export default NavBar;
