'use client';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import classNames from 'classnames/bind';

import styles from './loading.module.scss';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);
const antIcon = <FontAwesomeIcon icon={faSpinner} style={{ fontSize: 32, color: 'var(--theme-color)' }} spin />;
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
