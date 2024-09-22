const Exchange = ({setBuyUsdc, noUsdc}:any) => {
    return ( <>
     <div className="my-modal bg-blur bg-faded-5" onClick={()=> {setBuyUsdc(false)}}>
        <div className="my-col-6 off-3 down-9 my-bottom-50 rad-10 bg-white">
            <div className="my-col-10 off-1 down-5">
                <div><span  className="px20 ubuntuBold">USDC TopUp</span></div>
                {noUsdc && <div className="pd-10 bg-color-code-5 rad-10 down-1">
                    <span className="red ubuntuBold px13"> <i className="fas fa-triangle-exclamation"></i>You do not have sufficient USDC to complete this order. Please top-up USDC in your wallet to proceed.</span>
                </div>}
                <div className="my-mother down-3"><span className="ubuntuMedium">No USDC? No Problem! ✨</span></div>
                <div className="my-mother down-2"><span className="px13 ubuntuLight">You can now buy with your <span className="ubuntuBold">local currency</span> or <span className="ubuntuBold">swap your crypto</span> with ease using any of the trusted options below:</span></div>
                <div className="my-col-12 down-2 gap-20-v">
                    <div className="my-col-12 c-pointer gap-elements rad-10 shadow" onClick={()=> {window.open(`https://exchange.mercuryo.io/`)}}>
                      <div className="img-container-6 rad-10 my-col-4"><img src="https://scontent.fiba1-1.fna.fbcdn.net/v/t39.30808-1/288474912_1425656551231315_8968778783069362458_n.jpg?stp=dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=OMfQKrZyzs8Q7kNvgHgZwak&_nc_ht=scontent.fiba1-1.fna&oh=00_AYAcf5c55KpxezBUHTWrWpvsMyDdq3vQ6R1n8lVf2au1Kg&oe=66F3ACBF" alt="" /></div>
                      <div className="down-4">
                       <div>
                         <span className="px20 ubuntuBold">Top-Up with mercuryo.io</span></div>
                         <span className="down-2 px13 my-mother faded-sol">Purchase USDC directly with your debit/credit card in local currencies quickly and securely</span>
                       </div>
                     </div>
                    {/* <div className="my-col-12 bg-faded-2 down-1 gap-elements rad-10 shadow bg-white">
                      <div className="img-container-6 mg-10 rad-10 my-col-4"><img src="https://checkout.scalex.africa/static/media/dark-logo.45467d5fa16a3885470e55cd604cae32.svg" alt="" /></div>
                      <div className="down-5">
                        <div><span className="px20 ubuntuBold">scalex.africa (Suitable for Nigerians)</span></div>
                        <span className="down-2 px13 my-mother">Easily swap your Bitcoin, Ethereum, or other cryptocurrencies for USDC to complete your purchase.</span></div>
                    </div> */}



                   
                </div>
            </div>
        </div>
     </div>
    
    
    </>  );
}
 
export default Exchange;