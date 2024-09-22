import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';


const ItenImage = ({images}: any) => {
  return (
    <Carousel
    infiniteLoop={true}
    useKeyboardArrows 
    dynamicHeight 
    swipeable 
    emulateTouch
    showThumbs={true}
    >

       {images?.map((i:any, index:any) => (
        <div className='img-container-items' key={index}>
            <img className='rad-20' src={i?.secure_url} alt="" />
            {i?.title &&  <p className="legend ">{i?.title}</p>}
           
        </div>
        ))}
    </Carousel>
  );
}


export default ItenImage