'use client';
import { ProductItem } from '../components/product/productItem';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '@/interfaces/product';
import { getProducts } from '@/utils/product';
export default function Shop() {
    return (
        <main className="main">
            {/* <!-- shop-area --> */}
            <div className="shop-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="shop-sidebar">
                                <div className="shop-widget">
                                    <div className="shop-search-form">
                                        <h4 className="shop-widget-title">Search</h4>
                                        <form action="#">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Search" />
                                                <button type="button">
                                                    <i className="far fa-search"></i>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="shop-widget">
                                    <h4 className="shop-widget-title">Category</h4>
                                    <ul>
                                        {/* {products.map((product:IProduct) => (
                                            <li key={product.id}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="cat1" />
                                                    <label className="form-check-label" htmlFor="cat1">
                                                        {product.name}
                                                    </label>
                                                </div>
                                            </li>
                                        ))} */}
                                    </ul>
                                </div>
                                <div className="shop-widget">
                                    <h4 className="shop-widget-title">Parts Brand</h4>
                                    <ul>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand1" />
                                                <label className="form-check-label" htmlFor="brand1">
                                                    {' '}
                                                    Audi
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand2" />
                                                <label className="form-check-label" htmlFor="brand2">
                                                    {' '}
                                                    BMW
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand3" />
                                                <label className="form-check-label" htmlFor="brand3">
                                                    {' '}
                                                    Ford
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand4" />
                                                <label className="form-check-label" htmlFor="brand4">
                                                    {' '}
                                                    Tesla
                                                </label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="brand5" />
                                                <label className="form-check-label" htmlFor="brand5">
                                                    {' '}
                                                    Honda
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="shop-widget">
                                    <h4 className="shop-widget-title">Price Range</h4>
                                    <div className="price-range-box">
                                        <div className="price-range-input">
                                            <input type="text" id="price-amount" />
                                        </div>
                                        <div className="price-range"></div>
                                    </div>
                                </div>
                                <div className="shop-widget">
                                    <h4 className="shop-widget-title">Popular Tags</h4>
                                    <div className="shop-tags">
                                        <a href="#">Car</a>
                                        <a href="#">Parts</a>
                                        <a href="#">Fuel</a>
                                        <a href="#">Tire</a>
                                        <a href="#">Light</a>
                                    </div>
                                </div>
                                <div className="widget-banner mt-30 mb-50">
                                    <div className="banner-content">
                                        <h3>
                                            Get <span>35% Off</span> On All Our Products
                                        </h3>
                                        <a href="#" className="theme-btn">
                                            Buy Now<i className="fas fa-arrow-right-long"></i>{' '}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="shop-item-wrapper">
                                <div className="row align-items-center">
                                    {/* {products?.map((product: IProduct, index: number) => (
                                        <ProductItem product={product} key={index} />
                                    ))} */}
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
