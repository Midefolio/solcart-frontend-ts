import { createQR } from "@solana/pay";
import { useEffect, useRef } from "react";
const SOLANA_PAY_URL = "solana:https://solcart-backend-ts.onrender.com/api/v1/NoAuth/Items/transfer";
const PayWithQR = () => {
    const qrRef:any = useRef<HTMLDivElement>()
    useEffect(() => {
      const qr = createQR(SOLANA_PAY_URL, 360, 'white', 'black');
  
      // Set the generated QR code on the QR ref element
      if (qrRef.current) {
        qrRef.current.innerHTML = ''
        qr.append(qrRef.current)
        console.log("appended");
      } 
    }, [])
    return ( <>
     <div className="my-modal bg-blur">
        <div className="my-col-8 off-2 down-10 my-bottom-50 bg-white down-10">
          <div ref={qrRef}/>
        </div>
     </div>
    </>  );
}
 
export default PayWithQR;