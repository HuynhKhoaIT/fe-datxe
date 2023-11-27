'use client';
import { IProduct } from '@/interfaces/product';
import { getProductsHot } from '@/utils/product';
import { useEffect, useState } from 'react';
import { ProductItem } from './productItem';
export default function Product({ initialProductData }: { initialProductData: IProduct[] }) {
    const [productData, setProductData] = useState<IProduct[]>([]);
    const [limit, setLimit] = useState<number>(8);
    console.log(productData);
    const handleButtonClick = async () => {
        // Tăng limit
        const newLimit = limit + 4;
        setLimit(newLimit);

        // Fetch thêm dữ liệu
        const newProductData = await getProductsHot({ limit: newLimit });

        // Cập nhật dữ liệu sản phẩm
        setProductData(newProductData);
    };
    console.log(initialProductData);
    useEffect(() => {
        setProductData(initialProductData);
    }, [initialProductData]);

    return (
        <>
            <div className="row">
                {productData?.map((product: IProduct, index: number) => <ProductItem product={product} key={index} />)}
            </div>
            <div className="text-center mt-4">
                <button onClick={handleButtonClick} className="theme-btn">
                    Xem Thêm
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
