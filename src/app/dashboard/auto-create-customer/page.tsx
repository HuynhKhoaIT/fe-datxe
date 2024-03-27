"use client";
import React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/app/hooks/useFetch";
import { CreateCustomer } from "./until";
export default function AutoCreateCustomer() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");
  const { data } = useFetch({
    queryFn: () => CreateCustomer(name, phone),
  });

  console.log(data);
  return <></>;
}
