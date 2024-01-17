import { getGarage } from "@/utils/garage";
import InfoGara from "./InfoGara";
import { getCategoriesByGar } from "@/utils/category";
import ProductListItem from "@/app/components/layout/ProductListItem";
import { getProductByGar } from "@/utils/product";
import { Suspense } from "react";
import { LoadingComponent } from "@/app/components/loading";
import { apiUrl } from "@/constants";
import ProductsHot from "@/app/landing/ProductsHot";
import ServicesHot from "@/app/landing/ServiceHot";

async function getDataCategories() {
  const garageId = 9;
  const res = await fetch(`${apiUrl}api/product-category?garageId=${garageId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home({ params }: { params: { slug: string } }) {
  const garageId = 9;
  const garageData = await getGarage(params.slug);
  let categories = await getDataCategories();

  return (
    <main className="main">
      <InfoGara garageData={garageData} />
      <ProductListItem
        dataSource={categories}
        isCategory={true}
        title="Dịch vụ"
        subTitle="Nổi bật"
        label="Danh mục"
        style={{ background: "white" }}
      />
      <ProductsHot garageId={garageId} />
      <ServicesHot garageId={garageId} />
      {/* <Suspense fallback={<LoadingComponent />}>
        <ProductListItem
          // dataSource={initialProductData}
          title="Sản phẩm / Dịch vụ"
          garageId={garageData?.id}
        />
      </Suspense> */}
    </main>
  );
}
