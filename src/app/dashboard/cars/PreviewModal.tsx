'use client';
import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Modal, Row, Spin } from 'antd';
import { getBrand } from '@/utils/branch';
import dayjs from 'dayjs';
const { TextArea } = Input;

const PreviewModal = ({ data, onOk, open, onCancel, ...props }: any) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    return (
        <Modal
            title="Thông tin chi tiết"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            style={{ zIndex: '99999' }}
            {...props}
        >
            <Spin spinning={loading}>
                <Form form={form} layout="vertical">
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
                                <Input readOnly type="text" name="brandCar" value={data.brandName} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Dòng xe">
                                <Input readOnly type="text" name="modelCar" value={data.modelName} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={8}>
                            <Form.Item label="Màu xe">
                                <Input readOnly type="text" name="color" value={data.color} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Vin Number">
                                <Input readOnly type="number" name="vin_number" value={Number(data.vinNumber)} />
                            </Form.Item>
                        </Col>
                        {/* <Col span={8}>
                        <Form.Item label="Machine Number">
                            <Input readOnly type="number" name="machine_number" />
                        </Form.Item>
                    </Col> */}
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
                    {/* <Row gutter={10}>
                    <Col span={8}>
                        <Form.Item label="Km repairt">
                            <Input readOnly type="number" name="km_repairt" defaultValue={data.kmRepairt?.toString()} />
                        </Form.Item>
                    </Col>
                </Row> */}
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
                    {/* <Row>
                    <Col span={24}>
                        <Form.Item label="Mô tả chi tiết">
                            <TextArea
                                readOnly
                                showCount
                                name="description"
                                maxLength={100}
                                placeholder="Mô tả chi tiết"
                                value={data.description}
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
export default PreviewModal;
