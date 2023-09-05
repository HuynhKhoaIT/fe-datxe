export default function Checkout(){
    return (
        <main className="main">

        {/* <!-- breadcrumb --> */}
        <div className="site-breadcrumb" style={{background: `url(assets/img/breadcrumb/01.jpg)`}}>
            <div className="container">
                <h2 className="breadcrumb-title">Shop Checkout</h2>
                <ul className="breadcrumb-menu">
                    <li><a href="index.html">Home</a></li>
                    <li className="active">Shop Checkout</li>
                </ul>
            </div>
        </div>
        {/* <!-- breadcrumb end --> */}


        {/* <!-- shop checkout --> */}
        <div className="shop-checkout py-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="checkout-widget">
                            <h4 className="checkout-widget-title">Billing Address</h4>
                            <div className="checkout-form">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" placeholder="Your First Name"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" placeholder="Your Last Name"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" className="form-control" placeholder="Your Email"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input type="text" className="form-control" placeholder="Your Phone"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Address</label>
                                                <input type="text" className="form-control" placeholder="Your Address"/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="checkout-widget">
                            <h4 className="checkout-widget-title">Payment Info</h4>
                            <div className="checkout-form">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Card Holder Name</label>
                                                <input type="text" className="form-control" placeholder="Name On Card"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Card Number</label>
                                                <input type="text" className="form-control" placeholder="Your Card Number"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Expire Date</label>
                                                <input type="text" className="form-control" placeholder="Expire"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>CCV</label>
                                                <input type="text" className="form-control" placeholder="CVV"/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="checkout-widget">
                            <h4 className="checkout-widget-title">Shipping Address</h4>
                            <div className="checkout-form">
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" placeholder="Your First Name"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" placeholder="Your Last Name"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" className="form-control" placeholder="Your Email"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Phone</label>
                                                <input type="text" className="form-control" placeholder="Your Phone"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Address 1</label>
                                                <input type="text" className="form-control" placeholder="Your Address"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Address 2</label>
                                                <input type="text" className="form-control" placeholder="Your Address"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Additional Info</label>
                                                <textarea className="form-control" cols={30} rows={5}
                                                    placeholder="Additional Info"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="checkout cart-summary">
                            <h4 className="mb-30">Cart Summary</h4>
                            <ul>
                                <li><strong>Product Qty:</strong> <span>5</span></li>
                                <li><strong>Shipping Cost:</strong> <span>$25.00</span></li>
                                <li><strong>Discount:</strong> <span>$5.00</span></li>
                                <li><strong>Vat:</strong> <span>$20.00</span></li>
                                <li><strong>Sub Total:</strong> <span>$4,540.00</span></li>
                                <li className="cart-total"><strong>Total Pay:</strong> <span>$4,540.00</span></li>
                            </ul>
                            <div className="text-end mt-40">
                                <a href="#" className="theme-btn">Confirm Payment<i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- shop checkout end --> */}
    
    </main>
    )
}