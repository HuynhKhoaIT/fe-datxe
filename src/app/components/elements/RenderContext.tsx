import React from "react";
import { headers } from "next/headers";
import { getSelectorsByUserAgent } from "react-device-detect";
import { Container } from "@mantine/core";
const RenderContext = ({ components, layoutProps, ...props }: any) => {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );
  const ComponentRender = isMobile
    ? components?.mobile?.defaultTheme
    : components?.desktop?.defaultTheme; //|| PageNotFound;
  return <ComponentRender {...props} />;
};

export default RenderContext;
