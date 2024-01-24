import Carousel from "./CarouselSlider";
import styles from "./index.module.scss";
import Container from "../Container";
const CarouselDesktop = ({ slideshowData }: any) => {
  return (
    <Container className={styles.container}>
      <Carousel slideshowData={slideshowData} />
    </Container>
  );
};

export default CarouselDesktop;
