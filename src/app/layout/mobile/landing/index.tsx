import Blogs from "./Blogs";
import DetailPage from "./DetailPage";
import Introducation from "./Introducation";
import styles from "./index.module.scss";
import image1 from "@/assets/images/carousel1.png";
import image2 from "@/assets/images/carousel2.jpg";
import Statistics from "./Statistics";
import Story from "./Story";
import Hero from "../trang-chu/Hero";
const slideshowData = [
  {
    image: image1.src,
  },
  {},
];
const LandingMobile = ({ data, blogs }: any) => {
  return (
    <div className={styles.wrapper}>
      <Hero height={328} slideshowData={slideshowData} />
      <Introducation />
      {data?.map((item: any, index: number) => {
        return <DetailPage title={item?.name} data={item} key={index} />;
      })}
      <Story />
      <Statistics />
      <Blogs blogs={blogs} />
    </div>
  );
};
export default LandingMobile;
