'use client';
import React, { useState, useEffect } from 'react';
import { SideBar } from '../../components/shop-sidebar/sideBar';
import { Pagination as AntPagination } from 'antd';
import ProductData from '../../components/product/ProductData';
import { getProductsSearch } from '@/utils/product';
import { IProduct } from '@/interfaces/product';

const CategoryItem = ({ params }: { params: { slug: number } }) => {
    const [productData, setProductData] = useState<IProduct[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    useEffect(() => {
        async function fetchData() {
            const data = await getProductsSearch(`cat_id=${params.slug}`);
            setProductData(data);
        }
        fetchData();
    }, [params.slug]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(page);
    };

    return (
        <div>
            <ProductData product_data={currentItems} />
            <div className="pagination-area mt-4">
                {productData && productData.length > itemsPerPage && (
                    <div className="pagination-area mt-4 text-center">
                        <AntPagination
                            current={currentPage}
                            total={productData?.length}
                            pageSize={itemsPerPage}
                            onChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryItem;
