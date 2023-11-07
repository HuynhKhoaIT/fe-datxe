import { useSession } from 'next-auth/react';
import { Card, Col, Form, Input, Row, Select } from 'antd';
import { ICar } from '@/interfaces/car';
import { useEffect, useState } from 'react';
import { getCar } from '@/utils/car';
import { getBrand, getModels } from '@/utils/branch';

const CarInfoCart = ({ cars }: { cars: ICar[] }) => {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [car, setCar] = useState<ICar>();
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');

    const selectCar = async (value: string) => {
        try {
            const selectedCar = await getCar(token ?? '', value);
            setCar(selectedCar);
        } catch (error) {
            console.error('Error selecting car:', error);
        }
    };

    const carOptions = cars?.map((car) => (
        <Select.Option key={car.id} value={car.id}>
            {car.licensePlates}
        </Select.Option>
    ));

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (car) {
                    const brandData = await getBrand(car.automakerId ?? 0);
                    setBrand(brandData.name);

                    const modelData = await getBrand(car.carNameId ?? 0);
                    setModel(modelData.name);
                    console.log(modelData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [car]);

    return (
        <div id="root">
            <Card>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="Biển số"
                            name="licensePlates"
                            rules={[{ required: true, message: 'Vui lòng chọn biển số' }]}
                            wrapperCol={{ span: 24 }}
                        >
                            <Select placeholder="Biển số" onChange={(value) => selectCar(value)}>
                                {carOptions}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Hãng Xe">
                            <Input placeholder="Hãng Xe" name="brand" readOnly value={brand || ''} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Dòng xe">
                            <Input placeholder="Dòng xe" readOnly value={model || ''} />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export { CarInfoCart };
