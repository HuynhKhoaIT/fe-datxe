'use client';
import { useState } from 'react';
import { Pagination as AntPagination } from 'antd';
import { ICategory } from '@/interfaces/category';
import { CategoryItem } from '../category/categoryItem';

const Pagination = ({ data }: { data: ICategory[] }) => {
    console.log('123');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
    const handleChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="shop-item-wrapper">
                <div className="row">
                    {currentItems?.map((category: ICategory, index: number) => (
                        <CategoryItem key={index} category={category} />
                    ))}
                </div>
            </div>
            {data &&
                data.length > itemsPerPage && ( // Check if data length is greater than itemsPerPage
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
