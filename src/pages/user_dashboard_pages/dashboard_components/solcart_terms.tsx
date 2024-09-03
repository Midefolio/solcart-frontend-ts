import React from "react";

const TermsOfPosting = () => {
  return (
    <div className="">
      <div className="my-mother xs-down-5">
        <div className="my-mother down-3 bd-bottom my-bottom-10">
          <span className="ubuntuBold px20">Terms</span>
        </div>
        <div className="my-mother down-5 xs-down-5">
            <div><span className="px13 color-code-1 ubuntuBold">Please read the following carefully</span></div>
          <div className="terms-list my-mother xs-down-5">
            <div className="my-mother down-3 xs-down-2 px12"><span className="faded-sol">1. Items will be carefully reviewed before deploying for buyers to see.</span></div>
            <div className="my-mother down-3 xs-down-2 px12"><span className="faded-sol">2. SolCart will receive a <span className="color-code-1 ">5%</span> transaction fee for each item sold.</span></div>
            <div className="my-mother down-3 xs-down-2 px12"><span className="faded-sol">3. SolCart's <a href="" className="color-code-1 "><u>escrow</u></a> technology will act as a secure intermediary between you and your buyers to eradicate fraud.</span></div>
            <div className="my-mother down-3 xs-down-2 px12"><span className="faded-sol">4. SolCart’s escrow may return buyers' funds (if necessary) in the event of a dispute.</span></div>
            <div className="my-mother down-3 xs-down-2 px12"><span className="faded-sol">5. Sellers will only be able to withdraw funds 3 days after successful delivery.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfPosting;
