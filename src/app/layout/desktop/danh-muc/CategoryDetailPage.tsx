"use client";
import Container from "@/app/components/common/Container";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import styles from "./CategoryDetailPage.module.scss";
import CarouselDesktop from "../trang-chu/Carousel/Carousel";
import Products from "./Products";
import Reassons from "../trang-chu/Reasons/Reasons";
import bgLanding2 from "@/assets/images/bgLanding2.png";
import ViewedProducts from "./viewedProducts";
import Blogs from "./Blogs";
import useFetch from "@/app/hooks/useFetch";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getCategories } from "@/app/admin/categories/until";

const CategoryDetailPageDesktop = ({
  kindProduct,
  slideshowData,
  products,
  productRelate,
  blogs,
  reassons,
}: any) => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const {
    data: categories,
    isLoading: loadingCategories,
    isPlaceholderData,
    isFetching: isFetchingCategories,
    refetch,
  } = useFetch({
    queryKey: ["categories", , 1],
    queryFn: () => getCategories(searchParams.toString(), 1),
  });
  return (
    <div className={styles.wrapper}>
      <CarouselDesktop height={320} slideshowData={slideshowData} />

      <Container className={styles.container}>
        <div className={styles.fillter}>
          <FilterRadio
            data={categories}
            filterName="Danh mục"
            keyName="cat_id"
          />
          <FilterRadio
            data={kindProduct}
            filterName="Loại"
            keyName="isProduct"
          />
        </div>

        <div className={styles.body}>
          <Products products={products?.data} />
        </div>
      </Container>
      <Blogs blogs={blogs} />
      <ViewedProducts viewedProducts={productRelate?.data} />
      <div
        className={styles.productsBox}
        style={{
          backgroundImage: `url(${bgLanding2.src})`,
          backgroundSize: "cover",
        }}
      >
        <Reassons data={reassons} />
      </div>
    </div>
  );
};
export default CategoryDetailPageDesktop;
