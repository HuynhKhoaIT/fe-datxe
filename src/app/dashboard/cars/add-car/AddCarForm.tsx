'use client';
import { ICar } from '@/interfaces/car';
import { getBrands, getModels } from '@/utils/branch';
import { addCar } from '@/utils/car';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import styles from './AddCar.module.scss';
import classNames from 'classnames/bind';
import { IBrand } from '@/interfaces/brand';
const cx = classNames.bind(styles);
import { useRouter } from 'next/navigation';
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const { TextArea } = Input;

const AddCartForm = () => {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const router = useRouter();
    const [form] = Form.useForm();

    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.info({
            message: `Thành công`,
            description: 'Xe đã được thêm thành công',
            icon: <CheckOutlined style={{ color: 'green' }} />,
        });
    };

    const [brandsData, setBrandsData] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IBrand[]>([]);
    const [licensePlates, setLicensePlates] = useState('');
    const [colorCar, setColorCar] = useState('');
    const [vinNumber, setVinNumber] = useState<Number>();
    const [kmRepairt, setKmRepairt] = useState<Number>();
    const [brandId, setBrandId] = useState<Number>();
    const [machineNumber, setMachineNumber] = useState<Number>();
    const [description, setDescription] = useState('');
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
    const [carNameId, setCarNameId] = useState('0');
    const selectBrand = async (value: number) => {
        try {
            setAutomakerId(value.toString());
            setBrandId(value);
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
    const handleCancel = async () => {
        router.push('/dashboard');
    };
    const handleCreateCar = async () => {
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
            router.push('/dashboard/cars');
            openNotification();
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };
    return (
        <div>
            {contextHolder}
            <Form form={form} onFinish={handleCreateCar} layout="vertical">
                <Row gutter={10}>
                    <Col span={8}>
                        <Form.Item label="Biển số xe">
                            <Input
                                type="text"
                                name="licensePlates"
                                placeholder="Biển số xe"
                                onChange={(e) => setLicensePlates(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Hãng xe">
                            <Select placeholder="Chọn hãng xe" onChange={(value) => selectBrand(Number(value))}>
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
                            <Select placeholder="Chọn dòng xe" onChange={(e) => setCarNameId(e)}>
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
                                onChange={(e) => setVinNumber(Number(e.target.value))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Machine Number">
                            <Input
                                type="number"
                                name="machine_number"
                                placeholder="Machine Number"
                                onChange={(e) => setMachineNumber(Number(e.target.value))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={8}>
                        <Form.Item label="Km repairt">
                            <Input
                                type="number"
                                name="km_repairt"
                                placeholder="Km repairt"
                                onChange={(e) => setKmRepairt(Number(e.target.value))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Date Repairt">
                            <DatePicker
                                format={'DD/MM/YYYY'}
                                name="date_repair"
                                style={{ width: '100%' }}
                                onChange={(date) => handleDateRepairtChange(date?.toString())}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className={cx('row')}>
                    <Col span={8}>
                        <Form.Item label="Registration Deadline">
                            <DatePicker
                                format={'DD/MM/YYYY'}
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
                                onChange={(date) => handleMaterialChange(date)}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item label="Mô tả chi tiết">
                            <TextArea
                                showCount
                                name="description"
                                maxLength={100}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Mô tả chi tiết"
                                style={{ height: 120, resize: 'none' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="end" gutter={12}>
                    <Button danger key="cancel" onClick={handleCancel} icon={<StopOutlined />}>
                        Huỷ bỏ
                    </Button>
                    <Button
                        style={{ marginLeft: '12px' }}
                        key="submit"
                        htmlType="submit"
                        type="primary"
                        icon={<FontAwesomeIcon icon={faPlus} />}
                    >
                        Thêm xe
                    </Button>
                </Row>
            </Form>
        </div>
    );
};
export default AddCartForm;
