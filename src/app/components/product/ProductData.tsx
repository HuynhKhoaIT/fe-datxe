'use client';
import { IProduct } from '@/interfaces/product';
import { ProductItem } from './productItem';
import { getProductsSearch } from '@/utils/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductItemMini } from './productItemMini';

export default function ProductData({ product_data }: { product_data: IProduct[] }) {
    return (
        <div className="shop-item-wrapper">
            <div className="row align-items-center">
                {product_data?.map((product: IProduct, index) => <ProductItemMini product={product} key={index} />)}
            </div>
        </div>
    );
}
