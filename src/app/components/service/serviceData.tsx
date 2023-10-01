'use client';
import { IProduct } from '@/interfaces/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductItem } from '../product/productItem';
import { getServiceSearch } from '@/utils/service';

export default function ServiceData({ product_data }: { product_data: IProduct[] }) {
    const searchParams = useSearchParams();
    const catID = searchParams.get('cat_id');
    const [productData, setProductData] = useState<IProduct[]>(product_data);
    useEffect(() => {
        async function fetchProducts() {
            if (catID) {
                try {
                    const newProductData = await getServiceSearch(`cat_id=${catID}`);
                    setProductData(newProductData);
                } catch (error) {
                    console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
                }
            } else {
                setProductData(product_data);
            }
        }
        fetchProducts();
    }, [catID]);

    return (
        <div className="shop-item-wrapper">
            <div className="row align-items-center">
                {productData?.map((product: IProduct, index) => <ProductItem product={product} key={index} />)}
            </div>
        </div>
    );
}
