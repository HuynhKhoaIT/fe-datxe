'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import CartItem from '../components/cart/cartItem';
import { CustomerInfo } from '../components/cart/customerInfo';
import { checkOutCart } from '@/utils/order';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { CarInfoCart } from '../components/cart/carInfo';
import { useSession } from 'next-auth/react';
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

export default function Cart() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const token = session?.user?.token;
    const [time, setTime] = useState(dayjs().format('hh:mm'));
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [cartData, setCartData] = useState<
        { product: { id: number; name: string; price: number; thumbnail: string }; quantity: number }[]
    >([]);

    const transformedProducts = cartData?.map((item) => {
        return {
            id: item?.product?.id,
            quantity: item?.quantity,
            price: item?.product?.price,
        };
    });
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.info({
            message: `Thành công`,
            description: 'Đặt lịch thành công',
            icon: <CheckOutlined style={{ color: 'green' }} />,
        });
    };
    // tăng số lượng sản phẩm
    const incrementQuantity = (productId: number) => {
        const updateCartData = cartData.map((item) => {
            if (item.product.id === productId) {
                item.quantity += 1;
            }
            return item;
        });
        localStorage.setItem('cartData', JSON.stringify(updateCartData));
        setCartData(updateCartData);
    };
    // giảm số lượng sản phẩm
    const decrementQuantity = (productId: number) => {
        const updateCartData = cartData.map((item) => {
            if (item.product.id === productId && item.quantity > 1) {
                item.quantity -= 1;
            }
            return item;
        });
        localStorage.setItem('cartData', JSON.stringify(updateCartData));
        setCartData(updateCartData);
    };

    // Tính tổng tiền
    const calculateSubTotal = () => {
        let subTotal = 0;
        cartData.forEach((item) => {
            subTotal += item.product.price * item.quantity;
        });
        return subTotal;
    };
    // Xóa sản phẩm ra khỏi giỏ hàng
    const deleteItem = (productId: number) => {
        const updatedCartData = cartData.filter((item) => item.product.id !== productId);
        localStorage.setItem('cartData', JSON.stringify(updatedCartData));
        setCartData(updatedCartData);
    };

    useEffect(() => {
        // Lấy dữ liệu từ Local Storage
        const existingCartData = localStorage.getItem('cartData');
        if (existingCartData) {
            // Chuyển đổi chuỗi JSON thành mảng JavaScript
            const parsedCartData = JSON.parse(existingCartData);
            setCartData(parsedCartData);
        }
    }, []);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('thanh toán');
        try {
            const checkOut = await checkOutCart(date, time, transformedProducts, token ?? '');
            console.log(checkOut);
            localStorage.setItem('carData', JSON.stringify([]));
            router.push('/');
            openNotification();
        } catch (error: any) {
            console.log('Login fail');
            console.error('Login error:', error.message);
        }
    };
    return (
        <main className="main">
            {contextHolder}
            <form method="post" onSubmit={onSubmit}>
                <div className="shop-cart pt-60 pb-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <CustomerInfo />
                            </div>
                            <div className="col col-md-6">
                                <div className="checkout-widget">
                                    <h4 className="checkout-widget-title">Thông tin Xe</h4>
                                    <CarInfoCart />
                                </div>
                            </div>
                            <div className="col col-md-12">
                                <div className="bg-white mb-20 p-4">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Ngày</label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    className="form-control"
                                                    placeholder="Ngày"
                                                    required
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Giờ</label>
                                                <input
                                                    type="time"
                                                    name="time"
                                                    className="form-control"
                                                    placeholder="Giờ"
                                                    required
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="shop-cart-wrapper">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Hình</th>
                                            <th>Tên</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                            <th>Thành tiền</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartData.map((item, index) => (
                                            <CartItem
                                                key={index}
                                                item={item}
                                                decrementQuantity={decrementQuantity}
                                                incrementQuantity={incrementQuantity}
                                                deleteItem={deleteItem}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="cart-footer">
                                <div className="row">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="cart-coupon">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Your Coupon Code"
                                                />
                                                <button className="coupon-btn">
                                                    Apply <i className="fas fa-arrow-right-long"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-8">
                                        <div className="cart-summary">
                                            <ul>
                                                <li>
                                                    <strong>Tổng tiền hàng:</strong>{' '}
                                                    <span>{calculateSubTotal().toLocaleString()}đ</span>
                                                </li>
                                                <li className="cart-total">
                                                    <strong>Tổng cộng:</strong>{' '}
                                                    <span>{calculateSubTotal().toLocaleString()}đ</span>
                                                </li>
                                            </ul>
                                            <div className="text-end mt-40">
                                                <button type="submit" className="theme-btn">
                                                    Đặt lịch<i className="fas fa-arrow-right-long"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
}
