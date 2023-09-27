'use client';
import { IProduct } from '@/interfaces/product';
import { getProductsHot } from '@/utils/product';
import { useState } from 'react';
import { ProductItem } from './productItem';

export default function Product({ initialProductData }: { initialProductData: IProduct[] }) {
    const [productData, setProductData] = useState<IProduct[]>(initialProductData);
    const [limit, setLimit] = useState<number>(8);

    const handleButtonClick = async () => {
        // Tăng limit
        const newLimit = limit + 4;
        setLimit(newLimit);

        // Fetch thêm dữ liệu
        const newProductData = await getProductsHot({ limit: newLimit });

        // Cập nhật dữ liệu sản phẩm
        setProductData(newProductData);
    };

    return (
        <>
            <div className="row">
                {productData?.map((product: IProduct, index: number) => <ProductItem product={product} key={index} />)}
            </div>
            <div className="text-center mt-4">
                <button onClick={handleButtonClick} className="theme-btn">
                    Xem Thêm <i className="far fa-arrow-rotate-right"></i>
                </button>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const initialProductData = await getProductsHot({ limit: 8 });
    return {
        props: {
            initialProductData,
        },
    };
}
