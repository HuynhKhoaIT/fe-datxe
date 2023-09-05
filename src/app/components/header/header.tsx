'use client';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="header">
            {/* <!-- top header --> */}
            <div className="header-top">
                <div className="container">
                    <div className="header-top-wrapper">
                        <div className="header-top-left">
                            <div className="header-top-contact">
                                <ul>
                                    <li>
                                        <Link href="mailto:info@example.com">
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            info@example.com
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="tel:+21236547898">
                                            <i className="far fa-phone-volume"></i> +2 123 654 7898
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <i className="far fa-alarm-clock"></i> Sun - Fri (08AM - 10PM)
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="header-top-right">
                            <div className="header-top-link">
                                <Link href="#">
                                    <i className="far fa-arrow-right-to-arc"></i> Login
                                </Link>
                                <Link href="#">
                                    <i className="far fa-user-vneck"></i> Register
                                </Link>
                            </div>
                            <div className="header-top-social">
                                <span>Follow Us: </span>
                                <Link href="#">
                                    <i className="fab fa-facebook"></i>
                                </Link>
                                <Link href="#">
                                    <i className="fab fa-twitter"></i>
                                </Link>
                                <Link href="#">
                                    <i className="fab fa-instagram"></i>
                                </Link>
                                <Link href="#">
                                    <i className="fab fa-linkedin"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-navigation">
                <nav className="navbar navbar-expand-lg">
                    <div className="container position-relative">
                        <Link className="navbar-brand" href="/">
                            <img src="assets/img/logo/logo.png" alt="logo" />
                        </Link>
                        <div className="mobile-menu-right">
                            <div className="search-btn">
                                <button type="button" className="nav-right-link">
                                    <i className="far fa-search"></i>
                                </button>
                            </div>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#main_nav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-mobile-icon">
                                    <i className="far fa-bars"></i>
                                </span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="main_nav">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle active"
                                        href="#"
                                        data-bs-toggle="dropdown"
                                    >
                                        Home
                                    </Link>
                                    <ul className="dropdown-menu fade-down">
                                        <li>
                                            <Link className="dropdown-item" href="/">
                                                Home Page 01
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="/-2">
                                                Home Page 02
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="/-3">
                                                Home Page 03
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="about">
                                        About
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                        Inventory
                                    </Link>
                                    <ul className="dropdown-menu fade-down">
                                        <li>
                                            <Link className="dropdown-item" href="inventory-grid">
                                                Inventory Grid
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="inventory-list">
                                                Inventory List
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="inventory-single">
                                                Inventory Single
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                        Pages
                                    </Link>
                                    <ul className="dropdown-menu fade-down">
                                        <li>
                                            <Link className="dropdown-item" href="about">
                                                About Us
                                            </Link>
                                        </li>
                                        <li className="dropdown-submenu">
                                            <Link className="dropdown-item dropdown-toggle" href="#">
                                                Car Listing
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link className="dropdown-item" href="listing-grid">
                                                        Listing Grid
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="listing-list">
                                                        Listing List
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="listing-single">
                                                        Listing Single
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="compare">
                                                        Compare
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="dropdown-submenu">
                                            <Link className="dropdown-item dropdown-toggle" href="#">
                                                My Account
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link className="dropdown-item" href="dashboard">
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="profile">
                                                        My Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="profile-listing">
                                                        My Listing
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="add-listing">
                                                        Add Listing
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="profile-favorite">
                                                        My Favorites
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="profile-message">
                                                        Messages
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="profile-setting">
                                                        Settings
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="dropdown-submenu">
                                            <Link className="dropdown-item dropdown-toggle" href="#">
                                                Authentication
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link className="dropdown-item" href="dang-nhap">
                                                        Login
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="dang-ky">
                                                        Register
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="forgot-password">
                                                        Forgot Password
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="dropdown-submenu">
                                            <Link className="dropdown-item dropdown-toggle" href="#">
                                                Services
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link className="dropdown-item" href="service">
                                                        Services
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="service-single">
                                                        Service Single
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="dropdown-submenu">
                                            <Link className="dropdown-item dropdown-toggle" href="#">
                                                Dealer
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link className="dropdown-item" href="dealer">
                                                        Dealer
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="dealer-single">
                                                        Dealer Single
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="dropdown-submenu">
                                            <Link className="dropdown-item dropdown-toggle" href="#">
                                                Extra Pages
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link className="dropdown-item" href="404">
                                                        404 Error
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="coming-soon">
                                                        Coming Soon
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="terms">
                                                        Terms Of Service
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" href="privacy">
                                                        Privacy Policy
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="team">
                                                Our Team
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="pricing">
                                                Pricing Plan
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="calculator">
                                                Calculator
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="faq">
                                                Faq
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="testimonial">
                                                Testimonials
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                        Shop
                                    </Link>
                                    <ul className="dropdown-menu fade-down">
                                        <li>
                                            <Link className="dropdown-item" href="san-pham">
                                                Shop
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="gio-hang">
                                                Shop Cart
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="thanh-toan">
                                                Shop Checkout
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="shop-single">
                                                Shop Single
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                                        Blog
                                    </Link>
                                    <ul className="dropdown-menu fade-down">
                                        <li>
                                            <Link className="dropdown-item" href="bai-viet">
                                                Blog
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="chi-tiet-bai-viet">
                                                Blog Single
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="contact">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                            <div className="nav-right">
                                <div className="search-btn">
                                    <button type="button" className="nav-right-link">
                                        <i className="far fa-search"></i>
                                    </button>
                                </div>
                                <div className="cart-btn">
                                    <Link href="#" className="nav-right-link">
                                        <i className="far fa-cart-plus"></i>
                                        <span>0</span>
                                    </Link>
                                </div>
                                <div className="nav-right-btn mt-2">
                                    <Link href="#" className="theme-btn">
                                        <span className="far fa-plus-circle"></span>Add Listing
                                    </Link>
                                </div>
                                <div className="sidebar-btn">
                                    <button type="button" className="nav-right-link">
                                        <i className="far fa-bars-sort"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <!-- search area --> */}
                        <div className="search-area">
                            <form action="#">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Type Keyword..." />
                                    <button type="submit" className="search-icon-btn">
                                        <i className="far fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/* <!-- search area end --> */}
                    </div>
                </nav>
            </div>
        </header>
    );
};
export { Header };
