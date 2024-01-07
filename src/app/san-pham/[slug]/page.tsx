import React, { Suspense } from "react";
import ProductDetail from "../../components/elements/product/productDetail";
import { IProduct } from "@/interfaces/product";
import Product from "@/app/components/elements/product/ListProductHot";
import { getProductDetail, getProductsRelated } from "@/utils/product";
import { getProductById, getProducts } from "@/app/libs/prisma/product";
export const revalidate = 0;

async function getProduct(productId: number) {
  const { product } = await getProductById(productId);
  if (!product) {
    throw new Error("Failed to fetch data");
  }

  return product;
}
async function getListProduct() {
  const { products } = await getProducts();
  if (!products) {
    throw new Error("Failed to fetch data");
  }
  return products;
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
          <ProductDetail ProductDetail={product} />
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
                  initialProductData={products}
                  garageId={product.garageId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
