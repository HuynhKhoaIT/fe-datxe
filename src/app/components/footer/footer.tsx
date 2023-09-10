'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCaretRight, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faEnvelope } from '@fortawesome/free-regular-svg-icons';

const MyFooter = () => (
    <footer className="footer-area">
        <div className="footer-widget">
            <div className="container">
                <div className="row footer-widget-wrapper pt-100 pb-70">
                    <div className="col-md-6 col-lg-4">
                        <div className="footer-widget-box about-us">
                            <a href="#" className="footer-logo">
                                <img src="assets/img/logo/logo-light.png" alt="" />
                            </a>
                            <p className="mb-3">
                                We are many variations of passages available but the majority have suffered alteration
                                in some form by injected humour words believable.
                            </p>
                            <ul className="footer-contact">
                                <li>
                                    <a href="tel:+21236547898">
                                        <i>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </i>
                                        +2 123 654 7898
                                    </a>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                    25/B Milford Road, New York
                                </li>
                                <li>
                                    <a href="mailto:info@example.com">
                                        <i>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </i>
                                        info@example.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-2">
                        <div className="footer-widget-box list">
                            <h4 className="footer-widget-title">Quick Links</h4>
                            <ul className="footer-list">
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> Update News
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> Testimonials
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> Terms Of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> Privacy policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> Our Dealers
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="footer-widget-box list">
                            <h4 className="footer-widget-title">Support Center</h4>
                            <ul className="footer-list">
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> FAQ's
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> Affiliates
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> Booking Tips
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> Sell Vehicles
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faCaretRight} /> Sitemap
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="footer-widget-box list">
                            <h4 className="footer-widget-title">Newsletter</h4>
                            <div className="footer-newsletter">
                                <p>Subscribe Our Newsletter To Get Latest Update And News</p>
                                <div className="subscribe-form">
                                    <form action="#">
                                        <input type="email" className="form-control" placeholder="Your Email" />
                                        <button className="theme-btn" type="submit">
                                            Subscribe Now <FontAwesomeIcon icon={faPaperPlane} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 align-self-center">
                        <p className="copyright-text">
                            &copy; Copyright <span id="date"></span> <a href="#"> MOTEX </a> All Rights Reserved.
                        </p>
                    </div>
                    <div className="col-md-6 align-self-center">
                        <ul className="footer-social">
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <FontAwesomeIcon icon={faYoutube} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export { MyFooter };
