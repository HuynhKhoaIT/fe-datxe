import { ReactNode, Suspense } from 'react';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { SideBar } from '../shop-sidebar/sideBar';

interface IProps {
    children: ReactNode;
}
export default function LayoutListProduct({ children }: IProps) {
    return (
        <main className="main">
            <div className="shop-area bg ">
                <div className="container">
                    <div className="row pt-60 pb-60 position-relative">
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