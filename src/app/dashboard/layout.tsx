import { ReactNode, Suspense } from 'react';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
import { LoadingComponent } from '../components/loading';

interface IProps {
    children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
    return (
        <main className="main">
            <div className="user-profile pt-40 pb-40">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <ProfileSidebar />
                        </div>
                        <div className="col-lg-9">{children}</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
