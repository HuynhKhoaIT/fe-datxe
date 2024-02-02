import { ReactNode, Suspense } from "react";
import Header from "@/app/components/page/header/header";
import { FilterRadio } from "@/app/components/elements/filterRadio";
import { MyFooter } from "@/app/components/page/footer/footer";
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
