import NavBar from "../component/navbar";
import CatSideBar from "../component/categorySideBar";
import FloatMenu from "../component/floatingMenu";
import ItemsContainer from "../component/ItemsContainer";
import { Navigate, useNavigate } from "react-router-dom";
import useUserAuthContext from "../hook/userUserAuthContext";
const LandingPage = () => {
  const navigate = useNavigate();
  const { user} = useUserAuthContext();



return ( <>
   <NavBar/>
   <div className="my-container xs-container down-7 xs-down-15vh my-bottom-20">
    <div className="hidden-xs"><CatSideBar/></div>
    <div className="my-col-10 off-2 down-3 xs-down-3"><FloatMenu/></div>
    <div className="bg-landing my-col-10 off-2 xs-12 down-3 rad-10 xs-down-8">
      <div className="dark-scarf rad-10">
        <div className="my-container xs-10 xs-off-1 lin-2 down-2 xs-down-6"><span className="ubuntuBold xs-px20 px40 white">Buy and Sell <span className="color-code-1"> Fairly Used</span> Items On SolCart</span></div>
        <div className="my-container xs-10 xs-off-1 xs-down-1 hidden-xs"><span className="white ubuntuLight">turn your Fairly used items into crypto wealth...</span></div>
        <div className="my-container xs-10 xs-off-1 xs-down-5 down-1 hidden-xs"><span className="my-btn-sm bg-color-code-1 white px13 ubuntuBold rad-30 c-pointer"onClick={()=> {navigate(`${user ? "/profile/Items?p=post-item" : "/registration"}`)}}>Sell Now <i className="fas fa-angle-right"></i></span></div>
        <div className="my-container xs-10 xs-off-1 xs-down-5 down-2 hidden-ls"><span className="input-1 flex unset-indent bg-color-code-1 white px13 ubuntuBold rad-30 c-pointer" onClick={()=> {navigate(`${user ? "/profile/Items?p=post-item" : "/registration"}`)}}>Sell Now <i className="fas mg-5 fa-angle-right"></i></span></div>
      </div>
    </div>
    <div className="my-col-10 off-2 down-3 xs-12 xs-down-5"><ItemsContainer title=""/></div>
    <div className="my-col-10 down-10"></div>
    <div className="my-col-10 down-10"></div>
    <div className="my-col-10 down-10"></div>
    <div className="my-col-10 down-10"></div>
    <div className="my-col-10 down-10"></div>
    <div className="my-col-10 down-10"></div>
    <div className="my-col-10 down-10"></div>
    <div className="my-col-10 down-10"></div>
    <div className="my-col-10 down-10"></div>
    <div className="my-col-10 down-10"></div>
  </div>
  </>);
}
export default LandingPage;