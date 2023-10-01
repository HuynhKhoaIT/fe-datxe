import React from 'react';
import { getProducts } from '@/utils/product';
import { SideBar } from '../components/shop-sidebar/sideBar';
import { Pagination } from '../components/pagination-area/pagination-area';
import { Sort } from '../components/shop-sort/sort';
import ProductData from '../components/product/ProductData';
export default async function Shop() {
    const product_data = await getProducts();

    return (
        <main className="main">
            <div className="shop-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <SideBar />
                        </div>
                        <div className="col-lg-9">
                            <Sort />
                            <ProductData product_data={product_data} />
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
