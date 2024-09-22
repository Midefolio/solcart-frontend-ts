import { useEffect, useState } from "react";
import { homePageMenu } from "../data/category";
import ReactCountryFlag from "react-country-flag";

const FloatMenu = ({setBuyUsdc}:any) => {
    const [isVisible, setIsVisible] = useState(false);
    const [active, setActive] = useState(null);

    const handleScroll = () => {
        const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
        const triggerHeight = 300; // Adjust this value to your desired scroll point
        if (scrollPosition > triggerHeight) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.body.addEventListener('scroll', handleScroll);
        document.documentElement.addEventListener('scroll', handleScroll);

        return () => {
            document.body.removeEventListener('scroll', handleScroll);
            document.documentElement.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMenuClick = (index:any) => {
        setActive(index);
    };

    return (
        <>
            {isVisible ?
                <div className=" rad-30 b-shadow xs-12 float-menu-bar my-fade-in bg-white">
                    <div className="my-container xs-12 down-2">
                        <div className="my-col-9 xs-8">
                            {homePageMenu?.map((i, index) => (
                                <button
                                    key={index}
                                    className={`rad-30 mg-5 c-pointer pd-10 px12 xs-px8 ubuntuMedium bg-white ${active === index ? 'active-side' : ''}`}
                                    onClick={() => handleMenuClick(index)}
                                >
                                {i.menu}
                                </button>
                            ))}
                        </div>
                        <div className="my-col-2 xs-4 right">
                            <button className="rad-30 pd-10 px13 c-pointer ubuntuMedium mg-10 bg-color-code-1 white c-pointer b-shadow">
                                P2P Market <i className="fas fa-exchange mg-10"></i>
                            </button>
                        </div>
                        <div className="my-col-1 right">
                            <i onClick={() => { setIsVisible(false) }} className="fas fa-times pd-5 c-pointer"></i>
                        </div>
                    </div>
                </div>
                :
                <div className="my-col-12 xs-12 upper-cse">
                    <div className="my-col-12 gap-20 xs-8">
                        {homePageMenu?.map((i, index) => (
                            <button
                                key={index}
                                className={`rad-0 c-pointer ubuntuBold pd-10 px13 xs-px9 faded-sol InterLight bg-wite ${active === index ? 'active-side' : ''}`}
                                onClick={() => handleMenuClick(index)}
                            >
                                {i.menu}
                            </button>
                        ))} 
                        <span></span>
                        {/* <button  onClick={()=> {setBuyUsdc(true)}} className="ubuntuBold pd-10 bg-color-code-1 white rad-30 px13">USDC TopUp</button> */}
                    </div>
                </div>
            }
        </>
    );
};

export default FloatMenu;
