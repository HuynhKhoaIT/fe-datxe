"use client";
import RenderContextClient from "@/app/components/elements/RenderContextClient";
import {
  useProduct,
  useProductRelate,
  useProductReview,
} from "@/app/hooks/products/useProducts";
import ProductDetailPageDesktop from "@/app/layout/desktop/san-pham/ProductDetailPage";
import ProductDetailPageMobile from "@/app/layout/mobile/san-pham/ProductDetailPage";
export const dynamic = "force-dynamic";

export default function DetailProduct({
  params,
}: {
  params: { slug: string };
}) {
  const { data: product, isLoading, isFetching } = useProduct(params?.slug);
  const { data: productsRelate, isLoading: isLoadingRelate } = useProductRelate(
    10
  );
  const {
    data: productReview,
    isLoading: isLoadingProductReview,
  } = useProductReview(params?.slug);
  return (
    <RenderContextClient
      components={{
        desktop: {
          defaultTheme: ProductDetailPageDesktop,
        },
        mobile: {
          defaultTheme: ProductDetailPageMobile,
        },
      }}
      product={product}
      productReview={productReview}
      productRelate={productsRelate}
      isLoadingProductReview={isLoadingProductReview}
    />
  );
}
