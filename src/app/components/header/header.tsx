'use client';
import {
    faArrowRightToBracket,
    faCartShopping,
    faCirclePlus,
    faEnvelope,
    faMagnifyingGlass,
    faPhoneVolume,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
const Header = () => {
    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsVisible(!isVisible);
        router.push(`/tim-kiem?s=${encodeURIComponent(searchValue)}`);
        setSearchValue('');
    };
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
                                            {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                                            info@example.com
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="tel:+21236547898">
                                            <FontAwesomeIcon icon={faPhoneVolume} /> +2 123 654 7898
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
                                <Link href="dang-nhap">
                                    <FontAwesomeIcon icon={faArrowRightToBracket} /> Đăng nhập
                                </Link>
                                <Link href="#">
                                    <FontAwesomeIcon icon={faUser} /> Đăng ký
                                </Link>
                            </div>
                            <div className="header-top-social">
                                <span>Follow Us: </span>
                                <Link href="#">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </Link>
                                <Link href="#">
                                    <FontAwesomeIcon icon={faXTwitter} />
                                </Link>
                                <Link href="#">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </Link>
                                <Link href="#">
                                    <FontAwesomeIcon icon={faLinkedin} />
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
                            <img
                                src="https://datxe.com/wp-content/uploads/2021/08/cropped-logo-DatXE-App-vuong-1.jpg"
                                alt="logo"
                                style={{ maxWidth: '60px' }}
                            />
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
                                    <Link className="nav-link active" href="/" data-bs-toggle="dropdown">
                                        Trang chủ
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/san-pham">
                                        Sản phẩm/Dịch vụ
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="chuyen-gia">
                                        Chuyên gia
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link " href="bai-viet" data-bs-toggle="dropdown">
                                        Tin tức
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="lien-he">
                                        Liên hệ
                                    </Link>
                                </li>
                            </ul>
                            <div className="nav-right">
                                <div className="search-btn">
                                    <button onClick={toggleVisibility} className="nav-right-link">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </button>
                                </div>
                                <div className="cart-btn">
                                    <Link href="/gio-hang" className="nav-right-link">
                                        <FontAwesomeIcon icon={faCartShopping} />
                                        <span>0</span>
                                    </Link>
                                </div>
                                <div className="nav-right-btn mt-2">
                                    <Link href="#" className="theme-btn">
                                        <FontAwesomeIcon icon={faCirclePlus} />
                                        Add Listing
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
                        <div className="search-area" style={{ visibility: isVisible ? 'hidden' : 'visible' }}>
                            <form onSubmit={handleSubmit} method="GET">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Type Keyword..."
                                        name="s"
                                        value={searchValue}
                                        onChange={handleInputChange}
                                    />
                                    <button type="submit" className="search-icon-btn">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
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
