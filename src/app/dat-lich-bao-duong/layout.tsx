import { ReactNode, Suspense } from "react";
import Header from "../components/header/header";

interface IProps {
  children: ReactNode;
}
export default function Layout({ children, singlePage = true }: any) {
  return <main className="main">{children}</main>;
}
