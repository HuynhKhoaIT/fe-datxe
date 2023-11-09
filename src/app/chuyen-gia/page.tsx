'use client';
import { GarageItem } from '../components/garageItem/garageItem';
import React, { useEffect, useState } from 'react';
import { getGarages } from '@/utils/garage';
import { IGarage } from '@/interfaces/garage';
import { Col, List, Row } from 'antd';
import { Pagination } from '../components/pagination-area/pagination-area';
export default async function Expert() {
    const [garageData, setGarageData] = useState<IGarage[]>([]);

    useEffect(() => {
        const fetchGarageData = async () => {
            try {
                const data = await getGarages(); // Gọi hàm getGarages từ nơi bạn đã định nghĩa
                setGarageData(data); // Lưu trữ dữ liệu vào state
            } catch (error) {
                console.error('Error fetching garage data:', error);
            }
        };

        fetchGarageData(); // Gọi hàm fetchGarageData khi component mount hoặc garages thay đổi
    }, []);
    return (
        <main className="main">
            {/* <!-- shop-area --> */}
            <div className="shop-area car-area list bg pt-50 pb-50">
                <div className="container">
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 5,
                            xxl: 6,
                        }}
                        dataSource={garageData}
                        renderItem={(item) => (
                            <List.Item>
                                <GarageItem garage={item} />
                            </List.Item>
                        )}
                    />
                    <Row>
                        <Col span={24}>
                            {/* <div className="shop-item-wrapper">
                                <Row>
                                    {garage_data.map((garage: IGarage, index) => (
                                        <GarageItem garage={garage} key={index} />
                                    ))}
                                </Row>
                            </div> */}
                            {/* <Pagination data={garageData} /> */}
                        </Col>
                    </Row>
                </div>
            </div>
        </main>
    );
}
