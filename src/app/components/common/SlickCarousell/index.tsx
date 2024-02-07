"use client";
import React from "react";
import Slider, { Settings } from "react-slick";
import ImgButton from "./Button";
import arrowRight from "@/assets/icons/arrowrightbtn.svg";
const SlickCarousel = ({
  responsive = true,
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
