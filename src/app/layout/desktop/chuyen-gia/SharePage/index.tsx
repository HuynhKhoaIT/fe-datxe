import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import SlickCarousel from "@/app/components/common/SlickCarousell";
import SocialItem from "./SocialItem";
const SharePage = ({ socials }: any) => {
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        stylesProps={{ padding: "30px 0" }}
        title="Chia sẽ kinh nghiệm"
        // linkToList={"/dich-vu"}
        hiddenShowMore={true}
        id="blogs-expert"
      >
        <div className={styles.rowItem}>
          {socials?.map((social: any, index: number) => (
            <SocialItem social={social} key={index} />
          ))}
        </div>
      </OverviewPanel>{" "}
    </div>
  );
};

export default SharePage;
