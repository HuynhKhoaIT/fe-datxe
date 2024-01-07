import { getGarage } from "@/utils/garage";
import InfoGara from "./InfoGara";
import { getCategoriesByGar } from "@/utils/category";
import ProductListItem from "@/app/components/layout/ProductListItem";
import { getProductByGar } from "@/utils/product";
import { Suspense } from "react";
import { LoadingComponent } from "@/app/components/loading";
import { getProducts, getProductsByGarage } from "@/app/libs/prisma/product";
export const revalidate = 0;

async function getProductByGarage() {
  const { products } = await getProductsByGarage(Number(9));
  if (!products) {
    throw new Error("Failed to fetch data");
  }
  return products;
}
export default async function Home({ params }: { params: { slug: string } }) {
  const garageData = await getGarage(params.slug);
  const initialCategoryData = await getCategoriesByGar(garageData?.data?.id);
  const initialProductData = await getProductByGarage();
  return (
    <main className="main">
      <InfoGara garageData={garageData} />
      <ProductListItem
        dataSource={initialCategoryData}
        isCategory={true}
        title="Dịch vụ"
        subTitle="Nổi bật"
        label="Danh mục"
        style={{ background: "white" }}
      />
      <Suspense fallback={<LoadingComponent />}>
        <ProductListItem
          dataSource={initialProductData}
          title="Sản phẩm / Dịch vụ"
          garageId={garageData?.id}
        />
      </Suspense>
    </main>
  );
}
