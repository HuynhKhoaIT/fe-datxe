import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@/assets/scss/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Notifications } from "@mantine/notifications";
import ProviderAuth from "./Provider";
import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
// import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Datxe",
  description: "Trang thương mại điện tử",
};
interface IProps {
  children: ReactNode;
  singlePage: boolean;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <MantineProvider>
          <ProviderAuth>
            {/* <StoreProvider> */}
            <Notifications position="top-right" />
            {children}
            {/* </StoreProvider> */}
          </ProviderAuth>
        </MantineProvider>
      </body>
    </html>
  );
}
