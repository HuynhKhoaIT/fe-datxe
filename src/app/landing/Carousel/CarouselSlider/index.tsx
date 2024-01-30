"use client";
import React from "react";
import CarouselItem from "../CarouselItems";
import SlickCarousel from "../../common/SlickCarousell";
const Carousel = ({ slideshowData }: any) => {
  return (
    <div className="carousel_landing">
      <SlickCarousel
        column={1}
        dots={true}
        nextArrow={<></>}
        prevArrow={<></>}
        speed={500}
        infinite={true}
      >
        {slideshowData?.map((item: any) => {
          return <CarouselItem item={item} key={item.id} />;
        })}
      </SlickCarousel>
    </div>
  );
};

export default Carousel;
