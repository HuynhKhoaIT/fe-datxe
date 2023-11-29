'use client';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import classNames from 'classnames/bind';

import styles from './loading.module.scss';
import { IconRotateClockwise2 } from '@tabler/icons-react';
const cx = classNames.bind(styles);
const antIcon = <IconRotateClockwise2 color="var(--theme-color)" />;
export const LoadingPage = () => {
    return (
        <div className={cx('loading-container')}>
            <Spin size="large" indicator={antIcon} />
        </div>
    );
};
export const LoadingComponent = () => {
    return (
        <div className={cx('loading-component')}>
            <Spin size="large" indicator={antIcon} />
        </div>
    );
};
