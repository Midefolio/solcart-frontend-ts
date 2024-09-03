import { AiOutlineSearch, AiOutlineSun, AiOutlineUser } from "react-icons/ai";
import { HiBars3 } from "react-icons/hi2";
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';
import { BsBag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { FixedSizeList as List } from 'react-window';
import useUtilsContext from "../hook/useUtilsContext";
import CatSideBar from "./categorySideBar";
import { useState } from "react";
import SwithCountry from "./country_swith";

export interface navBarProps {
    active:string
}
const height = 35;

const NavBar = () => {
  const code:any = countryList().getData();
  const navigate = useNavigate();
  const { country, setCountry } = useUtilsContext();
  const [openMsideBar, setOpenMSideBar] = useState(false);
  const [switchCountry, setSwitchCountry] = useState(false)


  const MenuList = (props:any) => {
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
        {({ index, style }:any) => <div style={style}>{children[index]}</div>}
      </List>
    );
  };
  
 const selectCountry =(e:any):void => {
  setCountry((prev: any) => ({...prev, value:e.value, label:e.label}))
 }
  
 return (
   <>
     <nav className="hidden-xs">
       <div className="my-container ">
         <div
           className="my-col-2"
           onClick={() => {
             navigate("/");
           }}
         >
           <div className="solCart-logo"></div>
         </div>
         <div className="my-col-4">
           <div className="my-mother pd-10 bg-faded-4 rad-30">
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
         <div className="my-col-5 off-1">
           <div className="my-col-11 off-1">
             <div
               className="centeed down-1 my-col-3 mg-5 auth rad-30 c-pointer"
               title="Country / Language"
             >
                <div className="InterLight px13">Country <i className="fas mg-5 fa-angle-down"></i></div>
                <div className="my-mother top-1">
                <span className="country-flag "><ReactCountryFlag countryCode={country?.value} svg /></span>
                <span className="mg-10 px13 ubuntuBold">{country?.label?.slice(0, 10)}</span>
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
             <div className="bg-fade-4 down-3 my-col-4 auth rad-30 c-pointer">
               <div className="my-col-2 off-2">
                 <AiOutlineUser className="px20" />
               </div>
               <div className="my-col-8 top-5">
                 <div>
                   <span className="InterLight px13">
                     Welcome <i className="fas fa-angle-down mg-5 px10 "></i>
                   </span>
                 </div>
                 <div className="my-mother top-4">
                   <span className="ubuntuBold px13">Register / Sign-in</span>
                 </div>
               </div>
               <div className="shadow bg-white nav-extended">
                 <div className="my-col-10 off-1 bd-bottom down-10">
                   <div
                     className="input-1 px12 ubuntuLight"
                     onClick={() => {
                       navigate("/registration");
                     }}
                   >
                     <span>Register / Sign-in</span>
                   </div>
                 </div>
                 <div className="my-col-10 off-1 bg-white bd-bottom down-5">
                   <div className="input-1 px12 ubuntuLight">
                     <span>Register / Sign-in <b> ( Company )</b></span>
                   </div>
                 </div>
               </div>
             </div>
             <div className="my-col-4 right down-3 c-pointer">
               <span className="pd-10 color-code-1" title="Solana Cart">
                 <BsBag className="px20" />
                 {/* <sup className="pd-5 rad-30 bg-color-code-1 white InterSemiBold">10</sup> */}
               </span>
               <span className="pd-10 mg-10 color-code-1" title="Change Theme">
                 <AiOutlineSun className="px20" />
               </span>
             </div>
           </div>
         </div>
       </div>
     </nav>

     {/* mobile navigation header */}

     <div className="mobile-nav hidden-ls">
       <div className="xs-container xs-down-2">
         <span className="px30 xs-1 xs-down-1" onClick={()=> {setOpenMSideBar(true)}}>
           <HiBars3 />
         </span>
         <span className="solCart-logo xs-off-1 xs-4" onClick={() => {navigate("/")}}></span>
         <div className="xs-6 xs-down-2 right">
           <span className="pd-5 mg-10 px20">
             <AiOutlineUser />
           </span>
           <span className="pd-5 mg-10 color-code-1 px20">
             <BsBag />
           </span>
           {/* <span className="xs-4 xs-off-2 px"><IoLocationOutline className="xs-6 xs-down-8"/> <span className="country-flag xs-6"><ReactCountryFlag countryCode="NG" svg /></span> </span> */}
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

     {openMsideBar && <>
       <div className="my-modal hidden-ls" onClick={()=> {setOpenMSideBar(false)}}></div>
      <div className="mobile-side-nav hidden-ls shadow">
        <div className="xs-10 xs-off-1 xs-down-5">
          <div className="my-mother"><span className="ubuntuBold color-code-1 px20">Menu</span></div>
          <div className="my-mother bd-bottom my-bottom-10 xs-down-10">
            <span className="ubuntuBold px13">Login / Register</span>
          </div>
          <div className="my-mother xs-down-5">
            <div className="my-mother" onClick={() => {navigate("/registration")}}><span className="pd-10 px12 ubuntuBold faded-sol">Sign-in / Register</span></div>
            <div className="my-mother xs-down-8"><span className="pd-10 px12 ubuntuBold faded-sol">Sign-in / Register <b className="black">( Company )</b></span></div>
          </div>
          <div className="my-mother bd-bottom my-bottom-10 xs-down-10">
            <span className="ubuntuBold px13">Preference</span>
          </div>
          <div className="my-mother xs-down-5">
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
          <div className="my-mother bd-bottom my-bottom-10 xs-down-10">
            <span className="ubuntuBold px13">All Categries</span>
          </div>
          <div className="my-mother xs-down-5"><CatSideBar/></div>
        </div>
       </div></>  }
       {switchCountry &&  <div className="hidden-ls"><SwithCountry SwithCountry={setSwitchCountry} /></div>}
   </>
 );
}
 
export default NavBar;