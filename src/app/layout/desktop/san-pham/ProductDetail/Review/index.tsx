import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { LoadingOverlay, Select } from "@mantine/core";
import ReviewItem from "./ReviewItem";

const Reviews = ({ productReview, isLoadingProductReview }: any) => {
  return (
    <div className={styles.wrapper}>
      {/* <LoadingOverlay visible={isLoadingProductReview} /> */}

      <div className={styles.header}>
        <Typo size="sub" style={{ color: "var(--title-color)" }}>
          1-5 trên 300 đánh giá
        </Typo>
        <Select
          // size="lg"
          // radius={0}
          w={130}
          placeholder="Lọc theo"
          data={["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"]}
        />
      </div>
      <div className={styles.body}>
        {productReview?.data?.map((item: any, index: number) => {
          return <ReviewItem dataDetail={item} key={index} />;
        })}
      </div>
    </div>
  );
};
export default Reviews;
