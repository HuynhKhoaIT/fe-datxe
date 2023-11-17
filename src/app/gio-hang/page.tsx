'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import CartItem from '../components/cart/cartItem';
import { checkOutCart } from '@/utils/order';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { CarInfoCart } from '../components/cart/carInfo';
import { useSession } from 'next-auth/react';
import { Grid, Modal, TextInput, Box, Select, Button, Group, Table, NumberInput, Card, Avatar } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { ActionIcon, rem } from '@mantine/core';
import { ICar } from '@/interfaces/car';
import { getCars } from '@/utils/car';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { faClock } from '@fortawesome/free-regular-svg-icons';

export default function Cart() {
    // const [form] = Form.useForm();
    const ref = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { data: session, status } = useSession();
    const token = session?.user?.token;
    // const [api, contextHolder] = notification.useNotification();
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

    // const openNotification = () => {
    //     api.info({
    //         message: `Thành công`,
    //         description: 'Đặt lịch thành công',
    //         icon: <CheckOutlined style={{ color: 'green' }} />,
    //     });
    // };
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
        // e.preventDefault();
        try {
            const checkOut = await checkOutCart(date, time, transformedProducts, token ?? '');
            localStorage.setItem('carData', JSON.stringify([]));
            // openNotification();
            localStorage.setItem('cartData', JSON.stringify([]));
            const existingCartData = localStorage.getItem('cartData');
            if (existingCartData) {
                const parsedCartData = JSON.parse(existingCartData);
                setCartData(parsedCartData);
            }
            router.push('/dashboard/order/' + checkOut.id);
        } catch (error: any) {
            console.log('Login fail');
            console.error('Login error:', error.message);
        }
    };

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <FontAwesomeIcon icon={faClock} />
        </ActionIcon>
    );

    const renderRows = () => {
        // if (loading) {
        //     return (
        //         <tr>
        //             <td colSpan={7}>
        //                 <Center>
        //                     <Loader size={36} />
        //                 </Center>
        //             </td>
        //         </tr>
        //     );
        // }

        return cartData?.map((record) => (
            <Table.Tr key={record.product.id}>
                <Table.Td>
                    <Avatar variant="filled" radius="sm" size="lg" src={record.product.thumbnail} />
                </Table.Td>
                <Table.Td>{record.product.name}</Table.Td>
                <Table.Td>{record.product.price.toLocaleString()}đ</Table.Td>

                <Table.Td width={180} align="center">
                    <>
                        <Button variant="transparent" onClick={() => decrementQuantity(record.product.id)}>
                            <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <span style={{ padding: '10px' }}>{record.quantity}</span>
                        <Button variant="transparent" onClick={() => incrementQuantity(record.product.id)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </>
                </Table.Td>
                <Table.Td>
                    <span>{(record?.product.price * record.quantity).toLocaleString()}đ</span>
                </Table.Td>

                <Table.Td width={30} align="center">
                    <Button
                        variant="transparent"
                        color="red"
                        onClick={() => handleOpenModalDelete(record)}
                        style={{ padding: 0 }}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                </Table.Td>
            </Table.Tr>
        ));
    };

    return (
        <main className="main">
            {/* {contextHolder} */}
            <form onSubmit={onSubmit}>
                <div className="shop-cart pt-60 pb-60">
                    <div className="container">
                        <Grid gutter={16}>
                            <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
                                <div className="checkout-widget">
                                    <h4 className="checkout-widget-title">Thông tin khách hàng</h4>
                                    <Card>
                                        <Grid gutter={16}>
                                            <Grid.Col span={12}>
                                                <TextInput
                                                    label="Họ Tên"
                                                    placeholder="Họ Tên"
                                                    readOnly
                                                    defaultValue={session?.user?.name || ''}
                                                />
                                            </Grid.Col>
                                        </Grid>
                                        <Grid gutter={16}>
                                            <Grid.Col span={6}>
                                                <TextInput
                                                    label="Email"
                                                    placeholder="Email"
                                                    readOnly
                                                    defaultValue={session?.user?.email ?? ''}
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <TextInput
                                                    label="Điện thoại"
                                                    placeholder="Điện thoại"
                                                    readOnly
                                                    defaultValue={session?.user?.phone ?? ''}
                                                />
                                            </Grid.Col>
                                        </Grid>
                                    </Card>
                                </div>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
                                <div className="checkout-widget">
                                    <h4 className="checkout-widget-title">Thông tin Xe</h4>
                                    <CarInfoCart cars={cars} />
                                </div>
                            </Grid.Col>
                        </Grid>
                        <Grid>
                            <Grid.Col span={12}>
                                <Card className="bg-white mb-20 p-4">
                                    <Grid gutter={16}>
                                        <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
                                            <DateInput
                                                label="Ngày"
                                                valueFormat={'DD/MM/YYYY'}
                                                name="date"
                                                defaultValue={new Date()}
                                                style={{ width: '100%' }}
                                                onChange={(date) => handleDateChange(date?.toString())}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
                                            <TimeInput
                                                withSeconds
                                                defaultValue={new Date().toLocaleTimeString('en-US', { hour12: false })}
                                                label="Thời gian"
                                                ref={ref}
                                                onChange={(time) => handleTimeChange(time?.toString())}
                                                rightSection={pickerControl}
                                            />
                                        </Grid.Col>
                                    </Grid>
                                </Card>
                            </Grid.Col>
                        </Grid>
                    </div>
                    <div className="container">
                        <Card className="shop-cart-wrapper">
                            <div className="table-responsive">
                                <Table>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>Hình ảnh</Table.Th>
                                            <Table.Th>Tên</Table.Th>
                                            <Table.Th>Giá</Table.Th>
                                            <Table.Th style={{ textAlign: 'center' }}>Số lượng</Table.Th>
                                            <Table.Th>Thành tiền</Table.Th>
                                            <Table.Th>Hành động</Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>{renderRows()}</Table.Tbody>
                                </Table>
                            </div>

                            <Card className="cart-footer">
                                <Grid justify="space-between">
                                    <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
                                        <Group className="cart-coupon " pos="relative">
                                            <TextInput
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Coupon Code"
                                            />
                                            <Button className="coupon-btn" variant="filled" pos="absolute">
                                                Apply
                                            </Button>
                                        </Group>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
                                        <ul>
                                            <li>
                                                <strong>Tổng tiền hàng:</strong>
                                                <span>{calculateSubTotal().toLocaleString()}đ</span>
                                            </li>
                                            <li className="cart-total">
                                                <strong>Tổng cộng:</strong>
                                                <span>{calculateSubTotal().toLocaleString()}đ</span>
                                            </li>
                                        </ul>
                                        <Group justify="end">
                                            <Button
                                                className="theme-btn"
                                                variant="filled"
                                                type="submit"
                                                // style={{ background: 'var(--theme-color)' }}
                                            >
                                                Đặt lịch
                                            </Button>
                                        </Group>
                                    </Grid.Col>
                                </Grid>
                            </Card>
                        </Card>
                    </div>
                </div>
            </form>
            <Modal title="Delete" opened={isModalDeleteOpen} onClose={handleDeleteCancel}>
                <div>Bạn có muốn xoá không?</div>
                <Group justify="end" style={{ marginTop: 10 }}>
                    <Button
                        variant="outline"
                        key="cancel"
                        onClick={handleDeleteCancel}
                        color="red"
                        leftSection={<FontAwesomeIcon icon={faBan} />}
                    >
                        Huỷ bỏ
                    </Button>
                    <Button
                        style={{ marginLeft: '12px' }}
                        onClick={handleDeleteOk}
                        variant="filled"
                        leftSection={<FontAwesomeIcon icon={faChevronRight} />}
                    >
                        Tiếp tục
                    </Button>
                </Group>
            </Modal>
        </main>
    );
}
