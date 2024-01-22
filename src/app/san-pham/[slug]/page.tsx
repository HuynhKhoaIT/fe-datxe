import React, { Suspense } from "react";
import ProductDetail from "../../components/elements/product/productDetail";
import Product from "@/app/components/elements/product/ListProductHot";
import { getProductById, getProducts } from "@/app/libs/prisma/product";
import { LoadingComponent } from "@/app/components/loading";
import { apiUrl } from "@/constants";
export const revalidate = 0;
async function getProduct(productId: number) {
  const { product } = await getProductById(productId);
  if (!product) {
    throw new Error("Failed to fetch data");
  }

  return product;
}
async function getListProduct() {
  const res = await fetch(`${apiUrl}/api/products`, {
    method: "GET",
  });
  const data = await res.json();
  if (!data) {
    throw new Error("Failed to fetch data");
  }
  return data;
}
export default async function SingleShop({
  params,
}: {
  params: { slug: number };
}) {
  const product: any = await getProduct(params?.slug);
  const products = await getListProduct();

  // const related: IProduct[] = await getProductsRelated(
  //   data.categoryId?.toString(),
  //   data.garageId?.toString(),
  //   8
  // );
  return (
    <main className="main">
      <div className="shop-item-single  ">
        <div className="container position-relative pd-50">
          <Suspense fallback={<LoadingComponent />}>
            <ProductDetail ProductDetail={product} />
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
                <Suspense fallback={<LoadingComponent />}>
                  <Product
                    initialProductData={products}
                    garageId={product.garageId}
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
