"use client";
import React, { useEffect, useState } from "react";
import CategoryForm from "../create/SupplierForm";
import axios from "axios";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { supplierId: number };
}) {
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/suppliers/${params?.supplierId}`
        );
        setSupplier(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.supplierId]);
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <CategoryForm isEditing={true} dataDetail={supplier} />
    </div>
  );
}
