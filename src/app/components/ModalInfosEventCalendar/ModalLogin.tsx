'use client';
import BasicModal from '../basicModal/BasicModal';
import React, { useEffect, useState } from 'react';
import { Box, Avatar, Grid, Input, Button, PinInput } from '@mantine/core';
import { IconChevronLeft, IconBrandGoogle } from '@tabler/icons-react';
import IconGoogle from '../../assets/images/google.svg';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { CheckOtp, CheckPhone, login, register } from '@/utils/user';
import { notifications } from '@mantine/notifications';
import { signIn } from 'next-auth/react';
import { preventDefault } from '@fullcalendar/core/internal';
import { addCustomerCare } from '@/utils/customerCare';
export function ModalLogin({ opened, close, phone, name, dataDetail }: any) {
    const [countdown, setCountdown] = useState<number>(59);
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
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
        const { pin } = form.values;
        let password = phone + '@@Datxe.com@@';
        let passwordConfirmation = password;
        try {
            setLoading(true);
            const checkRs = await CheckOtp(phone, pin, 'login');
            if (checkRs.CodeResult == 100) {
                signIn('credentials', {
                    phone: phone,
                    password: password,
                    callbackUrl: '/dashboard',
                });
                // try {
                //     const createdCar = await addCustomerCare(dataDetail, token ?? '');
                //     setLoading(false);
                // } catch (error) {
                //     console.error('Error creating customer care:', error);
                //     notifications.show({
                //         title: 'Thất bại',
                //         message: 'Đặt lịch thất bại',
                //     });
                //     setLoading(false);
                // }
                notifications.show({
                    title: 'Thành công',
                    message: 'Đặt lịch thành công',
                });
            } else {
                notifications.show({
                    title: 'Thất bại',
                    message: 'Đặt lịch thất bại',
                });
            }
            setLoading(false);
        } catch (error) {
            notifications.show({
                title: 'Thất bại',
                message: 'Đăng nhập thất bại',
            });
            setLoading(false);
        }
    };
    return (
        <BasicModal
            size={500}
            isOpen={opened}
            onCloseModal={close}
            footer={false}
            title="Đăng nhập"
            trapFocus={false}
            style={{ position: 'relative' }}
        >
            <div>
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
                        Gửi lại mã sau {countdown}s{' '}
                        {countdown == 0 && <div onClick={() => setCountdown(59)}>Gửi lại</div>}
                    </p>
                    <p className="other-accuracy__title">Mã xác minh có hiệu lực trong vòng 15 phút</p>
                </div>
            </div>
        </BasicModal>
    );
}
