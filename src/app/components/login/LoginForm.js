'use client';
import React from 'react';
import Link from 'next/link';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from 'antd';
function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const token = '1436|5ZgrHyobWoDHP4gS3PtWm2vVcMWNDgeFZk2p4DzY';

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            signIn('credentials', { phone: phone, password: password, callbackUrl: callbackUrl || '/dashboard' });
            // await login(phone, password);
            // console.log('Login successful');
            // await router.push('/');
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };
    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     localStorage.setItem('token', token);
    //     router.push('/');
    // };

    return (
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
                    <Button type="submit" className="theme-btn">
                        <FontAwesomeIcon icon={faArrowRightToBracket} /> Đăng nhập
                    </Button>
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
    );
}

export default LoginForm;
