import { useState } from "react";
import useUserAuthContext from "../hook/userUserAuthContext";
import ConnectWalletButton from "./custom_btn";

const PaymentOptions = ({ priceInUsdc, setOt }: any) => {
  const { setUserContact, userContact } = useUserAuthContext();
  const [contactInfo, setContactInfo] = useState({ wa_link: "", phone: "" });

  const handleProceed = () => {
    if (contactInfo.wa_link && contactInfo.phone) {
      // Set user contact if both fields are filled
      setUserContact(contactInfo);
      // Proceed to the next step
      setOt(false);
    } else {
      alert("Please fill in both WhatsApp link and phone number before proceeding.");
    }
  };

  console.log(userContact)

  return (
    <>
      <div className="my-modal bg-blur" onClick={() => setOt(false)}>
        <div
          className="my-col-6 off-3 rad-10 my-bottom-50 bg-white down-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="my-col-10 off-1 down-5">
            <div className="ubuntuBold">
              Checkout - <span className="faded-sol">{priceInUsdc} <span>USDC</span></span>
            </div>
            <div className="my-mother rad-10 bg-color-code-3 color-code-1 my-bottom-10 down-2">
              <span className="input my-container down-1 px15 ubuntuMedium flex-1 unset-indent">
                Please review your cart carefully, as orders cannot be canceled once placed.
              </span>
              <span className="my-container top-1">
                <button className="pd-5 black">review cart <i className="fas fa-angle-right"></i></button>
              </span>
            </div>
            <div className="bd-bottom my-mother down-3 my-bottom-5">
              <span className="px13 faded-sol">Contact Buyer</span>
            </div>
            <div className="my-mother gap-elements down-1">
              <div className="my-col-6">
                <div className="down-2 my-mother green px13">
                  Whatsapp Link <i className="fab fa-whatsapp"></i> <sup className="faded-sol ubuntuBold">(Recommended)</sup>
                </div>
                <input
                  type="text"
                  placeholder="paste link here"
                  className="input InterLight bg-faded-4 down-1 rad-10 px12"
                  value={userContact.wa_link}
                  onChange={(e) => setUserContact((prev:any) => ({ ...prev, wa_link: e.target.value }))}
                />
                <a href="" className="mg-5 ubuntuLight faded-sol px12">
                  Get whatsapp link <a className="color-code-1 bold">here</a>
                </a>
              </div>
              <div className="my-col-6">
                <div className="down-3 my-mother px12 color-code-1">
                  Phone Number <i className="fa fa-phone-alt"></i>
                </div>
                <input
                  type="number"
                  placeholder="enter phone number"
                  className="input InterLight bg-faded-4 down-1 rad-10 px12"
                  value={userContact.phone}
                  onChange={(e) => setUserContact((prev:any) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Conditionally show Connect Wallet Button and QR Code if phone number is entered */}
          {userContact.phone && (
            <div className="my-col-10 off-1 gap-elements down-5">
              <span onClick={() => setOt(false)}>
                <ConnectWalletButton />
              </span>
              <span className="pd-10">or</span>
              <button className="pd-10 ubuntuRegular px18 color-code-1">Scan QR Code</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentOptions;
