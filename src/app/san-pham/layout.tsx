import { ReactNode, Suspense } from 'react';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
import { LoadingComponent } from '../components/loading';
import { SideBar } from '../components/shop-sidebar/sideBar';

interface IProps {
    children: ReactNode;
}
export default function Layout({ children }: IProps) {
    return <main className="main">{children}</main>;
}
