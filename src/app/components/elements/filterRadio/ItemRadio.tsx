"use client";
import { Checkbox, Radio } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export function ItemRadio({ dataDetail, keyName }: any) {
  const router = useRouter();
  const itemId = dataDetail?.id.toString();
  const name = dataDetail ? dataDetail?.name || dataDetail?.title : "";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  function handleClick(checkbox: HTMLInputElement) {
    if (checkbox.checked === false) {
      params?.delete(keyName.toString());
    } else {
      params?.set(keyName.toString(), `${itemId}`);
    }
    const path = pathname + "?" + params?.toString();
    router.push(path);
  }

  return (
    <li>
      <Radio
        value={itemId}
        onClick={(e) => handleClick(e.target as HTMLInputElement)}
        label={name}
      />
    </li>
  );
}
