import React, { useEffect, useState } from 'react';
import { TextInput, Button, Group, Box, Grid, Textarea, Select, Radio, Modal } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import { IconPlus } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import { ActionIcon, rem } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { ModalLogin } from './ModalLogin';
import { CheckPhone, GenOTP } from '@/utils/user';
import { notifications } from '@mantine/notifications';
import { ModalRegister } from './ModalRegister';
import { addCustomerCare } from '@/utils/customerCare';

export const ModalEventCalendar = ({
    user,
    brandOptions,
    modelOptions,
    token,
    categoryOptions,
    setBrand,
    eventInfos,
    garage,
    advisorOptions,
    carOptions,
    cars,
    garageOptions,
    dataCarDefault,
}: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    console.log('dataCarDefault', dataCarDefault);
    const [openedLogin, { open: openLogin, close: closeLogin }] = useDisclosure(false);
    const [openedRegister, { open: openRegister, close: closeRegister }] = useDisclosure(false);
    const [newCustomerCare, setNewCustomerCare] = useState({
        customer_request: '',
        description: '',
        priority_level: '',
        arrival_time: '',
        car_id: '',
        garageId: '',
    });
    const form = useForm({
        initialValues: {
            customer_request: '',
            name: user?.name || '',
            phone: user?.phone || '',
            category: '',
            garaName: '',
            garaAddress: '',
            description: '',
            garageId: garageOptions[0]?.value || '',
            priority_level: '2',
            arrival_time: eventInfos?.start,
            car_id: dataCarDefault?.otherData?.carId || '',
            service_advisor: '',
            brand_name: dataCarDefault?.otherData?.brandName || '',
            model_name: dataCarDefault?.otherData.modelName || null,
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Tên ít nhất 2 ký tự' : null),
            phone: (value) => (value.length < 1 ? 'Vui lòng nhập số điện thoại' : null),
            car_id: (value) => (value.length < 1 ? 'Vui lòng nhập biển số xe' : null),
        },
    });

    const handleSubmit = async (values: any) => {
        setLoading(true);
        const {
            name,
            phone,
            customer_request,
            description,
            priority_level,
            arrival_time,
            car_id,
            garageId,
            brand_name,
            model_name,
        } = values;
        const customerCare = {
            customer_request: customer_request,
            description: description,
            priority_level: priority_level,
            arrival_time: arrival_time,
            car_id: car_id,
            garageId: garageId,
        };
        setNewCustomerCare(customerCare);
        if (!token) {
            const res = await CheckPhone(phone);
            if (!res) {
                setLoading(false);
                openRegister();
                // Số điện thoại chưa đăng ký chuyển qua trang đăng ký
                // const genRs = await GenOTP(phone);
                // if (genRs.CodeResult == 100) {
                //     openRegister();
                // } else {
                //     notifications.show({
                //         title: 'Error',
                //         message: 'Hệ thống gửi OTP thất bại, vui lòng thử lại sau!',
                //     });
                // }
            } else {
                setLoading(false);
                openLogin();

                // Số điện thoại đã đăng ký mở login
                // const genRs = await GenOTP(phone);
                // if (genRs.CodeResult == 100) {
                //     openLogin();
                // } else {
                //     notifications.show({
                //         title: 'Error',
                //         message: 'Hệ thống gửi OTP thất bại, vui lòng thử lại sau!',
                //     });
                // }
            }
        } else {
            try {
                const createdCar = await addCustomerCare(customerCare, token ?? '');
                setLoading(false);
                notifications.show({
                    title: 'Thành công',
                    message: 'Đặt lịch thành công',
                });
            } catch (error) {
                console.error('Error creating customer care:', error);
                notifications.show({
                    title: 'Thất bại',
                    message: 'Đặt lịch thất bại',
                });
                setLoading(false);
            }
        }
    };
    const ref = useRef<HTMLInputElement>(null);
    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    );

    const handlePlace = (value: any) => {
        form.setFieldValue('car_id', value);
        carOptions?.map((item: any) => {
            if (item?.otherData?.carId === value) {
                form.setFieldValue('brand_name', item.otherData?.brandName);
                form.setFieldValue('model_name', item.otherData?.modelName);
            }
        });
    };

    console.log('new', newCustomerCare);

    return (
        <Box>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Textarea placeholder="Yêu cầu khách hàng" withAsterisk {...form.getInputProps('customer_request')} />
                <Radio.Group withAsterisk {...form.getInputProps('priority_level')}>
                    <Group mt="xs">
                        <Radio value="1" label="Cao" />
                        <Radio value="2" label="Trung bình" />
                        <Radio value="3" label="Thấp" />
                    </Group>
                </Radio.Group>

                <Grid gutter={10} mt="md">
                    <Grid.Col span={6}>
                        <TextInput placeholder="Họ và tên" withAsterisk {...form.getInputProps('name')} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput placeholder="Số điện thoại" withAsterisk {...form.getInputProps('phone')} />
                    </Grid.Col>
                </Grid>
                <Grid mt="md" justify="center">
                    <Grid.Col span={6} className="input-plate">
                        {token ? (
                            <Select
                                {...form.getInputProps('car_id')}
                                checkIconPosition="right"
                                placeholder="Biển số xe"
                                allowDeselect={false}
                                size="lg"
                                data={carOptions}
                                onChange={handlePlace}
                            ></Select>
                        ) : (
                            <TextInput placeholder="Biển số xe" size="lg" {...form.getInputProps('car_id')}></TextInput>
                        )}
                    </Grid.Col>
                </Grid>
                {token ? (
                    <Grid gutter={10} mt="md">
                        <Grid.Col span={4}>
                            <TextInput
                                placeholder="Hãng xe"
                                leftSection={<IconPlus size={22} color="blue" />}
                                withAsterisk
                                {...form.getInputProps('brand_name')}
                                // value={carSelect?.brandCarName?.name || carDefault?.brandCarName?.name}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                placeholder="Dòng xe"
                                leftSection={<IconPlus size={22} color="blue" />}
                                {...form.getInputProps('model_name')}
                                // value={carSelect?.modelCarName?.name || carDefault?.modelCarName?.name}
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                placeholder="Năm sản xuất"
                                leftSection={<IconPlus size={22} color="blue" />}
                                withAsterisk
                                {...form.getInputProps('nsx')}
                            />
                        </Grid.Col>
                    </Grid>
                ) : (
                    <Grid gutter={10} mt="md">
                        <Grid.Col span={4}>
                            <Select
                                {...form.getInputProps('brand_name')}
                                name="brand_name"
                                data={brandOptions}
                                placeholder="Hãng xe"
                                allowDeselect={false}
                                leftSection={<IconPlus size={22} color="blue" />}
                                onChange={(value) => {
                                    form.setFieldValue('brand_name', value || '');
                                    form.setFieldValue('model_name', null);
                                    setBrand(value);
                                }}
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Select
                                name="model_name"
                                data={modelOptions}
                                placeholder="Dòng xe"
                                leftSection={<IconPlus size={22} color="blue" />}
                                withAsterisk
                                allowDeselect={false}
                                {...form.getInputProps('model_name')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                placeholder="Năm sản xuất"
                                leftSection={<IconPlus size={22} color="blue" />}
                                withAsterisk
                                {...form.getInputProps('nsx')}
                            />
                        </Grid.Col>
                    </Grid>
                )}
                <Grid gutter={10} mt="md">
                    <Grid.Col span={6}>
                        <Select
                            data={categoryOptions}
                            placeholder="Danh mục đặt lịch"
                            withAsterisk
                            allowDeselect={false}
                            leftSection={<IconPlus size={22} color="blue" />}
                            {...form.getInputProps('category')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6} className="input-date">
                        <DateTimePicker
                            valueFormat="DD/MM/YYYY hh:mm A"
                            placeholder="Thời gian đặt lịch"
                            leftSection={<IconPlus size={22} color="blue" />}
                            rightSection={pickerControl}
                            {...form.getInputProps('arrival_time')}
                        />
                    </Grid.Col>
                </Grid>
                {garage && (
                    <Grid gutter={10} mt="md">
                        <Grid.Col span={6}>
                            <Select
                                allowDeselect={false}
                                data={advisorOptions}
                                placeholder="Chọn CVDV"
                                leftSection={<IconPlus size={22} color="blue" />}
                                withAsterisk
                                {...form.getInputProps('service_advisor')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Select
                                allowDeselect={false}
                                data={garageOptions}
                                placeholder="Chọn chuyên gia"
                                withAsterisk
                                {...form.getInputProps('garageId')}
                            />
                        </Grid.Col>
                    </Grid>
                )}

                <Grid mt="md">
                    <Grid.Col span={12}>
                        <Textarea placeholder="Ghi chú cho CVDV" withAsterisk {...form.getInputProps('description')} />
                    </Grid.Col>
                </Grid>
                <Group grow preventGrowOverflow={false} wrap="nowrap" mt="md" className="footer-modal-schedule">
                    <div>
                        Đăng ký <a href="/">DatXe</a> để quản lý lịch sử xe, hoặc <a href="/">đăng nhập</a>
                    </div>
                    <Button loading={loading} w={100} bg={'var(--theme-color)'} type="submit" key="submit">
                        Đặt lịch
                    </Button>
                </Group>
            </form>
            <ModalRegister
                close={closeRegister}
                opened={openedRegister}
                phone={form.values.phone}
                name={form.values.name}
                dataDetail={newCustomerCare}
            />

            <ModalLogin
                close={closeLogin}
                opened={openedLogin}
                phone={form.values.phone}
                name={form.values.name}
                dataDetail={newCustomerCare}
            />
        </Box>
    );
};
