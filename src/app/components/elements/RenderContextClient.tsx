"use client";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
const RenderContextClient = ({ components, layoutProps, ...props }: any) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const ComponentRender = isMobile
    ? components?.mobile?.defaultTheme
    : components?.desktop?.defaultTheme;
  return <ComponentRender {...props} />;
};

export default RenderContextClient;
