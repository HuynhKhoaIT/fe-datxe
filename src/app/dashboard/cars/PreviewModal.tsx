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
const cx = classNames.bind(styles);

const PreviewModal = ({ data, onOk, open, onCancel, ...props }: any) => {
    const [form] = Form.useForm();

    console.log(data);

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
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

                    console.log(modelData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [data]);
    return (
        <Modal
            title="Thông tin chi tiết"
            open={open}
            onOk={onOk}
            footer={false}
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
                            <Select
                                placeholder="Chọn hãng xe"
                                onChange={(value) => selectBrand(Number(value))}
                                defaultValue={brand}
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
                            <Select placeholder="Chọn dòng xe" onChange={(e) => setCarNameId(e)} defaultValue={model}>
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
                                defaultValue={data.color}
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
                    <Col span={8}>
                        <Form.Item label="Machine Number">
                            <Input
                                type="number"
                                name="machine_number"
                                placeholder="Machine Number"
                                // defaultValue={Number(data.vinNumber)}
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
                                defaultValue={data.kmRepairt?.toString()}
                                onChange={(e) => setKmRepairt(Number(e.target.value))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Date Repairt">
                            <DatePicker
                                format={'DD/MM/YYYY'}
                                defaultValue={dayjs(data.maintenanceDate)}
                                name="date_repair"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className={cx('row')}>
                    <Col span={8}>
                        <Form.Item label="Registration Deadline">
                            <DatePicker
                                format={'DD/MM/YYYY'}
                                defaultValue={dayjs(data.registrationDate)}
                                name="registration_deadline"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Civil deadline">
                            <DatePicker
                                format={'DD/MM/YYYY'}
                                name="civil_insurance_deadline"
                                defaultValue={dayjs(data.registrationDate)}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Material deadline">
                            <DatePicker
                                format={'DD/MM/YYYY'}
                                name="material_insurance_deadline"
                                defaultValue={dayjs(data.registrationDate)}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div className={cx('form-group')}>
                            <label>Mô tả chi tiết</label>

                            <textarea
                                rows={4}
                                name="description"
                                className="form-control"
                                placeholder="Mô tả chi tiết"
                                value={data.description?.toString()}
                            ></textarea>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};
export default PreviewModal;
