'use client';
import React, { useState } from 'react';
import { Box, Avatar, Grid, Input, Button, TextInput } from '@mantine/core';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import IconGoogle from '../../assets/images/google.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { CheckPhone, GenOTP } from '@/utils/user';
import { notifications } from '@mantine/notifications';

export default function LoginFormInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const form = useForm({
        initialValues: {
            phone: '',
        },

        validate: {
            phone: hasLength({ min: 10, max: 11 }, 'Vui lòng nhập đúng số điện thoại'),
        },
    });
    const onSubmit = async () => {
        const { phone } = form.values;
        const res = await CheckPhone(phone);
        if (res) {
            const genRs = await GenOTP(phone);
            if (genRs.CodeResult == 100) {
                console.log(genRs);
                if (callbackUrl) {
                    router.push(`./dang-nhap/xac-thuc?phone=${phone}&callbackUrl=${callbackUrl}`);
                } else {
                    router.push(`./dang-nhap/xac-thuc?phone=${phone}`);
                }
            } else {
                notifications.show({
                    title: 'Error',
                    message: 'Lỗi tạo OTP, Vui lòng thử lại sau!',
                });
            }
        } else {
            notifications.show({
                title: 'Error',
                message: 'Số điện thoại chưa được đăng ký vui lòng đăng ký!',
            });
            form.setErrors({ phone: 'Số điện thoại chưa được đăng ký!' });
        }
    };
    return (
        <div className="login-form">
            <div className="d-flex justify-content-center flex-column align-items-center ">
                <Avatar
                    src="https://datxe.com/wp-content/uploads/2021/08/cropped-logo-DatXE-App-vuong-1.jpg"
                    alt="it's me"
                    radius={'50%'}
                    size={'100px'}
                />
                <p className="login-title-1">DatXe - Ứng dụng đặt lịch ô tô</p>
            </div>
            <div className="login-title-2">
                <h2>Xin chào,</h2>
                <p>Đăng nhập hoặc tạo tài khoản</p>
            </div>

            <form className="login-form-input" onSubmit={form.onSubmit(onSubmit)}>
                <TextInput
                    withAsterisk
                    style={{ borderBottom: '1px solid #ddd' }}
                    variant="unstyled"
                    placeholder="Số điện thoại"
                    {...form.getInputProps('phone')}
                />
                <Button
                    className="login-btn"
                    variant="filled"
                    color="var(--theme-color)"
                    size="md"
                    radius="md"
                    fullWidth
                    type="submit"
                >
                    Tiếp tục
                </Button>
            </form>
            <div className="other-login">
                <p className="other-login__title">Hoặc tiếp tục bằng</p>
                <div className="other-login__btn ">
                    <Button variant="outline" color="gray" style={{ marginRight: '5px' }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="126.445 2.281 589 589"
                            id="facebook"
                        >
                            <circle cx="420.945" cy="296.781" r="294.5" fill="#3c5a9a"></circle>
                            <path
                                fill="#fff"
                                d="M516.704 92.677h-65.239c-38.715 0-81.777 16.283-81.777 72.402.189 19.554 0 38.281 0 59.357H324.9v71.271h46.174v205.177h84.847V294.353h56.002l5.067-70.117h-62.531s.14-31.191 0-40.249c0-22.177 23.076-20.907 24.464-20.907 10.981 0 32.332.032 37.813 0V92.677h-.032z"
                            ></path>
                        </svg>
                    </Button>
                    <Button variant="outline" color="gray">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            preserveAspectRatio="xMidYMid"
                            viewBox="0 0 256 262"
                            id="google"
                        >
                            <path
                                fill="#4285F4"
                                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                            ></path>
                            <path
                                fill="#34A853"
                                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                            ></path>
                            <path
                                fill="#FBBC05"
                                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                            ></path>
                            <path
                                fill="#EB4335"
                                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                            ></path>
                        </svg>
                    </Button>
                </div>
                <div className="login-footer">
                    <p>
                        Bạn không có tài khoản? <Link href="dang-ky">Đăng Ký</Link>
                    </p>
                </div>
                <p className="other-login__rules">
                    Bằng việc tiếp tục, bạn hãy chấp nhận <a href="/"> Điều khoản sử dụng</a>
                </p>
            </div>
        </div>
    );
}
