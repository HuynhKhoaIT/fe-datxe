"use client";

import { HydrationBoundary } from "@tanstack/react-query";

export const ReactQueryHydrate = (props: any) => {
  return <HydrationBoundary {...props} />;
};
