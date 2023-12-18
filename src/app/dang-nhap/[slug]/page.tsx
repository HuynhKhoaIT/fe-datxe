"use client";
import { useSession } from "next-auth/react";
import { LoginFormAccuracy } from "../../components/page/login/LoginAccuracy";
import React from "react";
import { redirect } from "next/navigation";

export default function LoginAccuracy() {
  const { data: session } = useSession();
  if (session && session.user) {
    redirect("/dashboard");
  }
  return <LoginFormAccuracy />;
}
