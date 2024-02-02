import SlickCarousel from "@/app/components/common/SlickCarousell";
import styles from "./index.module.scss";
import image1 from "@/assets/images/carousel1.png";
import image2 from "@/assets/images/carousel2.jpg";
import CarouselItem from "../../trang-chu/Carousel/CarouselItems";

const Carousel = () => {
  const slideshowData = [
    {
      image: image1.src,
    },
    {
      image: image2.src,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <SlickCarousel
        column={1}
        dots={true}
        nextArrow={<></>}
        prevArrow={<></>}
        speed={500}
        infinite={true}
      >
        {slideshowData?.map((item: any) => {
          return <CarouselItem item={item} key={item.id} />;
        })}
      </SlickCarousel>
    </div>
  );
};
export default Carousel;
