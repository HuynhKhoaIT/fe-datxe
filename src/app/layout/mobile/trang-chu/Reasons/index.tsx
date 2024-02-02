"use client";
import styles from "./index.module.scss";
import CardReassons from "./CardReasons";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import SlickCarousel from "@/app/components/common/SlickCarousell";
import Scroll from "@/app/components/common/Scroll";

export default function Reassons({ data }: any) {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Lí do bạn nên chọn DatXe"
      hiddenShowMore={true}
      id="reassons"
    >
      <div className={styles.wrapper}>
        {/* <SlickCarousel column={1} gap={8}>
          
        </SlickCarousel> */}
        <Scroll>
          {data?.map((data: any, index: number) => (
            <CardReassons data={data} key={index} />
          ))}
        </Scroll>
      </div>
    </OverviewPanel>
  );
}
