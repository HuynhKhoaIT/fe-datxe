'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Grid, Modal, TextInput, Card, Avatar, Select, Table, Group, Button } from '@mantine/core';

export default function InfoCart({ loading, renderRows, calculateSubTotal }: any) {
    return (
        <div className="container">
            <Card className="shop-cart-wrapper">
                <div className="table-responsive">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Hình ảnh</Table.Th>
                                <Table.Th>Tên</Table.Th>
                                <Table.Th>Giá</Table.Th>
                                <Table.Th style={{ textAlign: 'center' }}>Số lượng</Table.Th>
                                <Table.Th>Thành tiền</Table.Th>
                                <Table.Th>Hành động</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{renderRows()}</Table.Tbody>
                    </Table>
                </div>

                <Card className="cart-footer">
                    <Grid justify="space-between">
                        <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
                            <Group className="cart-coupon " pos="relative">
                                <TextInput type="text" className="form-control" placeholder="Your Coupon Code" />
                                <Button className="coupon-btn" variant="filled" pos="absolute">
                                    Apply
                                </Button>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
                            <ul>
                                <li>
                                    <strong>Tổng tiền hàng:</strong>
                                    <span>{calculateSubTotal().toLocaleString()}đ</span>
                                </li>
                                <li className="cart-total">
                                    <strong>Tổng cộng:</strong>
                                    <span>{calculateSubTotal().toLocaleString()}đ</span>
                                </li>
                            </ul>
                            <Group justify="end">
                                <Button
                                    className="theme-btn"
                                    variant="filled"
                                    type="submit"
                                    loading={loading}
                                    style={{ background: 'var(--theme-color)' }}
                                >
                                    Đặt lịch
                                </Button>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Card>
            </Card>
        </div>
    );
}
