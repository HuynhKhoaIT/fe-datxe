"use client";
import styles from "./index.module.scss";
import CardReassons from "./CardReasons";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import SlickCarousel from "@/app/components/common/SlickCarousell";

export default function Reassons({ data }: any) {
  return (
    <OverviewPanel
      stylesProps={{ padding: "30px 0" }}
      title="Lí do bạn nên chọn DatXe"
      hiddenShowMore={true}
      id="reassons"
    >
      <SlickCarousel column={3} gap={8}>
        {data?.map((data: any, index: number) => (
          <CardReassons data={data} key={index} />
        ))}
      </SlickCarousel>
    </OverviewPanel>
  );
}
