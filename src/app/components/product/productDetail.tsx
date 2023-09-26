'use client';
import { IProduct } from '@/interfaces/product';
import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faStar, faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faMinus, faPlus, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';

function ProductDetail({ ProductDetail }: { ProductDetail: IProduct }) {
    console.log(ProductDetail);
    const [inputValue, setInputValue] = useState(1);
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

    const addProductToLocalStorage = () => {
        if (ProductDetail) {
            const productId = ProductDetail.id;
            const existingCartItems = JSON.parse(localStorage.getItem('cartData') || '[]');
            const index = existingCartItems.findIndex((item: any) => item.productId === productId);

            if (index !== -1) {
                existingCartItems[index].quantity += inputValue;
            } else {
                existingCartItems.push({
                    product: ProductDetail,
                    quantity: inputValue,
                });
            }

            localStorage.setItem('cartData', JSON.stringify(existingCartItems));

            alert('Product added to cart!');
        }
    };
    return (
        <div className="row">
            <div className="col-lg-5">
                <div className="item-gallery mb-5">
                    <div className="flexslider-thumbnails">
                        <ul className="slides">
                            <li data-thumb="/assets/img/shop/01.jpg" rel="adjustX:10, adjustY:">
                                <img src={ProductDetail.thumbnail} alt="image" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="single-item-info">
                    <h4 className="single-item-title">{ProductDetail.name}</h4>

                    {/* <div className="single-item-rating">
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStarHalfStroke} />
                                    <span className="rating-count"> (4 Customer Reviews)</span>
                                </div> */}

                    <div className="single-item-price">
                        <h4>
                            <del>{ProductDetail.price?.toLocaleString()}đ</del>
                            <span>{ProductDetail.price?.toLocaleString()}đ</span>
                        </h4>
                    </div>

                    <p className="mb-4">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                        alteration in some form, by injected humour, or randomised words which don't look even slightly
                        believable.
                    </p>

                    <div className="single-item-content">
                        {/* <h5>
                            Stock: <span>Available</span>
                        </h5> */}
                        <h5>
                            Mã Sản Phẩm: <span>{ProductDetail.productCode}</span>
                        </h5>
                    </div>

                    <div className="single-item-action">
                        <h5 className="title">Số lượng:</h5>
                        <div className="cart-qty">
                            <button className="minus-btn bg-white" onClick={decrementValue}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <input
                                className="quantity bg-white"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(parseInt(e.target.value) || 1)}
                            />
                            <button className="plus-btn bg-white" onClick={incrementValue}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                        <div className="item-single-btn-area">
                            <button className="theme-btn" onClick={addProductToLocalStorage}>
                                <FontAwesomeIcon icon={faCartShopping} />
                                Thêm vào giỏ hàng
                            </button>
                            <Link href="#" className="single-item-btn">
                                <FontAwesomeIcon icon={faHeart} />
                            </Link>
                            <Link href="#" className="single-item-btn">
                                <FontAwesomeIcon icon={faRightLeft} />
                            </Link>
                        </div>
                    </div>

                    {/* <div className="single-item-content">
                        <h5>
                            Category: <span>Car Parts</span>
                        </h5>
                        <h5>
                            Tags: <span>Car, Shop, Tire</span>
                        </h5>
                    </div> */}

                    <hr />

                    <div className="single-item-share">
                        <span>Chia sẻ:</span>
                        <Link href="#">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </Link>
                        <Link href="#">
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                        <Link href="#">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                        <Link href="#">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </Link>
                        <Link href="#">
                            <FontAwesomeIcon icon={faPinterestP} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="single-item-details">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button
                            className="nav-link active"
                            id="nav-tab1"
                            data-bs-toggle="tab"
                            data-bs-target="#tab1"
                            type="button"
                            role="tab"
                            aria-controls="tab1"
                            aria-selected="true"
                        >
                            Mô Tả
                        </button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="nav-tab1">
                        <div className="single-item-desc">{ProductDetail?.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
