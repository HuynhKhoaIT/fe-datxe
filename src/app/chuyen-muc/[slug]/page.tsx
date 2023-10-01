import React from 'react';
import { SideBar } from '../../components/shop-sidebar/sideBar';
import { Pagination } from '@/app/components/pagination-area/pagination-area';
import { Sort } from '@/app/components/shop-sort/sort';
import ProductData from '@/app/components/product/ProductData';
import { getProductsSearch } from '@/utils/product';

export default async function CategoryItem({ params }: { params: { slug: number } }) {
    const product_data = await getProductsSearch(`cat_id=${params.slug}`);
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
