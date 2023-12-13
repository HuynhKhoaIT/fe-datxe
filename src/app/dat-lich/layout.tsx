import { ReactNode, Suspense } from "react";
import RootLayout from "../layout";
interface IProps {
  children: ReactNode;
}
export default function Layout({ children }: IProps) {
  return <RootLayout children={children} singlePage={true} />;
}
