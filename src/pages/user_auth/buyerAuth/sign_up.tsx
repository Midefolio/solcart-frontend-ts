import NavBar from "../../../component/navbar";
import { useState } from "react";
import WithEmail from "../../../component/use_email";
import WithGoogle from "../../../component/withGoogle_SignUp";
import { useNavigate } from "react-router-dom";

const BuyerSignUp  = () => {
  const [useEmail, setUseEmail] = useState(false);
  const Navigate =  useNavigate()
    

    return (
      <>
        <NavBar />
        <div className="my-mother down-11 xs-down-18vh my-bottom-50">
          <div className="my-col-4 off-4 rad-20 xs-container bg-white my-bottom-20">
            <div className="my-col-10 off-1 xs-10 xs-off-1  xs-down-5 down-5">
              <div>
                <span className="px20 ubuntuBold">Sign Up </span>
              </div>
              <div className="my-mother down-1 px13 ubuntuLight faded-sol">
                <span>Shoping on solana has never been more easy</span>
              </div>
              {useEmail ? (
                <WithEmail setUseEmail={setUseEmail} />
              ) : (
                <WithGoogle setUseEmail={setUseEmail} />
              )}
              <div className="my-mother down-5 xs-down-10 centere">
                <span className="px13 faded-sol ubuntuLight">
                  By registering, you confirm that you‘re an adult and you’ve
                  read and accepted Solcart{" "}
                  <u className="c-pointer">Free Membership Agreement</u> and
                  Privacy Policy.
                </span>
              </div>
              <div className="my-mother xs-down-10  down-10">
                <span className="px13 color-code-1 c-pointer rad-20">
                  Company Sign Up
                </span>
                <span className="faded-sol px13 c-pointer fl-right" onClick={()=> {Navigate('/login')}}>
                  Login <i className="fas fa-arrow-right mg-5"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
 
export default BuyerSignUp;
























