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

    const [productData, setProductData] = useState<IProduct[]>([]);
    useEffect(() => {
        async function fetchProducts() {
            if (search !== null && catID === null && garageId === null) {
                try {
                    const newProductData = await getProductsSearch(`s=${search}`);
                    setProductData(newProductData);
                } catch (error) {
                    console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
                }
            } else {
                const newProductData = await getProductsSearch(`s=${search}&cat_id=${catID}&garage_id=${garageId}`);
                setProductData(newProductData);
            }
        }
        fetchProducts();
    }, [search, catID, garageId]);
    return <Pagination data={productData} />;
};

export default SearchData;
