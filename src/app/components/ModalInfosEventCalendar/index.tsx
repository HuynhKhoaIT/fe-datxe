// import { Button, Modal, TextField } from '@mui/material';
import CalendarApi from '@fullcalendar/react';
import React, { useState } from 'react';
import Modal from 'react-modal';
import '@mantine/core/styles.css';
// import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
// import { toast } from 'react-toastify';
// import { ColorsCard, ListColorsCard } from '../../constants/ListColorsCard';
// import {
//   createEventCalendar,
//   deleteEventCalendar,
//   updateEventCalendar,
// } from '../../services/eventCalendarApi';
// import { BackgroundColorRounded, BoxContainer, SelectColors } from './styles';
import { TextInput, Checkbox, Button, Group, Box, Grid, Textarea, NumberInput } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';

const customStyles = {
    overlay: {
        zIndex: 999,
        backgroundColor: 'transparent',
    },
    content: {
        width: '600px',
        // height: '800px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        backgroundColor: '#fff',
    },
};
interface ICardColor {
    backgroundColor: string;
    textColor: string;
}

interface IModalInfosEventCalendaryProps {
    open: boolean;
    handleClose: () => void;
    eventInfos: any;
    isEditCard: boolean;
    user: any;
}

export const ModalInfosEventCalendar = ({
    handleClose,
    open,
    eventInfos,
    isEditCard,
    user,
}: IModalInfosEventCalendaryProps) => {
    console.log(eventInfos?.startStr);

    // Format the date
    // let formattedDate = dayjs(eventInfos?.startStr).format('DD/MM/YYYY HH:mm:ss');

    const form = useForm({
        initialValues: {
            requireCustomer: '',
            name: user?.name,
            phone: user?.phone,
            plate: '',
            brand: '',
            model: '',
            nsx: '',
            category: '',
            // date: formattedDate,
            garaName: '',
            garaAddress: '',
            note: '',
        },

        validate: {
            name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
        },
    });
    return (
        <Modal isOpen={open} onRequestClose={handleClose} style={customStyles} contentLabel="Example Modal">
            <div className="d-flex justify-content-between">
                <h3>Title</h3>
                <i onClick={handleClose} style={{ fontSize: '22px', cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faXmark} style={{ fontSize: '22' }} />
                </i>
            </div>
            <Box maw={700} mx="auto">
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Textarea
                        label="Yêu cầu khách hàng"
                        placeholder="Yêu cầu khách hàng"
                        withAsterisk
                        {...form.getInputProps('requireCustomer')}
                    />
                    <Grid gutter={10} mt="md">
                        <Grid.Col span={4}>
                            <TextInput
                                label="Name"
                                placeholder="Name"
                                defaultValue={user?.name}
                                withAsterisk
                                {...form.getInputProps('name')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Phone"
                                placeholder="Phone"
                                defaultValue={user?.phone}
                                withAsterisk
                                {...form.getInputProps('phone')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Biển số"
                                placeholder="Biển số"
                                withAsterisk
                                {...form.getInputProps('plate')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid gutter={10} mt="md">
                        <Grid.Col span={4}>
                            <TextInput
                                label="Hãng xe"
                                placeholder="Hãng xe"
                                withAsterisk
                                {...form.getInputProps('brand')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Dòng xe"
                                placeholder="Dòng xe"
                                withAsterisk
                                {...form.getInputProps('model')}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <TextInput
                                label="Năm sản xuất"
                                placeholder="Năm sản xuất"
                                withAsterisk
                                {...form.getInputProps('nsx')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid gutter={10} mt="md">
                        <Grid.Col span={6}>
                            <TextInput
                                label="Danh mục đặt lịch"
                                placeholder="Danh mục đặt lịch"
                                withAsterisk
                                {...form.getInputProps('category')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Thời gian đặt lịch"
                                placeholder="Thời gian đặt lịch"
                                withAsterisk
                                value={dayjs(eventInfos?.startStr).format('DD/MM/YYYY HH:mm:ss')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Grid gutter={10} mt="md">
                        <Grid.Col span={6}>
                            <TextInput
                                label="Tên gara"
                                placeholder="Tên gara"
                                withAsterisk
                                {...form.getInputProps('garaName')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput
                                label="Địa chỉ"
                                placeholder="Địa chỉ"
                                withAsterisk
                                {...form.getInputProps('garaAddress')}
                            />
                        </Grid.Col>
                    </Grid>

                    <Textarea
                        label="Ghi chú cho CVDV"
                        placeholder="Ghi chú cho CVDV"
                        withAsterisk
                        {...form.getInputProps('note')}
                    />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit" onClick={handleClose}>
                            Submit
                        </Button>
                    </Group>
                </form>
            </Box>
        </Modal>
    );
};
