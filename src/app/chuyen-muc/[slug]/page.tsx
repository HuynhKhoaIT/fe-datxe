import React, { Suspense } from "react";
import { getProductsSearch } from "@/utils/product";
import { TableDataProduct } from "@/app/components/pagination-area/pagination-area";
import Link from "next/link";
import { getCategories } from "@/utils/category";
import { LoadingComponent } from "@/app/components/loading";
import LayoutListProduct from "@/app/components/layout/LayoutListProduct";
import { SideBar } from "@/app/components/elements/shop-sidebar/sideBar";
import ProductsListPage from "@/app/components/elements/product/ProductsListPage";

const CategoryItem = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const garageId = searchParams["garage_id"] ?? "0"; // default value is "0"
  let urlProducts = `cat_id=${params.slug}`;
  if (garageId) {
    urlProducts += `&garage_id=${garageId}`;
  }
  let page = 1;
  const productData = await getProductsSearch(urlProducts, page, 8);
  const categories = await getCategories();
  let nameCate;
  categories.forEach((cat) => {
    if (cat.id == parseInt(params.slug)) {
      nameCate = cat?.name;
      return;
    }
  });

  return (
    <LayoutListProduct>
      <div>
        <div className="row  pt-60 pb-60 ">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <Suspense fallback={<LoadingComponent />}>
              <ProductsListPage />
            </Suspense>
          </div>
        </div>
      </div>
    </LayoutListProduct>
  );
};
export default CategoryItem;
