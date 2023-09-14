'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Shop() {
    const [garages, setGarages] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const garages = await axios.get('https://v2.dlbd.vn/api/v2/guest/garages');
                const listCategories = await axios.get('https://v2.dlbd.vn/api/v2/guest/product-category');
                setGarages(garages.data);
                setCategories(listCategories.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <main className="main">
            {/* <!-- shop-area --> */}
            <div className="shop-area car-area list bg pt-50 pb-50">
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
                            <div className="shop-item-wrapper">
                                <div className="row align-items-center">
                                    {garages.map((item) => (
                                        <div className="car-item">
                                            <div className="car-img">
                                                {/* <span className="car-status status-1">Used</span> */}
                                                <img src={item.logo} alt="" />
                                                <div className="car-btns">
                                                    <a href="#">
                                                        <i className="far fa-heart"></i>
                                                    </a>
                                                    <a href="#">
                                                        <i className="far fa-arrows-repeat"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="car-content">
                                                <div className="car-top">
                                                    <h4>
                                                        <a href="#">{item.name}</a>
                                                    </h4>
                                                    <div className="car-rate">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <span>5.0 (58.5k Review)</span>
                                                    </div>
                                                </div>
                                                <p>
                                                    There are many variations of passages available but the majority
                                                    have suffered in some injected humour words slightly believable.
                                                </p>
                                                <div className="car-footer">
                                                    <span className="car-price">$45,620</span>
                                                    <a href="#" className="theme-btn">
                                                        <span className="far fa-eye"></span>Chi tiết
                                                    </a>
                                                </div>
                                            </div>
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
