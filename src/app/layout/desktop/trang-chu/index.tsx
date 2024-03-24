import styles from "./index.module.scss";
import bgLanding from "@/assets/images/bgLanding.svg";
import bgLanding2 from "@/assets/images/bgLanding2.png";
import image1 from "@/assets/images/carousel1.png";
import image2 from "@/assets/images/carousel2.jpg";
import CarouselDesktop from "./Carousel/Carousel";
import BookForm from "./Book/BookForm";
import Category from "./Category/Category";
import Container from "@/app/components/common/Container";
import Advertisement from "./Advertisement";
import ServicesHot from "./ServiceHot";
import ProductsHot from "./ProductsHot";
import Blogs from "./Blogs/Blogs";
import ProductSuggestions from "./ProductSuggestions/ProductSuggestions";
import Reassons from "./Reasons/Reasons";

const LandingPageDesktop = ({
  categories,
  reassons,
  productsRelate,
  servicesHot,
  productsHot,
  blogs,
  carsOption,
  provinceData,
}: any) => {
  const slideshowData = [
    {
      image: image1.src,
    },
    {
      image: image2.src,
    },
  ];
  return (
    <div className="bg-white">
      <CarouselDesktop slideshowData={slideshowData} />
      <BookForm provinceData={provinceData} carsOption={carsOption} />
      <div className={styles.categoryBox}>
        <Category categories={categories} />
      </div>
      <Container className={styles.AdvertisementBox}>
        <Advertisement />
      </Container>
      <div className={styles.servicesBox}>
        <ServicesHot data={servicesHot?.data} />
      </div>
      <div
        className={styles.productsBox}
        style={{
          backgroundImage: `url(${bgLanding.src})`,
          backgroundSize: "cover",
        }}
      >
        <ProductsHot data={productsHot?.data} />
      </div>
      <div style={{ backgroundColor: "var(--background-color-light)" }}>
        <Blogs blogs={blogs} />
      </div>
      <ProductSuggestions data={productsRelate?.data} />
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

export default LandingPageDesktop;
