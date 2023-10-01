import Link from 'next/link';
import React from 'react';
import { register } from '@/utils/user';
import { getBrands } from '@/utils/branch';
import RegisterForm from '../components/register/registerForm';
export default async function Register() {
    const brands_data = await getBrands();
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
                            <RegisterForm brands_data={brands_data} />
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
