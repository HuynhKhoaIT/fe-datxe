import { ReactNode, Suspense } from "react";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import { getCategories } from "@/utils/category";
interface IProps {
  children: ReactNode;
}
export default async function SearchLayout({ children }: IProps) {
  const categorys = await getCategories();
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
}
