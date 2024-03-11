"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { redirect } from "next/navigation";
import { RegisterGarageFormAccuracy } from "@/app/components/page/register/RegisterGarageAccuracy";

export default function RegisterAccuracy() {
  const { data: session } = useSession();
  if (session && session.user) {
    redirect("/admin");
  }
  return <RegisterGarageFormAccuracy />;
}
