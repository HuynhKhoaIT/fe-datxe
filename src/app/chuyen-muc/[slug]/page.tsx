import { ProductItem } from '../../components/product/productItem';

import { SideBar } from '../../components/shop-sidebar/sideBar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '@/interfaces/product';
import { getCategories } from '@/utils/category';
import { getProductsByCat } from '@/utils/product';
import { Pagination } from '@/app/components/pagination-area/pagination-area';
import { Sort } from '@/app/components/shop-sort/sort';
export default async function CategoryItem({ params }: { params: { slug: number } }) {
    const category_list = await getCategories();
    const product_data = await getProductsByCat(params.slug);
    console.log(product_data);
    return (
        <main className="main">
            {/* <!-- shop-area --> */}
            <div className="shop-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <SideBar />
                        </div>
                        <div className="col-lg-9">
                            <div className="col-md-12">
                                <Sort />
                            </div>
                            <div className="shop-item-wrapper">
                                <div className="row align-items-center">
                                    {product_data.map((product: IProduct, index) => (
                                        <ProductItem product={product} key={index} />
                                    ))}
                                </div>
                            </div>
                            <div className="pagination-area mt-4">
                                <Pagination />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
