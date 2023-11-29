import React, { useEffect, useState } from 'react';
import '@mantine/core/styles.css';
import { TextInput, Button, Group, Box, Grid, Textarea, Select, Radio, Modal } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { DateTimePicker } from '@mantine/dates';
import { IconPlus } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { addCustomerCare, getCustomerCareCreate, getCustomerCares } from '@/utils/customerCare';
import { useSession } from 'next-auth/react';
import { getCar, getCars } from '@/utils/car';
import { useRef } from 'react';
import { ActionIcon, rem } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import { ModalLogin } from './ModalLogin';
import { useDisclosure } from '@mantine/hooks';
import { ModalEventCalendar } from './ModalEventCalendar';

export const ModalInfosEventCalendar = ({ handleClose, open, eventInfos, carDefault }: any) => {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [openedLogin, { open: openLogin, close: closeLogin }] = useDisclosure(false);

    const searchParams = useSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const garageId: string = searchParams.get('garage') || '';
    const [customerCreate, setCustomerCreate] = useState<any>();
    const [garageOptions, setGarageOptions] = useState<any>([]);
    const [categoryOptions, setCategoryOptions] = useState<any>([]);
    const [carOptions, setCaroptions] = useState<any>();
    const [advisorOptions, setAdvisoroptions] = useState<any>();
    const [cars, setCars] = useState<any>([]);
    const [carSelect, setCarSelect] = useState<any>();
    const [modalLogin, setModalLogin] = useState(false);
    console.log(customerCreate);
    const fetchCars = async () => {
        try {
            if (token) {
                const fetchedCars = await getCars(token);
                const newModels = fetchedCars?.map((car) => ({
                    value: car.id?.toString() || '',
                    label: car.licensePlates || '',
                }));
                setCaroptions(newModels);
                setCars(fetchedCars);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };
    useEffect(() => {
        fetchCars();
    }, [token]);
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const customerCare: any = await getCustomerCareCreate(token, garageId ?? '');
                    const garages: any = customerCare?.garages?.map((garage: { id: any; name: any }) => ({
                        value: garage.id?.toString(),
                        label: garage.name,
                    }));
                    console.log(garages);
                    const categories: any = customerCare?.categories?.map((category: { id: any; name: any }) => ({
                        value: category.id?.toString(),
                        label: category.name,
                    }));
                    const advisors: any = customerCare?.serviceAdvisor?.map((advisor: { id: any; name: any }) => ({
                        value: advisor.id?.toString(),
                        label: advisor.name,
                    }));
                    setCategoryOptions(categories);
                    setGarageOptions(garages);
                    setAdvisoroptions(advisors);
                    setCustomerCreate(customerCare);
                } catch (error) {
                    console.log('API Response:', error);
                }
            }
        };

        fetchData();
    }, [token]);
    const form = useForm({
        initialValues: {
            customer_request: '',
            name: '',
            phone: '',
            category: '',
            garaName: '',
            garaAddress: '',
            description: '',
            garageId: '',
            priority_level: '2',
            arrival_time: '',
            car_id: carDefault?.id,
            service_advisor: '',
        },

        validate: {
            // name: hasLength({ min: 2, max: 30 }, 'Name must be 2-10 characters long'),
        },
    });
    useEffect(() => {
        console.log(session?.user?.name);
        if (customerCreate || carDefault) {
            form.setValues({
                customer_request: '',
                name: customerCreate?.user?.name || session?.user?.name,
                phone: customerCreate?.user?.phone || session?.user?.phone,
                category: '97',
                garaName: '',
                garaAddress: '',
                description: '',
                garageId: customerCreate?.garages[0]?.id,
                priority_level: '2',
                arrival_time: eventInfos?.start || '',
                service_advisor: customerCreate?.serviceAdvisor[0]?.id,
                car_id: carDefault?.id,
            });
        }
    }, [carDefault, customerCreate, eventInfos?.start]);
    useEffect(() => {
        const fetchData = async () => {
            if (form?.values?.car_id) {
                try {
                    const selectedCar = await getCar(token ?? '', form.values.car_id);
                    setCarSelect(selectedCar);
                } catch (error) {
                    console.error('Error selecting car:', error);
                }
            }
        };
        fetchData();
    }, [form.values.car_id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const { customer_request, description, priority_level, arrival_time, car_id, garageId } = form.values;
        const newCustomerCare = {
            customer_request: customer_request,
            description: description,
            priority_level: priority_level,
            arrival_time: arrival_time,
            car_id: car_id,
            garageId: garageId,
        };
        console.log(newCustomerCare);
        if (!token) {
            openLogin();
        }
        try {
            const createdCar = await addCustomerCare(newCustomerCare, token ?? '');
            console.log('Customer care created:', createdCar);

            handleClose();
            setLoading(false);
        } catch (error) {
            console.error('Error creating customer care:', error);
            notifications.show({
                title: 'Thất bại',
                message: 'Đặt lịch thất bại',
            });
            setLoading(false);
        }
    };
    const ref = useRef<HTMLInputElement>(null);

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </ActionIcon>
    );
    return (
        <>
            <Modal
                size={500}
                title="Đặt lịch hẹn dịch vụ"
                opened={open}
                onClose={handleClose}
                trapFocus={false}
                lockScroll={false}
            >
                <form onSubmit={handleSubmit}>
                    <Textarea
                        placeholder="Yêu cầu khách hàng"
                        withAsterisk
                        {...form.getInputProps('customer_request')}
                    />
                    <Radio.Group withAsterisk {...form.getInputProps('priority_level')}>
                        <Group mt="xs">
                            <Radio value="1" label="Cao" />
                            <Radio value="2" label="Trung bình" />
                            <Radio value="3" label="Thấp" />
                        </Group>
                    </Radio.Group>

                    <Grid gutter={10} mt="md">
                        <Grid.Col span={6}>
                            <TextInput placeholder="Name" withAsterisk {...form.getInputProps('name')} />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder="Phone"
                                defaultValue={customerCreate?.user?.phone}
                                withAsterisk
                                {...form.getInputProps('phone')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid mt="md" justify="center">
                        <Grid.Col span={6} className="input-plate">
                            <Select
                                checkIconPosition="right"
                                placeholder="Biển số"
                                data={carOptions}
                                size="lg"
                                {...form.getInputProps('car_id')}
                            ></Select>
                        </Grid.Col>
                    </Grid>
                    <Grid gutter={10} mt="md">
                        <Grid.Col span={4}>
                            <TextInput
                                placeholder="Hãng xe"
                                leftSection={<IconPlus size={22} color="blue" />}
                                withAsterisk
                                value={carSelect?.brandCarName?.name || carDefault?.brandCarName?.name}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                placeholder="Dòng xe"
                                leftSection={<IconPlus size={22} color="blue" />}
                                value={carSelect?.modelCarName?.name || carDefault?.modelCarName?.name}
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
                    <Grid gutter={10} mt="md">
                        <Grid.Col span={6}>
                            <Select
                                placeholder="Danh mục đặt lịch"
                                withAsterisk
                                data={categoryOptions}
                                leftSection={<IconPlus size={22} color="blue" />}
                                {...form.getInputProps('category')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6} className="input-date">
                            <DateTimePicker
                                valueFormat="DD/MM/YYYY hh:mm A"
                                placeholder="Thời gian đặt lịch"
                                defaultValue={eventInfos?.start}
                                leftSection={<IconPlus size={22} color="blue" />}
                                rightSection={pickerControl}
                                {...form.getInputProps('arrival_time')}
                            />
                        </Grid.Col>
                    </Grid>
                    {garageId.length > 0 && (
                        <Grid gutter={10} mt="md">
                            <Grid.Col span={6}>
                                <Select
                                    placeholder="Chọn CVDV"
                                    leftSection={<IconPlus size={22} color="blue" />}
                                    withAsterisk
                                    data={advisorOptions}
                                    {...form.getInputProps('service_advisor')}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Select
                                    placeholder="Chuyên gia"
                                    data={garageOptions}
                                    withAsterisk
                                    {...form.getInputProps('garageId')}
                                />
                            </Grid.Col>
                        </Grid>
                    )}

                    <Grid mt="md">
                        <Grid.Col span={12}>
                            <Textarea
                                placeholder="Ghi chú cho CVDV"
                                withAsterisk
                                {...form.getInputProps('description')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Group grow preventGrowOverflow={false} wrap="nowrap" mt="md" className="footer-modal-schedule">
                        <div>
                            Đăng ký <a href="/">DatXe</a> để quản lý lịch sử xe, hoặc <a href="/">đăng nhập</a>
                        </div>
                        <Button w={100} loading={loading} bg={'var(--theme-color)'} type="submit" key="submit">
                            Đặt lịch
                        </Button>
                    </Group>
                </form>
            </Modal>
            <ModalEventCalendar
                close={closeLogin}
                opened={openedLogin}
                phone={form.values.phone}
                name={form.values.name}
            />
        </>
    );
};
