import { ReactNode, Suspense } from 'react';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
import { LoadingComponent } from '../components/loading';
import { SideBar } from '../components/shop-sidebar/sideBar';
import Loading from './loading';

interface IProps {
    children: ReactNode;
}
export default function Layout({ children }: IProps) {
    return (
        <main className="main">
            <Suspense fallback={<p>loading...</p>}>{children}</Suspense>
        </main>
    );
}
