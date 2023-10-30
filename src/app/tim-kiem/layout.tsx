import { ReactNode, Suspense } from 'react';
import { ProfileSidebar } from '../components/profile-sidebar/sidebar';
import { LoadingComponent } from '../components/loading';
import { SideBar } from '../components/shop-sidebar/sideBar';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

interface IProps {
    children: ReactNode;
}
export default function SearchLayout({ children }: IProps) {
    return (
        <main className="main">
            <div className="shop-area bg">
                <div className="container">
                    <Breadcrumb
                        separator=">"
                        style={{ padding: '16px 0', position: 'absolute' }}
                        items={[
                            {
                                title: (
                                    <Link href="/" style={{ color: '#1890ff' }}>
                                        Trang chủ
                                    </Link>
                                ),
                            },
                            {
                                title: 'Tìm kiếm',
                            },
                        ]}
                    />
                    <div className="row  pt-60 pb-60">
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
