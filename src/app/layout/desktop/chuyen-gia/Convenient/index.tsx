"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import { IProduct } from "@/interfaces/product";
import ProductItem from "@/app/components/elements/product/ProductItem1";
import Convenient from "./Convenient";
import SlickCarousel from "@/app/components/common/SlickCarousell";
const Convenients = ({ convenients }: any) => {
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        stylesProps={{ padding: "30px 0" }}
        title="Tiện ích lân cận"
        subTitle="Danh mục dịch vụ phổ biến"
        hiddenShowMore={true}
        id="convenients-expert"
      >
        <SlickCarousel column={4} gap={8} dots={true}>
          {convenients?.map((convenient: any, index: number) => (
            <Convenient convenient={convenient} key={index} />
          ))}
        </SlickCarousel>
      </OverviewPanel>
    </div>
  );
};
export default Convenients;
