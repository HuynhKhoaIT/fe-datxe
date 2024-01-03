import { getGarage } from "@/utils/garage";
import InfoGara from "./InfoGara";
import { getCategoriesByGar } from "@/utils/category";
import ProductListItem from "@/app/components/layout/ProductListItem";
import { getProductByGar } from "@/utils/product";
import { Suspense } from "react";
import { LoadingComponent } from "@/app/components/loading";
export default async function Home({ params }: { params: { slug: string } }) {
  const garageData = await getGarage(params.slug);
  const initialCategoryData = await getCategoriesByGar(garageData?.data?.id);
  const initialProductData = await getProductByGar(garageData?.data?.id);
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
