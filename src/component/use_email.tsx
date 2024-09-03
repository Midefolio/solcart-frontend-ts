import { useState } from "react";
import useUtilsContext from "../hook/useUtilsContext";
import useApi from "../hook/useApi";
import AccountSetUp from "../pages/user_auth/buyerAuth/account_setUp";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useUtils from "../utils/useutils";

interface Props {
  setUseEmail: (value:boolean)=> void
}

const WithEmail = ({setUseEmail}:Props) => {
  const { newUser, setNewUser, BASE_URL} = useUtilsContext();
  const { makeRequest } = useApi();
  const { notifySuccess, isSending, notifyError } = useUtils();
  const [code, setCode] = useState('');
  const get_code_api = BASE_URL + 'userAuth/send-verification-code';
  const verify_code_api = BASE_URL + 'userAuth/verify-code';
  const [IsSending, setIsSending] = useState(false);
  const [setUp, setSetUp] = useState(false)


  const getVerCode = async () => {
    if(newUser?.email == "") {
      notifyError('Email is required')
      return;
    }
    const cb =()=> {setIsSending(false)}
    setIsSending(true);
    const res = await makeRequest('POST', get_code_api, {email:newUser?.email}, cb);
    if(res){
      setIsSending(false);
      notifySuccess('Verification code sent succesfully.')
    }
  }



  const verifyEmail = async () => {
    if(newUser?.email == "") {
      notifyError('Email is required')
      return;
    }
    if(code == "") {
      notifyError('Verification code is required')
      return;
    }
    const cb =()=> {isSending(false)}
    isSending(true, 'Verifying...')
    const res = await makeRequest('POST', verify_code_api, {email:newUser?.email, inputedCode:code}, cb);
    if(res){
      isSending(false)
      setSetUp(true)
      notifySuccess('Email verified successfully !')
    }
  }

    return (
      <>
       {setUp && <AccountSetUp/>}
        <div className="my-mother down-5 xs-down-5">
          <div className="my-mother">
            <span className="px12 ubuntuBold">Email</span>
          </div>
          <input
            value={newUser?.email}
            onChange={(e)=> {setNewUser((prev:any) => ({...prev, email:e.target.value.replace(/[\s]/g, '')}))}}
            type="text"
            className="input bg-faded-4 rad-10 ubuntuLight px12"
            placeholder="Type email"
          />
          <div className="my-col-12 xs-12 xs-down-3">
            <div className="my-mother down-2">
              <span className="px12 ubuntuBold">Verification Code</span>
            </div>
            <div className="bg-faded-4 my-mother rad-10">
              <input
               value={code}
               onChange={(e)=> {setCode(e.target.value)}}
                type="number"
                className="input my-col-10 xs-8 bg-faded-4 down-1 ubuntuLight px12"
                placeholder="Type Code"
              />
              <span className="my-col-2 down-1 xs-4 color-code-1 ubuntuBold flex unset-indent c-pointer px10 input " onClick={getVerCode}>
                {IsSending ? <AiOutlineLoading3Quarters className="fas fa-spin" /> : "Get Code"}
             
              </span>
            </div>
          </div>
          <div className="my-mother xs-down-5 down-3">
            <span className="my-col-3 px13 bg-img c-pointer ubuntuBold input bg-color-code-1 white rad-10 flex unset-indent" onClick={verifyEmail}>
              Continue
            </span>
          </div>
          <span className="pd-10 xs-8 xs-down-5 down-3 my-col-8 px12 color-code-1 ubuntuBold c-pointer" onClick={()=> {setUseEmail(false)}}><u>use google account</u></span>
        </div>
     
      </>
    );
}
 
export default WithEmail;