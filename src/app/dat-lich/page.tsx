import React from "react";
import { getSchedule } from "@/utils/order";
import CalendarScheduler from "../components/elements/calendar/Calendar";
import { mapArrayEventCalendar } from "../domain/EventCalendar";
import { getBrands } from "@/utils/branch";
import { getCategories } from "@/utils/category";
import { getCarsSsr } from "@/utils/car";
import { getMyAccount } from "@/utils/user";
export default async function DatLich() {
  const orders = await getSchedule();
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
    },
  }));

  const account: any = await getMyAccount();
  const carDefault = carOptions?.filter(
    (car) => car.value == account?.carIdDefault
  );

  return (
    <main className="main">
      <CalendarScheduler
        brandOptions={newBrands}
        categoryOptions={categoryOptions}
        carsData={carsData}
        carOptions={carOptions}
        carDefault={carDefault}
        ordersData={mappedOrdersData}
      />
    </main>
  );
}
