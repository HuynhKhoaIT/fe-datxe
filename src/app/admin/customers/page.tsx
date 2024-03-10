"use client";
import CustomerListPage from "./CustomerListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { getCustomers } from "@/app/libs/prisma/customer";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

export default function Suppliers() {
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.get(`/api/customer`);
        setCustomers(response);
      } catch (error) {}
    };
    const fetchDataDLBD = async () => {
      try {
        const response = await axios.get(`/api/customer/dlbd`);
        setCustomers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (activeTab === "first") {
      fetchData();
    } else if (activeTab === "second") {
      fetchDataDLBD();
    }
  }, [activeTab]);
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
      />
    </Fragment>
  );
}
