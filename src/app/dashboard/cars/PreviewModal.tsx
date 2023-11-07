'use client';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICar } from '@/interfaces/car';
import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
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

const PreviewModal = ({ data, onOk, open, onCancel, ...props }: any) => {
    const [form] = Form.useForm();
    const { data: session } = useSession();
    const token = session?.user?.token;

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [brandsData, setBrandsData] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IBrand[]>([]);
    const [colorCar, setColorCar] = useState(data.color);
    const [vinNumber, setVinNumber] = useState<Number>(data.vinNumber);
    const [kmRepairt, setKmRepairt] = useState<Number>(data.kmRepairt);
    const [brandId, setBrandId] = useState<Number>(data.automakerId);
    const [machineNumber, setMachineNumber] = useState<Number>(data.machineNumber);
    const [description, setDescription] = useState(data.description);
    const [dateRepairt, setDateRepairt] = useState(data.dateRepairt);
    const [registrationDeadline, setRegistrationDeadline] = useState(data.registrationDate);
    const [civilDeadline, setCivilDeadline] = useState(data.civilDeadline);
    const [materialDeadline, setMaterialDeadline] = useState(data.materialInsuranceDate);
    const [automakerId, setAutomakerId] = useState(data.automakerId);
    const [carNameId, setCarNameId] = useState(data.carNameId);
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data) {
                    const brandData = await getBrand(data.automakerId ?? 0);
                    setBrand(brandData.name);

                    const modelData = await getBrand(data.carNameId ?? 0);
                    setModel(modelData.name);

                    const dong_xe: IBrand[] = await getModels(data.automakerId);
                    setModels(dong_xe);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Modal
            title="Thông tin chi tiết"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            style={{ zIndex: '99999' }}
            {...props}
        >
            <Form form={form} layout="vertical">
                <Row gutter={10}>
                    <Col span={8}>
                        <Form.Item label="Biển số xe">
                            <Input
                                readOnly
                                type="text"
                                name="licensePlates"
                                placeholder="Biển số xe"
                                defaultValue={data.licensePlates}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Hãng xe">
                            <Input readOnly type="text" name="brandCar" defaultValue={brand} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Dòng xe">
                            <Input readOnly type="text" name="modelCar" defaultValue={model} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={8}>
                        <Form.Item label="Màu xe">
                            <Input readOnly type="text" name="color" defaultValue={data.color} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Vin Number">
                            <Input readOnly type="number" name="vin_number" defaultValue={Number(data.vinNumber)} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Machine Number">
                            <Input readOnly type="number" name="machine_number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={8}>
                        <Form.Item label="Km repairt">
                            <Input readOnly type="number" name="km_repairt" defaultValue={data.kmRepairt?.toString()} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Date Repairt">
                            <Input
                                value={dayjs(data.maintenanceDate).format('DD/MM/YYYY')}
                                name="date_repair"
                                style={{ width: '100%' }}
                                readOnly
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={8}>
                        <Form.Item label="Registration Deadline">
                            <Input
                                value={dayjs(data.registrationDate).format('DD/MM/YYYY')}
                                name="registration_deadline"
                                style={{ width: '100%' }}
                                readOnly
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Civil deadline">
                            <Input
                                value={dayjs(data.civilDeadline).format('DD/MM/YYYY')}
                                name="civil_insurance_deadline"
                                style={{ width: '100%' }}
                                readOnly
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Material deadline">
                            <Input
                                value={dayjs(data.materialDeadline).format('DD/MM/YYYY')}
                                name="material_insurance_deadline"
                                style={{ width: '100%' }}
                                readOnly
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
                                defaultValue={data.description}
                                style={{ height: 120, resize: 'none' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};
export default PreviewModal;
