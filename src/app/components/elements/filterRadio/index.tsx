"use client";
import { Radio } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { ItemRadio } from "./ItemRadio";
import styles from "./index.module.scss";
export function FilterRadio({
  data = [],
  filterName = "Filter",
  keyName,
}: any) {
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  let valueRadio;
  if (params.has(keyName)) {
    valueRadio = params.get(keyName);
  }
  return (
    <div className={styles.shopSidebar}>
      <div className={styles.shopWidgets}>
        <h4 className={styles.shopWidgetTitle}>{filterName}</h4>
        <Radio.Group
          defaultValue={String(valueRadio)}
          classNames={{ root: styles.root }}
        >
          {data?.map((item: any, index: number) => (
            <ItemRadio dataDetail={item} key={index} keyName={keyName} />
          ))}
        </Radio.Group>
      </div>
    </div>
  );
}
