'use client';
import React, { useEffect, useState } from 'react';
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProduct } from '@/interfaces/product';
export default function Cart() {
    const [cartData, setCartData] = useState<
        { product: { id: number; name: string; price: number; thumbnail: string }; quantity: number }[]
    >([]);
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

    return (
        <main className="main">
            <div className="shop-cart py-120">
                <div className="container">
                    <div className="shop-cart-wrapper">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Sub Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartData.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="cart-img">
                                                    <img src={item.product.thumbnail} alt="" />
                                                </div>
                                            </td>
                                            <td>
                                                <h5>{item.product.name}</h5>
                                            </td>
                                            <td>
                                                <div className="cart-price">
                                                    <span>{item.product.price.toLocaleString()}đ</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="cart-qty">
                                                    <button
                                                        onClick={() => decrementQuantity(item.product.id)}
                                                        className="minus-btn"
                                                    >
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                    <input
                                                        className="quantity"
                                                        type="text"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <button
                                                        onClick={() => incrementQuantity(item.product.id)}
                                                        className="plus-btn"
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="cart-sub-total">
                                                    <span>
                                                        {(item.product.price * item.quantity).toLocaleString()}đ
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <a onClick={() => deleteItem(item.product.id)} className="cart-remove">
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </a>
                                            </td>
                                        </tr>
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
                                            <button className="coupon-btn" type="submit">
                                                Apply <i className="fas fa-arrow-right-long"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-8">
                                    <div className="cart-summary">
                                        <ul>
                                            <li>
                                                <strong>Sub Total:</strong>{' '}
                                                <span>{calculateSubTotal().toLocaleString()}đ</span>
                                            </li>
                                            <li>
                                                <strong>Vat:</strong> <span>$25.00</span>
                                            </li>
                                            <li>
                                                <strong>Discount:</strong> <span>$5.00</span>
                                            </li>
                                            <li className="cart-total">
                                                <strong>Total:</strong> <span>$4,520.00</span>
                                            </li>
                                        </ul>
                                        <div className="text-end mt-40">
                                            <a href="#" className="theme-btn">
                                                Checkout Now<i className="fas fa-arrow-right-long"></i>
                                            </a>
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
