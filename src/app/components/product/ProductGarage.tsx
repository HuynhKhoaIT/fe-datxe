'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col, Avatar, Button, Space } from 'antd';
import { UserOutlined, MessageOutlined, ShopOutlined } from '@ant-design/icons';
import { IGarage } from '../../../interfaces/garage';
import { getGarage } from '@/utils/garage';

import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Link from 'next/link';
const cx = classNames.bind(styles);

function ProductGarage({ garageId }: { garageId: string }) {
    const [garageData, setGarageData] = useState<IGarage>();

    useEffect(() => {
        const fetchGarageData = async () => {
            try {
                const res = await getGarage(garageId);
                if (res?.data) {
                    setGarageData(res.data);
                }
            } catch (error) {
                console.error('Error fetching garage data:', error);
            }
        };

        fetchGarageData();
    }, [garageId]);
    console.log(garageData);
    return (
        <div className={cx('garageItem')}>
            <Col span={8}>
                <Row className={cx('garage-info')}>
                    <Col span={8} className={cx('info-left')}>
                        <Avatar
                            size={84}
                            icon={<UserOutlined />}
                            style={{ border: '0.5px solid #ddd', marginLeft: '4px' }}
                            src={garageData?.logo}
                        />
                    </Col>
                    <Col span={16} className={cx('info-right')}>
                        <Link href={'/'} className={cx('garage-name')}>
                            {garageData?.name}
                        </Link>
                        <Space className={cx()}>
                            <Button
                                href="#"
                                style={{ borderRadius: '0' }}
                                type="primary"
                                danger
                                icon={<MessageOutlined />}
                            >
                                Chat ngay
                            </Button>

                            <Button
                                href={`/chuyen-gia/${garageId}`}
                                style={{ borderRadius: '0' }}
                                icon={<ShopOutlined />}
                            >
                                Xem shop
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Col>
            <Col span={16} className={cx('garage-right')}>
                <Row gutter={40}>
                    <Col span={7} className={cx('garage-right__info')}>
                        <div className={cx('d-flex justify-content-between')}>
                            <span className={cx('garage-right__title')}>Đánh giá</span>
                            <span className={cx('garage-right__qtt')}>132.6k</span>
                        </div>
                        <div className={cx('d-flex justify-content-between')}>
                            <span className={cx('garage-right__title')}>Sản phẩm</span>
                            <span className={cx('garage-right__qtt')}>200</span>
                        </div>
                    </Col>
                    <Col span={10} className={cx('garage-right__info')}>
                        <div className={cx('d-flex justify-content-between')}>
                            <span className={cx('garage-right__title')}>Tỉ lệ phản hồi</span>
                            <span className={cx('garage-right__qtt')}>69%</span>
                        </div>
                        <div className={cx('d-flex justify-content-between')}>
                            <span className={cx('garage-right__title')}>Thời gian phản hồi</span>
                            <span className={cx('garage-right__qtt')}>Trong vài giờ</span>
                        </div>
                    </Col>
                    <Col span={7} className={cx('garage-right__info')}>
                        <div className={cx('d-flex justify-content-between')}>
                            <span className={cx('garage-right__title')}>Tham gia</span>
                            <span className={cx('garage-right__qtt')}>6 năm trước</span>
                        </div>
                        <div className={cx('d-flex justify-content-between')}>
                            <span className={cx('garage-right__title')}>Người theo dõi</span>
                            <span className={cx('garage-right__qtt')}>379,1k</span>
                        </div>
                    </Col>
                </Row>
            </Col>
        </div>
    );
}

export default ProductGarage;
