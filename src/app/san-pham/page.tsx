import React, { Suspense } from 'react';
import { SideBar } from '../components/shop-sidebar/sideBar';
import ProductsListPage from './ProductsListPage';
import { LoadingComponent } from '../components/loading';

export default async function Shop() {
    return (
        <main className="main">
            <div className="shop-area bg pt-60 pb-60">
                <div className="container">
                    <div className="row">
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
