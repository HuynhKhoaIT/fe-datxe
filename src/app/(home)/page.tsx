import { getCategories } from "@/utils/category";
import { Suspense } from "react";
import Carousel from "../landing/Carousel";
import ProductListItem from "../components/layout/ProductListItem";
import ProductsHot from "../landing/ProductsHot";
import ServicesHot from "../landing/ServiceHot";
export const revalidate = 0;
export default async function Home() {
  const initialCategoryData = await getCategories();
  return (
    <div className="bg-white">
      <Carousel />
      <ProductListItem
        label="Danh mục"
        title="Dịch vụ"
        subTitle="Nổi bật"
        dataSource={initialCategoryData}
        isCategory={true}
        style={{ background: "white" }}
      />
      <ProductsHot />
      <ServicesHot />
    </div>
  );
}
