import styles from "./index.module.scss";
const SocialItem = ({ social }: any) => {
  return (
    <div className={styles.socialItem}>
      <div className={styles.avatar}>
        <img src={social?.image} />
      </div>
      <div className={styles.name}>{social?.name}</div>
    </div>
  );
};
export default SocialItem;
