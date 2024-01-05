import React from "react";
import DatLich from "../../dat-lich/page";
import CalendarScheduler from "@/app/components/elements/calendar/Calendar";
import { getOrdersOfGarage } from "@/utils/order";
import { mapArrayEventCalendar } from "@/app/domain/EventCalendar";
import { getBrands } from "@/utils/branch";
import { getCarsSsr } from "@/utils/car";
import { getMyAccount } from "@/utils/user";
import { getCategories } from "@/utils/category";
export default async function Orders() {
  const orders = await getOrdersOfGarage(9);
  const mappedOrdersData = mapArrayEventCalendar(orders);
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
  return (
    <CalendarScheduler
      brandOptions={newBrands}
      categoryOptions={categoryOptions}
      carsData={carsData}
      carOptions={carOptions}
      carDefault={carDefault}
      ordersData={mappedOrdersData}
    />
  );
}
