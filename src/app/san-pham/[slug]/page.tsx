import React, { Suspense } from "react";
import ProductDetail from "../../components/elements/product/productDetail";
import { IProduct } from "@/interfaces/product";
import Product from "@/app/components/elements/product/product";
import { getProductDetail, getProductsRelated } from "@/utils/product";
import { Breadcrumbs, Anchor, Grid } from "@mantine/core";
import { LoadingComponent } from "@/app/components/loading";
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
  return (
    <main className="main">
      <div className="shop-item-single  ">
        <div className="container position-relative pd-50">
          <Suspense fallback={<div>...loading</div>}>
            <ProductDetail ProductDetail={data} />
          </Suspense>
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
                <Suspense fallback={<div>...loading</div>}>
                  <Product
                    initialProductData={related}
                    garageId={data.garageId}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
