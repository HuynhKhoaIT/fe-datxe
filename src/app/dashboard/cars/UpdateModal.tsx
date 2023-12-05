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
const UpdateModal = ({ fetchCars, data, opened, onCancel }: any) => {
    const [disabled, setDisabled] = useState(true);
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [brandsData, setBrandsData] = useState<IBrand[]>([]);
    const [models, setModels] = useState<any>([]);
    const [colorCar, setColorCar] = useState(data?.color);
    const [vinNumber, setVinNumber] = useState<string | number>(data?.vinNumber);
    const [kmRepairt, setKmRepairt] = useState<Number>(data?.kmRepairt);
    const [machineNumber, setMachineNumber] = useState<Number>(data?.machineNumber);
    const [description, setDescription] = useState(data?.description);
    const [dateRepairt, setDateRepairt] = useState(data?.dateRepairt);
    const [registrationDeadline, setRegistrationDeadline] = useState(data?.registrationDate);
    const [civilDeadline, setCivilDeadline] = useState(data?.civilDeadline);
    const [materialDeadline, setMaterialDeadline] = useState(data?.materialInsuranceDate);
    const [automakerId, setAutomakerId] = useState(data?.automakerId);
    const [carNameId, setCarNameId] = useState(data?.carNameId);
    const [brandId, setBrandId] = useState<Number>();
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
    const selectBrand = async (value: number) => {
        try {
            setAutomakerId(value);
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
                setBrandsData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            setDisabled(true);
            try {
                if (data) {
                    setAutomakerId(data.automakerId);
                    setBrand(data.automakerId);
                    setModel(data.carNameId);
                    setCarNameId(data.carNameId);
                    setColorCar(data.color);
                    setCivilDeadline(data.civilInsuranceDate);
                    setDateRepairt(data.maintenanceDate);
                    setKmRepairt(data.kmRepairt);
                    setRegistrationDeadline(data.registrationDate);
                    setVinNumber(data.vinNumber);
                    setMaterialDeadline(data.materialInsuranceDate);
                    setBrandId(data.automakerId);
                    selectBrand(data.automakerId);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [opened]);
    const handleUpdateCar = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            const newCar = {
                customer_id: session?.user?.id,
                number_plates: data.licensePlates,
                color: colorCar,
                car_name_id: carNameId,
                vin_number: vinNumber,
                machine_number: machineNumber,
                km_repairt: kmRepairt,
                date_repairt: dateRepairt,
                registration_deadline: registrationDeadline,
                civil_insurance_deadline: civilDeadline,
                material_insurance_deadline: materialDeadline,
                automaker_id: automakerId,
                brand_id: brandId,
                description: description,
            };
            console.log(newCar);
            const createdCar = await updateCar(data.id, newCar, token ?? '');
            onCancel();
            fetchCars();
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };
    const newFormat = brandsData?.map((brand) => ({
        value: brand.id?.toString() || '',
        label: brand.name || '',
    }));
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
                <form onSubmit={handleUpdateCar}>
                    <Grid gutter={10}>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Biển số xe"
                                readOnly
                                type="text"
                                name="licensePlates"
                                placeholder="Biển số xe"
                                value={data.licensePlates}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Select
                                label="Hãng xe"
                                checkIconPosition="right"
                                placeholder="Chọn hãng xe"
                                defaultValue={brand}
                                data={newFormat}
                                onChange={(value) => {
                                    setDisabled(false);
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
                                    setDisabled(false);
                                    setCarNameId(e);
                                }}
                                defaultValue={model}
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
                                defaultValue={data?.color}
                                onChange={(e) => {
                                    setDisabled(false);
                                    setColorCar(e.target.value);
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <NumberInput
                                label="Vin number"
                                name="vin_number"
                                placeholder="Vin Number"
                                defaultValue={Number(data.vinNumber)}
                                onChange={setVinNumber}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <DateInput
                                label="Date Repairt"
                                valueFormat={'DD/MM/YYYY'}
                                defaultValue={data?.maintenanceDate ? dayjs(data?.maintenanceDate).toDate() : null}
                                onChange={(date) => {
                                    setDisabled(false);
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
                                defaultValue={dayjs(data.registrationDate).toDate()}
                                onChange={(date) => {
                                    setDisabled(false);
                                    handleRegistrationChange(date?.toString());
                                }}
                                placeholder="Registration Deadline"
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <DateInput
                                label="Civil deadline"
                                valueFormat={'DD/MM/YYYY'}
                                defaultValue={dayjs(data.civilDeadline).toDate()}
                                onChange={(date) => {
                                    setDisabled(false);
                                    handleCivilChange(date?.toString());
                                }}
                                placeholder="Civil deadline"
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <DateInput
                                label="Material deadline"
                                valueFormat={'DD/MM/YYYY'}
                                defaultValue={dayjs(data.materialInsuranceDate).toDate()}
                                onChange={(date) => {
                                    setDisabled(false);
                                    handleMaterialChange(date?.toString());
                                }}
                                placeholder="Material deadline"
                            />
                        </Grid.Col>
                    </Grid>
                    <Group justify="end" style={{ marginTop: 10 }}>
                        <Button variant="outline" color="red" size="xs" onClick={onCancel} leftSection={<IconBan />}>
                            Huỷ bỏ
                        </Button>
                        <Button variant="filled" size="xs" type="submit">
                            Cập nhật
                        </Button>
                    </Group>
                </form>
            </Box>
        </BasicModal>
    );
};
export default UpdateModal;
