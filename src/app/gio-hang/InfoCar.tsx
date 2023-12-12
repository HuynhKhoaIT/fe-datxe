'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Grid, Modal, TextInput, Card, Avatar, Select } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { getCar, getCars } from '@/utils/car';
import { getMyAccount } from '@/utils/user';
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box } from '@mantine/core';
export default function InfoCar({ setCarId, carDefault: dataCarDefault, carOptions }: any) {
    const { data: session, status } = useSession();
    const token = session?.user?.token;
    const [visible, handlers] = useDisclosure(false);
    const selectCar = async (value: any) => {
        handlers.open();
        try {
            const selectedCar = await getCar(token ?? '', value);
            setCarSelect(selectedCar);
            handlers.close();
        } catch (error) {
            console.error('Error selecting car:', error);
        }
    };
    const [carSelect, setCarSelect] = useState<any>();

    return (
        <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
            <div className="checkout-widget">
                <h4 className="checkout-widget-title">Thông tin Xe</h4>
                <Card pos="relative">
                    <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

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
                                    setCarId(value);
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
