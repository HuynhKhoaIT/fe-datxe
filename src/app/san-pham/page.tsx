import React, { Suspense } from 'react';
import { SideBar } from '../components/shop-sidebar/sideBar';
import ProductsListPage from './ProductsListPage';
import { LoadingComponent } from '../components/loading';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

export default async function Shop() {
    return (
        <main className="main">
            <div className="shop-area bg ">
                <div className="container">
                    <Breadcrumb
                        separator=">"
                        style={{ padding: '16px 20px', position: 'absolute' }}
                        items={[
                            {
                                title: (
                                    <Link href="/" style={{ color: '#1890ff' }}>
                                        Trang chủ
                                    </Link>
                                ),
                            },
                            {
                                title: 'Sản phẩm',
                            },
                        ]}
                    />
                    <div className="row  pt-60 pb-60">
                        <div className="col-lg-3">
                            <SideBar />
                        </div>
                        <div className="col-lg-9">
                            <Suspense fallback={<LoadingComponent />}>
                                <ProductsListPage />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
