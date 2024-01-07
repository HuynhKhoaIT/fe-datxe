import React, { Suspense } from "react";
import { LoadingComponent } from "../components/loading";
import { SideBarFilter } from "../components/elements/shop-sidebar/sideBar";
import { getCategories } from "@/utils/category";
import { TableDataProduct } from "../components/pagination-area/pagination-area";
export default async function Products() {
  const categorys = await getCategories();

  return (
    <div className="row  pt-60 pb-60">
      <div className="col-lg-3">
        <SideBarFilter
          data={categorys}
          filterName="Danh mục"
          keyName="cat_id"
        />
      </div>
      <div className="col-lg-9">
        <Suspense fallback={<LoadingComponent />}>
          <TableDataProduct />
        </Suspense>
      </div>
    </div>
  );
}
