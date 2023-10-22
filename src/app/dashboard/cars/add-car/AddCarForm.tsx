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
const cx = classNames.bind(styles);

const AddCartForm = () => {
    const { data: session } = useSession();

    const token = session?.user?.token;

    const [brandsData, setBrandsData] = useState<ICar[]>([]);
    const [models, setModels] = useState([]);
    const [licensePlates, setLicensePlates] = useState('');
    const [colorCar, setColorCar] = useState('');
    const [vinNumber, setVinNumber] = useState<Number>();
    const [kmRepairt, setKmRepairt] = useState<Number>();
    const [machineNumber, setMachineNumber] = useState<Number>();
    const [dateRepairt, setDateRepairt] = useState<Number>();
    const [registrationDeadline, setRegistrationDeadline] = useState('');
    const [civilDeadline, setCivilDeadline] = useState('');
    const [materialDeadline, setMaterialDeadline] = useState('');
    const handleRegistrationChange = (date) => {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setRegistrationDeadline(dateString);
    };
    const handleCivilChange = (date) => {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setCivilDeadline(dateString);
    };
    const handleMaterialChange = (date) => {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setMaterialDeadline(dateString);
    };
    const [automakerId, setAutomakerId] = useState('');
    const [carNameId, setCarNameId] = useState('10');
    const selectBrand = async (value: number) => {
        try {
            setAutomakerId(value.toString());
            setCarNameId('');
            console.log(value);
            let dong_xe = await getModels(value);
            console.log(dong_xe);
            if (dong_xe) {
                setModels(dong_xe);
            }
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
                vin_number: vinNumber,
                km_repairt: kmRepairt,
                machine_number: machineNumber,
                date_repairt: dateRepairt,
                registration_deadline: registrationDeadline,
                civil_insurance_deadline: civilDeadline,
                material_insurance_deadline: materialDeadline,
            };
            const createdCar = await addCar(newCar, token);
            console.log('Car created:', createdCar);
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };
    return (
        <div className={cx('wrapper-car')}>
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

                            {brandsData && brandsData?.map((brand) => <option value={brand.id}>{brand.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className={cx('col col-md-4')}>
                    <div className={cx('form-group')}>
                        <label>Dòng xe</label>
                        <select
                            type="text"
                            className="form-control"
                            placeholder="Dòng xe"
                            name="car_name_id"
                            required
                            onChange={(e) => setCarNameId(e.target.value)}
                        >
                            <option>Chọn dòng xe</option>
                            {models.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
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
                            value={vinNumber}
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
                            value={machineNumber}
                            onChange={(e) => setMachineNumber(Number(e.target.value))}
                        ></input>
                    </div>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-4')}>
                    <div className={cx('form-group')}>
                        <label>Km repairt</label>
                        <input
                            type="number"
                            name="km_repairt"
                            className="form-control"
                            placeholder="Km repairt"
                            value={kmRepairt}
                            onChange={(e) => setKmRepairt(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className={cx('col col-md-4')}>
                    <div className={cx('form-group')}>
                        <label>Date Repairt</label>
                        <input
                            type="number"
                            name="date_repairt"
                            className="form-control"
                            placeholder="Date Repairt"
                            value={dateRepairt}
                            onChange={(e) => setDateRepairt(Number(e.target.value))}
                        ></input>
                    </div>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-4')}>
                    <label>Registration Deadline</label>

                    <DatePicker
                        style={{ width: '100%' }}
                        name="registration_deadline"
                        onChange={handleRegistrationChange}
                    />
                </div>
                <div className={cx('col col-md-4')}>
                    <label>civil insurance deadline</label>

                    <DatePicker
                        style={{ width: '100%' }}
                        name="civil_insurance_deadline"
                        onChange={handleCivilChange}
                    />
                </div>
                <div className={cx('col col-md-4')}>
                    <label>material insurance deadline</label>

                    <DatePicker
                        style={{ width: '100%' }}
                        name="material_insurance_deadline"
                        onChange={handleMaterialChange}
                    />
                </div>
            </div>
            <button className={cx('btn btn-primary')} onClick={handleCreateCar}>
                Thêm xe
            </button>
        </div>
    );
};
export default AddCartForm;
