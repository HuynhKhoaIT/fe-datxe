"use client";
import CarouselItem from "../CarouselItems";
import React from "react";
import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Carousel = ({ slideshowData }: any) => {
  const slider = useRef();
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel_landing" style={{ height: "720px" }}>
      <Slider  {...settings}>
        {slideshowData?.map((item: any) => {
          return <CarouselItem item={item} key={item.id} />;
        })}
        {/* <CarouselItem />
                <CarouselItem />
                <CarouselItem />
                <CarouselItem /> */}
      </Slider>
    </div>
  );
};

export default Carousel;
