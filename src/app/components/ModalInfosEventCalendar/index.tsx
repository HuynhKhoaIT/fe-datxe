'use client';
import React, { useEffect, useState } from 'react';
import BasicModal from '../basicModal/BasicModal';
import { ModalEventCalendar } from './ModalEventCalendar';
import { useSession } from 'next-auth/react';
import { getBrands, getModels } from '@/utils/branch';
import { useSearchParams } from 'next/navigation';
import { getGarage } from '@/utils/garage';
import { getCategories } from '@/utils/category';
import Categories from '../category/categories';
import { getCustomerCareCreate } from '@/utils/customerCare';
import { getCars } from '@/utils/car';
import { getMyAccount } from '@/utils/user';

export default function ModalCalendar({ opened, onClose, eventInfos }: any) {
    const searchParams = useSearchParams();
    const garageId = searchParams.get('garage');
    // Lấy thông tin khách hàng nếu có
    const { data: session } = useSession();
    const token = session?.user?.token;
    const user = session?.user;
    // state
    const [brand, setBrand] = useState<number>();
    const [brandOptions, setBrandsOptions] = useState<any>();
    const [modelOptions, setModelsOptions] = useState<any>();
    const [categoryOptions, setCategoriesOptions] = useState<any>();
    const [advisorOptions, setAdvisoroptions] = useState<any>();
    const [carOptions, setCarOptions] = useState<any>();
    const [cars, setCars] = useState<any>();

    const [garageOptions, setGarageOptions] = useState<any>([]);
    const [customerCreate, setCustomerCreate] = useState<any>();
    const [garage, setGarage] = useState<any>();
    const [dataCarDefault, setdataCartDefault] = useState<any>();

    //Lấy danh sách xe
    const fetchBrands = async () => {
        const brands = await getBrands();
        const newBrands = brands?.map((brand) => ({
            value: brand.id?.toString() || '',
            label: brand.name || '',
        }));
        setBrandsOptions(newBrands);
        // setCars(fetchedCars);
    };
    useEffect(() => {
        fetchBrands();
    }, []);

    // lấy danh sách model
    const fetchModel = async () => {
        const models = await getModels(brand || 0);
        const newModels = models?.map((model) => ({
            value: model.id?.toString() || '',
            label: model.name || '',
        }));
        setModelsOptions(newModels);
    };
    useEffect(() => {
        fetchModel();
    }, [brand]);

    // lấy danh sách category
    const fetchCategories = async () => {
        const categories = await getCategories();
        const newCategories = categories?.map((category) => ({
            value: category.id?.toString() || '',
            label: category.name || '',
        }));
        setCategoriesOptions(newCategories);
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    //  lấy  Garage
    const fetchGarage = async (garageId: string) => {
        if (garageId.length > 0) {
            const garage = await getGarage(garageId || '');
            setGarage(garage);
        }
    };
    useEffect(() => {
        fetchGarage(garageId || '');
    }, [garageId]);

    // lấy thông tin xe khi đã login
    const fetchCars = async () => {
        try {
            if (token) {
                const fetchedCars = await getCars(token);
                const newCars = fetchedCars?.map((car) => ({
                    value: car.id?.toString() || '',
                    label: car.licensePlates || '',
                    otherData: {
                        carId: car.id?.toString() || '',
                        brandId: car.brandCarName.id,
                        brandName: car.brandCarName.name,
                        modelId: car.modelCarName.id,
                        modelName: car.modelCarName.name,
                    },
                }));
                setCarOptions(newCars);
                setCars(fetchedCars);
                const account: any = await getMyAccount(token);
                console.log(newCars);
                console.log(newCars);

                const carDefault = newCars?.filter((car) => car.value == account?.carIdDefault);
                console.log('carDefault', carDefault);
                setdataCartDefault(carDefault);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };
    useEffect(() => {
        fetchCars();
    }, [token]);

    // Lay thong tin dat lich khi đã login
    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const customerCare: any = await getCustomerCareCreate(token, garageId ?? '');
                    const garages: any = customerCare?.garages?.map((garage: { id: any; name: any }) => ({
                        value: garage.id?.toString(),
                        label: garage.name,
                    }));
                    const categories: any = customerCare?.categories?.map((category: { id: any; name: any }) => ({
                        value: category.id?.toString(),
                        label: category.name,
                    }));
                    const advisors: any = customerCare?.serviceAdvisor?.map((advisor: { id: any; name: any }) => ({
                        value: advisor.id?.toString(),
                        label: advisor.name,
                    }));
                    setCategoriesOptions(categories);
                    setGarageOptions(garages);
                    setAdvisoroptions(advisors);
                    setCustomerCreate(customerCare);
                } catch (error) {
                    console.log('API Response:', error);
                }
            }
        };

        fetchData();
    }, [token]);
    return (
        <BasicModal
            size={600}
            isOpen={opened}
            onCloseModal={onClose}
            footer={false}
            title="Đặt lịch"
            style={{ position: 'relative' }}
        >
            <ModalEventCalendar
                user={user}
                brandOptions={brandOptions}
                modelOptions={modelOptions}
                token={token}
                eventInfos={eventInfos}
                setBrand={setBrand}
                garage={garage}
                categoryOptions={categoryOptions}
                advisorOptions={advisorOptions}
                carOptions={carOptions}
                cars={cars}
                garageOptions={garageOptions}
                dataCarDefault={dataCarDefault?.[0]?.otherData}
            />
        </BasicModal>
    );
}
