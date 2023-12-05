'use client';
import { ICar } from '@/interfaces/car';
import { getBrands, getModels } from '@/utils/branch';
import { addCar, getCars, setCarDefault } from '@/utils/car';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Grid, Modal, TextInput, Box, Select, Button, Group, Textarea, NumberInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { IBrand } from '@/interfaces/brand';
import { useRouter } from 'next/navigation';
import { IconPlus, IconBan } from '@tabler/icons-react';
import BasicModal from '@/app/components/basicModal/BasicModal';
const AddCarModal = ({ opened, close, ...props }: any) => {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const router = useRouter();

    const [brandsData, setBrandsData] = useState<any>([]);
    const [models, setModels] = useState<any>([]);
    const [licensePlates, setLicensePlates] = useState('');
    const [colorCar, setColorCar] = useState('');
    const [vinNumber, setVinNumber] = useState<string | number>();
    const [kmRepairt, setKmRepairt] = useState<any>();
    const [brandId, setBrandId] = useState<Number>();
    const [machineNumber, setMachineNumber] = useState<string | number>();
    const [description, setDescription] = useState<any>();
    const [dateRepairt, setDateRepairt] = useState('');
    const [registrationDeadline, setRegistrationDeadline] = useState('');
    const [civilDeadline, setCivilDeadline] = useState('');
    const [materialDeadline, setMaterialDeadline] = useState('');
    function handleDateRepairtChange(date: any) {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setDateRepairt(dateString);
    }
    function handleRegistrationChange(date: any) {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setRegistrationDeadline(dateString);
    }
    function handleCivilChange(date: any) {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setCivilDeadline(dateString);
    }
    function handleMaterialChange(date: any) {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setMaterialDeadline(dateString);
    }
    const [automakerId, setAutomakerId] = useState('');
    const [carNameId, setCarNameId] = useState<string | null>();
    const selectBrand = async (value: number) => {
        try {
            setAutomakerId(value.toString());
            setBrandId(value);
            const dong_xe: IBrand[] = await getModels(value);
            const newModels = dong_xe?.map((model) => ({
                value: model.id?.toString() || '',
                label: model.name || '',
            }));
            setModels(newModels);
        } catch (error) {}
    };
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
    const handleCancel = async () => {
        router.push('/dashboard');
    };
    const handleCreateCar = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            const newCar = {
                customer_id: session?.user?.id,
                number_plates: licensePlates,
                color: colorCar,
                car_name_id: carNameId,
                brand_id: brandId,
                vin_number: vinNumber,
                machine_number: machineNumber,
                km_repairt: kmRepairt,
                date_repairt: dateRepairt,
                registration_deadline: registrationDeadline,
                civil_insurance_deadline: civilDeadline,
                material_insurance_deadline: materialDeadline,
                automaker_id: automakerId,
                description: description,
            };
            const createdCar = await addCar(newCar, token ?? '');
            const cars: any = await getCars(token ?? '');
            console.log(cars);
            if (cars?.length < 2) {
                try {
                    const carDefault = await setCarDefault(cars[0]?.id, token ?? '');
                    console.log(carDefault);
                } catch (error) {
                    console.error('Error set car:', error);
                    console.log('fail');
                }
            }
            close();
            notifications.show({
                title: 'Default notification',
                message: 'Hey there, your code is awesome! 🤥',
            });
        } catch (error) {
            close();

            console.error('Error creating car:', error);
        }
    };

    return (
        <BasicModal
            size={800}
            title="Thêm xe"
            isOpen={opened}
            closeButtonProps
            onCloseModal={close}
            lockScroll={false}
            forceRender={!open}
            {...props}
        >
            <Box maw={800} mx="auto">
                <form onSubmit={handleCreateCar}>
                    <Grid gutter={10}>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Biển số xe"
                                type="text"
                                name="licensePlates"
                                placeholder="Biển số xe"
                                onChange={(e) => setLicensePlates(e.target.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Select
                                label="Hãng xe"
                                checkIconPosition="right"
                                placeholder="Chọn hãng xe"
                                data={brandsData}
                                onChange={(value) => {
                                    selectBrand(Number(value));
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Select
                                label="Dòng xe"
                                checkIconPosition="right"
                                placeholder="Chọn dòng xe"
                                data={models}
                                onChange={(e) => {
                                    setCarNameId(e);
                                }}
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
                                onChange={(e) => {
                                    setColorCar(e.target.value);
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <NumberInput
                                label="Vin number"
                                name="vin_number"
                                placeholder="Vin Number"
                                onChange={setVinNumber}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <NumberInput
                                label="Machine Number"
                                name="machine_number"
                                placeholder="Machine Number"
                                onChange={setMachineNumber}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid gutter={10}>
                        <Grid.Col span={4}>
                            <NumberInput
                                label="Km repairt"
                                name="km_repairt"
                                placeholder="Km repairt"
                                onChange={setKmRepairt}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <DateInput
                                label="Date Repairt"
                                valueFormat={'DD/MM/YYYY'}
                                onChange={(date) => {
                                    handleDateRepairtChange(date?.toString());
                                }}
                                placeholder="Date Repairt"
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid gutter={10}>
                        <Grid.Col span={4}>
                            <DateInput
                                label="Registration Deadline"
                                valueFormat={'DD/MM/YYYY'}
                                onChange={(date) => {
                                    handleRegistrationChange(date?.toString());
                                }}
                                placeholder="Registration Deadline"
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <DateInput
                                label="Civil deadline"
                                valueFormat={'DD/MM/YYYY'}
                                onChange={(date) => {
                                    handleCivilChange(date?.toString());
                                }}
                                placeholder="Civil deadline"
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <DateInput
                                label="Material deadline"
                                valueFormat={'DD/MM/YYYY'}
                                onChange={(date) => {
                                    handleMaterialChange(date?.toString());
                                }}
                                placeholder="Material deadline"
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid>
                        <Grid.Col span={12}>
                            <Textarea
                                label="Mô tả chi tiết"
                                name="description"
                                maxLength={100}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Mô tả chi tiết"
                            />
                        </Grid.Col>
                    </Grid>
                    <Group justify="end" style={{ marginTop: 10 }}>
                        <Button
                            variant="outline"
                            key="cancel"
                            onClick={handleCancel}
                            color="red"
                            leftSection={<IconBan size={16} />}
                        >
                            Huỷ bỏ
                        </Button>
                        <Button
                            style={{ marginLeft: '12px' }}
                            key="submit"
                            type="submit"
                            variant="filled"
                            leftSection={<IconPlus size={16} />}
                        >
                            Thêm xe
                        </Button>
                    </Group>
                </form>
            </Box>
        </BasicModal>
    );
};
export default AddCarModal;
