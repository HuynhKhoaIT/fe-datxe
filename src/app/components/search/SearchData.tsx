'use client';
import { IProduct } from '@/interfaces/product';
import { getProductsSearch } from '@/utils/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductItem } from '../product/productItem';

const SearchData = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('s');
    const catID = searchParams.get('cat_id');
    const [productData, setProductData] = useState<IProduct[]>([]);
    useEffect(() => {
        async function fetchProducts() {
            if (search !== null) {
                try {
                    const newProductData = await getProductsSearch(`s=${search}`);
                    setProductData(newProductData);
                } catch (error) {
                    console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
                }
            } else {
                const newProductData = await getProductsSearch(`s=${search}&cat_id=${catID}`);
                setProductData(newProductData);
            }
        }
        fetchProducts();
    }, [search]);

    return (
        <div className="shop-item-wrapper">
            <div className="row align-items-center">
                {productData?.map((product: IProduct, index) => <ProductItem product={product} key={index} />)}
            </div>
        </div>
    );
};

export default SearchData;
