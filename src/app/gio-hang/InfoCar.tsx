'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Grid, Modal, TextInput, Card, Avatar, Select } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { getCar, getCars } from '@/utils/car';

export default function InfoCar({ setCartData }: any) {
    const { data: session, status } = useSession();
    const token = session?.user?.token;
    const [carOptions, setCaroptions] = useState<any>();
    const [carDefault, setCarDefault] = useState<any>({});

    const selectCar = async (value: any) => {
        try {
            const selectedCar = await getCar(token ?? '', value);
            setCarSelect(selectedCar);
        } catch (error) {
            console.error('Error selecting car:', error);
        }
    };
    const [carSelect, setCarSelect] = useState<any>();

    //Lấy danh sách xe
    const fetchCars = async () => {
        try {
            if (token) {
                const fetchedCars = await getCars(token);
                const newModels = fetchedCars?.map((car) => ({
                    value: car.id?.toString() || '',
                    label: car.licensePlates || '',
                }));
                setCaroptions(newModels);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };
    useEffect(() => {
        fetchCars();
    }, [token]);
    useEffect(() => {
        const existingCarData = localStorage.getItem('carDefault');
        if (existingCarData) {
            // Chuyển đổi chuỗi JSON thành mảng JavaScript
            const parsedCarData = JSON.parse(existingCarData);
            setCarDefault(parsedCarData);
        }
        const existingCartData = localStorage.getItem('cartData');
        if (existingCartData) {
            const parsedCartData = JSON.parse(existingCartData);
            setCartData(parsedCartData);
        }
    }, []);
    return (
        <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
            <div className="checkout-widget">
                <h4 className="checkout-widget-title">Thông tin Xe</h4>
                <Card pos="relative">
                    <Grid gutter={16}>
                        <Grid.Col span={12}>
                            <Select
                                label="Biển số"
                                checkIconPosition="right"
                                placeholder="Biển số"
                                data={carOptions}
                                value={carSelect?.id ?? carDefault?.id?.toString()}
                                allowDeselect={false}
                                onChange={(value) => {
                                    selectCar(value);
                                }}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid gutter={16}>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Hãng Xe"
                                placeholder="Hãng Xe"
                                readOnly
                                value={carSelect?.brandCarName?.name ?? carDefault?.brandCarName?.name}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Dòng xe"
                                placeholder="Dòng xe"
                                readOnly
                                defaultValue={carSelect?.modelCarName?.name ?? carDefault?.modelCarName?.name}
                            />
                        </Grid.Col>
                    </Grid>
                </Card>
            </div>
        </Grid.Col>
    );
}
