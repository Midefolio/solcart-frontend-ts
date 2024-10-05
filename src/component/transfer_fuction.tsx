import { useState } from 'react';
import {
  WalletNotConnectedError,
  SignerWalletAdapterProps
} from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  createTransferInstruction,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  getAccount
} from '@solana/spl-token';
import {
  PublicKey,
  Transaction,
  Connection,
  TransactionInstruction
} from '@solana/web3.js';
import useUtils from '../utils/useutils';
import useUtilsContext from '../hook/useUtilsContext';
import useApi from '../hook/useApi';
import useUserAuthContext from '../hook/userUserAuthContext';
import Exchange from './exchange';
import PaymentOptions from './payment_options';
import useDasnboardContext from '../hook/useDashboardContext';
import { useNavigate } from 'react-router-dom';

const isValidPublicKey = (key: string): boolean => {
  try {
    new PublicKey(key);
    return true;
  } catch {
    return false;
  }
};

export const configureAndSendCurrentTransaction = async (
  transaction: Transaction,
  connection: Connection,
  feePayer: PublicKey,
  signTransaction: SignerWalletAdapterProps['signTransaction']
) => {
  try {
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.feePayer = feePayer;
    transaction.recentBlockhash = blockhash;
    const signedTransaction = await signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signedTransaction.serialize(), { skipPreflight: false });
    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature
    });
    return signature;
  } catch (error) {
    console.error('Transaction Error:', error);
    throw error;
  }
};

const SendSolanaSplTokens = ({ priceInUsdc }: any) => {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [isSending, setIsSending] = useState(false); // Track payment progress
  const [confirming, setConfirming] = useState(false);
  const { notifyError, notifySuccess } = useUtils();
  const { makeRequest } = useApi();
  const { cart, setCart, cartTotalPrice, ot, setOt, conv, BASE_URL } = useUtilsContext();
  const { user, currentUser, userContact } = useUserAuthContext();
  const api = `${BASE_URL}Items/add-order`;
  const [buyUsdc, setBuyUsdc] = useState(false);
  const navigate = useNavigate();
  const {  getOrders } = useDasnboardContext();

  const formatUSDC = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(amount);
  };

  const totalPriceInUSDC = (price: number) => {
    return formatUSDC(price * conv);
  };

  const handlePayment = async () => {
    if (isSending) return; // Prevent multiple clicks
  
    try {
      setIsSending(true); // Set to true when transaction starts
  
      if (!publicKey || !signTransaction) {
        throw new WalletNotConnectedError();
      }
  
      const mintTokenString = '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'; // USDC token address
      const recipientAddressString = '9iDopM7dVSkMYYsfcnHrpUvmynVwtoYdAvqk4CE9eErZ'; // Replace with recipient address
  
      if (!isValidPublicKey(mintTokenString) || !isValidPublicKey(recipientAddressString)) {
        notifyError('Invalid public key format.');
        return;
      }
  
      const mintToken = new PublicKey(mintTokenString);
      const recipientAddress = new PublicKey(recipientAddressString);
  
      if (recipientAddress.equals(publicKey)) {
        notifyError('Cannot transfer tokens to yourself.');
        return;
      }
  
      const transactionInstructions: TransactionInstruction[] = [];
      const associatedTokenFrom = await getAssociatedTokenAddress(mintToken, publicKey);
      const fromAccount = await getAccount(connection, associatedTokenFrom);
  
      const userBalance = Number(fromAccount.amount);
      console.log(userBalance);
      if (isNaN(userBalance)) {
        notifyError('Invalid account balance.');
        return;
      }
  
      // Fix: Remove commas from the priceInUsdc string and convert to number
      const sanitizedPriceInUsdc = parseFloat(priceInUsdc.replace(/,/g, ''));
      const requiredAmount = sanitizedPriceInUsdc * 1000000; // Convert USDC amount to smallest unit (micro units)
      
      console.log(requiredAmount);
  
      if (isNaN(requiredAmount)) {
        notifyError('Invalid USDC amount.');
        return;
      }
  
      if (userBalance < requiredAmount) {
        setBuyUsdc(true);
        return;
      }
  
      const associatedTokenTo = await getAssociatedTokenAddress(mintToken, recipientAddress);
      if (!(await connection.getAccountInfo(associatedTokenTo))) {
        transactionInstructions.push(
          createAssociatedTokenAccountInstruction(
            publicKey,
            associatedTokenTo,
            recipientAddress,
            mintToken
          )
        );
      }
  
      transactionInstructions.push(
        createTransferInstruction(
          fromAccount.address, // source
          associatedTokenTo, // destination
          publicKey,
          requiredAmount // transfer amount in smallest unit
        )
      );
  
      const transaction = new Transaction().add(...transactionInstructions);
  
      try {
        const signature = await configureAndSendCurrentTransaction(transaction, connection, publicKey, signTransaction);
  
        if (signature) {
          const trn = {
            payer: currentUser?.user_id,
            transaction_id: signature,
            totalPaid: totalPriceInUSDC(cartTotalPrice),
            type: "credit"
          };
          setConfirming(true);
          const res = await makeRequest('POST', api, { cart, trn, buyer: currentUser?.user_id, contact: userContact }, null, user);
          if (res) {
            await getOrders();
            setCart([]);
            setConfirming(false);
            setOt(false);
            navigate('/profile/orders?p=my-orders');
            notifySuccess('Order placed successfully');
          }
        }
      } catch (error) {
        // Handle SendTransactionError and fetch logs if available
        if (error instanceof SendTransactionError) {
          console.error('Transaction Error:', error);
          const logs = error.logs || [];
          console.error('Transaction Logs:', logs.join('\n'));
  
          notifyError(`Transaction failed. Logs: ${logs.join(', ')}`);
        } else {
          notifyError(`Payment Error: ${error}`);
          console.log(error);
        }
      }
    } catch (error) {
      notifyError(`Payment Error: ${error}`);
      console.log(error);
    } finally {
      setIsSending(false); // Reset after completion
    }
  };
  

  return (

    <>
    {buyUsdc && <Exchange setBuyUsdc = {setBuyUsdc} />}
      {confirming && (
        <div className='my-modal bg-blur'>
          <div className='my-col-6 off-2 down-15'>
            <img src="https://img.icons8.com/?size=100&id=102561&format=png&color=000000" alt="Success" />
            <div className='my-col-12 down-1'>
              <span className='white px30 ubuntuBold'>Payment Is Successful</span>
            </div>
            <div className='my-mother down-2'>
              <span className='white InterLight'>Placing your order ... Please do not reload</span>
            </div>
          </div>
        </div>
      )}

      <button
        className='pd-10 flex px18 bg-color-code-3 color-code-1 ubuntuBold rad-10'
        onClick={!userContact?.phone ? ()=> {setOt(true)} : handlePayment}
        disabled={isSending} // Disable during transaction
      >
        {isSending ? 'Processing...' : 'Pay Now'}
      </button>
    </>
  );
};

export default SendSolanaSplTokens;
