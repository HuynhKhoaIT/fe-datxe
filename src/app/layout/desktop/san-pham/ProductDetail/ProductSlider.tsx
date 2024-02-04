"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ImageField from "@/app/components/form/ImageField";

export default function ProductSlider({ images }: any) {
  console.log("images", images);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <>
      <Swiper
        // style={{
        //     '--swiper-navigation-color': '#fff',
        //     '--swiper-pagination-color': '#fff',
        // }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="my-swiper2"
      >
        {images?.map((image: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <ImageField radius={10} src={image || null} />
            </SwiperSlide>
          );
        })}
        {!images && (
          <SwiperSlide>
            <ImageField radius={10} src={null} />
          </SwiperSlide>
        )}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="my-swiper"
      >
        {images?.map((image: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <ImageField radius={10} src={image || null} />
            </SwiperSlide>
          );
        })}
        {!images && (
          <SwiperSlide>
            <ImageField radius={10} src={null} />
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
