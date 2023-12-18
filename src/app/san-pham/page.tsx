import React, { Suspense } from "react";
import { SideBar } from "../components/elements/shop-sidebar/sideBar";
import ProductsListPage from "./ProductsListPage";
import { LoadingComponent } from "../components/loading";
import { Breadcrumbs, Anchor } from "@mantine/core";
const items = [
  { title: "Trang chủ", href: "/" },
  { title: "Sản phẩm", color: "black" },
].map((item, index) => (
  <Anchor href={item.href} key={index} c={item.color}>
    {item.title}
  </Anchor>
));
export default async function Shop() {
  return (
    <main className="main">
      <div className="shop-area bg ">
        <div className="container">
          <Breadcrumbs style={{ padding: "16px 20px", position: "absolute" }}>
            {items}
          </Breadcrumbs>
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
        </div>
      </div>
    </main>
  );
}
