"use client";
import React, { useEffect, useState } from "react";

import classNames from "classnames/bind";

import styles from "./loading.module.scss";
import { IconRotateClockwise2 } from "@tabler/icons-react";
import { Box, Loader, LoadingOverlay, Skeleton } from "@mantine/core";
const cx = classNames.bind(styles);
const antIcon = <IconRotateClockwise2 color="var(--theme-color)" />;
export const LoadingPage = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader size={30} />
    </Box>
  );
};
export const LoadingComponent = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Loader size={30} />
    </Box>
  );
};
