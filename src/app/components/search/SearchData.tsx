'use client';
import { IProduct } from '@/interfaces/product';
import { getProductsSearch } from '@/utils/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductItem } from '../product/productItem';
import { Pagination } from '../pagination-area/pagination-area';

const SearchData = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('s');
    const catID = searchParams.get('cat_id');
    const garageId = searchParams.get('garage_id');
    const brand_id = searchParams.get('brand_id');
    const car_name_id = searchParams.get('car_name_id');
    const year_id = searchParams.get('year_id');

    const [productData, setProductData] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let queryParams = '';
                if (search !== null) queryParams += `&s=${search}`;
                if (catID !== null) queryParams += `&cat_id=${catID}`;
                if (garageId !== null) queryParams += `&garage_id=${garageId}`;
                if (brand_id !== null) queryParams += `&brand_id=${brand_id}`;
                if (car_name_id !== null) queryParams += `&car_name_id=${car_name_id}`;
                if (year_id !== null) queryParams += `&year_id=${year_id}`;

                const newProductData = await getProductsSearch(queryParams);
                setProductData(newProductData);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
            }
        };

        fetchProducts();
    }, [search, catID, garageId, brand_id, car_name_id, year_id]);
    return <Pagination data={productData} />;
};

export default SearchData;
