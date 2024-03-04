import CustomerListPage from "./CustomerListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import styles from "./index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterAdmin from "@/app/components/page/footer/footer-admin";
import { getCustomers } from "@/app/libs/prisma/customer";
import { apiUrl } from "@/constants";

export default async function Suppliers() {
  let customers = await getCustomers({});
  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Quản lý khách hàng" },
  ];
  return (
    <div className={styles.wrapper}>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CustomerListPage dataSource={customers} />
    </div>
  );
}
