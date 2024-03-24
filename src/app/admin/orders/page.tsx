import React from "react";
import DatLich from "../../dat-lich/page";
import CalendarScheduler from "@/app/components/elements/calendar/Calendar";
import { getOrdersOfGarage } from "@/utils/order";
import { mapArrayEventCalendar } from "@/app/domain/EventCalendar";
import { getBrands } from "@/utils/branch";
import { getCarsSsr } from "@/utils/car";
import { getMyAccount } from "@/utils/user";
import { getCategories } from "@/utils/category";
import SearchForm from "@/app/components/form/SearchForm";
import { Space } from "@mantine/core";
import { apiUrl } from "@/constants";
export const revalidate = 0;
import styles from "./index.module.scss";
import CalendarSchedulerGarage from "@/app/admin/orders/CalendarGarage";
import { getOrders } from "@/app/libs/prisma/order";
export default async function Orders() {
  const orders = await getOrders(2, {});
  const mappedOrdersData = mapArrayEventCalendar(orders?.data);
  // lấy danh sách brand
  const brands = await getBrands();
  const newBrands = brands?.map((brand) => ({
    value: brand.id?.toString() || "",
    label: brand.name || "",
  }));
  // lấy danh sách category
  const categories = await getCategories();
  const categoryOptions = categories?.map((category) => ({
    value: category.id?.toString() || "",
    label: category.name || "",
  }));

  const carsData = await getCarsSsr();
  console.log(carsData);
  const carOptions = carsData?.map((car) => ({
    value: car.id?.toString() || "",
    label: car.licensePlates || "",
    otherData: {
      carId: car.id?.toString() || "",
      brandId: car?.brandCarName.id,
      brandName: car?.brandCarName?.name,
      modelId: car?.modelCarName?.id,
      modelName: car?.modelCarName?.name,
      yearCarName: car?.yearCarName,
    },
  }));

  const account: any = await getMyAccount();
  const carDefault = carOptions?.filter(
    (car) => car.value == account?.carIdDefault
  );

  const searchData = [
    {
      name: "startDate",
      placeholder: "Ngày bắt đầu",
      type: "input",
    },
    {
      name: "endDate",
      placeholder: "Ngày kết thúc",
      type: "input",
    },
  ];
  const initialValuesSearch = {
    startDate: "",
    endDate: null,
  };
  return (
    <div className={styles.wrapper}>
      <SearchForm searchData={searchData} initialValues={initialValuesSearch} />
      <Space h={20} />
      <CalendarSchedulerGarage
        brandOptions={newBrands}
        categoryOptions={categoryOptions}
        carsData={carsData}
        carOptions={carOptions}
        carDefault={carDefault}
        ordersData={mappedOrdersData}
      />
    </div>
  );
}
