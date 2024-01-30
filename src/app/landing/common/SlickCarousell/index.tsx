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
    nextArrow: nextArrow,
    prevArrow: prevArrow,
    responsive: responsive
      ? [
          {
            breakpoint: 1536,
            settings: {
              slidesToShow: column - 1,
              slidesToScroll: 1,
              variableWidth: false,
            },
          },
          {
            breakpoint: 1536,
            settings: {
              slidesToShow: column - 1,
              slidesToScroll: 1,
              variableWidth: false,
            },
          },
          {
            breakpoint: 1536,
            settings: {
              slidesToShow: column,
              slidesToScroll: 1,
              variableWidth: false,
            },
          },
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: column,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: column - 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1008,
            settings: {
              slidesToShow: column - 1,
              slidesToScroll: 1,
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
