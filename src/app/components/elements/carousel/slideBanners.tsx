"use client";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";

const SlideBanners = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: f }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      <SwiperSlide>
        <img
          src="/assets/img/slider/h1.png"
          alt=""
          className="img-full full-width w-100"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/assets/img/slider/b2.jpg"
          alt=""
          className="img-full full-width w-100"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export { SlideBanners };
