'use client';
import {
    faCartShopping,
    faHeart,
    faMinus,
    faPlus,
    faRightLeft,
    faStar,
    faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SlideBanners } from '@/app/components/home/slideBanners';

export default function SingleShop({ params }: { params: { slug: string } }) {
    const [productData, setProductData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<number>(1);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);

        if (!isNaN(newValue)) {
            setInputValue(newValue);
        }
    };
    // tăng số lượng
    const incrementValue = () => {
        setInputValue(inputValue + 1);
    };
    // giảm số lượng
    const decrementValue = () => {
        if (inputValue === 1) {
            return;
        }
        setInputValue(inputValue - 1);
    };

    const addToCart = () => {
        const existingCartData = localStorage.getItem('cartData');
        let cartData = [];
        if (existingCartData) {
            cartData = JSON.parse(existingCartData);
        }

        const existingProductIndex = cartData.findIndex(
            (item: { product: { id: number } }) => item.product.id === productData.id,
        );

        if (existingProductIndex != -1) {
            cartData[existingProductIndex].quantity += inputValue;
        } else {
            cartData.push({
                product: productData,
                quantity: inputValue,
            });
        }

        localStorage.setItem('cartData', JSON.stringify(cartData));
        alert('sản phẩm đã được thêm vào giỏ hàng');
    };
    // fetch api
    useEffect(() => {
        if (!params.slug) {
            setError('Slug không hợp lệ');
            return;
        }
        // Gọi API trong hàm useEffect khi component được tải
        const fetchData = async () => {
            try {
                const response = await fetch(`https://v2.dlbd.vn/api/v2/guest/products/${params.slug}`);
                if (response.status === 200) {
                    const result = await response.json();
                    setProductData(result.data);
                const response = await fetch(`https://v2.dlbd.vn/api/v2/guest/products?garage_id=${params.slug}`);
                const listCategories = await axios.get(
                    `https://v2.dlbd.vn/api/v2/guest/product-category?garage_id=${params.slug}`,
                );

                if (response.status === 200) {
                    const result = await response.json();
                    setProducts(result.data);
                    setCategories(listCategories.data.data);
                } else {
                    throw new Error('Lỗi khi lấy dữ liệu từ API');
                }
            } catch (error) {
                console.error(error);
                setError('Đã xảy ra lỗi khi tải dữ liệu');
            }
        };

        fetchData();
    }, [params.slug]); // useEffect sẽ được gọi lại khi id thay đổi
    
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
                                        <ProductItem
                                            key={item.id}
                                            productId={item.id}
                                            name={item.name}
                                            price={item.price}
                                            thumbnail={item.thumbnail}
                                        />
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
