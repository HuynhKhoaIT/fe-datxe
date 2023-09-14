'use client';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định của biểu mẫu
        try {
            const response = await axios.post('https://v2.dlbd.vn/api/login', { phone, password });
            const { token } = response.data.token; // Destructuring để lấy token
            // Lưu token vào Local Storage
            localStorage.setItem('token', token);
            // router.push('/home', { scroll: false });
        } catch (error) {
            console.error('Đăng nhập không thành công', error);
        }
    };
    return (
        <main className="main">
            <div className="login-area py-120">
                <div className="container">
                    <div className="col-md-5 mx-auto">
                        <div className="login-form">
                            <div className="login-header">
                                <img src="assets/img/logo/logo.png" alt="" />
                                <p>Login with your motex account</p>
                            </div>
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Your Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="remember" />
                                        <label className="form-check-label" htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                    {/* Sử dụng thư viện định tuyến (React Router hoặc next/router) cho liên kết */}
                                    <Link href="/forgot-password" className="forgot-pass">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button type="submit" className="theme-btn">
                                        <FontAwesomeIcon icon={faArrowRightToBracket} /> Login
                                    </button>
                                </div>
                            </form>
                            <div className="login-footer">
                                <p>
                                    Don't have an account? <Link href="dang-ky">Đăng Ký</Link>
                                </p>
                                <div className="social-login">
                                    <p>Continue with social media</p>
                                    <div className="social-login-list">
                                        <Link href="#">
                                            <FontAwesomeIcon icon={faFacebookF} />
                                        </Link>
                                        <Link href="#">
                                            <FontAwesomeIcon icon={faGoogle} />
                                        </Link>
                                        <Link href="#">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
