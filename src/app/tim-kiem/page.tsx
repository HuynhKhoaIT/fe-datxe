'use client';
import { ProductItem } from '../components/product/productItem';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Search() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const searchParams = useSearchParams();
    console.log(`https://v2.dlbd.vn/api/v2/guest/products?${searchParams}`);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listProduct = await axios.get(`https://v2.dlbd.vn/api/v2/guest/products?${searchParams}`);
                const listCategories = await axios.get('https://v2.dlbd.vn/api/v2/guest/product-category');
                setProducts(listProduct.data.data);
                setCategories(listCategories.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [searchParams]);
    return (
        <main className="main">
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
                                        {categories.map((item) => (
                                            <li key={item.id}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="cat1" />
                                                    <label className="form-check-label" htmlFor="cat1">
                                                        {item.name}
                                                    </label>
                                                </div>
                                            </li>
                                        ))}
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
                                    {products.map((item) => (
                                        <div key={item.id} className="col-md-6 col-lg-4">
                                            <ProductItem
                                                name={item.name}
                                                price={item.price}
                                                thumbnail={item.thumbnail}
                                            />
                                        </div>
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
