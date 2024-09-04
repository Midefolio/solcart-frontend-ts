import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
  createRoutesFromElements,
} from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Home from "./pages/homePage";
import ViewItem from "./pages/viewItemPage";
import BuyerSignUp from "./pages/user_auth/buyerAuth/sign_up";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashMain from "./pages/user_dashboard_pages/dashboard_pages/dashboard_main";
import useUserAuthContext from "./hook/userUserAuthContext";
import BuyerLogin from "./pages/user_auth/buyerAuth/log_in";

const App = () => {
  const { user } = useUserAuthContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={ <Home/>}/>
        <Route path="/login" element={<BuyerLogin />} />
        <Route path="/items/:itemId" element={<ViewItem />} />
        <Route path="/registration" element={<BuyerSignUp />} />
        <Route
          path="/profile/:active"
          element={user ? <DashMain /> : <Navigate to="/" />}
        />
      </>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
      <div className="google-auth-modal my-d-none" id="isSending">
        <div className="my-mother down-20 xs-down-40vh">
          <AiOutlineLoading3Quarters className="fa fa-spin px30 color-code-1" />
          <div className="my-mother xs-down-5 down-1">
            <span className="InterLight px13" id="sending-msg"></span>
          </div>
        </div>
      </div>
      <div className="my-toast" id="my-toast">
        <span id="msg"></span>
      </div>
    </>
  );
};

export default App;
