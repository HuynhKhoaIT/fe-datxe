'use client';
import React, { useEffect, useState } from 'react';
import { Box, Avatar, Grid, Input, Button, PinInput } from '@mantine/core';
import { IconChevronLeft, IconBrandGoogle } from '@tabler/icons-react';
import IconGoogle from '../../assets/images/google.svg';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { CheckOtp, CheckPhone, login } from '@/utils/user';
import { notifications } from '@mantine/notifications';
import { signIn } from 'next-auth/react';
import { preventDefault } from '@fullcalendar/core/internal';

export function LoginFormAccuracy() {
    const [countdown, setCountdown] = useState<number>(59);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const [loading, setLoading] = useState(false);
    const phone = searchParams.get('phone');
    const form = useForm({
        initialValues: {
            phone: phone || '',
            pin: '',
        },

        validate: {
            pin: hasLength({ min: 6, max: 6 }, 'Mã xác thực phải đủ 6 ký tự'),
        },
    });
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [countdown]);
    const onLogin = async () => {
        setLoading(true);
        const { phone, pin } = form.values;
        let password = phone + '@@' + phone.slice(-3);
        try {
            await CheckOtp(phone, pin, 'login');
            try {
                signIn('credentials', {
                    phone: phone,
                    password: password,
                    callbackUrl: callbackUrl || '/dashboard',
                });
                notifications.show({
                    title: 'Thành công',
                    message: 'Đăng nhập thành công',
                });
                setLoading(false);
            } catch (error) {
                notifications.show({
                    title: 'Thất bại',
                    message: 'Đăng nhập thất bại',
                });
                setLoading(false);
            }
        } catch (error) {
            notifications.show({
                title: 'Error',
                message: 'Xác thực thất bại',
            });
            setLoading(false);
            form.setErrors({ pin: 'Mã Otp không hợp lệ!' });
        }
    };
    return (
        <div className="login-form">
            <Link href={'/dang-nhap'}>
                <IconChevronLeft size={32} color="var(--theme-color)" />
            </Link>
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
                <h3>Nhập mã xác minh</h3>
                <p>
                    Bạn vui lòng nhập mã gồm 6 chữ số vừa được gửi đến{' '}
                    <span style={{ color: 'var(--theme-color' }}> {phone}</span>
                </p>
            </div>

            <form className="login-accuracy-input" onSubmit={form.onSubmit(onLogin)}>
                <PinInput variant="unstyled" placeholder="○" length={6} size="md" {...form.getInputProps('pin')} />
                <Button
                    loading={loading}
                    className="login-btn"
                    type="submit"
                    variant="filled"
                    color="var(--theme-color)"
                    size="md"
                    radius="md"
                    fullWidth
                >
                    Đăng nhập
                </Button>
            </form>
            <div className="other-accuracy">
                <p className="other-accuracy__time">
                    Gửi lại mã sau {countdown}s {countdown == 0 && <div onClick={() => setCountdown(59)}>Gửi lại</div>}
                </p>
                <p className="other-accuracy__title">Mã xác minh có hiệu lực trong vòng 15 phút</p>
            </div>
        </div>
    );
}
