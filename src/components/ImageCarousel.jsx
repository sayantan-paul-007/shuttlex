import React from 'react'
import Slider from "react-slick";
const ImageCarousel = ({ images }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        fade: true,
        arrows: false,
      };
    
      return (
        
          <Slider {...settings}>
            {images.map((img, index) => (
              
                <img
                  src={img}
                  alt={`slide-${index}`}
                 className="w-full h-64 object-fit"
                />
             
            ))}
          </Slider>
      
      );
    };

export default ImageCarousel