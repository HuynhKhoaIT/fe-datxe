import Container from "@/app/components/common/Container";
import Banner from "./Banner";
import styles from "./ExpertDetailPage.module.scss";
import Info from "./Info";
import ImagesShowRoom from "./ImagesShowRoom";
import Category from "./Category";
import Service from "./Service";
import Products from "./Products";
import TabsComponent from "./tabs";
import Blogs from "./Blogs";
import SharePage from "./SharePage";
import Convenients from "./Convenient";
const ExpertDetailPageDesktop = ({
  expertDetail,
  categories,
  services,
  products,
  blogs,
  socials,
  convenients,
}: any) => {
  return (
    <div className={styles.wrapper}>
      <Banner />
      <Container>
        <Info detailData={expertDetail} />
        <ImagesShowRoom className={styles.imagesShowRoom} />
      </Container>
      <div style={{ backgroundColor: "var(--background-color-light)" }}>
        <Category categories={categories} />
        <Service services={services} />
      </div>
      <Products products={products} />
      <Convenients convenients={convenients} />
      <div style={{ backgroundColor: "var(--background-color-light)" }}>
        <Container>
          <TabsComponent />
        </Container>
        <Blogs blogs={blogs} />
        <SharePage socials={socials} />
      </div>
    </div>
  );
};
export default ExpertDetailPageDesktop;
