"use client";
import { ICategory } from "@/interfaces/category";
import { CategoryItem } from "./categoryItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Categories({
  initialCategoryData,
  garageId,
}: {
  initialCategoryData: ICategory[];
  garageId: any;
}) {
  return (
    <Swiper
      slidesPerView={6}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      // className="mySwiper"
    >
      {initialCategoryData?.map((category: ICategory, index) => (
        <SwiperSlide>
          <CategoryItem category={category} key={index} garageId={garageId} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
