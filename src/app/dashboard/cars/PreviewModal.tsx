'use client';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { ICar } from '@/interfaces/car';
import { DatePicker, Modal } from 'antd';
import styles from './add-car/AddCar.module.scss';
import classNames from 'classnames/bind';
import { IBrand } from '@/interfaces/brand';
const cx = classNames.bind(styles);

const PreviewModal = ({ data, onOk, open, onCancel, ...props }: any) => {
    return (
        <Modal
            title="Thông tin chi tiết"
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            style={{ zIndex: '99999' }}
            {...props}
        >
            <div className={cx('wrapper-car')}>
                <div className={cx('row')}>
                    <div className={cx('col-4')}>
                        <div className={cx('form-group')}>
                            <label>Biển số xe</label>
                            <input
                                readOnly={true}
                                type="text"
                                name="license_plates"
                                className="form-control"
                                placeholder="Biển số xe"
                                value={data.licensePlates}
                            />
                        </div>
                    </div>
                    <div className={cx('col col-md-4')}>
                        <div className={cx('form-group')}>
                            <label>Hãng xe</label>

                            <input
                                readOnly={true}
                                type="text"
                                name="color"
                                className="form-control"
                                placeholder="Màu xe"
                                value={data.colorCar}
                            />
                        </div>
                    </div>
                    <div className={cx('col col-md-4')}>
                        <div className={cx('form-group')}>
                            <label>Dòng xe</label>
                            <input
                                readOnly={true}
                                type="text"
                                name="color"
                                className="form-control"
                                placeholder="Màu xe"
                                value={data.colorCar}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-4')}>
                        <div className={cx('form-group')}>
                            <label>Màu xe</label>
                            <input
                                readOnly={true}
                                type="text"
                                name="color"
                                className="form-control"
                                placeholder="Màu xe"
                                value={data.colorCar}
                            />
                        </div>
                    </div>
                    <div className={cx('col col-md-4')}>
                        <div className={cx('form-group')}>
                            <label>Vin Number</label>
                            <input
                                readOnly={true}
                                type="number"
                                name="vin_number"
                                className="form-control"
                                placeholder="Vin Number"
                                value={data.vinNumber?.toString()}
                            />
                        </div>
                    </div>
                    <div className={cx('col col-md-4')}>
                        <div className={cx('form-group')}>
                            <label>Machine Number</label>
                            <input
                                readOnly={true}
                                type="number"
                                name="machine_number"
                                className="form-control"
                                placeholder="Machine Number"
                                value={data.machineNumber?.toString()}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-4 col-md-4')}>
                        <div className={cx('form-group')}>
                            <label>Km repairt</label>
                            <input
                                readOnly={true}
                                type="number"
                                name="km_repairt"
                                className="form-control"
                                placeholder="Km repairt"
                                value={data.kmRepairt?.toString()}
                            />
                        </div>
                    </div>
                    <div className={cx('col-4 col-md-4')}>
                        <div className={cx('form-group')}>
                            <label>Date Repairt</label>
                            <DatePicker className={cx('custom-datepicker')} name="date_repair" />
                        </div>
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-4')}>
                        <div className={cx('form-group')}>
                            <label>Registration Deadline</label>

                            <DatePicker className={cx('custom-datepicker')} name="registration_deadline" />
                        </div>
                    </div>
                    <div className={cx('col col-md-4')}>
                        <div className={cx('form-group')}>
                            <label>civil deadline</label>

                            <DatePicker className={cx('custom-datepicker')} name="civil_insurance_deadline" />
                        </div>
                    </div>
                    <div className={cx('col col-md-4')}>
                        <div className={cx('form-group')}>
                            <label>material deadline</label>

                            <DatePicker className={cx('custom-datepicker')} name="material_insurance_deadline" />
                        </div>
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-12')}>
                        <div className={cx('form-group')}>
                            <label>Mô tả chi tiết</label>

                            <textarea
                                rows={4}
                                name="description"
                                className="form-control"
                                placeholder="Mô tả chi tiết"
                                value={data.description?.toString()}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default PreviewModal;
