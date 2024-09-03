import { useContext } from 'react';
import { AuthContext } from '../context/userAuthContext';


const useUserAuthContext = (): any => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContextt must be used inside an AuthContextProvider');
  }

  return context;
};

export default useUserAuthContext;
