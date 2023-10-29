import { ReactNode, Suspense } from 'react';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
import { LoadingComponent } from '../components/loading';
import { Col, Row } from 'antd';

interface IProps {
    children: ReactNode;
}
export default function DashboardLayout({ children }: IProps) {
    return (
        <main className="main">
            <div className="user-profile pt-40 pb-40">
                <div className="container">
                    <Row gutter={24}>
                        <Col span={6}>
                            <ProfileSidebar />
                        </Col>
                        <Col span={18}>{children}</Col>
                    </Row>
                </div>
            </div>
        </main>
    );
}
