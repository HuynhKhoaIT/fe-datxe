import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { Rating, Select } from "@mantine/core";
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
      "Had a wonderful time being at the beach with family. Even though the weather didn’t always cooperate, we had a blast! We were supposed to stay at Quiet Surf townhomes, but because of hurricane Sally and some plumbing issues, we found Costa del Sol which fit the bill just fine. The location was perfect! Newman-Dailey will always be our choice for our beach trips. Very helpful staff.",
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
      "Had a wonderful time being at the beach with family. Even though the weather didn’t always cooperate, we had a blast! We were supposed to stay at Quiet Surf townhomes, but because of hurricane Sally and some plumbing issues, we found Costa del Sol which fit the bill just fine. The location was perfect! Newman-Dailey will always be our choice for our beach trips. Very helpful staff.",
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
      "Had a wonderful time being at the beach with family. Even though the weather didn’t always cooperate, we had a blast! We were supposed to stay at Quiet Surf townhomes, but because of hurricane Sally and some plumbing issues, we found Costa del Sol which fit the bill just fine. The location was perfect! Newman-Dailey will always be our choice for our beach trips. Very helpful staff.",
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
      "Had a wonderful time being at the beach with family. Even though the weather didn’t always cooperate, we had a blast! We were supposed to stay at Quiet Surf townhomes, but because of hurricane Sally and some plumbing issues, we found Costa del Sol which fit the bill just fine. The location was perfect! Newman-Dailey will always be our choice for our beach trips. Very helpful staff.",
  },
];
const Reviews = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Typo size="sub" type="bold" style={{ color: "var(--title-color)" }}>
          Đánh giá
        </Typo>
        <Select
          size="lg"
          radius={0}
          w={130}
          placeholder="Lọc theo"
          data={["5 sao", "4 sao", "3 sao", "2 sao", "1 sao"]}
        />
      </div>
      <div className={styles.average}>
        <Rating defaultValue={4.5} />
        <Typo size="primary" style={{ color: "var(--title-color-sub)" }}>
          Tuyệt vời 4.6/5
        </Typo>
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
