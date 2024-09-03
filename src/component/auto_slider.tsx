
import Slider from "react-slick"


const AutoSlider = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        fade: true,  // Enable fading effect
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return ( <>
       <Slider {...settings} className="my-col-5 xs-12 xs-12">
         <div className="my-col-5 xs-12 ls-h-100vh">
         <div className="dp1">
            <div className="my-mother down-40">
                <div className="my-col-8 centered off-1 down-15 xs-down-35">
                    <span className="px30 ubuntuBold white xs-px20">Escrow-Powered Transactions</span>
                    <div className="my-mother down-3 hidden-xs">
                        <span className="white px13 ubuntuLight">Secure payments with our decentralized escrow protocol, ensuring trust between buyers and sellers in every transaction.</span>
                    </div>
                </div>
            </div>
         </div>
         </div>
         <div className="my-col-5 xs-12 ls-h-100vh">
         <div className="dp2">
         <div className="my-mother down-40">
                <div className="my-col-8 centered off-1 down-20  xs-down-40">
                    <span className="px30 ubuntuBold xs-px20 white"> Global Dropshipping Support</span>
                    <div className="my-mother down-5 hidden-xs">
                        <span className="white px13 ubuntuLight">Eliminate the need for currency conversion—spend and accept cryptocurrency directly on the platform, simplifying global commerce.</span>
                    </div>
                </div>
            </div>
         </div>
         </div>
         <div className="my-col-5 xs-12 ls-h-100vh">
         <div className="dp3">
         <div className="my-mother down-40">
                <div className="my-col-8 centered off-1 down-20 xs-down-40">
                    <span className="px30 ubuntuBold white xs-px20"> Direct Crypto Payments</span>
                    <div className="my-mother down-5 hidden-xs">
                        <span className="white px13 ubuntuLight">Overcome international barriers with seamless cross-border transactions, enabling merchants to reach customers worldwide.</span>
                    </div>
                </div>
            </div>
         </div>
         </div>
       </Slider>
    </>  );
}
 
export default AutoSlider;