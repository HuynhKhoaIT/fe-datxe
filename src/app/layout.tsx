import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header/header";
import { MyFooter } from "./components/footer/footer";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles.scss";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import Provider from "./Provider";
import { ReactNode, Suspense } from "react";
import { LoadingPage } from "./components/loading";
import { MantineProvider } from "@mantine/core";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Datxe",
  description: "Trang thương mại điện tử",
};
interface IProps {
  children: ReactNode;
  singlePage: boolean;
}
export default function RootLayout({ children, singlePage = false }: IProps) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <MantineProvider>
          <Provider>
            <Notifications position="top-right" />
            {/* {!singlePage && <Header />} */}
            <Suspense fallback={<LoadingPage />}>{children}</Suspense>
            {/* {!singlePage && <MyFooter />} */}
          </Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
