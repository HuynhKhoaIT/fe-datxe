export default function Checkout() {
    return (
        <main className="main">
            {/* <!-- shop checkout --> */}
            <div className="shop-checkout py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="checkout-widget">
                                <h4 className="checkout-widget-title">Thông tin khách hàng</h4>
                                <div className="checkout-form">
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Họ Tên</label>
                                                    <input type="text" className="form-control" placeholder="Họ Tên" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Nhập Email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Điện thoại</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập số điện thoại"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Địa chỉ</label>
                                                    <input type="text" className="form-control" placeholder="Địa chỉ" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="checkout-widget">
                                <h4 className="checkout-widget-title">Thông tin Xe</h4>
                                <div className="checkout-form">
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Biển số</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Name On Card"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Hãng Xe</label>
                                                    <input type="text" className="form-control" placeholder="Hãng Xe" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Dòng Xe</label>
                                                    <input type="text" className="form-control" placeholder="Expire" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>CCV</label>
                                                    <input type="text" className="form-control" placeholder="CVV" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="checkout cart-summary">
                                <h4 className="mb-30">Thông tin</h4>
                                <ul>
                                    <li>
                                        <strong>Số lượng sản phẩm:</strong> <span>5</span>
                                    </li>
                                    <li>
                                        <strong>Tổng cộng:</strong> <span>$25.00</span>
                                    </li>
                                    <li>
                                        <strong>Giảm giá:</strong> <span>$5.00</span>
                                    </li>
                                    <li className="cart-total">
                                        <strong>Thành tiền:</strong> <span>$4,540.00</span>
                                    </li>
                                </ul>
                                <div className="text-end mt-40">
                                    <a href="#" className="theme-btn">
                                        Xác nhận đặt lịch<i className="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- shop checkout end --> */}
        </main>
    );
}
