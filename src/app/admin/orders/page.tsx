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

import CalendarSchedulerGarage from "@/app/admin/orders/CalendarGarage";
async function getDataOrder(garageId: number) {
  const res = await fetch(`${apiUrl}api/orders?garage=${garageId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default async function Orders() {
  const orders = await getDataOrder(9);
  const mappedOrdersData = mapArrayEventCalendar(orders.orders);
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
  const carOptions = carsData?.map((car) => ({
    value: car.id?.toString() || "",
    label: car.licensePlates || "",
    otherData: {
      carId: car.id?.toString() || "",
      brandId: car.brandCarName.id,
      brandName: car.brandCarName.name,
      modelId: car.modelCarName.id,
      modelName: car.modelCarName.name,
      yearCarName: car.yearCarName,
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
    <div>
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
