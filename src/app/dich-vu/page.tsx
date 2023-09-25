import { ProductItem } from '../components/product/productItem';
import React, { useEffect, useState } from 'react';
import { IProduct } from '@/interfaces/product';
import { getServices } from '@/utils/product';
import { SideBar } from '../components/shop-sidebar/sideBar';
import { Pagination } from '../components/pagination-area/pagination-area';
import { Sort } from '../components/shop-sort/sort';
export default async function Shop() {
    const product_data = await getServices();
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
                            <div className="shop-item-wrapper">
                                <div className="row align-items-center">
                                    {product_data?.map((product: IProduct, index) => (
                                        <ProductItem product={product} key={index} />
                                    ))}
                                </div>
                            </div>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
