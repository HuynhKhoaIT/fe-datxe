"use client";
import React from "react";
import Slider, { Settings } from "react-slick";
import ImgButton from "./Button";
import arrowRight from "@/assets/icons/arrowrightbtn.svg";
const SlickCarousel = ({
  responsive = false,
  column,
  gap,
  children,
  height,
  variableWidth = false,
  infinite = false,
  slidesToScroll = 1,
  dots = false,
  autoplay = false,
  autoplaySpeed = 2000,
  nextArrow = <ImgButton img={arrowRight.src} />,
  prevArrow = <ImgButton img={arrowRight.src} revert={true} />,
}: any) => {
  const settings: Settings = {
    dots: dots,
    infinite: infinite,
    speed: 500,
    slidesToShow: column,
    slidesToScroll: slidesToScroll,
    draggable: true,
    variableWidth: variableWidth,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    nextArrow: nextArrow,
    prevArrow: prevArrow,
    responsive: responsive
      ? [
          {
            breakpoint: 1800,
            settings: {
              slidesToShow: column - 1,
              slidesToScroll: 1,
              variableWidth: false,
            },
          },
          {
            breakpoint: 1536,
            settings: {
              slidesToShow: column - 2,
              slidesToScroll: 1,
              variableWidth: false,
            },
          },

          {
            breakpoint: 1280,
            settings: {
              slidesToShow: column - 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: column - 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              // centerMode: true,
            },
          },
        ]
      : [],
  };
  const style = { "--slide-gap": `${gap}px`, height } as React.CSSProperties;

  return (
    <div style={style}>
      <Slider {...settings} className="landing-list">
        {children}
      </Slider>
    </div>
  );
};

export default SlickCarousel;
