import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { ModalsProvider } from "@mantine/modals";

import "@/assets/scss/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Notifications } from "@mantine/notifications";
import ProviderAuth from "./Provider";
import { ReactNode } from "react";
import { MantineProvider, createTheme } from "@mantine/core";
// import StoreProvider from "./StoreProvider";
export const dynamic = "force-dynamic";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Datxe",
  description: "Trang thương mại điện tử",
};

const theme = createTheme({
  // colorScheme: 'light',
  colors: {
    "ocean-blue": [
      "#FFF4E6",
      "#FFE8CC",
      "#FFD8A8",
      "#FFC078",
      "#FFA94D",
      "#FF922B",
      "#FD7E14",
      "#F76707",
      "#E8590C",
      "#D9480F",
    ],
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1280px",
    xxl: "1532px",
  },

  fontFamily: "SFCompact, sans-serif",
  primaryColor: "ocean-blue",
  /** Put your mantine theme override here */
});

interface IProps {
  children: ReactNode;
  singlePage: boolean;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            <ProviderAuth>
              {/* <StoreProvider> */}
              <Notifications position="top-right" />
              {children}
              {/* </StoreProvider> */}
            </ProviderAuth>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
