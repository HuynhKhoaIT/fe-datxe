import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { Select } from "@mantine/core";
import ReviewItem from "./ReviewItem";
const reviews = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Nguyễn Văn A",
    },
    star: 3,
    created: "29/1/2024",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A justo turpis massa tristique augue dignissim volutpat. Quis ultricies eu libero tortor dictumst.",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Nguyễn Huỳnh Khoa",
    },
    star: 5,
    created: "20/1/2024",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A justo turpis massa tristique augue dignissim volutpat. Quis ultricies eu libero tortor dictumst.",
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "Nguyễn Văn Tài",
    },
    star: 4,
    created: "29/1/2023",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A justo turpis massa tristique augue dignissim volutpat. Quis ultricies eu libero tortor dictumst.",
  },
  {
    id: 4,
    user: {
      id: 4,
      name: "Nguyễn Văn Long",
    },
    star: 2,
    created: "23/1/2023",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A justo turpis massa tristique augue dignissim volutpat. Quis ultricies eu libero tortor dictumst.",
  },
];
const Reviews = () => {
  return (
    <div className={styles.wrapper}>
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
        {reviews?.map((item: any, index: number) => {
          return <ReviewItem dataDetail={item} key={index} />;
        })}
      </div>
    </div>
  );
};
export default Reviews;
