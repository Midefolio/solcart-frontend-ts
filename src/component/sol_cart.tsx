import useUtilsContext from "../hook/useUtilsContext";
import CartItems from "./solcart_items";
import { useWallet } from "@solana/wallet-adapter-react";
import PaymentOptions from "./payment_options";
import { useState } from "react";
import ConnectWalletButton from "./custom_btn";

const SolCart = () => {
  const { cart, ot, setOt, setOpenCart, conv, cartTotalPrice } = useUtilsContext();
  const { connected, disconnect, publicKey } = useWallet();


  const formatUSDC = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(amount);
  };

  // console.log(cart)

  // Convert the total price to USDC using the `conv` rate
  const totalPriceInUSDC = (price: number) => {
    return formatUSDC(price * conv);
  };

  const handleDisconnect = () => {
    const confirm = window.confirm("Disconnect wallet ?");
    if (!confirm) {
      return;
    }
    disconnect();
  };

  return (
    <>
      {ot && (
        <PaymentOptions
          setOt={setOt}
          priceInUsdc={totalPriceInUSDC(cartTotalPrice)}
        />
      )}
      <div
        className="my-modal z-30 bg-blr"
        onClick={() => {
          setOpenCart(false);
        }}
      >
        <div
          className="my-col-6 off-6 vh-100 bg-white"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="my-col-10 off-1 gap-20 down-5 my-botom-10  bd-bttom">
            <span className="ubuntuBold px20">My SolCart</span>
            <div className="top-1 my-col-6">
              {connected && (
                <>
                  <div className="my-col-6 right">
                    <div>
                      <span className="px12 ubuntuBold">
                        Wallet Connected{" "}
                        <i className="fas fa-check green pd-5"></i>
                      </span>
                    </div>
                    <div className="my-mother top-2">
                      <span className="px12 ubuntuBold faded-sol">
                        address:
                      </span>
                      <span className="px12 mg-5 color-code-1 ubuntuMedium">
                        {publicKey?.toBase58()?.slice(0, 10) + "..."}
                      </span>
                    </div>
                  </div>
                  <div className="my-col-5 down-3">
                    <button
                      onClick={() => {
                        handleDisconnect();
                      }}
                      className="pd-5 rad-10 fl-right  px12 flex white unset-indent ubuntuBold bg-red"
                    >
                      Disconnect
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {cart?.length < 1 && (
            <div className="my-col-10 off-1 centered down-15">
              <span className="px20 ubuntuBld faded-sol">
                No Items in your Solcart
              </span>
            </div>
          )}
          <div className="cart-container v-gap-20 my-col-10 off-1 down-3">
            {cart?.map((i: any, index: any) => (
              <div className="" key={index}>
                <>
                  <CartItems i={i} />
                </>
              </div>
            ))}
          </div>
          {cart?.length > 0 && (
            <>
              <div className="my-col-10 off-1">
                <div className="my-col-12 px30 bold">
                  <span className="faded-sol">Total:</span>
                  <span className="mg-5">
                    {totalPriceInUSDC(cartTotalPrice)}
                  </span>
                  <span className="faded-sol mg-5">
                    <i className="token-image-3"></i>
                  </span>
                </div>
                <div className="my-col-12 gap-20">
                  {!connected ? (
                    <>
                      <div className="gap-elements">
                        <ConnectWalletButton />
                        <div className="gap-elements pd-10 bg-color-code-1 white  pd-2 mg-10 flex rad-10  ubuntuBold">
                            Use Solana Pay
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="fl-right">
                        <button
                          className="pd-10 flex px18 bg-color-code-3 color-code-1 ubuntuBold rad-10"
                          onClick={()=>{setOt(true)}}
                        >
                        Pay With Connected Wallet
                        </button>
                        <button className="pd-10 bg-color-code-1 mg-10 flex rad-10 white ubuntuBold">
                          Use Solana Pay
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SolCart;
