import Link from 'next/link';
export default function register() {
    return (
        <main className="main">
            {/* <!-- register area --> */}
            <div className="login-area py-120">
                <div className="container">
                    <div className="col-md-9 mx-auto">
                        <div className="login-form">
                            <div className="login-header">
                                <img src="assets/img/logo/logo.png" alt="" />
                                <p>Đăng ký tài khoản</p>
                            </div>
                            <form action="#">
                                <div className="row">
                                    <div className="col col-md-4">
                                        <div className="form-group">
                                            <label>Họ Tên</label>
                                            <input type="text" className="form-control" placeholder="Họ tên" />
                                        </div>
                                    </div>
                                    <div className="col col-md-4">
                                        <div className="form-group">
                                            <label>Điện thoại</label>
                                            <input type="text" className="form-control" placeholder="Số điện thoại" />
                                        </div>
                                    </div>
                                    <div className="col col-md-4">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" className="form-control" placeholder="Email" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col col-md-4">
                                        <div className="form-group">
                                            <label>Biển số xe</label>
                                            <input type="text" className="form-control" placeholder="Biển số xe" />
                                        </div>
                                    </div>
                                    <div className="col col-md-4">
                                        <div className="form-group">
                                            <label>Hãng xe</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Hãng xe"
                                                value="1"
                                            />
                                        </div>
                                    </div>
                                    <div className="col col-md-4">
                                        <div className="form-group">
                                            <label>Dòng xe</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Dòng xe"
                                                value="10"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu</label>
                                    <input type="password" className="form-control" placeholder="Mật khẩu" />
                                </div>
                                <div className="form-check form-group">
                                    <input className="form-check-input" type="checkbox" value="" id="agree" />
                                    <label className="form-check-label" htmlFor="agree">
                                        Tôi đồng ý với <Link href="#">Điều khoản dịch vụ.</Link>
                                    </label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button type="submit" className="theme-btn">
                                        <i className="far fa-paper-plane"></i> Đăng ký
                                    </button>
                                </div>
                            </form>
                            <div className="login-footer">
                                <p>
                                    Bạn đã có tài khoản? <Link href="dang-nhap">Đăng nhập.</Link>
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
