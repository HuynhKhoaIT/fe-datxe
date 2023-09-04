export default function Cart () {
    return (
        <main className="main">

        <div className="site-breadcrumb" style={{background: `url(assets/img/breadcrumb/01.jpg)`}}>
            <div className="container">
                <h2 className="breadcrumb-title">Shop Cart</h2>
                <ul className="breadcrumb-menu">
                    <li><a href="index.html">Home</a></li>
                    <li className="active">Shop Cart</li>
                </ul>
            </div>
        </div>


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
                                <tr>
                                    <td>
                                        <div className="cart-img">
                                            <img src="/assets/img/shop/01.jpg" alt=""/>
                                        </div>
                                    </td>
                                    <td>
                                        <h5>Car Engine Parts</h5>
                                    </td>
                                    <td>
                                        <div className="cart-price">
                                            <span>$1,500</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cart-qty">
                                            <button className="minus-btn"><i className="fal fa-minus"></i></button>
                                            <input className="quantity" type="text" value="1" />
                                            <button className="plus-btn"><i className="fal fa-plus"></i></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cart-sub-total">
                                            <span>$1,500</span>
                                        </div>
                                    </td>
                                    <td>
                                        <a href="#" className="cart-remove"><i className="far fa-times"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="cart-img">
                                            <img src="/assets/img/shop/02.jpg" alt=""/>
                                        </div>
                                    </td>
                                    <td>
                                        <h5>Car Engine Parts</h5>
                                    </td>
                                    <td>
                                        <div className="cart-price">
                                            <span>$1,500</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cart-qty">
                                            <button className="minus-btn"><i className="fal fa-minus"></i></button>
                                            <input className="quantity" type="text" value="1" />
                                            <button className="plus-btn"><i className="fal fa-plus"></i></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cart-sub-total">
                                            <span>$1,500</span>
                                        </div>
                                    </td>
                                    <td>
                                        <a href="#" className="cart-remove"><i className="far fa-times"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="cart-img">
                                            <img src="/assets/img/shop/03.jpg" alt=""/>
                                        </div>
                                    </td>
                                    <td>
                                        <h5>Car Engine Parts</h5>
                                    </td>
                                    <td>
                                        <div className="cart-price">
                                            <span>$1,500</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cart-qty">
                                            <button className="minus-btn"><i className="fal fa-minus"></i></button>
                                            <input className="quantity" type="text" value="1"/>
                                            <button className="plus-btn"><i className="fal fa-plus"></i></button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cart-sub-total">
                                            <span>$1,500</span>
                                        </div>
                                    </td>
                                    <td>
                                        <a href="#" className="cart-remove"><i className="far fa-times"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="cart-footer">
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <div className="cart-coupon">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your Coupon Code"/>
                                        <button className="coupon-btn" type="submit">Apply <i className="fas fa-arrow-right-long"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-8">
                                <div className="cart-summary">
                                    <ul>
                                        <li><strong>Sub Total:</strong> <span>$4,500.00</span></li>
                                        <li><strong>Vat:</strong> <span>$25.00</span></li>
                                        <li><strong>Discount:</strong> <span>$5.00</span></li>
                                        <li className="cart-total"><strong>Total:</strong> <span>$4,520.00</span></li>
                                    </ul>
                                    <div className="text-end mt-40">
                                        <a href="#" className="theme-btn">Checkout Now<i
                                                className="fas fa-arrow-right-long"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
    )
}