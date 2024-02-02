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

const LandingPageDesktop = ({ categories }: any) => {
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
      {/* <Carousel /> */}
      <CarouselDesktop slideshowData={slideshowData} />
      <BookForm />
      <div className={styles.categoryBox}>
        <Category categories={categories} />
      </div>
      <Container className={styles.AdvertisementBox}>
        <Advertisement />
      </Container>
      <div className={styles.servicesBox}>
        <ServicesHot />
      </div>
      <div
        className={styles.productsBox}
        style={{
          backgroundImage: `url(${bgLanding.src})`,
          backgroundSize: "cover",
        }}
      >
        <ProductsHot />
      </div>
      <div style={{ backgroundColor: "var(--background-color-light)" }}>
        <Blogs />
      </div>
      <ProductSuggestions />
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

export default LandingPageDesktop;
