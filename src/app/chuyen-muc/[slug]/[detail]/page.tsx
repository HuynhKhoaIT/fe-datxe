'use client';
import React, { Suspense, useEffect, useState } from 'react';
import ProductDetail from '../../../components/product/productDetail';
import { IProduct } from '@/interfaces/product';
import Product from '@/app/components/product/product';
import { getProductDetail, getProductsRelated } from '@/utils/product';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { getCategories } from '@/utils/category';
import { ICategory } from '@/interfaces/category';
import { LoadingComponent } from '@/app/components/loading';

export default async function SingleShop({
    params,
}: {
    params: {
        slug: number;
        detail: number;
    };
}) {
    const pathParm = useParams();
    const Parm = usePathname();
    const [productData, setProductData] = useState<IProduct>({});
    const [categories, setCategpries] = useState<ICategory[]>([]);

    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: IProduct = await getProductDetail(params.detail);
                setProductData(data);

                if (data.categoryId && data.garageId) {
                    const related: IProduct[] = await getProductsRelated(
                        data.categoryId.toString(),
                        data.garageId.toString(),
                        8,
                    );
                    setRelatedProducts(related);
                }
                const categories = await getCategories();
                setCategpries(categories);
            } catch (error) {}
        };

        fetchData();
    }, [params.detail]);
    let nameCate;
    categories.forEach((cat) => {
        if (cat.id == params.slug) {
            nameCate = cat?.name;
            return;
        }
    });
    return (
        <main className="main">
            <div className="shop-item-single bg pd-50 position-relative">
                <div className="container ">
                    {nameCate && (
                        <Breadcrumb
                            separator=">"
                            style={{ padding: '16px 0', position: 'absolute', top: 0 }}
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
                                        <Link href="/chuyen-muc" style={{ color: '#1890ff' }}>
                                            Chuyên mục
                                        </Link>
                                    ),
                                },
                                {
                                    title: (
                                        <Link href="./" style={{ color: '#1890ff' }}>
                                            {nameCate}
                                        </Link>
                                    ),
                                },
                                {
                                    title: productData.name,
                                },
                            ]}
                        />
                    )}
                    <ProductDetail ProductDetail={productData} />
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
                                <Product initialProductData={relatedProducts} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
