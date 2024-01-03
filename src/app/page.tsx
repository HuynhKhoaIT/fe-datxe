import "../../public/assets/css/nice-select.min.css";
import { SlideBanners } from "./components/elements/carousel/slideBanners";
import { getProductsHot } from "@/utils/product";
import { getCategories } from "@/utils/category";
import { IProduct } from "@/interfaces/product";
import { getGaragesNear } from "@/utils/garage";
import Product from "./components/elements/product/ListProductHot";
import Categories from "./components/elements/category/categories";
import { IGarage } from "@/interfaces/garage";
import { getServiceHot } from "@/utils/service";
import Header from "./components/page/header/header";
import { MyFooter } from "./components/page/footer/footer";
import { Suspense } from "react";
import { LoadingPage } from "./components/loading";
import Link from "next/link";
import ProductItem from "./components/elements/product/ProductItem";
import ButtonField from "./components/form/ButtonField";
import ProductListItem from "./components/layout/ProductListItem";
import Carousel from "./landing/carousel";
export default async function Home() {
  const initialCategoryData = await getCategories();
  const initialProductData: IProduct[] = await getProductsHot({ limit: 8 });
  const initialServiceData: IProduct[] = await getServiceHot({ limit: 8 });

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
        <ProductListItem
          title={"Sản phẩm"}
          dataSource={initialProductData}
          limit={8}
        />
        <ProductListItem
          title={"Dịch vụ"}
          dataSource={initialServiceData}
          limit={8}
        />
      </main>

      <MyFooter />
    </>
  );
}
