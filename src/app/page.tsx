import "../../public/assets/css/nice-select.min.css";
import { getProductsHot } from "@/utils/product";
import { getCategories } from "@/utils/category";
import { IProduct } from "@/interfaces/product";
import { getServiceHot } from "@/utils/service";
import Header from "./components/page/header/header";
import { MyFooter } from "./components/page/footer/footer";
import ProductListItem from "./components/layout/ProductListItem";
import Carousel from "./landing/carousel";
import { getProducts } from "./libs/prisma/product";
export const revalidate = 0;

async function getListProduct() {
  const { products } = await getProducts();
  if (!products) {
    throw new Error("Failed to fetch data");
  }
  return products;
}
async function getResponse() {
  const response = await fetch("/api/proudcts", {
    method: "GET",
  });
  const data = await response.json(); // Extracting data as a JSON Object from the response
  return data;
}
export default async function Home() {
  const initialCategoryData = await getCategories();
  const initialProductData = await getListProduct();
  const initialServiceData = await getListProduct();
  const list = await getResponse();
  console.log(list);
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
