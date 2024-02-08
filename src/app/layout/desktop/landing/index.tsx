import CarouselDesktop from "../trang-chu/Carousel/Carousel";
import Blogs from "./Blogs";
import DetailPage from "./DetailPage";
import Introducation from "./Introducation";
import styles from "./index.module.scss";
import image1 from "@/assets/images/carousel1.png";
import image2 from "@/assets/images/carousel2.jpg";
import Statistics from "./Statistics";
import Story from "./Story";
const slideshowData = [
  {
    image: image1.src,
  },
  {
    image: image2.src,
  },
];
const LandingDesktop = ({ data, blogs }: any) => {
  return (
    <div className={styles.wrapper}>
      <CarouselDesktop height={643} slideshowData={slideshowData} />
      <Introducation />
      <DetailPage data={data} />
      <Story />
      <Statistics />
      <Blogs blogs={blogs} />
    </div>
  );
};
export default LandingDesktop;
