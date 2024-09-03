import { useEffect, useState } from "react";
const FloatMenu = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
      const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
      const triggerHeight = 300; // Adjust this value to your desired scroll point
     console.log(triggerHeight, scrollPosition)
      if (scrollPosition > triggerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  
    useEffect(() => {
      document.body.addEventListener('scroll', handleScroll);
      document.documentElement.addEventListener('scroll', handleScroll);
  
      return () => {
        document.body.removeEventListener('scroll', handleScroll);
        document.documentElement.removeEventListener('scroll', handleScroll);
      };
    }, []);


    return ( <>
       { isVisible? <div className="my-bottom-20 rad-30 b-shadow xs-12 float-menu-bar my-fade-in bg-white">
       <div className="my-container xs-12 down-2">
       <div className="my-col-9 xs-8">
          <span className="rad-30 active-side c-pointer pd-10 px12 xs-px10 ubuntuMedium bg-white">New Items - factory Price</span>
          {/* <span className="rad-30 pd-10 shadow c-pointer px12 ubuntuMedium bg-white mg-10 color-code-2">New Items - Reseller</span> */}
          <span className="rad-30 pd-10 shadow c-pointer px12  xs-px10 ubuntuMedium mg-10 bg-white color-code-2">Fairly Used</span>
          <span className="rad-30 pd-10 shadow c-pointer px12 ubuntuMedium xs-px10 hidden-xs mg-10 bg-white color-code-2">free delievery</span>
        </div>
        <div className="my-col-2 xs-4 right">
         <span className="rad-30 pd-10 px12 c-pointer ubuntuMedium mg-10 bg-color-code-1 white c-pointer b-shadow">P2P Market <i className="fas fa-exchange mg-10"></i></span>
        </div>
        <div className="my-col-1 right">
            <i onClick={()=> {setIsVisible(false)}} className="fas fa-times pd-5 c-pointer"></i>
        </div>
       </div>
      </div> : <div className="my-col-12 upper-cse">
        <div className="my-col-10 xs-8">
          <span className="rad-0 c-pointer pd-5 px12 xs-px10 ubuntuMedium faded-sol bg-whit">New Items - factory Price</span>
          {/* <span className="rad-30 pd-10 shadow c-pointer px12 ubuntuMedium bg-white mg-10 color-code-2">New Items - Reseller</span> */}
          <span className="rad-30 pd-10 xs-px10 active-sde c-pointer px12 bg-white ubuntuMedium shadow mg-5 bg-wite">Fairly Used</span>
          {/* <span className="rad-30 pd-10 shdow c-pointer px12 InterSemiBold mg-10 faded-sol   colr-code-2 hidden-xs">free delievery</span> */}
        </div>
        <div className="my-col-2 right xs-4">
         <span className="rad-30 pd-10 px12 c-pointer xs-px10 ubuntuMedium mg-10 bg-color-code-1 white c-pointer b-shadow">P2P Market <i className="fas fa-exchange mg-10"></i></span>
        </div>
      </div>}
      








    </> );
}
 
export default FloatMenu;