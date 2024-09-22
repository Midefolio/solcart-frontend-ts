import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import useUserAuthContext from '../hook/userUserAuthContext';

const ConnectWalletButton = () => {
  const { user } = useUserAuthContext()

  return (
    <div>
      {user &&  <WalletMultiButton className='input bg-color-code-1' />}
    </div>
  );
};

export default ConnectWalletButton;
