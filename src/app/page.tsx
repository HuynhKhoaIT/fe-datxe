'use client';
import './assets/css/nice-select.min.css';
import { SlideBanners } from './components/home/slideBanners';
import { ProductItem } from './components/product/productItem';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { GarageItem } from './components/garageItem/garageItem';
import { getProductsHot } from '@/utils/product';
import { IProduct } from '@/interfaces/product';
export default async function Home() {
    const [litmit, setLimit] = useState<number>(8);
    const product_data = await getProductsHot({ limit: litmit });
    // Lấy ra 8 Sản Phẩm / Dịch Vụ Hot
    const handleButtonClick = () => {
        // Khi người dùng nhấp chuột, tăng số lượng sản phẩm cần lấy thêm 4 sản phẩm
        setLimit(litmit + 4);
    };
    console.log(product_data);
    return (
        <main className="main">
            <div className="hero-section">
                <SlideBanners />
            </div>
            {/* <!-- hero slider end --> */}

            {/* <!-- find car form --> */}
            <div className="find-car">
                <div className="container">
                    <div className="find-car-form">
                        <h4 className="find-car-title">Tìm kiếm sản phẩm/ dịch vụ</h4>
                        <form action="#">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Car Condition</label>
                                        <select className="select">
                                            <option value="1">All Status</option>
                                            <option value="2">New Car</option>
                                            <option value="3">Used Car</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Brand Name</label>
                                        <select className="select">
                                            <option value="1">All Brand</option>
                                            <option value="2">BMW</option>
                                            <option value="3">Ferrari</option>
                                            <option value="4">Marcediz Benz</option>
                                            <option value="5">Hyundai</option>
                                            <option value="6">Nissan</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Car Model</label>
                                        <select className="select">
                                            <option value="1">All Model</option>
                                            <option value="2">3-Series </option>
                                            <option value="3">Carrera</option>
                                            <option value="4">G-TR</option>
                                            <option value="3">Macan</option>
                                            <option value="3">N-Series</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Choose Year</label>
                                        <select className="select">
                                            <option value="1">All Year</option>
                                            <option value="2">2023</option>
                                            <option value="3">2022</option>
                                            <option value="4">2021</option>
                                            <option value="5">2020</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Choose Milieage</label>
                                        <select className="select">
                                            <option value="1">All Milieage</option>
                                            <option value="2">2000 Miles</option>
                                            <option value="3">3000 Miles</option>
                                            <option value="4">4000 Miles</option>
                                            <option value="5">5000 Miles</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Price Range</label>
                                        <select className="select">
                                            <option value="1">All Price</option>
                                            <option value="2">$1,000 - $5,000</option>
                                            <option value="3">$5,000 - $10,000</option>
                                            <option value="4">$15,000 - $20,000</option>
                                            <option value="5">$20,000 - $25,000</option>
                                            <option value="6">$25,000 - $30,000</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="form-group">
                                        <label>Body Type</label>
                                        <select className="select">
                                            <option value="1">All Body Type</option>
                                            <option value="2">Sedan</option>
                                            <option value="5">Compact</option>
                                            <option value="3">Coupe</option>
                                            <option value="4">Wagon</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-3 align-self-end">
                                    <button className="theme-btn" type="submit">
                                        <span className="far fa-search"></span> Find Your Car
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="car-category py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Danh mục
                                </span>
                                <h2 className="site-title">
                                    Dịch vụ <span>Nổi bật</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* {categories.map((item) => (
                            <div key={item.id} className="col-6 col-md-4 col-lg-2">
                                <Link
                                    href={`/chuyen-muc/${item.id}`}
                                    className="category-item wow fadeInUp"
                                    data-wow-delay=".25s"
                                >
                                    <div className="category-img">
                                        <img src={item.thumbnail} alt="" />
                                    </div>
                                    <h5>{item.name}</h5>
                                </Link>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>

            <div className="car-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Nổi bật
                                </span>
                                <h2 className="site-title">
                                    Sản phẩm / Dịch vụ <span>Hot</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {product_data?.map((product: IProduct, index: number) => (
                            <ProductItem product={product} key={index} />
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={handleButtonClick} className="theme-btn">
                            Load More <i className="far fa-arrow-rotate-right"></i>{' '}
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- car dealer --> */}
            <div className="car-dealer pb-40 pt-40">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Chuyên gia
                                </span>
                                <h2 className="site-title">
                                    Tốt nhất <span>gần bạn</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* {chuyengia.map((item) => (
                            <GarageItem
                                key={item.id}
                                garageId={item.id}
                                name={item.name}
                                thumbnail={item.logo}
                                address={item.address}
                                phone_number={item.phone_number}
                            />
                        ))} */}
                    </div>
                </div>
            </div>
            {/* <!-- car dealer end--> */}

            {/* <!-- blog area --> */}
            <div className="blog-area pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="flaticon-drive"></i> Our Blog
                                </span>
                                <h2 className="site-title">
                                    Latest News & <span>Blog</span>
                                </h2>
                                <div className="heading-divider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="blog-item wow fadeInUp" data-wow-delay=".25s">
                                <div className="blog-item-img">
                                    <img src="assets/img/blog/01.jpg" alt="Thumb" />
                                </div>
                                <div className="blog-item-info">
                                    <div className="blog-item-meta">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-user-circle"></i> By Alicia Davis
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-calendar-alt"></i> January 29, 2023
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 className="blog-title">
                                        <a href="#">There are many variations of passage available.</a>
                                    </h4>
                                    <a className="theme-btn" href="#">
                                        Read More<i className="fas fa-arrow-right-long"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="blog-item wow fadeInUp" data-wow-delay=".50s">
                                <div className="blog-item-img">
                                    <img src="assets/img/blog/02.jpg" alt="Thumb" />
                                </div>
                                <div className="blog-item-info">
                                    <div className="blog-item-meta">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-user-circle"></i> By Alicia Davis
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-calendar-alt"></i> January 29, 2023
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 className="blog-title">
                                        <a href="#">There are many variations of passage available.</a>
                                    </h4>
                                    <a className="theme-btn" href="#">
                                        Read More<i className="fas fa-arrow-right-long"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="blog-item wow fadeInUp" data-wow-delay=".75s">
                                <div className="blog-item-img">
                                    <img src="assets/img/blog/03.jpg" alt="Thumb" />
                                </div>
                                <div className="blog-item-info">
                                    <div className="blog-item-meta">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-user-circle"></i> By Alicia Davis
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="far fa-calendar-alt"></i> January 29, 2023
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 className="blog-title">
                                        <a href="#">There are many variations of passage available.</a>
                                    </h4>
                                    <a className="theme-btn" href="#">
                                        Read More<i className="fas fa-arrow-right-long"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- blog area end --> */}

            {/* <!-- download area --> */}
            <div className="download-area mb-120">
                <div className="container">
                    <div className="download-wrapper">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="download-content">
                                    <div className="site-heading mb-4">
                                        <span className="site-title-tagline justify-content-start">
                                            <i className="flaticon-drive"></i> Get Our App
                                        </span>
                                        <h2 className="site-title mb-10">
                                            Download <span>Our Motex</span> App For Free
                                        </h2>
                                        <p>
                                            There are many variations of passages available but the majority have
                                            suffered in some form going to use a passage by injected humour.
                                        </p>
                                    </div>
                                    <div className="download-btn">
                                        <a href="#">
                                            <i className="fab fa-google-play"></i>
                                            <div className="download-btn-content">
                                                <span>Get It On</span>
                                                <strong>Google Play</strong>
                                            </div>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-app-store"></i>
                                            <div className="download-btn-content">
                                                <span>Get It On</span>
                                                <strong>App Store</strong>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="download-img">
                            <img src="assets/img/download/01.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- download area end --> */}
        </main>
    );
}
