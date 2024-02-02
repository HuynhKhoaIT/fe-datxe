"use client";
import React from "react";
import CarouselItem from "../CarouselItems";
import SlickCarousel from "@/app/components/common/SlickCarousell";
const Carousel = ({ slideshowData, height }: any) => {
  return (
    <div className="carousel_landing">
      <SlickCarousel
        column={1}
        dots={true}
        nextArrow={<></>}
        prevArrow={<></>}
        speed={500}
        infinite={true}
        autoplay={true}
      >
        {slideshowData?.map((item: any) => {
          return <CarouselItem height={height} item={item} key={item.id} />;
        })}
      </SlickCarousel>
    </div>
  );
};

export default Carousel;
