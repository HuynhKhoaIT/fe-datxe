'use client';
import Link from 'next/link';
import { useState } from 'react';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { login } from '@/utils/user';
export default function Login() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(phone, password);
            console.log('Login successful');
            await router.push('/');
        } catch (error: any) {
            console.log('Login fail');
            console.error('Login error:', error.message);
        }
    };
    return (
        <main className="main">
            <div className="login-area py-120">
                <div className="container">
                    <div className="col-md-5 mx-auto">
                        <div className="login-form">
                            <div className="login-header">
                                <img
                                    className="rounded"
                                    src="https://datxe.com/wp-content/uploads/2021/08/cropped-logo-DatXE-App-vuong-1.jpg"
                                    alt=""
                                />
                            </div>
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Số điện thoại"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="d-flex justify-content-between mb-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="remember" />
                                        <label className="form-check-label" htmlFor="remember">
                                            Ghi nhớ
                                        </label>
                                    </div>
                                    {/* Sử dụng thư viện định tuyến (React Router hoặc next/router) cho liên kết */}
                                    <Link href="/forgot-password" className="forgot-pass">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button type="submit" className="theme-btn">
                                        <FontAwesomeIcon icon={faArrowRightToBracket} /> Đăng nhập
                                    </button>
                                </div>
                            </form>
                            <div className="login-footer">
                                <p>
                                    Bạn không có tài khoản? <Link href="dang-ky">Đăng Ký</Link>
                                </p>
                                {/* <div className="social-login">
                                    <p>Đăng nhập bằng mạng xã hội</p>
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
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
