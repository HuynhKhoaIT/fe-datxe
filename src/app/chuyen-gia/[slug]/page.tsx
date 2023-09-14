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
            <div className="shop-item-single bg pt-20">
                <div className="container">
                    <div className="hero-section">
                        <SlideBanners />
                    </div>
                    <div className="pt-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 mx-auto">
                                    <div className="site-heading text-center">
                                        <h2 className="site-title">
                                            Danh mục <span>Nổi bật</span>
                                        </h2>
                                        <div className="heading-divider"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 col-md-3 col-lg-2">
                                    <a href="#" className="brand-item wow fadeInUp" data-wow-delay=".25s">
                                        <div className="brand-img">
                                            <img src="/assets/img/brand/01.png" alt="" />
                                        </div>
                                        <h5>Ferrari</h5>
                                    </a>
                                </div>
                                <div className="col-6 col-md-3 col-lg-2">
                                    <a href="#" className="brand-item wow fadeInUp" data-wow-delay=".50s">
                                        <div className="brand-img">
                                            <img src="/assets/img/brand/02.png" alt="" />
                                        </div>
                                        <h5>Hyundai</h5>
                                    </a>
                                </div>
                                <div className="col-6 col-md-3 col-lg-2">
                                    <a href="#" className="brand-item wow fadeInUp" data-wow-delay=".75s">
                                        <div className="brand-img">
                                            <img src="/assets/img/brand/03.png" alt="" />
                                        </div>
                                        <h5>Mercedes Benz</h5>
                                    </a>
                                </div>
                                <div className="col-6 col-md-3 col-lg-2">
                                    <a href="#" className="brand-item wow fadeInUp" data-wow-delay="1s">
                                        <div className="brand-img">
                                            <img src="/assets/img/brand/04.png" alt="" />
                                        </div>
                                        <h5>Toyota</h5>
                                    </a>
                                </div>
                                <div className="col-6 col-md-3 col-lg-2">
                                    <a href="#" className="brand-item wow fadeInUp" data-wow-delay="1.25s">
                                        <div className="brand-img">
                                            <img src="/assets/img/brand/05.png" alt="" />
                                        </div>
                                        <h5>BMW</h5>
                                    </a>
                                </div>
                                <div className="col-6 col-md-3 col-lg-2">
                                    <a href="#" className="brand-item wow fadeInUp" data-wow-delay="1.50s">
                                        <div className="brand-img">
                                            <img src="/assets/img/brand/06.png" alt="" />
                                        </div>
                                        <h5>Nissan</h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="row">
                            <div className="col-lg-6 mx-auto">
                                <div className="site-heading text-center">
                                    <h2 className="site-title">
                                        Sản phẩm <span>Nổi bật</span>
                                    </h2>
                                    <div className="heading-divider"></div>
                                </div>
                            </div>
                        </div>
                        <div className="shop-item-wrapper">
                            <div className="row align-items-center">
                                <div className="col-md-6 col-lg-3">
                                    <div className="shop-item">
                                        <div className="shop-item-img">
                                            <span className="shop-item-sale">Sale</span>
                                            <img src="/assets/img/shop/01.jpg" alt="" />
                                            <div className="shop-item-meta">
                                                <a href="#">
                                                    <i className="far fa-heart"></i>
                                                </a>
                                                <a href="#">
                                                    <i className="far fa-eye"></i>
                                                </a>
                                                <a href="#">
                                                    <FontAwesomeIcon icon={faCartShopping} />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="shop-item-info">
                                            <div className="shop-item-rate">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                            <a href="#">
                                                <h4 className="shop-item-title">Car Engine Parts</h4>
                                            </a>
                                            <div className="shop-item-price">
                                                <del>$560</del> $510
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="shop-item">
                                        <div className="shop-item-img">
                                            <img src="/assets/img/shop/03.jpg" alt="" />
                                            <div className="shop-item-meta">
                                                <a href="#">
                                                    <i className="far fa-heart"></i>
                                                </a>
                                                <a href="#">
                                                    <i className="far fa-eye"></i>
                                                </a>
                                                <a href="#">
                                                    <i className="far fa-shopping-cart"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="shop-item-info">
                                            <div className="shop-item-rate">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                            <a href="#">
                                                <h4 className="shop-item-title">Car Engine Parts</h4>
                                            </a>
                                            <div className="shop-item-price">$680</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="shop-item">
                                        <div className="shop-item-img">
                                            <img src="/assets/img/shop/04.jpg" alt="" />
                                            <div className="shop-item-meta">
                                                <a href="#">
                                                    <i className="far fa-heart"></i>
                                                </a>
                                                <a href="#">
                                                    <i className="far fa-eye"></i>
                                                </a>
                                                <a href="#">
                                                    <i className="far fa-shopping-cart"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="shop-item-info">
                                            <div className="shop-item-rate">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                            <a href="#">
                                                <h4 className="shop-item-title">Car Engine Parts</h4>
                                            </a>
                                            <div className="shop-item-price">$710</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="shop-item">
                                        <div className="shop-item-img">
                                            <span className="shop-item-sale">Sale</span>
                                            <img src="/assets/img/shop/02.jpg" alt="" />
                                            <div className="shop-item-meta">
                                                <a href="#">
                                                    <i className="far fa-heart"></i>
                                                </a>
                                                <a href="#">
                                                    <i className="far fa-eye"></i>
                                                </a>
                                                <a href="#">
                                                    <i className="far fa-shopping-cart"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="shop-item-info">
                                            <div className="shop-item-rate">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                            <a href="#">
                                                <h4 className="shop-item-title">Car Engine Parts</h4>
                                            </a>
                                            <div className="shop-item-price">
                                                <del>$920</del> $900
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
