import Container from "@/app/components/common/Container";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import styles from "./CategoryDetailPage.module.scss";
import Products from "./Products";
import bgLanding2 from "@/assets/images/bgLanding2.png";
import ViewedProducts from "./viewedProducts";
import Blogs from "./Blogs";
import Hero from "../trang-chu/Hero";
import Reassons from "../trang-chu/Reasons";
import Filter from "./Filter";

const CategoryDetailPageMobile = ({
  categories,
  kindProduct,
  slideshowData,
  products,
  productRelate,
  blogs,
  reassons,
}: any) => {
  return (
    <div className={styles.wrapper}>
      <Hero slideshowData={slideshowData} height={135} />
      <Filter kindProduct={kindProduct} />
      <Container>
        <Products products={products} />
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
        <Reassons data={reassons} />
      </div>
    </div>
  );
};
export default CategoryDetailPageMobile;
