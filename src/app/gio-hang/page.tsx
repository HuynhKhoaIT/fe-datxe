'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import CartItem from '../components/cart/cartItem';
import { checkOutCart } from '@/utils/order';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { CarInfoCart } from '../components/cart/carInfo';
import { useSession } from 'next-auth/react';
import { Avatar, Button, Card, Col, DatePicker, Form, Input, Modal, Row, Table, TimePicker, notification } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { ICar } from '@/interfaces/car';
import { getCars } from '@/utils/car';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
    const [form] = Form.useForm();
    const router = useRouter();
    const { data: session, status } = useSession();
    const token = session?.user?.token;
    const [api, contextHolder] = notification.useNotification();
    const [time, setTime] = useState(dayjs().format('HH:mm'));
    const [date, setDate] = useState(dayjs().format('DD-MM-YYYY'));
    const [cars, setCars] = useState<ICar[]>([]);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [deleteRow, setDeleteRow] = useState<any>();
    const [cartData, setCartData] = useState<
        { product: { id: number; name: string; price: number; thumbnail: string }; quantity: number }[]
    >([]);

    const handleDeleteOk = () => {
        setIsModalDeleteOpen(false);
        deleteItem(deleteRow);
    };
    const handleDeleteCancel = () => {
        setIsModalDeleteOpen(false);
    };
    const handleOpenModalDelete = (record: any) => {
        setIsModalDeleteOpen(true);
        setDeleteRow(record);
    };
    const transformedProducts = cartData?.map((item) => {
        return {
            id: item?.product?.id,
            quantity: item?.quantity,
            price: item?.product?.price,
        };
    });

    function handleDateChange(date: any) {
        const dateString = dayjs(date).format('DD-MM-YYYY');
        setDate(dateString);
    }
    function handleTimeChange(date: any) {
        const time = dayjs(date).format('hh:mm');
        setTime(time);
    }

    //Lấy danh sách xe
    const fetchCars = async () => {
        try {
            if (token) {
                const fetchedCars = await getCars(token);
                setCars(fetchedCars ?? []);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };
    useEffect(() => {
        fetchCars();
    }, [token]);

    const openNotification = () => {
        api.info({
            message: `Thành công`,
            description: 'Đặt lịch thành công',
            icon: <CheckOutlined style={{ color: 'green' }} />,
        });
    };
    // tăng số lượng sản phẩm
    const incrementQuantity = (productId: number) => {
        const updateCartData = cartData.map((item) => {
            if (item.product.id === productId) {
                item.quantity += 1;
            }
            return item;
        });
        localStorage.setItem('cartData', JSON.stringify(updateCartData));
        setCartData(updateCartData);
    };
    // giảm số lượng sản phẩm
    const decrementQuantity = (productId: number) => {
        const updateCartData = cartData.map((item) => {
            if (item.product.id === productId && item.quantity > 1) {
                item.quantity -= 1;
            }
            return item;
        });
        localStorage.setItem('cartData', JSON.stringify(updateCartData));
        setCartData(updateCartData);
    };

    // Tính tổng tiền
    const calculateSubTotal = () => {
        let subTotal = 0;
        cartData.forEach((item) => {
            subTotal += item.product.price * item.quantity;
        });
        return subTotal;
    };
    // Xóa sản phẩm ra khỏi giỏ hàng
    const deleteItem = (productId: number) => {
        const updatedCartData = cartData.filter((item) => item.product.id !== productId);
        localStorage.setItem('cartData', JSON.stringify(updatedCartData));
        setCartData(updatedCartData);
    };

    useEffect(() => {
        const existingCartData = localStorage.getItem('cartData');
        if (existingCartData) {
            const parsedCartData = JSON.parse(existingCartData);
            setCartData(parsedCartData);
        }
    }, []);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const checkOut = await checkOutCart(date, time, transformedProducts, token ?? '');
            localStorage.setItem('carData', JSON.stringify([]));
            router.push('/dashboard/order/' + checkOut.id);
            openNotification();
            localStorage.setItem('cartData', JSON.stringify([]));
            const existingCartData = localStorage.getItem('cartData');
            if (existingCartData) {
                const parsedCartData = JSON.parse(existingCartData);
                setCartData(parsedCartData);
            }
        } catch (error: any) {
            console.log('Login fail');
            console.error('Login error:', error.message);
        }
    };

    const columns: any = [
        {
            title: 'Hình',
            dataIndex: ['product', 'thumbnail'],
            key: 'image',
            width: '100px',
            render: (record: string) => <Avatar shape="square" src={record} style={{ width: '70px' }} />,
        },
        {
            title: 'Tên',
            dataIndex: ['product', 'name'],
            key: 'ten',
        },
        {
            title: 'Giá',
            dataIndex: ['product', 'price'],
            key: 'gia',
            render: (record: any) => <span>{record.toLocaleString()}đ</span>,
        },
        {
            title: 'Số lượng',
            key: 'soLuong',
            width: '200px',
            align: 'center',
            render: (record: any) => (
                <>
                    <Button type="link" onClick={() => decrementQuantity(record.product.id)}>
                        <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <span style={{ padding: '10px' }}>{record.quantity}</span>
                    <Button type="link" onClick={() => incrementQuantity(record.product.id)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </>
            ),
        },
        {
            title: 'Thành tiền',
            key: 'thanhTien',
            width: '120px',
            align: 'right',
            render: (record: any) => <span>{(record?.product.price * record.quantity).toLocaleString()}đ</span>,
        },
        {
            title: 'Hành động',
            dataIndex: ['product', 'id'],
            width: '50px',
            align: 'center',
            render: (record: number) => (
                <Button type="link" onClick={() => handleOpenModalDelete(record)} style={{ padding: 0 }}>
                    <DeleteOutlined style={{ color: 'red' }} />
                </Button>
            ),
        },
    ];
    console.log(cartData);
    return (
        <main className="main">
            {contextHolder}
            <Form form={form} onFinish={onSubmit} layout="vertical">
                <div className="shop-cart pt-60 pb-60">
                    <div className="container">
                        <Row gutter={16}>
                            <Col xs={24} md={24} lg={12} xl={12}>
                                <div className="checkout-widget">
                                    <h4 className="checkout-widget-title">Thông tin khách hàng</h4>
                                    <Card>
                                        <Row gutter={16}>
                                            <Col span={24}>
                                                <Form.Item label="Họ Tên" name="name" wrapperCol={{ span: 24 }}>
                                                    <Input
                                                        placeholder="Họ Tên"
                                                        readOnly
                                                        defaultValue={session?.user?.name || ''}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item label="Email" name="email">
                                                    <Input
                                                        placeholder="Email"
                                                        readOnly
                                                        defaultValue={session?.user?.email ?? ''}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Điện thoại" name="phone">
                                                    <Input
                                                        placeholder="Điện thoại"
                                                        readOnly
                                                        defaultValue={session?.user?.phone ?? ''}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            </Col>
                            <Col span={12} xs={24} md={24} lg={12} xl={12}>
                                <div className="checkout-widget">
                                    <h4 className="checkout-widget-title">Thông tin Xe</h4>
                                    <CarInfoCart cars={cars} />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Card className="bg-white mb-20 p-4">
                                    <Row gutter={16}>
                                        <Col xs={24} md={24} lg={12} xl={12}>
                                            <Form.Item
                                                label="Ngày"
                                                name="date"
                                                wrapperCol={{ span: 24 }}
                                                rules={[
                                                    { required: true, message: 'Vui lòng chọn một ngày' },
                                                    // ({ getFieldValue }) => ({
                                                    //     validator(rule, value) {
                                                    //         if (!value || dayjs(value).isAfter(dayjs(), 'day')) {
                                                    //             return Promise.resolve();
                                                    //         }
                                                    //         return Promise.reject(
                                                    //             'Ngày phải lớn hơn hoặc bằng ngày hiện tại',
                                                    //         );
                                                    //     },
                                                    // }),
                                                ]}
                                                initialValue={dayjs()}
                                            >
                                                <DatePicker
                                                    format={'DD/MM/YYYY'}
                                                    name="date"
                                                    style={{ width: '100%' }}
                                                    onChange={(date) => handleDateChange(date?.toString())}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} md={24} lg={12} xl={12}>
                                            <Form.Item
                                                label="Thời gian"
                                                name="time"
                                                wrapperCol={{ span: 24 }}
                                                rules={[{ required: true, message: 'Vui lòng chọn thời gian' }]}
                                                initialValue={dayjs()}
                                            >
                                                <TimePicker
                                                    onChange={(time) => handleTimeChange(time?.toString())}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <div className="container">
                        <Card className="shop-cart-wrapper">
                            <div className="table-responsive">
                                {/* <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Hình</th>
                                            <th>Tên</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                            <th>Thành tiền</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartData.map((item, index) => (
                                            <CartItem
                                                key={index}
                                                item={item}
                                                decrementQuantity={decrementQuantity}
                                                incrementQuantity={incrementQuantity}
                                                deleteItem={deleteItem}
                                            />
                                        ))}
                                    </tbody>
                                </table> */}
                                <Table dataSource={cartData} columns={columns} />
                            </div>

                            <Card className="cart-footer">
                                <Row justify="space-between">
                                    <Col xs={24} md={8} lg={8} xl={8}>
                                        <Form.Item className="cart-coupon ">
                                            <Input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Coupon Code"
                                            />
                                            <Button className="coupon-btn" type="primary">
                                                Apply
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12} lg={8} xl={8}>
                                        <ul>
                                            <li>
                                                <strong>Tổng tiền hàng:</strong>{' '}
                                                <span>{calculateSubTotal().toLocaleString()}đ</span>
                                            </li>
                                            <li className="cart-total">
                                                <strong>Tổng cộng:</strong>{' '}
                                                <span>{calculateSubTotal().toLocaleString()}đ</span>
                                            </li>
                                        </ul>
                                        <Form.Item style={{ textAlign: 'right' }}>
                                            <Button
                                                className="theme-btn"
                                                type="primary"
                                                htmlType="submit"
                                                // style={{ background: 'var(--theme-color)' }}
                                            >
                                                Đặt lịch
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Card>
                    </div>
                </div>
            </Form>
            <Modal title="Delete" open={isModalDeleteOpen} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
                <p>Bạn có muốn xoá không?</p>
            </Modal>
        </main>
    );
}
