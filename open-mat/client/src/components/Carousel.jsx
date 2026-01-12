import Carousel from 'react-bootstrap/Carousel';
import { carouselImages } from '../assets';

function HomePageCarousel() {

    console.log(carouselImages)
    
    return (
        <Carousel className="homepage-carousel">
        {carouselImages.map((img, index) => 
        <Carousel.Item key={index}>
                <img src={img.src} alt={img.alt} />
        </Carousel.Item>
        )}
        </Carousel>
    );
}

export default HomePageCarousel;