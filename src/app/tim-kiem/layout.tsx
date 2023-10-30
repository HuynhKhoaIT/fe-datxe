import { ReactNode, Suspense } from 'react';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
import { LoadingComponent } from '../components/loading';
import { SideBar } from '../components/shop-sidebar/sideBar';

interface IProps {
    children: ReactNode;
}
export default function SearchLayout({ children }: IProps) {
    return (
        <main className="main">
            <div className="shop-area bg pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <SideBar />
                        </div>
                        <div className="col-lg-9">{children}</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
