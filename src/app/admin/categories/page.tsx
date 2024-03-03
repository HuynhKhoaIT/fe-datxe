import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CategoryListPage from "./CategoryListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import styles from "./index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { getCategories } from "@/app/libs/prisma/category";
import { apiUrl } from "@/constants";
import { getServerSession } from "next-auth";

async function getData() {
  const session = await getServerSession(authOptions);
  let garageId = "0";
  if (session?.user?.garageId) {
    garageId = session?.user?.garageId;
  }
  const requestData = {
    garageId: garageId,
    session: session,
  };
  const res = await getCategories(requestData);
  return {
    categories: res,
    requestData,
  };
}

export default async function Categories() {
  let categories = await getData();

  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh mục sản phẩm" },
  ];
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CategoryListPage
        dataSource={categories?.categories}
        profile={categories?.requestData}
      />
    </div>
  );
}
