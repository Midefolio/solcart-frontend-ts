import React, { useState } from "react";
import useUserAuthContext from "../hook/userUserAuthContext";
import ConnectWalletButton from "./custom_btn";
import SendSolanaSplTokens from "./transfer_fuction";
import useUtilsContext from "../hook/useUtilsContext";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const PaymentOptions = ({ priceInUsdc, setOt }: any) => {
  const { setUserContact, userContact } = useUserAuthContext();
  const [isValidPhone, setIsValidPhone] = useState(false); // To store validation state
  const { conv, country } = useUtilsContext(); // `country` contains { code }

  const formatUSDC = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(amount);
  };

  // Convert the total price to USDC using the `conv` rate
  const totalPriceInUSDC = (price: number) => {
    return formatUSDC(price * conv);
  };

  // Validate phone number based on country code
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let phoneNumber = e.target.value;

    // Check if the phone number already starts with +234, otherwise add it
    if (!phoneNumber.startsWith(country?.code)) {
      phoneNumber = country?.code + phoneNumber;
    }

    // Parse and validate the phone number
    const phone = parsePhoneNumberFromString(phoneNumber, country?.value || "NG");

    // Check if the phone number is valid
    if (phone && phone.isValid()) {
      setIsValidPhone(true); // Phone is valid
    } else {
      setIsValidPhone(false); // Phone is invalid
    }

    // Update the contact state
    setUserContact((prev: any) => ({ ...prev, phone: phoneNumber }));
  };

  return (
    <>
      <div className="my-modal bg-blur" onClick={() => {setOt(false); setUserContact({ wa_link: "", phone: "" })}}>
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
                <button onClick={() => {setOt(false); setUserContact({ wa_link: "", phone: "" })}} className="pd-5 black">review cart <i className="fas fa-angle-right"></i></button>
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
                  onChange={(e) => setUserContact((prev: any) => ({ ...prev, wa_link: e.target.value }))}
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
                  type="text"
                  placeholder="enter phone number"
                  className={`input InterLight bg-faded-4 down-1 rad-10 px12 ${isValidPhone ? "" : "input-error"}`}
                  value={userContact.phone}
                  onChange={handlePhoneChange}
                />
                {!isValidPhone && (
                  <div className="error-message">Invalid phone number for {country?.value}</div>
                )}
              </div>
            </div>
          </div>

          {/* Conditionally show Connect Wallet Button and QR Code if phone number is valid */}
          {isValidPhone && (
            <div className="my-col-10 off-1 gap-elements down-5">
              <span>
                <SendSolanaSplTokens priceInUsdc={priceInUsdc} />
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentOptions;
