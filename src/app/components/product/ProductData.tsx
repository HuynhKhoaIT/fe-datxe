'use client';
import { IProduct } from '@/interfaces/product';
import { ProductItem } from './productItem';
import { getProductsSearch } from '@/utils/product';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductItemMini } from './productItemMini';
import ReactPaginate from 'react-paginate';

export default function ProductData({ product_data }: { product_data: IProduct[] }) {
    console.log('----')
    console.log(product_data)
    return (
        <div className="shop-item-wrapper">
            <div className="row align-items-center">
                {product_data?.map((product: IProduct, index) => <ProductItemMini product={product} key={index} />)}
            </div>
            {/* <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    activeClassName={'active'}
                    containerClassName={'pagination'}
    
                    initialPage={props.currentPage - 1}
                    pageCount={props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    // onPageChange={pagginationHandler}
                /> */}
        </div>
    );
}
