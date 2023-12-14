import { ReactNode, Suspense } from 'react';
interface IProps {
    children: ReactNode;
}
export default function Layout({ children }: IProps) {
    return <main className="main">{children}</main>;
}
