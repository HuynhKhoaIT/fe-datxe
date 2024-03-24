import styles from "./Statistical.module.scss";
export default function Statistical() {
  return (
    <div className={styles.rowCard}>
      <div className={styles.card1}>
        <div className={styles.box}>
          <div className={styles.info}>
            <p className={styles.value}>0</p>
            <span>Điểm mua hàng </span>
          </div>
          <div className={styles.icon}>
            <i className="fal fa-list"></i>
          </div>
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.box}>
          <div className={styles.info}>
            <p className={styles.value}>18.6k</p>
            <span>Đơn hàng</span>
          </div>
          <div className={styles.icon}>
            <i className="fal fa-eye"></i>
          </div>
        </div>
      </div>
      <div className={styles.card3}>
        <div className={styles.box}>
          <div className={styles.info}>
            <p className={styles.value}>1560</p>
            <span>ĐH thành công</span>
          </div>
          <div className={styles.icon}>
            <i className="fal fa-layer-group"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
