import React from 'react';
import ProductDetail from '../../components/product/productDetail';
import { IProduct } from '@/interfaces/product';
import Product from '@/app/components/product/product';
import { getProductDetail, getProductsRelated } from '@/utils/product';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

export default async function SingleShop({ params }: { params: { slug: number } }) {
    const data: IProduct = await getProductDetail(params.slug);
    const related: IProduct[] = await getProductsRelated(data.categoryId?.toString(), data.garageId?.toString(), 8);

    return (
        <main className="main">
            <div className="shop-item-single  ">
                <div className="container position-relative pd-50">
                    <Breadcrumb
                        separator=">"
                        style={{ padding: '16px 0', position: 'absolute', top: '0', left: 12 }}
                        items={[
                            {
                                title: (
                                    <Link href="/" style={{ color: '#1890ff' }}>
                                        Trang chủ
                                    </Link>
                                ),
                            },
                            {
                                title: (
                                    <Link href="./" style={{ color: '#1890ff' }}>
                                        Sản phẩm
                                    </Link>
                                ),
                            },
                            {
                                title: data?.name,
                            },
                        ]}
                    />
                    <ProductDetail ProductDetail={data} />
                    <div className="related-item">
                        <div className="row">
                            <div className="col-12 mx-auto">
                                <div className="site-heading">
                                    <h2 className="site-title">Sản phẩm liên quan</h2>
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
