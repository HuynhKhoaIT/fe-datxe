'use client';
import {
    IconPhone,
    IconLocation,
    IconMail,
    IconCaretRight,
    IconBrandFacebook,
    IconBrandYoutube,
    IconBrandInstagram,
    IconBrandTwitter,
    IconSend,
} from '@tabler/icons-react';

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
                                            <IconPhone size={16} />
                                        </i>
                                        +2 123 654 7898
                                    </a>
                                </li>
                                <li>
                                    <IconLocation size={16} />
                                    25/B Milford Road, New York
                                </li>
                                <li>
                                    <a href="mailto:info@example.com">
                                        <i>
                                            <IconMail size={16} />
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
                                        <IconCaretRight size={16} /> About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <IconCaretRight size={16} /> Update News
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <IconCaretRight size={16} /> Testimonials
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <IconCaretRight size={16} /> Terms Of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <IconCaretRight size={16} /> Privacy policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <IconCaretRight size={16} /> Our Dealers
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
                                        <IconCaretRight size={16} /> FAQ's
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <IconCaretRight size={16} /> Affiliates
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <IconCaretRight size={16} /> Booking Tips
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <IconCaretRight size={16} /> Sell Vehicles
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <IconCaretRight size={16} /> Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <IconCaretRight size={16} /> Sitemap
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
                                            Subscribe Now <IconSend size={16} />
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
                                    <IconBrandFacebook size={16} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <IconBrandTwitter size={16} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <IconBrandInstagram size={16} />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <IconBrandYoutube size={16} />
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
