'use client';
import { ICar } from '@/interfaces/car';
import { getBrands, getModels } from '@/utils/branch';
import { addCar } from '@/utils/car';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import styles from './AddCar.module.scss';
import classNames from 'classnames/bind';
import { IBrand } from '@/interfaces/brand';
const cx = classNames.bind(styles);
import { useRouter } from 'next/navigation';
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const AddCartForm = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const token = session?.user?.token;
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.info({
            message: `Thành công`,
            description: 'Xe đã được thêm thành công',
            icon: <CheckOutlined style={{ color: 'green' }} />,
        });
    };

    const [brandsData, setBrandsData] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IBrand[]>([]);
    const [licensePlates, setLicensePlates] = useState('');
    const [colorCar, setColorCar] = useState('');
    const [vinNumber, setVinNumber] = useState<Number>();
    const [kmRepairt, setKmRepairt] = useState<Number>();
    const [brandId, setBrandId] = useState<Number>();
    const [machineNumber, setMachineNumber] = useState<Number>();
    const [description, setDescription] = useState('');
    const [dateRepairt, setDateRepairt] = useState('');
    const [registrationDeadline, setRegistrationDeadline] = useState('');
    const [civilDeadline, setCivilDeadline] = useState('');
    const [materialDeadline, setMaterialDeadline] = useState('');
    function handleDateRepairtChange(date: any) {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setDateRepairt(dateString);
    }
    function handleRegistrationChange(date: any) {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setRegistrationDeadline(dateString);
    }
    function handleCivilChange(date: any) {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setCivilDeadline(dateString);
    }
    function handleMaterialChange(date: any) {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setMaterialDeadline(dateString);
    }
    const [automakerId, setAutomakerId] = useState('');
    const [carNameId, setCarNameId] = useState('0');
    const selectBrand = async (value: number) => {
        try {
            setAutomakerId(value.toString());
            setBrandId(value);
            const dong_xe: IBrand[] = await getModels(value);
            setModels(dong_xe);
        } catch (error) {}
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const data: ICar[] = await getBrands();
                setBrandsData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    const handleCreateCar = async () => {
        try {
            const newCar = {
                customer_id: session?.user?.id,
                number_plates: licensePlates,
                color: colorCar,
                car_name_id: carNameId,
                brand_id: brandId,
                vin_number: vinNumber,
                machine_number: machineNumber,
                km_repairt: kmRepairt,
                date_repairt: dateRepairt,
                registration_deadline: registrationDeadline,
                civil_insurance_deadline: civilDeadline,
                material_insurance_deadline: materialDeadline,
                automaker_id: automakerId,
                description: description,
            };
            const createdCar = await addCar(newCar, token ?? '');
            router.push('/dashboard/cars');
            openNotification();
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };
    return (
        <div className={cx('wrapper-car')}>
            {contextHolder}
            <div className={cx('row')}>
                <div className={cx('col-4')}>
                    <div className={cx('form-group')}>
                        <label>Biển số xe</label>
                        <input
                            type="text"
                            name="license_plates"
                            className="form-control"
                            placeholder="Biển số xe"
                            value={licensePlates}
                            onChange={(e) => setLicensePlates(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('col col-md-4')}>
                    <div className={cx('form-group')}>
                        <label>Hãng xe</label>

                        <select
                            className={cx('form-control')}
                            required
                            name="automaker_id"
                            id="automaker_id"
                            onChange={(e) => selectBrand(Number(e.target.value))}
                        >
                            <option>Chọn hãng xe</option>

                            {brandsData &&
                                brandsData?.map((brand: IBrand) => (
                                    <option value={brand.id?.toString()}>{brand.name}</option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className={cx('col col-md-4')}>
                    <div className={cx('form-group')}>
                        <label>Dòng xe</label>
                        <select
                            className="form-control"
                            placeholder="Dòng xe"
                            name="car_name_id"
                            required
                            onChange={(e) => setCarNameId(e.target.value)}
                        >
                            <option>Chọn dòng xe</option>
                            {models.map((model: IBrand) => (
                                <option value={model?.id?.toString()}>{model?.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-4')}>
                    <div className={cx('form-group')}>
                        <label>Màu xe</label>
                        <input
                            type="text"
                            name="color"
                            className="form-control"
                            placeholder="Màu xe"
                            value={colorCar}
                            onChange={(e) => setColorCar(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('col col-md-4')}>
                    <div className={cx('form-group')}>
                        <label>Vin Number</label>
                        <input
                            type="number"
                            name="vin_number"
                            className="form-control"
                            placeholder="Vin Number"
                            value={vinNumber?.toString()}
                            onChange={(e) => setVinNumber(Number(e.target.value))}
                        ></input>
                    </div>
                </div>
                <div className={cx('col col-md-4')}>
                    <div className={cx('form-group')}>
                        <label>Machine Number</label>
                        <input
                            type="number"
                            name="machine_number"
                            className="form-control"
                            placeholder="Machine Number"
                            value={machineNumber?.toString()}
                            onChange={(e) => setMachineNumber(Number(e.target.value))}
                        ></input>
                    </div>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-4 col-md-4')}>
                    <div className={cx('form-group')}>
                        <label>Km repairt</label>
                        <input
                            type="number"
                            name="km_repairt"
                            className="form-control"
                            placeholder="Km repairt"
                            value={kmRepairt?.toString()}
                            onChange={(e) => setKmRepairt(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className={cx('col-4 col-md-4')}>
                    <div className={cx('form-group')}>
                        <label>Date Repairt</label>
                        <DatePicker
                            className={cx('custom-datepicker')}
                            name="date_repair"
                            // onChange={handleDateRepairtChange}
                            onChange={(date) => handleDateRepairtChange(date?.toString())}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-4')}>
                    <div className={cx('form-group')}>
                        <label>Registration Deadline</label>

                        <DatePicker
                            className={cx('custom-datepicker')}
                            name="registration_deadline"
                            onChange={(date) => handleRegistrationChange(date)}
                        />
                    </div>
                </div>
                <div className={cx('col col-md-4')}>
                    <div className={cx('form-group')}>
                        <label>civil deadline</label>

                        <DatePicker
                            className={cx('custom-datepicker')}
                            name="civil_insurance_deadline"
                            onChange={(date) => handleCivilChange(date)}
                        />
                    </div>
                </div>
                <div className={cx('col col-md-4')}>
                    <div className={cx('form-group')}>
                        <label>material deadline</label>

                        <DatePicker
                            className={cx('custom-datepicker')}
                            name="material_insurance_deadline"
                            onChange={(date) => handleMaterialChange(date)}
                        />
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
                            value={description?.toString()}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className={cx('d-flex align-items-center')}>
                <button className="theme-btn" onClick={handleCreateCar}>
                    Thêm xe
                </button>
            </div>
        </div>
    );
};
export default AddCartForm;
