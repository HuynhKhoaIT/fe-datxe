"use client";
import React from "react";
import { BackgroundImage, Image } from "@mantine/core";
import Slider, { Settings } from "react-slick";
import image from "@/assets/images/carousel1.png";

const Hero = ({ slideshowData, height = 220 }: any) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div
      className="carousel_landing"
      style={{
        backgroundColor: "var(--background-color-light)",
      }}
    >
      <Slider {...settings}>
        {slideshowData?.map((item: any) => {
          return (
            <BackgroundImage
              src={item?.image ? item?.image : image}
              h={height}
            ></BackgroundImage>
          );
        })}
      </Slider>
    </div>
  );
};

export default Hero;
