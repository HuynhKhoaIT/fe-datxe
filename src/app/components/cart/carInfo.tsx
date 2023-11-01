'use client';
import { useSession } from 'next-auth/react';
import { Card, Col, Form, Input, Row, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import { ICar } from '@/interfaces/car';
import { useState } from 'react';
import { getCar } from '@/utils/car';
const CarInfoCart = ({ cars }: { cars: ICar }) => {
    const { data: session, status } = useSession();
    const token = session?.user?.token;
    const [car, setCar] = useState<ICar>();
    const selectCar = async (value: string) => {
        console.log(value);
        try {
            const car = await getCar(token ?? '', value);
            setCar(car);
        } catch (error) {}
    };
    const carOptions = cars.map((car) => (
        <Option key={car.id} value={car.id.toString()}>
            {car.licensePlates}
        </Option>
    ));
    console.log(car);
    return (
        <div id="root">
            <Card>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Biển số"
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng chọn biển số' }]}
                            wrapperCol={{ span: 24 }}
                        >
                            <Select placeholder="Biển số" onChange={(value) => selectCar(value)}>
                                {carOptions}
                                <Option value="disabled" disabled>
                                    Disabled
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Hãng Xe" name="username">
                            <Input placeholder="Hãng Xe" readOnly />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Dòng xe" name="username">
                            <Input placeholder="Dòng xe" readOnly />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Năm sản xuất" name="username">
                            <Input placeholder="Năm sản xuất" readOnly />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};
export { CarInfoCart };
