import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard';
import { CustomPrevArrow, CustomNextArrow } from './CustomArrows'; // Import your custom arrows

const ProductCarousel = ({ reviews }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // nextArrow: ,
    // prevArrow: <CustomPrevArrow />,
    // nextArrow: <CustomNextArrow />,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true, // This is important for scaling
    centerPadding: '0', // Remove extra space on the sides
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-11/12 mx-auto min-h-[400px]">
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className="card">
            <ProductCard review={review} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
