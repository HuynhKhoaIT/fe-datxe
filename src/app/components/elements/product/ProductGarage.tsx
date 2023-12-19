'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Avatar, Group, Button } from '@mantine/core';
import { IconMessage, IconBuildingStore } from '@tabler/icons-react';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Link from 'next/link';
const cx = classNames.bind(styles);

function ProductGarage({ garage }: { garage: any }) {
    return (
        <div className={cx('garageItem')}>
            <Grid classNames={{ root: cx('garageRow') }}>
                <Grid.Col span={4}>
                    <Grid className={cx('garage-info')}>
                        <Grid.Col span={4} className={cx('info-left')}>
                            <Avatar
                                size={84}
                                style={{ border: '0.5px solid #ddd', marginLeft: '4px' }}
                                src={`https://v2.dlbd.vn/storage/${garage?.logo}`}
                            />
                        </Grid.Col>
                        <Grid.Col span={8} className={cx('info-right')}>
                            <Link href={`/chuyen-gia/${garage?.code}`} className={cx('garage-name')}>
                                {garage?.name}
                            </Link>
                            <Group grow gap={10}>
                                <Link href={`/chuyen-gia/${garage?.code}`}>
                                    <Button
                                        style={{ borderRadius: '0' }}
                                        color="red"
                                        size="xs"
                                        leftSection={<IconMessage size={12} />}
                                    >
                                        Chat ngay
                                    </Button>
                                </Link>
                                <Link href={`/chuyen-gia/${garage?.code}`}>
                                    <Button
                                        style={{ borderRadius: '0' }}
                                        variant="outline"
                                        color="gray"
                                        size="xs"
                                        leftSection={<IconBuildingStore size={12} />}
                                    >
                                        Xem shop
                                    </Button>
                                </Link>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={8} className={cx('garage-right')}>
                    <Grid gutter={40}>
                        <Grid.Col span={3.5} className={cx('garage-right__info')}>
                            <div className={cx('d-flex justify-content-between')}>
                                <span className={cx('garage-right__title')}>Đánh giá</span>
                                <span className={cx('garage-right__qtt')}>132.6k</span>
                            </div>
                            <div className={cx('d-flex justify-content-between')}>
                                <span className={cx('garage-right__title')}>Sản phẩm</span>
                                <span className={cx('garage-right__qtt')}>200</span>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={5} className={cx('garage-right__info')}>
                            <div className={cx('d-flex justify-content-between')}>
                                <span className={cx('garage-right__title')}>Tỉ lệ phản hồi</span>
                                <span className={cx('garage-right__qtt')}>69%</span>
                            </div>
                            <div className={cx('d-flex justify-content-between')}>
                                <span className={cx('garage-right__title')}>Thời gian phản hồi</span>
                                <span className={cx('garage-right__qtt')}>Trong vài giờ</span>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={3.5} className={cx('garage-right__info')}>
                            <div className={cx('d-flex justify-content-between')}>
                                <span className={cx('garage-right__title')}>Tham gia</span>
                                <span className={cx('garage-right__qtt')}>6 năm trước</span>
                            </div>
                            <div className={cx('d-flex justify-content-between')}>
                                <span className={cx('garage-right__title')}>Người theo dõi</span>
                                <span className={cx('garage-right__qtt')}>379,1k</span>
                            </div>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
        </div>
    );
}

export default ProductGarage;
