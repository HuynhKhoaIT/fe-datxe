"use client";
import { Radio } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { ItemRadio } from "./ItemRadio";
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
    <div className="shop-sidebar">
      <div className="shop-widget">
        <h4 className="shop-widget-title">{filterName}</h4>
        <ul>
          <Radio.Group defaultValue={String(valueRadio)}>
            {data?.map((item: any, index: number) => (
              <ItemRadio dataDetail={item} key={index} keyName={keyName} />
            ))}
          </Radio.Group>
        </ul>
      </div>
    </div>
  );
}
