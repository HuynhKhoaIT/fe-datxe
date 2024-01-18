"use client";
import React, { useEffect, useState } from "react";
import CustomersForm from "../create/CustomersForm";
import axios from "axios";
export const revalidate = 60;
export default function UpdateCustomer({
  params,
}: {
  params: { customerId: number };
}) {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/customer-groups/${params?.customerId}`
        );
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.customerId]);
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <CustomersForm isEditing={true} dataDetail={customer} />
    </div>
  );
}
