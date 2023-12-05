'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { getCars, deleteCar, setCarDefault } from '@/utils/car';
import { ICar } from '../../../interfaces/car';
import { useSession } from 'next-auth/react';
import { IconChevronRight, IconEye, IconPencil, IconTrash, IconBan } from '@tabler/icons-react';
import PreviewModal from './PreviewModal';
import UpdateModal from './UpdateModal';
import AddCarModal from './AddCarModal';
import { Table, Checkbox, Radio, Loader, Center, Button, Modal, Group, Pagination } from '@mantine/core';
import { getMyAccount } from '@/utils/user';
import { useDisclosure } from '@mantine/hooks';

export default function CarsPage() {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [openedAddCar, { open: openAddCar, close: closeAddCar }] = useDisclosure(false);
    const [openedDeleteCar, { open: openDeleteCar, close: closeDeleteCar }] = useDisclosure(false);
    const [openedUpdateCar, { open: openUpdateCar, close: closeUpdateCar }] = useDisclosure(false);
    const [openedPreviewCar, { open: openPreviewCar, close: closePreviewCar }] = useDisclosure(false);

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState({});
    const [deleteRow, setDeleteRow] = useState('');
    const [openModalCarDefault, setOpenModalCarDefault] = useState(false);
    const [myAccount, setMyAccount] = useState<any>([]);

    console.log('myAccount', myAccount);
    // Mở modal xem chi tiết
    const showDetails = (e: React.MouseEvent<HTMLElement, MouseEvent>, record: object) => {
        e.stopPropagation();
        setDetail(record);
        openPreviewCar();
    };

    // mở modal edit
    const showUpdateModal = (record: object) => {
        setDetail(record);
        openUpdateCar();
    };

    const handleDeleteOk = () => {
        setIsModalDeleteOpen(false);
        handleDeleteCar(deleteRow);
    };
    const handleOpenModalDelete = (record: any) => {
        setIsModalDeleteOpen(true);
        setDeleteRow(record.id);
    };
    const handleDeleteCancel = () => {
        setIsModalDeleteOpen(false);
    };
    const [cars, setCars] = useState<ICar[]>([]);
    const fetchCars = async () => {
        try {
            if (token) {
                const fetchedCars = await getCars(token);
                const account = await getMyAccount(token);
                setMyAccount(account ?? []);
                setCars(fetchedCars ?? []);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };
    useEffect(() => {
        fetchCars();
    }, [token]);

    const handleDeleteCar = async (carId: string) => {
        try {
            await deleteCar(carId, token ?? '');

            fetchCars();
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };
    const handleSetCarDefault = async (CarId: string) => {
        try {
            const carDefault = await setCarDefault(CarId, token ?? '');
            console.log(carDefault);
        } catch (error) {
            console.error('Error set car:', error);
            console.log('fail');
        }
    };

    // xe mặc định lưu trên localStorage
    const [selectedRow, setSelectedRow] = useState<any>();
    const [dataCarDefault, setdataCartDefault] = useState<any>();

    const handleRadioChange = (selectedRecord: any) => {
        setOpenModalCarDefault(true);
        setdataCartDefault(selectedRecord);
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('carDefault', JSON.stringify(selectedRecord));
        } else {
            console.error('localStorage is not available');
        }
    };
    const handleCarDefault = () => {
        localStorage.setItem('carDefault', JSON.stringify(dataCarDefault));
        setSelectedRow(dataCarDefault);
        handleSetCarDefault(dataCarDefault?.id);
        setOpenModalCarDefault(false);
    };

    const itemsPerPage: number = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const paginatedData = cars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        // Lấy dữ liệu từ Local Storage
        const existingCarData = localStorage.getItem('carDefault');
        if (existingCarData) {
            // Chuyển đổi chuỗi JSON thành mảng JavaScript
            const parsedCarData = JSON.parse(existingCarData);
            console.log(parsedCarData);
            setSelectedRow(parsedCarData);
        }
    }, []);
    const renderRows = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan={7}>
                        <Center>
                            <Loader size={36} />
                        </Center>
                    </td>
                </tr>
            );
        }

        return paginatedData.map((record) => (
            <Table.Tr key={record.id}>
                <Table.Td>
                    <Radio
                        style={{ display: 'flex', justifyContent: 'center' }}
                        checked={selectedRow?.id === record.id}
                        onChange={() => handleRadioChange(record)}
                    />
                </Table.Td>
                <Table.Td>{record.licensePlates}</Table.Td>
                <Table.Td>{record.color}</Table.Td>
                <Table.Td>{record.brandCarName?.name}</Table.Td>
                <Table.Td>{record.modelCarName?.name}</Table.Td>
                <Table.Td>{record.registrationDate}</Table.Td>
                <Table.Td>
                    <Button size="xs" p={5} variant="transparent" onClick={(e) => showDetails(e, record)}>
                        <IconEye size={16} />
                    </Button>
                    <Button
                        size="xs"
                        style={{ margin: '0 5px' }}
                        variant="transparent"
                        color="gray"
                        p={5}
                        onClick={() => showUpdateModal(record)}
                    >
                        <IconPencil size={16} />
                    </Button>
                    <Button
                        size="xs"
                        p={5}
                        variant="transparent"
                        color="red"
                        onClick={(e) => handleOpenModalDelete(record)}
                    >
                        <IconTrash size={16} color="red" />
                    </Button>
                </Table.Td>
            </Table.Tr>
        ));
    };

    return (
        <div className="user-profile-wrapper">
            <div className="user-profile-card profile-ad">
                <div className="user-profile-card-header">
                    <h4 className="user-profile-card-title">Xe của tôi</h4>
                    <div className="user-profile-card-header-right">
                        <div className="user-profile-search">
                            <div className="form-group"></div>
                        </div>
                        <Button className="theme-btn btn-add-car" onClick={openAddCar}>
                            Thêm xe
                        </Button>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="table-responsive" style={{ overflowY: 'hidden' }}>
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th align="center">Mặc định</Table.Th>
                                    <Table.Th>Biển số</Table.Th>
                                    <Table.Th>Màu xe</Table.Th>
                                    <Table.Th>Hãng xe</Table.Th>
                                    <Table.Th>Dòng xe</Table.Th>
                                    <Table.Th>Ngày đăng ký</Table.Th>
                                    <Table.Th>Hành động</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{renderRows()}</Table.Tbody>
                        </Table>
                        <Pagination
                            style={{ marginTop: '16px', display: 'flex', justifyContent: 'end' }}
                            total={Math.ceil(cars.length / itemsPerPage)}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <Modal title="Delete" opened={isModalDeleteOpen} onClose={handleDeleteCancel}>
                <div>Bạn có muốn xoá không?</div>
                <Group justify="end" style={{ marginTop: 10 }}>
                    <Button
                        variant="filled"
                        key="cancel"
                        onClick={handleDeleteCancel}
                        color="red"
                        leftSection={<IconBan />}
                    >
                        Huỷ bỏ
                    </Button>
                    <Button
                        style={{ marginLeft: '12px' }}
                        onClick={handleDeleteOk}
                        variant="filled"
                        leftSection={<IconChevronRight />}
                    >
                        Tiếp tục
                    </Button>
                </Group>
            </Modal>
            <UpdateModal
                open={openedUpdateCar}
                fetchCars={() => fetchCars()}
                onCancel={closeUpdateCar}
                width={800}
                data={detail ? detail : {}}
            />
            <Modal
                size={400}
                opened={openModalCarDefault}
                onClose={() => setOpenModalCarDefault(false)}
                title="Xe mặc định"
                lockScroll={false}
            >
                <div>Biển số: {dataCarDefault?.licensePlates}</div>
                <Group justify="end" style={{ marginTop: 10 }}>
                    <Button
                        variant="outline"
                        color="red"
                        size="xs"
                        onClick={() => setOpenModalCarDefault(false)}
                        leftSection={<IconBan />}
                    >
                        Huỷ bỏ
                    </Button>
                    <Button variant="filled" size="xs" onClick={() => handleCarDefault()}>
                        Cập nhật
                    </Button>
                </Group>
            </Modal>
            <AddCarModal width={800} opened={openedAddCar} close={closeAddCar} />
            <PreviewModal
                open={openedPreviewCar}
                onOk={closePreviewCar}
                onCancel={closePreviewCar}
                width={800}
                data={detail}
            />
        </div>
    );
}
