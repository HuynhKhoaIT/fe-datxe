'use client';
import React, { useEffect, useState } from 'react';
import { IBrand } from '@/interfaces/brand';
import { Grid, Modal, TextInput, Box, Select, Button, Group, NumberInput } from '@mantine/core';

import { getBrand, getBrands, getModels } from '@/utils/branch';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { updateCar } from '@/utils/car';
import { DateInput } from '@mantine/dates';
import { IconBan } from '@tabler/icons-react';
import BasicModal from '@/app/components/basicModal/BasicModal';
import { useForm, hasLength } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

const UpdateModal = ({ fetchCars, data, opened, onCancel, models, selectBrand }: any) => {
    const [disabled, setDisabled] = useState(true);
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [loading, handlers] = useDisclosure();

    const [brandsData, setBrandsData] = useState<any>([]);

    const form = useForm({
        initialValues: {},
        validate: {},
    });
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getBrands();
                const newFormat = data?.map((brand) => ({
                    value: brand.id?.toString() || '',
                    label: brand.name || '',
                }));
                setBrandsData(newFormat);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        if (opened == true) {
            form.setFieldValue('number_plates', data?.licensePlates);
            form.setFieldValue('brand_id', data?.automakerId);
            form.setFieldValue('car_name_id', data?.modelCarName?.id);
            form.setFieldValue('color', data?.color);
            form.setFieldValue('vin_number', data?.vinNumber);
            form.setFieldValue('date_repairt', data?.dateRepairt ? new Date(data?.dateRepairt) : null);
            form.setFieldValue('registration_deadline', new Date(data.registrationDate));
            form.setFieldValue('civil_insurance_deadline', new Date(data.civilInsuranceDate));
            form.setFieldValue('material_insurance_deadline', new Date(data?.materialInsuranceDate));
        }
    }, [opened]);
    const handleUpdateCar = async (values: any) => {
        handlers.open();
        try {
            const newCar = {
                ...values,
                date_repairt: dayjs(values?.date_repairt).format('YYYY-MM-DD'),
                civil_insurance_deadline: dayjs(values?.civil_insurance_deadline).format('YYYY-MM-DD'),
                material_insurance_deadline: dayjs(values?.material_insurance_deadline).format('YYYY-MM-DD'),
                registration_deadline: dayjs(values?.registration_deadline).format('YYYY-MM-DD'),
            };
            const createdCar = await updateCar(data.id, newCar, token ?? '');
            onCancel();
            handlers.close();
            fetchCars();
            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật xe thành công',
            });
        } catch (error) {
            console.error('Error creating car:', error);
            handlers.close();
            onCancel();
            notifications.show({
                title: 'Thất bại',
                message: 'Cập nhật xe thất bại',
            });
        }
    };
    return (
        <BasicModal
            size={800}
            title="Chỉnh sửa thông tin xe của bạn"
            isOpen={opened}
            closeButtonProps
            onCloseModal={onCancel}
            lockScroll={false}
        >
            <Box maw={800} mx="auto">
                <form onSubmit={form.onSubmit((values) => handleUpdateCar(values))}>
                    <Grid gutter={10}>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Biển số xe"
                                type="text"
                                placeholder="Biển số xe"
                                {...form.getInputProps('number_plates')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Select
                                {...form.getInputProps('brand_id')}
                                label="Hãng xe"
                                checkIconPosition="right"
                                placeholder="Chọn hãng xe"
                                data={brandsData}
                                onChange={(value) => {
                                    form.setFieldValue('brand_id', value);
                                    selectBrand(Number(value));
                                    form.setFieldValue('car_name_id', null);
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Select
                                label="Dòng xe"
                                checkIconPosition="right"
                                placeholder="Chọn dòng xe"
                                data={models}
                                {...form.getInputProps('car_name_id')}
                            ></Select>
                        </Grid.Col>
                    </Grid>
                    <Grid gutter={10}>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Color"
                                type="text"
                                name="color"
                                placeholder="Màu xe"
                                {...form.getInputProps('color')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <NumberInput
                                label="Vin number"
                                name="vin_number"
                                placeholder="Vin Number"
                                {...form.getInputProps('vin_number')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <DateInput
                                label="Date Repairt"
                                valueFormat={'DD/MM/YYYY'}
                                {...form.getInputProps('date_repairt')}
                                placeholder="Date Repairt"
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid gutter={10}>
                        <Grid.Col span={4}>
                            <DateInput
                                label="Registration Deadline"
                                valueFormat={'DD/MM/YYYY'}
                                {...form.getInputProps('registration_deadline')}
                                placeholder="Registration Deadline"
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <DateInput
                                label="Civil deadline"
                                valueFormat={'DD/MM/YYYY'}
                                {...form.getInputProps('civil_insurance_deadline')}
                                placeholder="Civil deadline"
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <DateInput
                                label="Material deadline"
                                valueFormat={'DD/MM/YYYY'}
                                {...form.getInputProps('material_insurance_deadline')}
                                placeholder="Material deadline"
                            />
                        </Grid.Col>
                    </Grid>
                    <Group justify="end" style={{ marginTop: 10 }}>
                        <Button variant="outline" color="red" size="xs" onClick={onCancel} leftSection={<IconBan />}>
                            Huỷ bỏ
                        </Button>
                        <Button variant="filled" size="xs" type="submit" loading={loading}>
                            Cập nhật
                        </Button>
                    </Group>
                </form>
            </Box>
        </BasicModal>
    );
};
export default UpdateModal;
