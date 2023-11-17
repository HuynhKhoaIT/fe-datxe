'use client';
import React from 'react';
import { Box, Avatar, Grid, Input, Button, PinInput } from '@mantine/core';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import IconGoogle from '../../assets/images/google.svg';
export function LoginFormAccuracy() {
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
                <h3>Nhập mã xác minh</h3>
                <p>
                    Bạn vui lòng nhập mã gồm 6 chữ số vừa được gửi đến{' '}
                    <span style={{ color: 'var(--theme-color' }}> 0869950091</span>
                </p>
            </div>

            <form className="login-accuracy-input">
                <PinInput variant="unstyled" placeholder="0" length={6} size="md" />
                <Button
                    className="login-btn"
                    variant="filled"
                    color="var(--theme-color)"
                    size="md"
                    radius="md"
                    fullWidth
                >
                    Tiếp tục
                </Button>
            </form>
            <div className="other-accuracy">
                <p className="other-accuracy__time">Gửi lại mã sau 55s</p>
                <p className="other-accuracy__title">Mã xác minh có hiệu lực trong vòng 15 phút</p>
            </div>
        </div>
    );
}
