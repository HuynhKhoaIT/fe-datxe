import styles from "./CardBlog.module.scss";
export default function CardBlog({ data }: any) {
  return (
    <div
      className={styles.wrapper}
      style={{ backgroundImage: `url(${data?.image})` }}
    >
      <div className={styles.info}>
        <div className={styles.title}>{data?.title}</div>
        <div className={styles.view}>{data?.view} lượt xem</div>
      </div>
    </div>
  );
}
