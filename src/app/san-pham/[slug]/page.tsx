import RenderContext from "@/app/components/elements/RenderContext";
import ProductDetailPageDesktop from "@/app/layout/desktop/san-pham/ProductDetailPage";
import ProductDetailPageMobile from "@/app/layout/mobile/san-pham/ProductDetailPage";
import { getProductById, getProducts } from "@/app/libs/prisma/product";
import { apiUrl } from "@/constants";

async function getProductsHot(garageId: number) {
  const res = await fetch(
    `${apiUrl}/api/products?isProduct=1&garageId=${garageId}&limit=8`,
    {
      method: "GET",
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();
  return data.data;
}
export default async function DetailProduct({
  params,
}: {
  params: { slug: number };
}) {
  // const product: any = await getProduct(params?.slug);
  const product = await getProductById(params?.slug);
  const productRelate: any = await getProductsHot(9);

  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: ProductDetailPageDesktop,
        },
        mobile: {
          defaultTheme: ProductDetailPageMobile,
        },
      }}
      product={product}
      productRelate={productRelate}
    />
  );
}
