import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import Container from "@/app/components/common/Container";
const Statistics = () => {
  return (
    <div style={{ backgroundColor: "var(--background-color-light)" }}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.box}>
            <Typo type="bold" style={{ fontSize: "72px", color: "#000" }}>
              300+
            </Typo>
            <Typo size="primary" style={{ color: "#9F9F9F" }}>
              Chuyên gia đã xác thực trên toàn quốc
            </Typo>
          </div>
          <div className={styles.box}>
            <Typo type="bold" style={{ fontSize: "72px", color: "#000" }}>
              300+
            </Typo>
            <Typo size="primary" style={{ color: "#9F9F9F" }}>
              Chuyên gia đã xác thực trên toàn quốc
            </Typo>
          </div>
          <div className={styles.box}>
            <Typo type="bold" style={{ fontSize: "72px", color: "#000" }}>
              300+
            </Typo>
            <Typo size="primary" style={{ color: "#9F9F9F" }}>
              Chuyên gia đã xác thực trên toàn quốc
            </Typo>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Statistics;
