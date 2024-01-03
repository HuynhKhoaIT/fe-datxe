import { ReactNode, Suspense } from "react";
import styles from "./index.module.scss";
interface IProps {
  children: ReactNode;
}

export default function CarLayout({ children }: IProps) {
  return <div className={styles.content}>{children}</div>;
}
