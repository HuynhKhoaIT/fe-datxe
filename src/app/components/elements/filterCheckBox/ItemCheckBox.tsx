"use client";
import { Checkbox } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export function ItemCheckBox({ dataDetail, keyName }: any) {
  const router = useRouter();
  const itemId = dataDetail?.id.toString();
  const name = dataDetail ? dataDetail?.name || dataDetail?.title : "";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  function handleClick(checkbox: HTMLInputElement) {
    console.log("checkbox", checkbox);
    if (checkbox.checked === false) {
      params?.delete(keyName.toString());
    } else {
      params?.append(keyName.toString(), `${itemId}`);
    }
    const path = pathname + "?" + params?.toString();
    router.push(path);
  }

  const checkHandler = (checkBoxType: string, checkBoxValue: string) => {
    const params = new URLSearchParams(searchParams);
    const value = params.get(checkBoxType);
    return checkBoxValue === value;
  };

  return (
    <li>
      <Checkbox
        value={itemId}
        defaultChecked={checkHandler(keyName, itemId?.toString() ?? "")}
        onClick={(e) => handleClick(e.target as HTMLInputElement)}
        label={name}
      />
    </li>
  );
}
