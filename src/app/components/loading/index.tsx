'use client';
import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';

import styles from './loading.module.scss';
import { IconRotateClockwise2 } from '@tabler/icons-react';
const cx = classNames.bind(styles);
const antIcon = <IconRotateClockwise2 color="var(--theme-color)" />;
export const LoadingPage = () => {
    return (
        <div className={cx('loading-container')}>
            <IconRotateClockwise2 size={32} />
        </div>
    );
};
export const LoadingComponent = () => {
    return (
        <div className={cx('loading-component')}>
            <IconRotateClockwise2 size={32} />
        </div>
    );
};
