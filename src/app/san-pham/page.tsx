import React from 'react';
import { getProducts } from '@/utils/product';
import { Pagination } from '../components/pagination-area/pagination-area';
import { SideBar } from '../components/shop-sidebar/sideBar';

export default async function Shop() {
    const product_data = await getProducts();
    return (
        <main className="main">
            <div className="shop-area bg pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <SideBar />
                        </div>
                        <div className="col-lg-9">
                            <Pagination data={product_data} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
