'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { checkOutCart } from '@/utils/order';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Grid, Modal, TextInput, Box, Select, Button, Group, Table, LoadingOverlay, Card, Avatar } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { ActionIcon, rem } from '@mantine/core';
import { ICar } from '@/interfaces/car';
import { getCar, getCars } from '@/utils/car';
import { notifications } from '@mantine/notifications';
import { IconClock12, IconTrash, IconBan, IconChevronRight, IconMinus, IconPlus } from '@tabler/icons-react';
import CartItemRow from './CartItemRow';

export default function Cart() {
    // const [form] = Form.useForm();
    const ref = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { data: session, status } = useSession();
    const token = session?.user?.token;
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(dayjs().format('HH:mm:ss'));
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [cars, setCars] = useState<any>([]);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [deleteRow, setDeleteRow] = useState<any>();
    const [cartData, setCartData] = useState<
        { product: { id: number; name: string; price: number; thumbnail: string }; quantity: number }[]
    >([]);
    const [carOptions, setCaroptions] = useState<any>();

    const [carDefault, setCarDefault] = useState<any>({});
    console.log(carDefault);
    const [carSelect, setCarSelect] = useState<any>();
    const selectCar = async (value: any) => {
        try {
            const selectedCar = await getCar(token ?? '', value);
            setCarSelect(selectedCar);
        } catch (error) {
            console.error('Error selecting car:', error);
        }
    };

    const handleDeleteOk = () => {
        setIsModalDeleteOpen(false);
        deleteItem(deleteRow?.product?.id);
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
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setDate(dateString);
    }
    function handleTimeChange(date: any) {
        const time = dayjs(date).format('HH:mm:ss');
        setTime(time);
    }

    //Lấy danh sách xe
    const fetchCars = async () => {
        try {
            if (token) {
                const fetchedCars = await getCars(token);
                const newModels = fetchedCars?.map((car) => ({
                    value: car.id?.toString() || '',
                    label: car.licensePlates || '',
                }));
                setCaroptions(newModels);
                setCars(fetchedCars);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };
    useEffect(() => {
        fetchCars();
    }, [token]);
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
        console.log(cartData);
        const updateCartData = cartData.map((item) => {
            console.log(item.quantity);
            if (item.quantity === 1) {
                console.log('xoá sản phẩm');
                deleteItem(productId);
            } else if (item.product.id === productId && item.quantity > 1) {
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
        console.log('ele', productId);
        console.log('cartData', cartData[0].product?.id !== productId);

        const updatedCartData = cartData.filter((item) => item?.product?.id !== productId);
        localStorage.setItem('cartData', JSON.stringify(updatedCartData));
        setCartData(updatedCartData);
    };

    useEffect(() => {
        const existingCarData = localStorage.getItem('carDefault');
        if (existingCarData) {
            // Chuyển đổi chuỗi JSON thành mảng JavaScript
            const parsedCarData = JSON.parse(existingCarData);
            setCarDefault(parsedCarData);
        }
        const existingCartData = localStorage.getItem('cartData');
        if (existingCartData) {
            const parsedCartData = JSON.parse(existingCartData);
            setCartData(parsedCartData);
        }
    }, []);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        try {
            if (cartData.length == 0) {
                notifications.show({
                    title: 'Error',
                    message: 'Vui lòng thêm sản phẩm vào giỏ hàng',
                });
                setLoading(false);

                return;
            }
            const arrivalTime = date + ' ' + time;
            await checkOutCart(arrivalTime, transformedProducts, token ?? '');
            localStorage.setItem('cartData', JSON.stringify([]));
            const existingCartData = localStorage.getItem('cartData');
            if (existingCartData) {
                const parsedCartData = JSON.parse(existingCartData);
                setCartData(parsedCartData);
            }
            notifications.show({
                title: 'Thành công',
                message: 'Đặt hàng thành công',
            });
            setLoading(false);
            // router.push('/dashboard/order/' + checkOut.id);
        } catch (error: any) {
            console.log('Order fail');
            console.error('Order error:', error.message);
            notifications.show({
                title: 'Thất bại',
                message: 'Đặt hàng thất bại! Vui lòng thử lại.',
            });
            setLoading(false);
        }
    };

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <IconClock12 size={16} />
        </ActionIcon>
    );

    const renderRows = () => {
        return cartData?.map((record) => (
            <CartItemRow
                key={record.product.id}
                record={record}
                decrementQuantity={decrementQuantity}
                incrementQuantity={incrementQuantity}
                handleOpenModalDelete={handleOpenModalDelete}
            />
        ));
    };
    console.log('gio hang', carSelect);
    return (
        <main className="main">
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
                                    <Card pos="relative">
                                        <Grid gutter={16}>
                                            <Grid.Col span={12}>
                                                <Select
                                                    label="Biển số"
                                                    checkIconPosition="right"
                                                    placeholder="Biển số"
                                                    data={carOptions}
                                                    value={carSelect?.id ?? carDefault?.id?.toString()}
                                                    allowDeselect={false}
                                                    onChange={(value) => {
                                                        selectCar(value);
                                                    }}
                                                />
                                            </Grid.Col>
                                        </Grid>
                                        <Grid gutter={16}>
                                            <Grid.Col span={6}>
                                                <TextInput
                                                    label="Hãng Xe"
                                                    placeholder="Hãng Xe"
                                                    readOnly
                                                    value={
                                                        carSelect?.brandCarName?.name ?? carDefault?.brandCarName?.name
                                                    }
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <TextInput
                                                    label="Dòng xe"
                                                    placeholder="Dòng xe"
                                                    readOnly
                                                    defaultValue={
                                                        carSelect?.modelCarName?.name ?? carDefault?.modelCarName?.name
                                                    }
                                                />
                                            </Grid.Col>
                                        </Grid>
                                    </Card>
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
                                                loading={loading}
                                                style={{ background: 'var(--theme-color)' }}
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
            <Modal title="Delete" opened={isModalDeleteOpen} onClose={handleDeleteCancel} lockScroll={false}>
                <div>Bạn có muốn xoá không?</div>
                <Group justify="end" style={{ marginTop: 10 }}>
                    <Button
                        variant="outline"
                        key="cancel"
                        onClick={handleDeleteCancel}
                        color="red"
                        leftSection={<IconBan size={16} />}
                    >
                        Huỷ bỏ
                    </Button>
                    <Button
                        style={{ marginLeft: '12px' }}
                        onClick={handleDeleteOk}
                        variant="filled"
                        leftSection={<IconChevronRight size={16} />}
                    >
                        Tiếp tục
                    </Button>
                </Group>
            </Modal>
        </main>
    );
}
