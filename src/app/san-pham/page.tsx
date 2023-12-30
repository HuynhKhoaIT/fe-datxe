import React, { Suspense } from "react";
import { SideBar } from "../components/elements/shop-sidebar/sideBar";
import ProductsListPage from "../components/elements/product/ProductsListPage";
import { LoadingComponent } from "../components/loading";
export default function Products() {
  return (
    <div className="row  pt-60 pb-60">
      <div className="col-lg-3">
        <SideBar />
      </div>
      <div className="col-lg-9">
        <Suspense fallback={<LoadingComponent />}>
          <ProductsListPage />
        </Suspense>
      </div>
    </div>
  );
}
