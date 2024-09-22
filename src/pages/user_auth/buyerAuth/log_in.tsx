import NavBar from "../../../component/navbar";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import useApi from "../../../hook/useApi";
import useUtils from "../../../utils/useutils";
import useUtilsContext from "../../../hook/useUtilsContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useUserAuthContext from "../../../hook/userUserAuthContext";
const BuyerLogin = () => {
  const { makeRequest } = useApi();
  const { notifySuccess, notifyError, isSending } = useUtils();
  const { dispatch } = useUserAuthContext();
  const { BASE_URL } = useUtilsContext();
  const [email, setEmail] = useState("");
  const [see, setSee] = useState(false);
  const [password, setPassword] = useState("");
  const login_api_google = BASE_URL + "userAuth/login-with-google";
  const login_api = BASE_URL + "userAuth/login";
  const Navigate = useNavigate();

  const getGoogleEmail: () => void = useGoogleLogin({
    onSuccess: (tokenResponse) => handleSuccess(tokenResponse),
    onError: () => console.log("Login Failed"),
  });

  const handleSuccess = async (response: any) => {
    const res = await makeRequest(
      "GET",
      "https://www.googleapis.com/oauth2/v3/userinfo",
      null,
      null,
      response?.access_token
    );
    if (res) {
      isSending(true, "loggin in..");
      const cb = () => {
        isSending(false);
      };
      const login = await makeRequest(
        "POST",
        login_api_google,
        { email: res?.email },
        cb
      );
      if (login) {
        isSending(false);
        localStorage.setItem("solCart_JWT", login.data);
        localStorage.setItem("solCart-active", "main");
        localStorage.setItem("solCart-email", res.email);
        dispatch({ type: "LOGIN", payload: login.data });
        Navigate("/profile/main"); // navigate to dashboard
        notifySuccess("Login Successfull");
      }
    }
  };

  const Login = async () => {
    if (email == "") return notifyError("email is required");
    if (password == "") return notifyError("password is required");
    isSending(true, "loggin in..");
    const cb = () => {
      isSending(false);
    };
    const res = await makeRequest("POST", login_api, { email, password }, cb);
    if (res) {
      isSending(false);
      localStorage.setItem("solCart_JWT", res.data);
      localStorage.setItem("solCart-active", "main");
      localStorage.setItem("solCart-email", res.email);
      dispatch({ type: "LOGIN", payload: res.data });
      Navigate("/profile/main"); // navigate to dashboard
      notifySuccess("Login Successfull");
    }
  };

  return (
    <>
      <NavBar />
      <div className="my-mother down-11 xs-down-18vh my-bottom-50">
        <div className="my-col-4 off-4 rad-20 xs-container bg-white my-bottom-20">
          <div className="my-col-10 off-1 xs-10 xs-off-1  xs-down-10 down-5">
            <div>
              <span className="px20 ubuntuBold">Sign In </span>
            </div>
            <div className="my-mother down-1 px13 ubuntuLight faded-sol">
              <span>Shoping on solana has never been more easy</span>
            </div>
            <div className="my-mother down-5 xs-down-5">
              <div className="my-mother">
                <span className="px12 ubuntuBold">Email</span>
              </div>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value.replace(/[\s]/g, ""));
                }}
                type="text"
                className="input bg-faded-4 rad-10 ubuntuLight px12"
                placeholder="Type email"
              />
            </div>
            <div className="my-mother down-2">
              <span className="ubuntuBold  px12 xs-px11">Password</span>
            </div>
            <input
              value={password}
              type={see ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="input my-col-11 xs-10 bg-faded-4 down-1 ubuntuLight px12"
              placeholder="Type password"
            />
            <span
              className="input xs-2 my-col-1 bg-faded-4 down-1 c-pointer flex"
              onClick={() => {
                setSee(see ? false : true);
              }}
            >
              {!see ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
            <div className="my-mother xs-down-5 down-3">
              <span
                className="my-col-2 c-pointer ubuntuBold input bg-img bg-color-code-1 white rad-10 flex unset-indent"
                onClick={Login}
              >
                Login
              </span>
            </div>

            <div className="my-mother down-4 xs-down-5">
              <div className="my-bottom-10 faded-sol">... Or ...</div>
              <span
                onClick={getGoogleEmail}
                className="input c-pointer down-1 bg-img px13 bg-color-code-1 white rad-10 flex unset-indent ubuntuBold"
              >
                Login With Google Account
                <span className="icons hidden-x">
                  <img
                    src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
                    alt=""
                  />
                </span>
              </span>
            </div>

            <div className="my-mother xs-down-10  down-10">
              <span className="px13 color-code-1 c-pointer rad-20">
                Company Sign In
              </span>
              <span
                className="faded-sol px13 c-pointer fl-right"
                onClick={() => {
                  Navigate("/registration");
                }}
              >
                Sign Up <i className="fas fa-arrow-right mg-5"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerLogin;
