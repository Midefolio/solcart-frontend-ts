import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';


const ItenImage = () => {
  return (
    <Carousel
    infiniteLoop={true}
    useKeyboardArrows 
    dynamicHeight 
    swipeable 
    emulateTouch
    showThumbs={true}
    >

        <div className='img-container-items'>
            <img className='rad-20' src="https://img.freepik.com/free-psd/mobile-phone-with-selfie-stick-mock-up_1310-124.jpg?t=st=1723600637~exp=1723604237~hmac=d6c06da91be98bbe3cbdd0f34917e0a4241b3ce4d310219bad06c9d57b6bec6a&w=740" alt="" />
            {/* <p className="legend">Slide 1</p> */}
        </div>
        <div className='img-container-items'>
            <img className='rad-20' src="https://img.freepik.com/free-psd/mobile-phone-with-selfie-stick-mock-up_1310-124.jpg?t=st=1723600637~exp=1723604237~hmac=d6c06da91be98bbe3cbdd0f34917e0a4241b3ce4d310219bad06c9d57b6bec6a&w=740" alt="" />
            <p className="legend">Slide 1</p>
        </div>
        <div className='img-container-items'>
            <img className='rad-20' src="https://img.freepik.com/free-psd/mobile-phone-with-selfie-stick-mock-up_1310-124.jpg?t=st=1723600637~exp=1723604237~hmac=d6c06da91be98bbe3cbdd0f34917e0a4241b3ce4d310219bad06c9d57b6bec6a&w=740" alt="" />
            <p className="legend">Slide 1</p>
        </div>
        <div className='img-container-items'>
            <img className='rad-20' src="https://img.freepik.com/free-psd/mobile-phone-with-selfie-stick-mock-up_1310-124.jpg?t=st=1723600637~exp=1723604237~hmac=d6c06da91be98bbe3cbdd0f34917e0a4241b3ce4d310219bad06c9d57b6bec6a&w=740" alt="" />
            <p className="legend">Slide 1</p>
        </div>
        <div className='img-container-items'>
            <img className='rad-20' src="https://img.freepik.com/free-psd/mobile-phone-with-selfie-stick-mock-up_1310-124.jpg?t=st=1723600637~exp=1723604237~hmac=d6c06da91be98bbe3cbdd0f34917e0a4241b3ce4d310219bad06c9d57b6bec6a&w=740" alt="" />
            <p className="legend">Slide 1</p>
        </div>
        <div className='img-container-items'>
            <img className='rad-20' src="https://img.freepik.com/free-psd/mobile-phone-with-selfie-stick-mock-up_1310-124.jpg?t=st=1723600637~exp=1723604237~hmac=d6c06da91be98bbe3cbdd0f34917e0a4241b3ce4d310219bad06c9d57b6bec6a&w=740" alt="" />
            <p className="legend">Slide 1</p>
        </div>
        <div className='img-container-items'>
            <img className='rad-20' src="https://img.freepik.com/free-psd/mobile-phone-with-selfie-stick-mock-up_1310-124.jpg?t=st=1723600637~exp=1723604237~hmac=d6c06da91be98bbe3cbdd0f34917e0a4241b3ce4d310219bad06c9d57b6bec6a&w=740" alt="" />
            <p className="legend">Slide 1</p>
        </div>




    </Carousel>
  );
}


export default ItenImage