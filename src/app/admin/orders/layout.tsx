import { ReactNode, Suspense } from "react";
import styles from "./index.module.scss";
interface IProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  return (
    <main className="main">
      <div className={styles.content}>{children}</div>
    </main>
  );
}
