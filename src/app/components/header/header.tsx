'use client'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Header = ()=>{
    return (
        <header className="header">
        {/* <!-- top header --> */}
        <div className="header-top">
            <div className="container">
                <div className="header-top-wrapper">
                    <div className="header-top-left">
                        <div className="header-top-contact">
                            <ul>
                                <li><a href="mailto:info@example.com">
                                <FontAwesomeIcon icon={faEnvelope} />
                                        info@example.com</a></li>
                                <li><a href="tel:+21236547898"><i className="far fa-phone-volume"></i> +2 123 654 7898</a>
                                </li>
                                <li><a href="#"><i className="far fa-alarm-clock"></i> Sun - Fri (08AM - 10PM)</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="header-top-right">
                        <div className="header-top-link">
                            <a href="#"><i className="far fa-arrow-right-to-arc"></i> Login</a>
                            <a href="#"><i className="far fa-user-vneck"></i> Register</a>
                        </div>
                        <div className="header-top-social">
                            <span>Follow Us: </span>
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="main-navigation">
            <nav className="navbar navbar-expand-lg">
                <div className="container position-relative">
                    <a className="navbar-brand" href="index.html">
                        <img src="assets/img/logo/logo.png" alt="logo"/>
                    </a>
                    <div className="mobile-menu-right">
                        <div className="search-btn">
                            <button type="button" className="nav-right-link"><i className="far fa-search"></i></button>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-mobile-icon"><i className="far fa-bars"></i></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="main_nav">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle active" href="#" data-bs-toggle="dropdown">Home</a>
                                <ul className="dropdown-menu fade-down">
                                    <li><a className="dropdown-item" href="index.html">Home Page 01</a></li>
                                    <li><a className="dropdown-item" href="index-2.html">Home Page 02</a></li>
                                    <li><a className="dropdown-item" href="index-3.html">Home Page 03</a></li>
                                </ul>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="about.html">About</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Inventory</a>
                                <ul className="dropdown-menu fade-down">
                                    <li><a className="dropdown-item" href="inventory-grid.html">Inventory Grid</a></li>
                                    <li><a className="dropdown-item" href="inventory-list.html">Inventory List</a></li>
                                    <li><a className="dropdown-item" href="inventory-single.html">Inventory Single</a></li>

                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Pages</a>
                                <ul className="dropdown-menu fade-down">
                                    <li><a className="dropdown-item" href="about.html">About Us</a></li>
                                    <li className="dropdown-submenu">
                                        <a className="dropdown-item dropdown-toggle" href="#">Car Listing</a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="listing-grid.html">Listing Grid</a></li>
                                            <li><a className="dropdown-item" href="listing-list.html">Listing List</a></li>
                                            <li><a className="dropdown-item" href="listing-single.html">Listing Single</a></li>
                                            <li><a className="dropdown-item" href="compare.html">Compare</a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu">
                                        <a className="dropdown-item dropdown-toggle" href="#">My Account</a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="dashboard.html">Dashboard</a></li>
                                            <li><a className="dropdown-item" href="profile.html">My Profile</a></li>
                                            <li><a className="dropdown-item" href="profile-listing.html">My Listing</a></li>
                                            <li><a className="dropdown-item" href="add-listing.html">Add Listing</a></li>
                                            <li><a className="dropdown-item" href="profile-favorite.html">My Favorites</a>
                                            </li>
                                            <li><a className="dropdown-item" href="profile-message.html">Messages</a></li>
                                            <li><a className="dropdown-item" href="profile-setting.html">Settings</a></li>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu">
                                        <a className="dropdown-item dropdown-toggle" href="#">Authentication</a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="login.html">Login</a></li>
                                            <li><a className="dropdown-item" href="register.html">Register</a></li>
                                            <li><a className="dropdown-item" href="forgot-password.html">Forgot Password</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu">
                                        <a className="dropdown-item dropdown-toggle" href="#">Services</a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="service.html">Services</a></li>
                                            <li><a className="dropdown-item" href="service-single.html">Service Single</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu">
                                        <a className="dropdown-item dropdown-toggle" href="#">Dealer</a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="dealer.html">Dealer</a></li>
                                            <li><a className="dropdown-item" href="dealer-single.html">Dealer Single</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown-submenu">
                                        <a className="dropdown-item dropdown-toggle" href="#">Extra Pages</a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="404.html">404 Error</a></li>
                                            <li><a className="dropdown-item" href="coming-soon.html">Coming Soon</a></li>
                                            <li><a className="dropdown-item" href="terms.html">Terms Of Service</a></li>
                                            <li><a className="dropdown-item" href="privacy.html">Privacy Policy</a></li>
                                        </ul>
                                    </li>
                                    <li><a className="dropdown-item" href="team.html">Our Team</a></li>
                                    <li><a className="dropdown-item" href="pricing.html">Pricing Plan</a></li>
                                    <li><a className="dropdown-item" href="calculator.html">Calculator</a></li>
                                    <li><a className="dropdown-item" href="faq.html">Faq</a></li>
                                    <li><a className="dropdown-item" href="testimonial.html">Testimonials</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Shop</a>
                                <ul className="dropdown-menu fade-down">
                                    <li><a className="dropdown-item" href="shop.html">Shop</a></li>
                                    <li><a className="dropdown-item" href="shop-cart.html">Shop Cart</a></li>
                                    <li><a className="dropdown-item" href="shop-checkout.html">Shop Checkout</a></li>
                                    <li><a className="dropdown-item" href="shop-single.html">Shop Single</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Blog</a>
                                <ul className="dropdown-menu fade-down">
                                    <li><a className="dropdown-item" href="blog.html">Blog</a></li>
                                    <li><a className="dropdown-item" href="blog-single.html">Blog Single</a></li>
                                </ul>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li>
                        </ul>
                        <div className="nav-right">
                            <div className="search-btn">
                                <button type="button" className="nav-right-link"><i className="far fa-search"></i></button>
                            </div>
                            <div className="cart-btn">
                                <a href="#" className="nav-right-link"><i className="far fa-cart-plus"></i><span>0</span></a>
                            </div>
                            <div className="nav-right-btn mt-2">
                                <a href="#" className="theme-btn"><span className="far fa-plus-circle"></span>Add Listing</a>
                            </div>
                            <div className="sidebar-btn">
                                <button type="button" className="nav-right-link"><i className="far fa-bars-sort"></i></button>
                            </div>
                        </div>
                    </div>
                    {/* <!-- search area --> */}
                    <div className="search-area">
                        <form action="#">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Type Keyword..."/>
                                <button type="submit" className="search-icon-btn"><i className="far fa-search"></i></button>
                            </div>
                        </form>
                    </div>
                    {/* <!-- search area end --> */}
                </div>
            </nav>
        </div>
    </header>
    )
}
export {Header};