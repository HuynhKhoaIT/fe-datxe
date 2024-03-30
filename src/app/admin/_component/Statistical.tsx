import styles from "./Statistical.module.scss";
export default function Statistical({ dataSource }: any) {
  return (
    <div className={styles.rowCard}>
      <div className={styles.card1}>
        <div className={styles.box}>
          <div className={styles.info}>
            <p className={styles.value}>{dataSource?.[0]?.value}</p>
            <span>{dataSource?.[0]?.label} </span>
          </div>
          <div className={styles.icon}>
            <i className="fal fa-list"></i>
          </div>
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.box}>
          <div className={styles.info}>
            <p className={styles.value}>{dataSource?.[1]?.value}</p>
            <span>{dataSource?.[1]?.label}</span>
          </div>
          <div className={styles.icon}>
            <i className="fal fa-eye"></i>
          </div>
        </div>
      </div>
      <div className={styles.card3}>
        <div className={styles.box}>
          <div className={styles.info}>
            <p className={styles.value}>{dataSource?.[2]?.value}</p>
            <span>{dataSource?.[2]?.label}</span>
          </div>
          <div className={styles.icon}>
            <i className="fal fa-layer-group"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
