'use client';
import { useState } from 'react';
import { Pagination as AntPagination } from 'antd';
import { ICategory } from '@/interfaces/category';
import { CategoryItem } from '../category/categoryItem';
import { IProduct } from '@/interfaces/product';
import ProductData from '../product/ProductData';
import { Sort } from '../shop-sort/sort';

const Pagination = ({ data }: { data: IProduct[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const handleChange = (page: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(page);
    };

    return (
        <div>
            <Sort lengthData={data?.length ?? 0} />
            <div className="shop-item-wrapper">
                <div className="row">
                    <ProductData product_data={currentItems} />
                </div>
            </div>
            {data && data.length > itemsPerPage && (
                <div className="pagination-area mt-4 text-center">
                    <AntPagination
                        current={currentPage}
                        total={data?.length}
                        pageSize={itemsPerPage}
                        onChange={handleChange}
                    />
                </div>
            )}
        </div>
    );
};

export { Pagination };
