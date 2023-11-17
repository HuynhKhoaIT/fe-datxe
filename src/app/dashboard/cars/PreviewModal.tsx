'use client';
import React from 'react';
import { Grid, Modal, Textarea, TextInput, Box } from '@mantine/core';
import dayjs from 'dayjs';

const PreviewModal = ({ data, onOk, open, onCancel, ...props }: any) => {
    return (
        <Modal
            size={800}
            title="Thông tin chi tiết"
            opened={open}
            closeButtonProps
            onClose={onCancel}
            lockScroll={false}
            {...props}
        >
            <Box maw={800}>
                <Grid gutter={10}>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Biển số xe"
                            readOnly
                            type="text"
                            name="licensePlates"
                            value={data.licensePlates}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput readOnly type="text" name="brandCar" label="Hãng xe" value={data.brandName} />
                    </Grid.Col>
                </Grid>
                <Grid gutter={10}>
                    <Grid.Col span={6}>
                        <TextInput readOnly type="text" name="modelCar" label="Dòng xe" value={data.modelName} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput readOnly type="text" name="color" label="Màu xe" value={data.color} />
                    </Grid.Col>
                </Grid>
                <Grid gutter={10}>
                    <Grid.Col span={6}>
                        <TextInput
                            readOnly
                            type="number"
                            name="vin_number"
                            label="Vin Number"
                            value={Number(data.vinNumber)}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            readOnly
                            type="text"
                            name="date_repair"
                            label="Date Repairt"
                            value={dayjs(data.maintenanceDate).format('DD/MM/YYYY')}
                        />
                    </Grid.Col>
                </Grid>
                <Grid gutter={10}>
                    <Grid.Col span={6}>
                        <TextInput
                            readOnly
                            type="text"
                            name="registration_deadline"
                            label="Registration Deadline"
                            value={dayjs(data.registrationDate).format('DD/MM/YYYY')}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            readOnly
                            type="text"
                            name="civil_insurance_deadline"
                            label="Civil deadline"
                            value={dayjs(data.civilDeadline).format('DD/MM/YYYY')}
                        />
                    </Grid.Col>
                </Grid>
                <Grid gutter={10}>
                    <Grid.Col span={6}>
                        <TextInput
                            readOnly
                            type="text"
                            name="material_insurance_deadline"
                            label="Material deadline"
                            value={dayjs(data.materialDeadline).format('DD/MM/YYYY')}
                        />
                    </Grid.Col>
                </Grid>
                {/* Uncomment below to include the description TextArea */}
                {/* <Grid>
          <Grid.Col span={24}>
            <TextArea
              readOnly
              showCount
              name="description"
              maxLength={100}
              label="Mô tả chi tiết"
              placeholder="Mô tả chi tiết"
              value={data.description}
              style={{ height: 60, resize: 'none' }}
            />
          </Grid.Col>
        </Grid> */}
            </Box>
        </Modal>
    );
};

export default PreviewModal;
