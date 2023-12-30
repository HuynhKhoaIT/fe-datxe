"use client";
import { IProduct } from "@/interfaces/product";
import { getProductsHot } from "@/utils/product";
import React, { useState } from "react";
export default function ButtonField({ onClick }: any) {
  return (
    <div className="text-center mt-4">
      <button onClick={onClick} className="theme-btn">
        Xem Thêm
      </button>
    </div>
  );
}
