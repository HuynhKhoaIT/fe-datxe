'use client';
import { IProduct } from '@/interfaces/product';
import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faStar, faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faMinus, faPlus, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { notification, Modal, Row, Col, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import ProductGarage from './ProductGarage';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
const cx = classNames.bind(styles);
function ProductDetail({ ProductDetail }: { ProductDetail: IProduct }) {
    const { data: session } = useSession();
    const [api, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [inputValue, setInputValue] = useState(1);
    const openNotification = () => {
        api.info({
            message: `Thành công`,
            description: 'Sản phẩm đã được thêm vào giỏ hàng',
            icon: <CheckOutlined style={{ color: 'green' }} />,
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        const existingCartItems = JSON.parse('[]');
        existingCartItems.push({
            garageId: ProductDetail.garageId,
            product: ProductDetail,
            quantity: inputValue,
        });
        localStorage.setItem('cartData', JSON.stringify(existingCartItems));
        openNotification();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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

    const addProductToLocalStorage = () => {
        if (ProductDetail && session?.user) {
            const productId = ProductDetail.id;
            const garageId = ProductDetail.garageId;
            const existingCartItems = JSON.parse(localStorage.getItem('cartData') || '[]');
            const index = existingCartItems.findIndex((item: any) => item.product.id === productId);
            const idCar = existingCartItems.findIndex((item: any) => item.product.garageId === garageId);

            if (existingCartItems.length > 0 && idCar === -1) {
                showModal();
            } else {
                if (index !== -1) {
                    existingCartItems[index].quantity += inputValue;
                } else {
                    existingCartItems.push({
                        garageId: garageId,
                        product: ProductDetail,
                        quantity: inputValue,
                    });
                }

                localStorage.setItem('cartData', JSON.stringify(existingCartItems));
                openNotification();
            }
        } else {
            signIn();
        }
    };
    return (
        <Row>
            {contextHolder}
            <Col span={24}>
                <Row className={cx('product-detail')}>
                    <Col span={10}>
                        <div className="item-gallery">
                            <div className="flexslider-thumbnails">
                                <ul className="slides">
                                    <li data-thumb="/assets/img/shop/01.jpg" rel="adjustX:10, adjustY:">
                                        <img src={ProductDetail.thumbnail} alt="image" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col span={14}>
                        <div className="single-item-info">
                            <h4 className="single-item-title">{ProductDetail.name}</h4>
                            <div className="single-item-price">
                                <h4>
                                    <del>{ProductDetail.price?.toLocaleString()}đ</del>
                                    <span>{ProductDetail.price?.toLocaleString()}đ</span>
                                </h4>
                            </div>

                            <p className="mb-4">
                                There are many variations of passages of Lorem Ipsum available, but the majority have
                                suffered alteration in some form, by injected humour, or randomised words which don't
                                look even slightly believable.
                            </p>

                            <div className="single-item-content">
                                <h5>
                                    Mã Sản Phẩm: <span>{ProductDetail.productCode}</span>
                                </h5>
                            </div>

                            <div className="single-item-action">
                                <h5 className="title">Số lượng:</h5>
                                <div className="cart-qty">
                                    <button className="minus-btn" onClick={decrementValue}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <input
                                        className="quantity bg-white"
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(parseInt(e.target.value) || 1)}
                                    />
                                    <button className="plus-btn" onClick={incrementValue}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                                <div className="item-single-btn-area">
                                    <button className="theme-btn" onClick={addProductToLocalStorage}>
                                        <FontAwesomeIcon icon={faCartShopping} />
                                        Thêm vào giỏ
                                    </button>
                                    <Link href="#" className="single-item-btn">
                                        <FontAwesomeIcon icon={faHeart} />
                                    </Link>
                                </div>
                            </div>

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
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                {ProductDetail && ProductDetail.garageId && <ProductGarage garageId={ProductDetail.garageId} />}
            </Col>
            <Col span={24}>
                <div className={cx('single-item-details', 'product-description')}>
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
            </Col>
            <Modal
                title="Thông báo"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                style={{ zIndex: '99999' }}
            >
                <p>Bạn đang đặt hàng với 2 chuyên gia khác nhau? Bạn có muốn xóa giỏ hàng để thêm sản phẩm mới?</p>
            </Modal>
        </Row>
    );
}

export default ProductDetail;
