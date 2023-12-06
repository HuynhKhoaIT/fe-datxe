'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Grid, Modal, TextInput, Card, Avatar, Select } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { getCar, getCars } from '@/utils/car';
import { getMyAccount } from '@/utils/user';

export default function InfoCar({ setCartData }: any) {
    const { data: session, status } = useSession();
    const token = session?.user?.token;
    const [carOptions, setCaroptions] = useState<any>();
    const [dataCarDefault, setdataCartDefault] = useState<any>();

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
                    otherData: {
                        carId: car.id?.toString() || '',
                        brandId: car.brandCarName.id,
                        brandName: car.brandCarName.name,
                        modelId: car.modelCarName.id,
                        modelName: car.modelCarName.name,
                    },
                }));
                const account: any = await getMyAccount(token);

                const carDefault: any = newModels?.filter((car) => car.value == account?.carIdDefault);
                setCartData(carDefault?.value);
                setdataCartDefault(carDefault?.[0]?.otherData);
                setCaroptions(newModels);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };
    useEffect(() => {
        fetchCars();
    }, [token]);
    console.log(dataCarDefault);
    console.log(carSelect);

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
                                value={carSelect?.id ?? dataCarDefault?.carId?.toString()}
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
                                value={carSelect?.brandCarName?.name ?? dataCarDefault?.brandName}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Dòng xe"
                                placeholder="Dòng xe"
                                readOnly
                                defaultValue={carSelect?.modelCarName?.name ?? dataCarDefault?.modelName}
                            />
                        </Grid.Col>
                    </Grid>
                </Card>
            </div>
        </Grid.Col>
    );
}
