import React from "react";
import ProductSave from "./ProductSave";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function CreateProduct() {
  const session = await getServerSession(authOptions);
  return <ProductSave isDirection={false} user={session?.user} />;
}
