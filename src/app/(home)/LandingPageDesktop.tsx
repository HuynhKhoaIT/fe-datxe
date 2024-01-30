import Container from "../components/common/Container";
import Advertisement from "../landing/Advertisement";
import Category from "../landing/Category/Category";
import ProductsHot from "../landing/ProductsHot";
import ServicesHot from "../landing/ServiceHot";
import styles from "./index.module.scss";
import bgLanding from "@/assets/images/bgLanding.svg";
import bgLanding2 from "@/assets/images/bgLanding2.png";

import CarouselDesktop from "../landing/Carousel/Carousel";
import image1 from "@/assets/images/carousel1.png";
import image2 from "@/assets/images/carousel2.jpg";
import Reassons from "../landing/Reasons/Reasons";
import ProductSuggestions from "../landing/ProductSuggestions/ProductSuggestions";
import BookForm from "../landing/Book/BookForm";
import Blogs from "../landing/Blogs/Blogs";

export default function LandingPageDesktop({ categories }: any) {
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
}
