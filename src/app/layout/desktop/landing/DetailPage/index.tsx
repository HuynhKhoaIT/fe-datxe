import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import Container from "@/app/components/common/Container";

const DetailPage = ({ data }: any) => {
  return (
    <Container>
      <div className={styles.wrapper}>
        {data?.map((item: any, index: number) => {
          return (
            <div key={index} className={styles.box}>
              <div className={styles.left}>
                <Typo
                  type="bold"
                  style={{ fontSize: "24px", color: "#242A2E" }}
                >
                  {item?.name}
                </Typo>
              </div>
              <div className={styles.itemRight}>
                {item?.children?.map((_item: any, _index: number) => {
                  return (
                    <div key={_index} className={styles.right}>
                      <div className={styles.item}>
                        <div className={styles.logo}>
                          <img src={_item?.image} />
                        </div>
                        <div className={styles.info}>
                          <Typo
                            size="primary"
                            type="bold"
                            style={{ color: "#242A2E" }}
                          >
                            {_item?.title}
                          </Typo>
                          <Typo size="sub" style={{ color: "#383E43" }}>
                            {_item?.subTitle}
                          </Typo>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
export default DetailPage;
