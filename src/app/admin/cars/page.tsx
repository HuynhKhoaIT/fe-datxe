"use client";
import { useDisclosure } from "@mantine/hooks";
import CarsListPage from "./CarsListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function Cars() {
  const searchParams = useSearchParams();
  const [loadingTable, handlers] = useDisclosure(true);

  const [page, setPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const [cars, setCars] = useState([]);
  useEffect(() => {
    const fetchData = async (searchParams: any, page: number) => {
      try {
        const response = await axios.get(
          `/api/car?${searchParams}&page=${page}`
        );
        setCars(response?.data);
      } catch (error) {
      } finally {
        handlers.close();
      }
    };
    const fetchDataDLBD = async () => {
      try {
        const response = await axios.get(`/api/car/dlbd`);
        setCars(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        handlers.close();
      }
    };
    handlers.open();
    if (activeTab === "first") {
      fetchData(searchParams, page);
    } else if (activeTab === "second") {
      fetchDataDLBD();
    }
  }, [activeTab, page, searchParams]);
  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách xe" },
  ];
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CarsListPage
        dataSource={cars}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        page={page}
        setPage={setPage}
        loadingTable={loadingTable}
      />
    </Fragment>
  );
}
