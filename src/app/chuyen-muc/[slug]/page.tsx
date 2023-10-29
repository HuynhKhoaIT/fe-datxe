import React from 'react';
import { getProductsSearch } from '@/utils/product';
import { Pagination } from '@/app/components/pagination-area/pagination-area';
const CategoryItem = async ({ params }: { params: { slug: number } }) => {
    const productData = await getProductsSearch(`cat_id=${params.slug}`);

    return <Pagination data={productData} />;
};
export default CategoryItem;
