'use client';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICar } from '@/interfaces/car';
import { Col, DatePicker, Form, Input, Modal, Row, Select, Spin } from 'antd';
import styles from './add-car/AddCar.module.scss';
import classNames from 'classnames/bind';
import { IBrand } from '@/interfaces/brand';
import AddCartForm from './add-car/AddCarForm';
import { getBrand, getBrands, getModels } from '@/utils/branch';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { updateCar } from '@/utils/car';
const { TextArea } = Input;

const cx = classNames.bind(styles);

const UpdateModal = ({ fetchCars, data, onOk, open, onCancel, ...props }: any) => {
    const [form] = Form.useForm();
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [loading, setLoading] = useState(false);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [brandsData, setBrandsData] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IBrand[]>([]);
    const [colorCar, setColorCar] = useState(data?.color);
    const [vinNumber, setVinNumber] = useState<Number>(data?.vinNumber);
    const [kmRepairt, setKmRepairt] = useState<Number>(data?.kmRepairt);
    const [machineNumber, setMachineNumber] = useState<Number>(data?.machineNumber);
    const [description, setDescription] = useState(data?.description);
    const [dateRepairt, setDateRepairt] = useState(data?.dateRepairt);
    const [registrationDeadline, setRegistrationDeadline] = useState(data?.registrationDate);
    const [civilDeadline, setCivilDeadline] = useState(data?.civilDeadline);
    const [materialDeadline, setMaterialDeadline] = useState(data?.materialInsuranceDate);
    const [automakerId, setAutomakerId] = useState(data?.automakerId);
    const [carNameId, setCarNameId] = useState(data?.carNameId);
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
            const dong_xe: IBrand[] = await getModels(value);
            setModels(dong_xe);
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
            try {
                console.log(data);
                if (data?.automakerId) {
                    setAutomakerId(data.automakerId);
                }
                console.log(data.automakerId);
                setBrand(data.brandName);
                setModel(data.modelName);
                setCarNameId(data.carNameId);
                setColorCar(data.color);
                setCivilDeadline(data.civilInsuranceDate);
                setDateRepairt(data.dateRepairt);
                setKmRepairt(data.kmRepairt);
                setRegistrationDeadline(data.registrationDate);
                setVinNumber(data.vinNumber);
                setMaterialDeadline(data.materialInsuranceDate);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [open]);
    const handleUpdateCar = async () => {
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
                description: description,
            };
            console.log(newCar);
            const createdCar = await updateCar(data.id, newCar, token ?? '');
            fetchCars();
            onCancel();
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };
    console.log(brand);
    return (
        <Modal
            title="Chỉnh sửa thông tin xe của bạn"
            open={open}
            onOk={() => {
                handleUpdateCar();
            }}
            destroyOnClose={true}
            okText="Cập nhật"
            cancelText="Huỷ"
            onCancel={onCancel}
            style={{ zIndex: '99999' }}
            {...props}
        >
            <Spin spinning={loading}>
                <Form form={form} layout="vertical" preserve={false}>
                    <Row gutter={10}>
                        <Col span={8}>
                            <Form.Item label="Biển số xe">
                                <Input
                                    readOnly
                                    type="text"
                                    name="licensePlates"
                                    placeholder="Biển số xe"
                                    value={data.licensePlates}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Hãng xe">
                                <Select
                                    placeholder="Chọn hãng xe"
                                    defaultValue={brand}
                                    onChange={(value) => selectBrand(Number(value))}
                                >
                                    <Select.Option>Chọn hãng xe</Select.Option>
                                    {brandsData &&
                                        brandsData?.map((brand: IBrand, index) => (
                                            <Select.Option key={index} value={brand.id?.toString()}>
                                                {brand.name}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Dòng xe">
                                <Select
                                    placeholder="Chọn dòng xe"
                                    onChange={(e) => setCarNameId(e)}
                                    defaultValue={model}
                                >
                                    <Select.Option>Chọn dòng xe</Select.Option>
                                    {models &&
                                        models?.map((model: IBrand, index) => (
                                            <Select.Option key={index} value={model.id?.toString()}>
                                                {model.name}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={8}>
                            <Form.Item label="Màu xe">
                                <Input
                                    type="text"
                                    name="color"
                                    placeholder="Màu xe"
                                    defaultValue={data?.color}
                                    onChange={(e) => setColorCar(e.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Vin Number">
                                <Input
                                    type="number"
                                    name="vin_number"
                                    placeholder="Vin Number"
                                    defaultValue={Number(data.vinNumber)}
                                    onChange={(e) => setVinNumber(Number(e.target.value))}
                                />
                            </Form.Item>
                        </Col>
                        {/* <Col span={8}>
                        <Form.Item label="Machine Number">
                            <Input
                                type="number"
                                name="machine_number"
                                placeholder="Machine Number"
                                // defaultValue={Number(data.vinNumber)}
                                onChange={(e) => setMachineNumber(Number(e.target.value))}
                            />
                        </Form.Item>
                    </Col> */}
                        <Col span={8}>
                            <Form.Item label="Date Repairt">
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    defaultValue={dayjs(data.maintenanceDate)}
                                    name="date_repair"
                                    style={{ width: '100%' }}
                                    onChange={(date) => handleDateRepairtChange(date?.toString())}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Row gutter={10}>
                    <Col span={8}>
                        <Form.Item label="Km repairt">
                            <Input
                                type="number"
                                name="km_repairt"
                                placeholder="Km repairt"
                                defaultValue={data.kmRepairt?.toString()}
                                onChange={(e) => setKmRepairt(Number(e.target.value))}
                            />
                        </Form.Item>
                    </Col>
                </Row> */}
                    <Row className={cx('row')}>
                        <Col span={8}>
                            <Form.Item label="Registration Deadline">
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    defaultValue={dayjs(data.registrationDate)}
                                    name="registration_deadline"
                                    style={{ width: '100%' }}
                                    onChange={(date) => handleRegistrationChange(date)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Civil deadline">
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    name="civil_insurance_deadline"
                                    defaultValue={dayjs(data.civilDeadline)}
                                    style={{ width: '100%' }}
                                    onChange={(date) => handleCivilChange(date)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Material deadline">
                                <DatePicker
                                    format={'DD/MM/YYYY'}
                                    name="material_insurance_deadline"
                                    defaultValue={dayjs(data.materialInsuranceDate)}
                                    onChange={(date) => handleMaterialChange(date)}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Row>
                    <Col span={24}>
                        <Form.Item label="Mô tả chi tiết">
                            <TextArea
                                showCount
                                name="description"
                                maxLength={100}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Mô tả chi tiết"
                                defaultValue={data.description}
                                style={{ height: 120, resize: 'none' }}
                            />
                        </Form.Item>
                    </Col>
                </Row> */}
                </Form>
            </Spin>
        </Modal>
    );
};
export default UpdateModal;
