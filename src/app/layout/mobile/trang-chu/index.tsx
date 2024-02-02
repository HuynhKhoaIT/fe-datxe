import styles from "./index.module.scss";
import bgLanding from "@/assets/images/bgLanding.svg";
import bgLanding2 from "@/assets/images/bgLanding2.png";
import image1 from "@/assets/images/carousel1.png";
import image2 from "@/assets/images/carousel2.jpg";
import Container from "@/app/components/common/Container";

const LandingPageMobile = ({ categories }: any) => {
  const slideshowData = [
    {
      image: image1.src,
    },
    {
      image: image2.src,
    },
  ];
  return <div className="bg-white"></div>;
};

export default LandingPageMobile;
