import "../../public/assets/css/nice-select.min.css";
import { getCategories } from "@/utils/category";
import Header from "./components/page/header/header";
import { MyFooter } from "./components/page/footer/footer";
import ProductListItem from "./components/layout/ProductListItem";
import Carousel from "./landing/Carousel";
import ProductsHot from "./landing/ProductsHot";
import ServicesHot from "./landing/ServiceHot";
import { Suspense } from "react";
import { LoadingComponent } from "./components/loading";
export const revalidate = 0;
export default async function Home() {
  const initialCategoryData = await getCategories();
  return (
    <>
      <Header />
      <main className="main  bg-white">
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
      </main>
      <MyFooter />
    </>
  );
}
