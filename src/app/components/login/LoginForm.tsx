'use client';
import React from 'react';
import Link from 'next/link';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button, Checkbox, Form, Input, Row, Typography, notification } from 'antd';
import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons';

function LoginForm() {
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (title: string, message: string) => {
        api.info({
            message: title,
            description: message,
            icon:
                title === 'Thành công' ? (
                    <CheckOutlined style={{ color: 'green' }} />
                ) : (
                    <ExclamationOutlined style={{ color: 'red' }} />
                ),
        });
    };
    const router = useRouter();
    const [form] = Form.useForm();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            setLoading(true);
            signIn('credentials', {
                phone: phone,
                password: password,
                callbackUrl: callbackUrl || '/dashboard',
            });
            setLoading(false);
            // openNotification('Thành công', 'Đăng nhập thành công');
        } catch (error) {
            console.error('Login error:', (error as Error).message);
            openNotification('Thất bại', 'Đăng nhập thất công');
        }
    };

    return (
        <div className="login-form">
            {contextHolder}
            <div className="login-header">
                <img
                    className="rounded"
                    src="https://datxe.com/wp-content/uploads/2021/08/cropped-logo-DatXE-App-vuong-1.jpg"
                    alt=""
                />
            </div>
            <Form form={form} onFinish={handleLogin} layout="vertical">
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại!',
                        },
                    ]}
                >
                    <Input
                        type="tel"
                        className="form-control"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu "
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                >
                    <Input
                        type="password"
                        className="form-control"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <Row justify="space-between">
                        <Checkbox id="remember">Ghi nhớ</Checkbox>
                        <Typography.Link href="/forgot-password" className="forgot-pass">
                            Quên mật khẩu?
                        </Typography.Link>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className="theme-btn" loading={loading}>
                        <FontAwesomeIcon icon={faArrowRightToBracket} /> Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <div className="login-footer">
                <p>
                    Bạn không có tài khoản? <Link href="dang-ky">Đăng Ký</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
