"use client";
import React, { useEffect, useState } from "react";
import DatLich from "../../dat-lich/page";
import { getOrdersOfGarage } from "@/utils/order";
import { mapArrayEventCalendar } from "@/app/domain/EventCalendar";
import { getBrands } from "@/utils/branch";
import { getCarsSsr } from "@/utils/car";
import { getMyAccount } from "@/utils/user";
import { getCategories } from "@/utils/category";
import SearchForm from "@/app/components/form/SearchForm";
import { Space } from "@mantine/core";
import CalendarSchedulerGarage from "@/app/components/elements/calendar/CalendarGarage";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
export default function Orders() {
  const { data: session, status } = useSession();
  const token: any = session?.user?.token;
  const searchParams = useSearchParams();
  const [dataOrder, setDataOrder] = useState<any>();
  const getDataOrder = async (searchParams: string) => {
    const orders = await getOrdersOfGarage(token, 9);
    const mappedOrdersData = await mapArrayEventCalendar(orders);
    setDataOrder(mappedOrdersData);
  };
  useEffect(() => {
    getDataOrder(searchParams.toString());
  }, [searchParams]);
  const searchData = [
    {
      name: "startDate",
      placeholder: "Ngày bắt đầu",
      type: "date",
    },
    {
      name: "endDate",
      placeholder: "Ngày kết thúc",
      type: "date",
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
      <CalendarSchedulerGarage ordersData={dataOrder} selectable={false} />
    </div>
  );
}
