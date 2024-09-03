import { useGoogleLogin } from '@react-oauth/google';
import useApi from '../hook/useApi';
import useUtilsContext from '../hook/useUtilsContext';
import AccountSetUp from '../pages/user_auth/buyerAuth/account_setUp';
import { useState } from 'react';

interface Props {
  setUseEmail: (useEmail: boolean) => void
}

const WithGoogle = ({setUseEmail}: Props) => {
  const { makeRequest } = useApi();
  const { BASE_URL } = useUtilsContext();
  const { setNewUser } = useUtilsContext();
  const [setUp, setSetUp] = useState(false)
  const isExist_api = BASE_URL + "userAuth/is-email-exist";


  const signUp: () => void = useGoogleLogin({
    onSuccess: (tokenResponse) => handleSuccess(tokenResponse) ,
    onError: () => console.log('Login Failed')
  });

  const handleSuccess = async (response: any) => {
   const res = await makeRequest('GET', 'https://www.googleapis.com/oauth2/v3/userinfo', null, null, response?.access_token);
   if(res){
    const isExist = await makeRequest('POST', isExist_api, {email:res.email});
    if(isExist){
      setNewUser((prev: any) => ({
       ...prev, 
       firstName:res?.given_name,
       lastName:res?.family_name,
       email:res?.email,
      }))
      setSetUp(true)
    }
   }
  };


    return (
      <>
      {setUp &&  <AccountSetUp/>}
     
        <div className="my-mother down-2 xs-down-8">
          <span onClick={signUp} className="input bg-img px13 c-pointer down-5 bg-color-code-1 white rad-10 flex unset-indent ubuntuBold">
            Use Google Account
            <span className="icons hidden-x">
              <img
                src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
                alt=""
              />
            </span>
          </span>
          <div className="my-mother down-4 xs-down-5 centeed">
            <span
              className="color-coed-1 pd-10 c-pointer px13 color-code-1 ubuntuBold"
              onClick={() => {
                setUseEmail(true);
              }}
            >
              <u className='px12 c-pointer'>Signup manually</u>
            </span>
          </div>
        </div>

      </>
    );
}
 
export default WithGoogle;