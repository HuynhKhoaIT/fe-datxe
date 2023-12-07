import React, { useEffect, useState } from 'react';
import { TextInput, Button, Group, Box, Grid, Textarea, Select, Radio, Modal } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';

export const ModalPreviewCalendar = ({ previewInfos }: any) => {
    const data = previewInfos?.event?._def?.extendedProps;
    return (
        <Box>
            <Grid mt="md" justify="center">
                <Grid.Col span={6} className="input-plate">
                    <TextInput placeholder="Biển số xe" size="lg" value={data?.car?.licensePlates}></TextInput>
                </Grid.Col>
            </Grid>
            <Grid gutter={10} mt="md">
                <Grid.Col span={4}>
                    <TextInput
                        placeholder="Hãng xe"
                        leftSection={<IconPlus size={22} color="blue" />}
                        value={data?.car?.brandCarName?.name}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <TextInput
                        placeholder="Dòng xe"
                        leftSection={<IconPlus size={22} color="blue" />}
                        value={data?.car?.modelCarName?.name}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <TextInput
                        placeholder="Năm sản xuất"
                        leftSection={<IconPlus size={22} color="blue" />}
                        withAsterisk
                    />
                </Grid.Col>
            </Grid>
            <Grid gutter={10} mt="md">
                <Grid.Col span={6} className="input-date">
                    <DateTimePicker
                        valueFormat="DD/MM/YYYY hh:mm A"
                        placeholder="Thời gian đặt lịch"
                        value={previewInfos?.event?._instance?.range?.start}
                        leftSection={<IconPlus size={22} color="blue" />}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput placeholder="chuyên gia" withAsterisk value={data?.garage?.name} />
                </Grid.Col>
            </Grid>
            <Grid gutter={10} mt="md">
                <Grid.Col span={6}>
                    <TextInput
                        label="Số điện thoại gara"
                        placeholder="Số điện thoại"
                        value={data?.garage?.phoneNumber}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput label="Địa chỉ gara" placeholder="Địa chỉ" withAsterisk value={data?.garage?.address} />
                </Grid.Col>
            </Grid>
        </Box>
    );
};
