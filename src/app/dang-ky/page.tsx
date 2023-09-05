import Link from 'next/link';
export default function register() {
    return (
        <main className="main">
            {/* <!-- register area --> */}
            <div className="login-area py-120">
                <div className="container">
                    <div className="col-md-5 mx-auto">
                        <div className="login-form">
                            <div className="login-header">
                                <img src="assets/img/logo/logo.png" alt="" />
                                <p>Create your motex account</p>
                            </div>
                            <form action="#">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" className="form-control" placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" className="form-control" placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Your Password" />
                                </div>
                                <div className="form-check form-group">
                                    <input className="form-check-input" type="checkbox" value="" id="agree" />
                                    <label className="form-check-label" htmlFor="agree">
                                        I agree with the <Link href="#">Terms Of Service.</Link>
                                    </label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button type="submit" className="theme-btn">
                                        <i className="far fa-paper-plane"></i> Register
                                    </button>
                                </div>
                            </form>
                            <div className="login-footer">
                                <p>
                                    Already have an account? <Link href="dang-nhap">Login.</Link>
                                </p>
                                <div className="social-login">
                                    <p>Continue with social media</p>
                                    <div className="social-login-list">
                                        <Link href="#">
                                            <i className="fab fa-facebook-f"></i>
                                        </Link>
                                        <Link href="#">
                                            <i className="fab fa-google"></i>
                                        </Link>
                                        <Link href="#">
                                            <i className="fab fa-twitter"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- register area end --> */}
        </main>
    );
}
