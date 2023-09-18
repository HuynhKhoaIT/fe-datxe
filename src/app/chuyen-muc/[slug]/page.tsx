import { ProductItem } from '../../components/product/productItem';

import { SideBar } from '../../components/shop-sidebar/sideBar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '@/interfaces/product';
import { getCategories } from '@/utils/category';
import { getProductsByCat } from '@/utils/product';
export default async function CategoryItem({ params }: { params: { slug: number } }) {
    const category_list = await getCategories();
    const product_data = await getProductsByCat(params.slug);
    console.log(product_data);
    return (
        <main className="main">
            {/* <!-- shop-area --> */}
            <div className="shop-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <SideBar />
                        </div>
                        <div className="col-lg-9">
                            <div className="col-md-12">
                                <div className="shop-sort">
                                    <h5>Showing 1-10 of 50 Results</h5>
                                    <div className="shop-sort-box">
                                        <select className="select">
                                            <option value="1">Sort By Default</option>
                                            <option value="5">Sort By Featured</option>
                                            <option value="2">Sort By Latest</option>
                                            <option value="3">Sort By Low Price</option>
                                            <option value="4">Sort By High Price</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="shop-item-wrapper">
                                <div className="row align-items-center">
                                    {product_data.map((product: IProduct, index) => (
                                        <ProductItem product={product} key={index} />
                                    ))}
                                </div>
                            </div>
                            <div className="pagination-area mt-4">
                                <div aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">
                                                    <i className="far fa-arrow-left"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#">
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">
                                                    <i className="far fa-arrow-right"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
