import Container from "@/app/components/common/Container";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import styles from "./CategoryDetailPage.module.scss";
import CarouselDesktop from "../trang-chu/Carousel/Carousel";
import Products from "./Products";
import Reassons from "../trang-chu/Reasons/Reasons";
import bgLanding2 from "@/assets/images/bgLanding2.png";
import ViewedProducts from "./viewedProducts";
import Blogs from "./Blogs";

const CategoryDetailPageDesktop = ({
  categories,
  kindProduct,
  slideshowData,
  products,
  productRelate,
  blogs,
}: any) => {
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
          <Products products={products} />
        </div>
      </Container>
      <Blogs blogs={blogs} />
      <ViewedProducts viewedProducts={productRelate} />
      <div
        className={styles.productsBox}
        style={{
          backgroundImage: `url(${bgLanding2.src})`,
          backgroundSize: "cover",
        }}
      >
        <Reassons />
      </div>
    </div>
  );
};
export default CategoryDetailPageDesktop;
