"use client";
import { Radio } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { ItemCheckBox } from "./ItemCheckBox";
export function FilterCheckBox({
  data = [],
  filterName = "Filter",
  keyName,
}: any) {
  return (
    <div className="shop-sidebar">
      <div className="shop-widget">
        <h4 className="shop-widget-title">{filterName}</h4>
        <ul>
          {data?.map((item: any, index: number) => (
            <ItemCheckBox dataDetail={item} key={index} keyName={keyName} />
          ))}
        </ul>
      </div>
    </div>
  );
}
