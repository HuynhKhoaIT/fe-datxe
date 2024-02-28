"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
function ProviderAuth({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default ProviderAuth;
