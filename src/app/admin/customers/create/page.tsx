"use client";
import React from "react";
import CustomersForm from "./CustomersForm";
export default function CreateCustomer() {
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <CustomersForm isEditing={false} />
    </div>
  );
}
