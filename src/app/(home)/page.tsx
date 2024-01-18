import { getCategories } from "@/utils/category";
import { Suspense } from "react";
import ProductListItem from "../components/layout/ProductListItem";
import ProductsHot from "../landing/ProductsHot";
import ServicesHot from "../landing/ServiceHot";
import { Space } from "@mantine/core";
import { apiUrl } from "@/constants";
import Carousel from "./Carousel";
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
    <div className="bg-white">
      <Carousel />
      <ProductListItem
        label="Danh mục"
        title="Dịch vụ"
        subTitle="Nổi bật"
        dataSource={categories}
        isCategory={true}
        style={{ background: "white" }}
      />
      <ProductsHot />
      {/* <Space h={30} /> */}
      <ServicesHot />
      {/* <Space h={30} /> */}
    </div>
  );
}
