"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export function SideBarItem({ dataDetail, keyName }: any) {
  const router = useRouter();
  const itemId = dataDetail?.id;
  const name = dataDetail ? dataDetail?.title : "";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  function handleClick(checkbox: HTMLInputElement) {
    // const checkboxes = document.querySelectorAll('input[name="category"]');
    // console.log("checkboxes", checkboxes);
    // checkboxes.forEach((item) => {
    //   if (item !== checkbox) (item as HTMLInputElement).checked = false;
    // });

    if (checkbox.checked === false) {
      params?.delete(keyName.toString());
    } else {
      params?.set(keyName.toString(), `${itemId}`);
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
      <div className="form-check">
        <input
          name="category"
          className="form-check-input"
          type="checkBox"
          id={dataDetail.id?.toString()}
          checked={checkHandler(keyName, itemId?.toString() ?? "")}
          onClick={(e) => handleClick(e.target as HTMLInputElement)}
        />
        <label className="form-check-label" htmlFor={dataDetail.id?.toString()}>
          {name}
        </label>
      </div>
    </li>
  );
}
