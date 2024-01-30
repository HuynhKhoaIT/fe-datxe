import { getCategories } from "@/utils/category";
import { Suspense } from "react";
import ProductListItem from "../components/layout/ProductListItem";
import ProductsHot from "../landing/ProductsHot";
import ServicesHot from "../landing/ServiceHot";
import { Space } from "@mantine/core";
import { apiUrl } from "@/constants";
import Carousel from "../landing/Carousel/Carousel";
import Category from "../landing/Category/Category";
import RenderContext from "../components/elements/RenderContext";
import LandingPageDesktop from "./LandingPageDesktop";
import LandingPageMobile from "./LandingPageMobile";
export const revalidate = 0;

async function getData() {
  const garageId = 9;
  const res = await fetch(`${apiUrl}api/product-category?gara=${garageId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  let categories = await getData();
  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: LandingPageDesktop,
        },
        mobile: {
          defaultTheme: LandingPageMobile,
        },
      }}
      categories={categories}
      // slideShowData={slideShowData || []}
      // expertList={expertList || []}
      // categoryCourseList={categoryCourseList}
      // categoryCourseFree={categoryCourseFree}
      // categoryCourseTop={categoryCourseTop}
      // categoryCourseNew={categoryCourseNew}
    />
  );
}
