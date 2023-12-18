import React from "react";
import ProductDetail from "../../components/elements/product/productDetail";
import { IProduct } from "@/interfaces/product";
import Product from "@/app/components/elements/product/product";
import { getProductDetail, getProductsRelated } from "@/utils/product";
import { Breadcrumbs, Anchor, Grid } from "@mantine/core";
import Link from "next/link";

export default async function SingleShop({
  params,
}: {
  params: { slug: number };
}) {
  const data: IProduct = await getProductDetail(params.slug);
  const related: IProduct[] = await getProductsRelated(
    data.categoryId?.toString(),
    data.garageId?.toString(),
    8
  );
  const items = [
    { title: "Trang chủ", href: "/" },
    { title: "Sản phẩm", href: "./" },
    { title: `${data?.name}`, color: "black" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} c={item.color}>
      {item.title}
    </Anchor>
  ));
  return (
    <main className="main">
      <div className="shop-item-single  ">
        <div className="container position-relative pd-50">
          <Breadcrumbs
            style={{
              padding: "16px 0",
              position: "absolute",
              top: "0",
              left: 12,
            }}
          >
            {items}
          </Breadcrumbs>

          <ProductDetail ProductDetail={data} />
          <div className="related-item">
            <div className="row">
              <div className="col-12 mx-auto">
                <div className="site-heading">
                  <h2 className="site-title">Sản phẩm liên quan</h2>
                </div>
              </div>
            </div>
            <div className="shop-item-wrapper">
              <div className="row">
                <Product
                  initialProductData={related}
                  garageId={data.garageId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
