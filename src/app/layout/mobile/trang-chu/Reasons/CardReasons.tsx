import Typo from "@/app/components/elements/Typo";
import styles from "./CardReassons.module.scss";
export default function CardReassons({ data }: any) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={data.image} alt={data.image} />
      </div>
      <div className={styles.content}>
        <Typo size="primary" type="bold" style={{ color: "#03121A" }}>
          {data?.title}
        </Typo>
        <Typo
          size="sub"
          style={{ color: "#03121A" }}
          className={styles.content}
        >
          {data?.content}
        </Typo>
      </div>
    </div>
  );
}
