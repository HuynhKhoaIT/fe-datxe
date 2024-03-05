import RenderContext from "@/app/components/elements/RenderContext";
import ProductDetailPageDesktop from "@/app/layout/desktop/san-pham/ProductDetailPage";
import ProductDetailPageMobile from "@/app/layout/mobile/san-pham/ProductDetailPage";
import { getProductById, getProducts } from "@/app/libs/prisma/product";
export const dynamic = "force-dynamic";

export default async function DetailProduct({
  params,
}: {
  params: { slug: number };
}) {
  const product = await getProductById(params?.slug);
  const productsRelate = await getProducts(0, {});

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
      productRelate={productsRelate}
    />
  );
}
