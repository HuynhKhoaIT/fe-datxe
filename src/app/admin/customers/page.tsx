"use client";
import { useDisclosure } from "@mantine/hooks";
import CustomerListPage from "./CustomerListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function Suppliers() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [loadingTable, handlers] = useDisclosure(true);
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fetchData = async (searchParams: any, page: number) => {
      try {
        const response: any = await axios.get(
          `/api/customer?${searchParams}&page=${page}`
        );
        setCustomers(response?.data);
      } catch (error) {
        console.error(error);
      } finally {
        handlers.close();
      }
    };
    const fetchDataDLBD = async () => {
      try {
        const response = await axios.get(`/api/customer/dlbd`);
        setCustomers(response?.data);
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
    { title: "Quản lý khách hàng" },
  ];

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CustomerListPage
        dataSource={customers}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        page={page}
        setPage={setPage}
        loadingTable={loadingTable}
      />
    </Fragment>
  );
}
