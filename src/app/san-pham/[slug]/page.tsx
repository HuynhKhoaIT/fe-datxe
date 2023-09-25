import React from 'react';
import ProductDetail from '../../components/product/productDetail';
import { IProduct } from '@/interfaces/product';
import Product from '@/app/components/product/product';
import { getProductDetail, getProductsRelated } from '@/utils/product';
import { ICategory } from '@/interfaces/category';
import { getCategories } from '@/utils/category';

export default async function SingleShop({ params }: { params: { slug: number } }) {
    const data: IProduct = await getProductDetail(params.slug);
    const related: IProduct[] = await getProductsRelated(data.categoryId, data.garageId, 8);

    return (
        <main className="main">
            <div className="shop-item-single bg py-120">
                <div className="container">
                    <ProductDetail ProductDetail={data} />
                    <div className="related-item">
                        <div className="row">
                            <div className="col-12 mx-auto">
                                <div className="site-heading">
                                    <h2 className="site-title">Related Items</h2>
                                </div>
                            </div>
                        </div>
                        <div className="shop-item-wrapper">
                            <div className="row">
                                <Product initialProductData={related} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
