import { ReactNode, Suspense } from 'react';
import Menu from '../components/profile-sidebar/Menu';
interface IProps {
    children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
    return (
        <main className="main">
            <div className="user-profile pt-40 pb-40">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Menu />
                        </div>
                        <div className="col-md-9">{children}</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
