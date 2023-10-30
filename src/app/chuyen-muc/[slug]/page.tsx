import React, { Suspense } from 'react';
import { getProductsSearch } from '@/utils/product';
import { Pagination } from '@/app/components/pagination-area/pagination-area';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { getCategories } from '@/utils/category';
import { LoadingComponent } from '@/app/components/loading';
import LayoutListProduct from '@/app/components/layout/LayoutListProduct';
const CategoryItem = async ({ params }: { params: { slug: number } }) => {
    const productData = await getProductsSearch(`cat_id=${params.slug}`);
    const categories = await getCategories();
    let nameCate;
    categories.forEach((cat) => {
        if (cat.id == params.slug) {
            nameCate = cat?.name;
            return;
        }
    });

    return (
        <LayoutListProduct>
            <div>
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
                                    Chuyên mục
                                </Link>
                            ),
                        },
                        {
                            title: nameCate,
                        },
                    ]}
                />
                <Pagination data={productData} />
                {/* <Suspense fallback={<LoadingComponent />}>
                    <Pagination data={productData} />
                </Suspense> */}
            </div>
        </LayoutListProduct>
    );
};
export default CategoryItem;
